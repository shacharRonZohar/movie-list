import { prisma } from '~/server/utils/prisma'

export default defineEventHandler(async event => {
  try {
    // Check database connection
    await prisma.$queryRaw`SELECT 1`

    return {
      status: 'ok',
      timestamp: new Date().toISOString(),
      database: 'connected',
    }
  } catch (error) {
    setResponseStatus(event, 503)
    return {
      status: 'error',
      timestamp: new Date().toISOString(),
      database: 'disconnected',
      error: error instanceof Error ? error.message : 'Unknown error',
    }
  }
})
