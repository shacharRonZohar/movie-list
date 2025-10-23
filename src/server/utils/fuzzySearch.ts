/**
 * Enhanced search utility with fuzzy matching and relevance scoring
 * Uses PostgreSQL pg_trgm extension for trigram similarity
 */

import { Prisma } from '@prisma/client'
import { prisma } from './prisma'

export interface SearchOptions {
  query: string
  type?: 'MOVIE' | 'SERIES'
  year?: number
  genres?: string[]
  limit?: number
  minSimilarity?: number
}

export interface SearchResult {
  id: string
  externalId: string
  externalSource: string
  title: string
  originalTitle: string | null
  type: string
  overview: string | null
  tagline: string | null
  genres: string[]
  originalLanguage: string | null
  releaseDate: string | null
  year: number
  runtime: number | null
  posterPath: string | null
  backdropPath: string | null
  imdbId: string | null
  createdAt: Date
  updatedAt: Date
  similarity?: number
}

/**
 * Search local database with fuzzy matching using trigram similarity
 * Returns results sorted by relevance (similarity score)
 */
export async function searchLocalContent(
  options: SearchOptions
): Promise<SearchResult[]> {
  const { query, type, year, genres, limit = 10, minSimilarity = 0.3 } = options

  // Build SQL query for fuzzy search with similarity scoring
  const searchQuery = Prisma.sql`
    SELECT * FROM (
      SELECT 
        c.id,
        c.external_id as "externalId",
        c.external_source as "externalSource",
        c.title,
        c.original_title as "originalTitle",
        c.type,
        c.overview,
        c.tagline,
        c.genres,
        c.original_language as "originalLanguage",
        c.release_date as "releaseDate",
        c.year,
        c.runtime,
        c.poster_path as "posterPath",
        c.backdrop_path as "backdropPath",
        c.imdb_id as "imdbId",
        c.created_at as "createdAt",
        c.updated_at as "updatedAt",
        GREATEST(
          similarity(c.title, ${query}),
          COALESCE(similarity(c.original_title, ${query}), 0),
          COALESCE(similarity(c.overview, ${query}), 0) * 0.3,
          COALESCE(similarity(c.tagline, ${query}), 0) * 0.5
        ) as similarity
      FROM content c
      WHERE (
        c.title % ${query}
        OR c.original_title % ${query}
        OR c.overview % ${query}
        OR c.tagline % ${query}
      )
      ${type ? Prisma.sql`AND c.type = ${type}::content_type` : Prisma.empty}
      ${year ? Prisma.sql`AND c.year = ${year}` : Prisma.empty}
      ${
        genres && genres.length > 0
          ? Prisma.sql`AND c.genres && ${genres}::text[]`
          : Prisma.empty
      }
    ) subquery
    WHERE similarity >= ${minSimilarity}
    ORDER BY similarity DESC, year DESC
    LIMIT ${limit}
  `

  const results = await prisma.$queryRaw<SearchResult[]>(searchQuery)

  return results
}

/**
 * Check if a search query has high-confidence matches in local database
 * Returns true if we have exact or near-exact matches (similarity > threshold)
 */
export async function hasHighConfidenceMatch(
  query: string,
  threshold = 0.7
): Promise<boolean> {
  const results = await searchLocalContent({
    query,
    limit: 1,
    minSimilarity: threshold,
  })

  return results.length > 0 && (results[0]?.similarity ?? 0) >= threshold
}

/**
 * Get relevance score for sorting merged results
 * Combines similarity score with popularity indicators
 */
export function getRelevanceScore(
  result: SearchResult,
  isFromTMDB: boolean
): number {
  const similarityScore = result.similarity ?? 0
  const recencyBonus = result.year >= new Date().getFullYear() - 2 ? 0.1 : 0
  const tmdbBonus = isFromTMDB ? 0.15 : 0 // Slightly prefer fresh TMDB results

  return similarityScore + recencyBonus + tmdbBonus
}

/**
 * Merge and deduplicate search results from local and TMDB
 * Prioritizes by relevance score
 */
export function mergeSearchResults(
  localResults: SearchResult[],
  tmdbResults: SearchResult[],
  limit = 10
): SearchResult[] {
  // Create a map to track unique content by externalId
  const uniqueResults = new Map<string, SearchResult>()

  // Add local results first (they have similarity scores)
  for (const result of localResults) {
    const key = `${result.externalSource}-${result.externalId}`
    if (!uniqueResults.has(key)) {
      uniqueResults.set(key, {
        ...result,
        similarity: getRelevanceScore(result, false),
      })
    }
  }

  // Add TMDB results, but don't override existing ones
  for (const result of tmdbResults) {
    const key = `${result.externalSource}-${result.externalId}`
    if (!uniqueResults.has(key)) {
      uniqueResults.set(key, {
        ...result,
        similarity: getRelevanceScore(result, true),
      })
    }
  }

  // Sort by relevance and limit
  return Array.from(uniqueResults.values())
    .sort((a, b) => (b.similarity ?? 0) - (a.similarity ?? 0))
    .slice(0, limit)
}

/**
 * Extract potential filters from search query
 * Examples:
 * - "horror 2023" -> { query: "horror", year: 2023 }
 * - "sci-fi action" -> { query: "sci-fi action", genres: ["Science Fiction", "Action"] }
 */
export function parseSearchQuery(rawQuery: string): {
  query: string
  year?: number
  genres?: string[]
} {
  let query = rawQuery.trim()
  let year: number | undefined
  const genres: string[] = []

  // Extract year (4 digits)
  const yearMatch = query.match(/\b(19\d{2}|20\d{2})\b/)
  if (yearMatch?.[1]) {
    year = parseInt(yearMatch[1], 10)
    query = query.replace(yearMatch[0], '').trim()
  }

  // Map common genre keywords to TMDB genre names
  const genreMap: Record<string, string> = {
    'sci-fi': 'Science Fiction',
    scifi: 'Science Fiction',
    sf: 'Science Fiction',
    horror: 'Horror',
    comedy: 'Comedy',
    action: 'Action',
    drama: 'Drama',
    thriller: 'Thriller',
    romance: 'Romance',
    fantasy: 'Fantasy',
    animation: 'Animation',
    documentary: 'Documentary',
    crime: 'Crime',
    mystery: 'Mystery',
    adventure: 'Adventure',
    western: 'Western',
    war: 'War',
  }

  // Check for genre keywords
  for (const [keyword, genreName] of Object.entries(genreMap)) {
    const regex = new RegExp(`\\b${keyword}\\b`, 'i')
    if (regex.test(query)) {
      genres.push(genreName)
      // Don't remove genre keywords from query as they might be part of the title
    }
  }

  return {
    query: query.trim() || rawQuery.trim(),
    year,
    genres: genres.length > 0 ? genres : undefined,
  }
}
