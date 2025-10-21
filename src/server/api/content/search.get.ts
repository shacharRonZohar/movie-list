/**
 * Search for content (movies/series)
 * First searches local database, then TMDB if no results found
 * Caches TMDB results in database for future searches
 *
 * GET /api/content/search?q=inception
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

export default defineProtectedEventHandler(async event => {
  const query = getQuery(event)
  const searchQuery = query.q as string

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

  // Step 1: Search local database first
  const localResults = await prisma.content.findMany({
    where: {
      OR: [
        {
          title: {
            contains: searchQuery,
            mode: 'insensitive',
          },
        },
        {
          originalTitle: {
            contains: searchQuery,
            mode: 'insensitive',
          },
        },
      ],
    },
    take: 10,
    orderBy: {
      createdAt: 'desc',
    },
  })

  // If we have local results, return them
  if (localResults.length >= 10) {
    return localResults
  }

  // Step 2: No local results, search TMDB (both movies and TV shows)
  try {
    const tmdbResults = await searchMulti(searchQuery, 1)

    if (tmdbResults.results.length === 0) {
      return []
    }

    // Step 3: Cache TMDB results in database
    const cachedResults = await Promise.all(
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

    // Filter out any failed caching attempts
    const validResults = cachedResults.filter(
      (result): result is NonNullable<typeof result> => result !== null
    )

    // Merge results with no duplicates
    const mergedResults = [...localResults, ...validResults].filter(
      (result, index, self) => index === self.findIndex(t => t.id === result.id)
    )

    return mergedResults
  } catch (error) {
    console.error('TMDB search error:', error)
    throw createError({
      statusCode: 500,
      message: 'Failed to search for content',
    })
  }
})
