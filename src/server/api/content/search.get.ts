/**
 * Search for content (movies/series)
 * First searches local database, then TMDB if no results found
 * Caches TMDB results in database for future searches
 *
 * GET /api/content/search?q=inception
 */

import { prisma } from '~/server/utils/prisma'
import {
  searchMovies,
  getMovieDetails,
  mapMovieToContent,
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
  if (localResults.length > 0) {
    return localResults
  }

  // Step 2: No local results, search TMDB
  try {
    const tmdbResults = await searchMovies(searchQuery, 1)

    if (tmdbResults.results.length === 0) {
      return []
    }

    // Step 3: Cache TMDB results in database
    const cachedResults = await Promise.all(
      tmdbResults.results.slice(0, 50).map(async movie => {
        try {
          // Get full movie details for better data
          const movieDetails = await getMovieDetails(movie.id)
          const mappedData = await mapMovieToContent(movieDetails)

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

          return content
        } catch (error) {
          console.error(
            `Failed to cache movie ${movie.id} (${movie.title}):`,
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

    return validResults
  } catch (error) {
    console.error('TMDB search error:', error)
    throw createError({
      statusCode: 500,
      message: 'Failed to search for content',
    })
  }
})
