/**
 * Debug endpoint to check environment variables
 * Should be removed in production or protected
 */
export default defineEventHandler(() => {
  const config = useRuntimeConfig()
  
  return {
    hasJwtSecret: !!config.jwtSecret,
    hasDatabaseUrl: !!config.databaseUrl,
    hasTmdbApiKey: !!config.tmdbApiKey,
    tmdbApiKeyLength: config.tmdbApiKey?.length || 0,
    tmdbApiKeyPreview: config.tmdbApiKey ? `${config.tmdbApiKey.substring(0, 10)}...` : 'NOT SET',
    nodeEnv: process.env.NODE_ENV,
    // Raw env check
    rawTmdbFromProcess: !!process.env.TMDB_API_KEY,
    rawTmdbLength: process.env.TMDB_API_KEY?.length || 0,
  }
})

