/**
 * TMDB API Service
 * Handles all interactions with The Movie Database API
 */

const TMDB_BASE_URL = 'https://api.themoviedb.org/3' as const
const TMDB_IMAGE_BASE_URL = 'https://image.tmdb.org/t/p' as const

// Type definitions for TMDB responses
export interface TMDBMovie {
  id: number
  title: string
  original_title: string
  overview: string
  poster_path: string | null
  backdrop_path: string | null
  release_date: string
  genre_ids: number[]
  original_language: string
}

export interface TMDBTVShow {
  id: number
  name: string
  original_name: string
  overview: string
  poster_path: string | null
  backdrop_path: string | null
  first_air_date: string
  genre_ids: number[]
  original_language: string
}

export interface TMDBSearchResponse {
  page: number
  results: TMDBMovie[]
  total_pages: number
  total_results: number
}

export interface TMDBMultiSearchResponse {
  page: number
  results: Array<(TMDBMovie | TMDBTVShow) & { media_type: 'movie' | 'tv' }>
  total_pages: number
  total_results: number
}

export interface TMDBMovieDetails extends TMDBMovie {
  genres: Array<{ id: number; name: string }>
  imdb_id: string | null
  runtime: number | null
  tagline: string | null
}

export interface TMDBTVShowDetails extends TMDBTVShow {
  genres: Array<{ id: number; name: string }>
  tagline: string | null
  episode_run_time: number[]
  number_of_seasons: number
  number_of_episodes: number
  status: string
  last_air_date: string | null
}

export interface TMDBGenre {
  id: number
  name: string
}

export interface TMDBGenresResponse {
  genres: TMDBGenre[]
}

export interface MappedContentData {
  externalId: string
  title: string
  originalTitle: string
  type: 'MOVIE' | 'SERIES'
  overview: string | null
  tagline: string | null
  genres: string[]
  originalLanguage: string
  releaseDate: string
  year: number
  runtime: number | null
  posterPath: string | null
  backdropPath: string | null
  imdbId: string | null
  // Series-specific fields
  seasonCount?: number
  episodeCount?: number
  seriesStatus?: string
  lastAirDate?: Date | null
}

/**
 * Make a request to the TMDB API
 */
async function request<T>(
  endpoint: string,
  params: Record<string, string | number | boolean> = {}
) {
  const config = useRuntimeConfig()
  const apiKey = config.tmdbApiKey

  if (!apiKey) {
    throw new Error(
      'TMDB API key is not configured. Please set TMDB_API_KEY environment variable.'
    )
  }

  const url = new URL(`${TMDB_BASE_URL}${endpoint}`)

  // Add query parameters
  Object.entries(params).forEach(([key, value]) => {
    url.searchParams.append(key, String(value))
  })

  const response = await fetch(url.toString(), {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: `Bearer ${apiKey}`,
    },
  })

  if (!response.ok) {
    const error = await response
      .json()
      .catch(() => ({ status_message: 'Unknown error' }))
    throw new Error(
      `TMDB API Error: ${error.status_message || response.statusText}`
    )
  }

  return response.json() as Promise<T>
}

/**
 * Search for movies
 */
export async function searchMovies(query: string, page = 1) {
  return request<TMDBSearchResponse>('/search/movie', {
    query,
    page,
    include_adult: false,
  })
}

/**
 * Search for TV shows
 */
export async function searchTVShows(query: string, page = 1) {
  return request<TMDBSearchResponse>('/search/tv', {
    query,
    page,
    include_adult: false,
  })
}

/**
 * Search for both movies and TV shows
 */
export async function searchMulti(query: string, page = 1) {
  return request<TMDBMultiSearchResponse>('/search/multi', {
    query,
    page,
    include_adult: false,
  })
}

/**
 * Get movie details by ID
 */
export async function getMovieDetails(movieId: number) {
  return request<TMDBMovieDetails>(`/movie/${movieId}`)
}

/**
 * Get TV show details by ID
 */
export async function getTVShowDetails(tvId: number) {
  return request<TMDBTVShowDetails>(`/tv/${tvId}`)
}

/**
 * Get movie genres
 */
export async function getMovieGenres() {
  return request<TMDBGenresResponse>('/genre/movie/list')
}

/**
 * Get TV show genres
 */
export async function getTVGenres() {
  return request<TMDBGenresResponse>('/genre/tv/list')
}

/**
 * Get all genres (movies and TV shows combined)
 */
export async function getGenres() {
  const [movieGenres, tvGenres] = await Promise.all([
    getMovieGenres(),
    getTVGenres(),
  ])

  // Combine and deduplicate genres
  const genreMap = new Map<number, string>()
  movieGenres.genres.forEach(g => genreMap.set(g.id, g.name))
  tvGenres.genres.forEach(g => genreMap.set(g.id, g.name))

  return {
    genres: Array.from(genreMap.entries()).map(([id, name]) => ({ id, name })),
  }
}

/**
 * Get movies by genre
 */
export async function getMoviesByGenre(genreId: number, page = 1) {
  return request<TMDBSearchResponse>('/discover/movie', {
    with_genres: genreId,
    page,
    sort_by: 'popularity.desc',
  })
}

/**
 * Get full image URL
 */
export function getImageUrl(
  path: string | null,
  size: 'w92' | 'w154' | 'w185' | 'w342' | 'w500' | 'w780' | 'original' = 'w500'
) {
  if (!path) return null
  return `${TMDB_IMAGE_BASE_URL}/${size}${path}`
}

/**
 * Get backdrop image URL
 */
export function getBackdropUrl(
  path: string | null,
  size: 'w300' | 'w780' | 'w1280' | 'original' = 'w1280'
) {
  if (!path) return null
  return `${TMDB_IMAGE_BASE_URL}/${size}${path}`
}

// Genre cache for mapping genre IDs to names
let genreCache: Map<number, string> | null = null

/**
 * Get genre map (ID to name)
 * Cached for performance
 */
async function getGenreMap() {
  if (!genreCache) {
    const response = await getGenres()
    genreCache = new Map(response.genres.map(g => [g.id, g.name]))
  }
  return genreCache
}

/**
 * Map genre IDs to genre names
 */
export async function mapGenreIds(genreIds: number[]) {
  const genreMap = await getGenreMap()
  return genreIds
    .map(id => genreMap.get(id))
    .filter((name): name is string => name !== undefined)
}

/**
 * Extract year from TMDB release date (YYYY-MM-DD)
 */
function extractYear(releaseDate: string) {
  const year = parseInt(releaseDate.split('-')[0] || '', 10)
  return isNaN(year) ? new Date().getFullYear() : year
}

/**
 * Map TMDB movie details to content data for database storage
 */
export async function mapMovieToContent(
  movie: TMDBMovieDetails
): Promise<MappedContentData> {
  return {
    externalId: String(movie.id),
    title: movie.title,
    originalTitle: movie.original_title,
    type: 'MOVIE' as const,
    overview: movie.overview || null,
    tagline: movie.tagline || null,
    genres: movie.genres.map(g => g.name),
    originalLanguage: movie.original_language,
    releaseDate: movie.release_date,
    year: extractYear(movie.release_date),
    runtime: movie.runtime,
    posterPath: movie.poster_path,
    backdropPath: movie.backdrop_path,
    imdbId: movie.imdb_id,
  }
}

/**
 * Map TMDB TV show details to content data for database storage
 */
export async function mapTVShowToContent(
  tvShow: TMDBTVShowDetails
): Promise<MappedContentData> {
  const avgRuntime =
    tvShow.episode_run_time.length > 0
      ? Math.round(
          tvShow.episode_run_time.reduce((a, b) => a + b, 0) /
            tvShow.episode_run_time.length
        )
      : null

  return {
    externalId: String(tvShow.id),
    title: tvShow.name,
    originalTitle: tvShow.original_name,
    type: 'SERIES' as const,
    overview: tvShow.overview || null,
    tagline: tvShow.tagline || null,
    genres: tvShow.genres.map(g => g.name),
    originalLanguage: tvShow.original_language,
    releaseDate: tvShow.first_air_date,
    year: extractYear(tvShow.first_air_date),
    runtime: avgRuntime,
    posterPath: tvShow.poster_path,
    backdropPath: tvShow.backdrop_path,
    imdbId: null, // TMDB TV shows don't have IMDb IDs in the API
    seasonCount: tvShow.number_of_seasons,
    episodeCount: tvShow.number_of_episodes,
    seriesStatus: tvShow.status,
    lastAirDate: tvShow.last_air_date ? new Date(tvShow.last_air_date) : null,
  }
}

/**
 * Map TMDB search result to content data for database storage
 * Note: Requires genre lookup since search results only have genre_ids
 */
export async function mapSearchResultToContent(
  movie: TMDBMovie
): Promise<MappedContentData> {
  const genres = await mapGenreIds(movie.genre_ids)

  return {
    externalId: String(movie.id),
    title: movie.title,
    originalTitle: movie.original_title,
    type: 'MOVIE' as const,
    overview: movie.overview || null,
    tagline: null, // Not available in search results
    genres,
    originalLanguage: movie.original_language,
    releaseDate: movie.release_date,
    year: extractYear(movie.release_date),
    runtime: null, // Not available in search results
    posterPath: movie.poster_path,
    backdropPath: movie.backdrop_path,
    imdbId: null, // Not available in search results
  }
}

/**
 * Map TMDB TV show search result to content data
 */
export async function mapTVSearchResultToContent(
  tvShow: TMDBTVShow
): Promise<MappedContentData> {
  const genres = await mapGenreIds(tvShow.genre_ids)

  return {
    externalId: String(tvShow.id),
    title: tvShow.name,
    originalTitle: tvShow.original_name,
    type: 'SERIES' as const,
    overview: tvShow.overview || null,
    tagline: null,
    genres,
    originalLanguage: tvShow.original_language,
    releaseDate: tvShow.first_air_date,
    year: extractYear(tvShow.first_air_date),
    runtime: null,
    posterPath: tvShow.poster_path,
    backdropPath: tvShow.backdrop_path,
    imdbId: null,
  }
}
