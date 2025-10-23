/**
 * Search for content (movies/series)
 * Uses fuzzy matching on local database first, then TMDB if needed
 * Caches TMDB results in database for future searches
 *
 * GET /api/content/search?q=inception
 * GET /api/content/search?q=horror+2023
 * GET /api/content/search?q=dark+knight&type=MOVIE
 */

import { prisma } from '~/server/utils/prisma'
import {
  searchMulti,
  getMovieDetails,
  getTVShowDetails,
  mapMovieToContent,
  mapTVShowToContent,
  type TMDBMovie,
  type TMDBTVShow,
} from '~/server/utils/tmdb'
import {
  searchLocalContent,
  hasHighConfidenceMatch,
  parseSearchQuery,
} from '~/server/utils/fuzzySearch'

export default defineProtectedEventHandler(async event => {
  const query = getQuery(event)
  const searchQuery = query.q as string
  const contentType = query.type as 'MOVIE' | 'SERIES' | undefined

  if (!searchQuery) {
    throw createError({
      statusCode: 400,
      message: 'Search query is required (use ?q=movie+name)',
    })
  }

  if (searchQuery.length < 2) {
    throw createError({
      statusCode: 400,
      message: 'Search query must be at least 2 characters',
    })
  }

  // Step 1: Parse query for filters (year, genres)
  const { query: parsedQuery, year, genres } = parseSearchQuery(searchQuery)

  // Step 2: Search local database with fuzzy matching
  const localResults = await searchLocalContent({
    query: parsedQuery,
    type: contentType,
    year,
    genres,
    limit: 10,
    minSimilarity: 0.3,
  })

  // Step 3: Check if we have high-confidence matches
  const hasGoodMatch = await hasHighConfidenceMatch(parsedQuery, 0.7)

  // If we have 10+ results or a high-confidence match, return local results
  if (localResults.length >= 10 || hasGoodMatch) {
    return localResults
  }

  // Step 4: Search TMDB for additional results
  try {
    const tmdbResults = await searchMulti(parsedQuery, 1)

    if (tmdbResults.results.length === 0) {
      // No TMDB results, return what we have from local
      return localResults
    }

    // Step 5: Cache TMDB results in database (wait for caching to complete)
    await Promise.all(
      tmdbResults.results
        .filter(item => item.media_type === 'movie' || item.media_type === 'tv')
        .slice(0, Math.max(0, 10 - localResults.length))
        .map(async item => {
          try {
            let mappedData

            if (item.media_type === 'movie') {
              const movie = item as TMDBMovie & { media_type: 'movie' }
              const movieDetails = await getMovieDetails(movie.id)
              mappedData = await mapMovieToContent(movieDetails)
            } else {
              const tvShow = item as TMDBTVShow & { media_type: 'tv' }
              const tvDetails = await getTVShowDetails(tvShow.id)
              mappedData = await mapTVShowToContent(tvDetails)
            }

            // Upsert into database (create or update)
            const content = await prisma.content.upsert({
              where: {
                externalSource_externalId: {
                  externalSource: 'TMDB',
                  externalId: mappedData.externalId,
                },
              },
              update: {
                title: mappedData.title,
                originalTitle: mappedData.originalTitle,
                overview: mappedData.overview,
                tagline: mappedData.tagline,
                genres: mappedData.genres,
                originalLanguage: mappedData.originalLanguage,
                releaseDate: mappedData.releaseDate,
                year: mappedData.year,
                runtime: mappedData.runtime,
                posterPath: mappedData.posterPath,
                backdropPath: mappedData.backdropPath,
                imdbId: mappedData.imdbId,
              },
              create: {
                externalId: mappedData.externalId,
                externalSource: 'TMDB',
                title: mappedData.title,
                originalTitle: mappedData.originalTitle,
                type: mappedData.type,
                overview: mappedData.overview,
                tagline: mappedData.tagline,
                genres: mappedData.genres,
                originalLanguage: mappedData.originalLanguage,
                releaseDate: mappedData.releaseDate,
                year: mappedData.year,
                runtime: mappedData.runtime,
                posterPath: mappedData.posterPath,
                backdropPath: mappedData.backdropPath,
                imdbId: mappedData.imdbId,
              },
            })

            // If it's a series, also save the series details
            if (mappedData.type === 'SERIES' && mappedData.seasonCount) {
              await prisma.seriesDetails.upsert({
                where: { contentId: content.id },
                update: {
                  seasonCount: mappedData.seasonCount,
                  episodeCount: mappedData.episodeCount || null,
                  status: mappedData.seriesStatus || null,
                  lastAirDate: mappedData.lastAirDate || null,
                },
                create: {
                  contentId: content.id,
                  seasonCount: mappedData.seasonCount,
                  episodeCount: mappedData.episodeCount || null,
                  status: mappedData.seriesStatus || null,
                  lastAirDate: mappedData.lastAirDate || null,
                },
              })
            }

            return content
          } catch (error) {
            const title =
              'title' in item
                ? item.title
                : 'name' in item
                  ? item.name
                  : 'Unknown'
            console.error(
              `Failed to cache ${item.media_type} ${item.id} (${title}):`,
              error
            )
            return null
          }
        })
    )

    // Step 6: Re-search locally to get similarity scores for all results (including newly cached)
    // This ensures local and TMDB results are sorted together by true relevance
    // No duplicates possible because:
    // 1. Database enforces unique constraint on (externalSource, externalId)
    // 2. Upsert updates existing records instead of creating duplicates
    // 3. Single SQL query with DISTINCT ON (id) ensures unique results
    const allResults = await searchLocalContent({
      query: parsedQuery,
      type: contentType,
      year,
      genres,
      limit: 10,
      minSimilarity: 0.1, // Lower threshold to include all cached results
    })

    return allResults
  } catch (error) {
    console.error('TMDB search error:', error)
    // If TMDB fails, still return local results
    return localResults
  }
})
