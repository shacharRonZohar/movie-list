import type { Status } from '@prisma/client'
import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'
import {
  getMovieDetails,
  getTVShowDetails,
  mapMovieToContent,
  mapTVShowToContent,
} from '../src/server/utils/tmdb'

const prisma = new PrismaClient()

async function main() {
  console.log('Starting database seed...')

  // Create sample users
  const password = await bcrypt.hash('password123', 10)

  const user1 = await prisma.user.upsert({
    where: { username: 'alice' },
    update: {},
    create: {
      username: 'alice',
      passwordHash: password,
      displayName: 'Alice',
    },
  })

  const user2 = await prisma.user.upsert({
    where: { username: 'bob' },
    update: {},
    create: {
      username: 'bob',
      passwordHash: password,
      displayName: 'Bob',
    },
  })

  console.log(`Created users: ${user1.username}, ${user2.username}`)

  // Define sample movies/series with metadata
  const contentData = [
    {
      externalId: '11036',
      title: 'The Notebook',
      type: 'MOVIE' as const,
      genres: ['Romance', 'Drama'],
      year: 2004,
      runtime: 123,
      status: 'WATCHED' as Status,
      addedBy: user1.id,
      requestedBy: user2.id,
      position: 1,
      rating: 4.8,
    },
    {
      externalId: '313369',
      title: 'La La Land',
      type: 'MOVIE' as const,
      genres: ['Comedy', 'Drama', 'Music', 'Romance'],
      year: 2016,
      runtime: 128,
      status: 'WATCHING' as Status,
      addedBy: user1.id,
      requestedBy: user1.id,
      position: 2,
    },
    {
      externalId: '372058',
      title: 'Your Name',
      type: 'MOVIE' as const,
      genres: ['Romance', 'Animation', 'Drama'],
      year: 2016,
      runtime: 106,
      status: 'WANT_TO_WATCH' as Status,
      addedBy: user2.id,
      requestedBy: user2.id,
      position: 3,
    },
    {
      externalId: '4348',
      title: 'Pride & Prejudice',
      type: 'MOVIE' as const,
      genres: ['Drama', 'Romance'],
      year: 2005,
      runtime: 127,
      status: 'WATCHED' as Status,
      addedBy: user1.id,
      requestedBy: user1.id,
      position: 4,
      rating: 4.5,
    },
    {
      externalId: '38',
      title: 'Eternal Sunshine of the Spotless Mind',
      type: 'MOVIE' as const,
      genres: ['Science Fiction', 'Drama', 'Romance'],
      year: 2004,
      runtime: 108,
      status: 'WANT_TO_WATCH' as Status,
      addedBy: user2.id,
      requestedBy: user1.id,
      position: 5,
    },
    {
      externalId: '127380',
      title: 'About Time',
      type: 'MOVIE' as const,
      genres: ['Drama', 'Romance', 'Fantasy'],
      year: 2013,
      runtime: 123,
      status: 'WANT_TO_WATCH' as Status,
      addedBy: user1.id,
      requestedBy: user2.id,
      position: 6,
    },
    {
      externalId: '2132',
      title: 'Before Sunrise',
      type: 'MOVIE' as const,
      genres: ['Drama', 'Romance'],
      year: 1995,
      runtime: 101,
      status: 'WATCHED' as Status,
      addedBy: user2.id,
      requestedBy: user2.id,
      position: 7,
      rating: 4.9,
    },
    {
      externalId: '129',
      title: 'Spirited Away',
      type: 'MOVIE' as const,
      genres: ['Animation', 'Family', 'Fantasy'],
      year: 2001,
      runtime: 125,
      status: 'WATCHING' as Status,
      addedBy: user1.id,
      requestedBy: user1.id,
      position: 8,
    },
    {
      externalId: '120467',
      title: 'The Grand Budapest Hotel',
      type: 'MOVIE' as const,
      genres: ['Comedy', 'Drama'],
      year: 2014,
      runtime: 99,
      status: 'ON_HOLD' as Status,
      addedBy: user2.id,
      requestedBy: user1.id,
      position: 9,
    },
    {
      externalId: '194',
      title: 'Amélie',
      type: 'MOVIE' as const,
      genres: ['Comedy', 'Romance'],
      year: 2001,
      runtime: 122,
      status: 'WANT_TO_WATCH' as Status,
      addedBy: user1.id,
      requestedBy: user2.id,
      position: 10,
    },
    {
      externalId: '1396',
      title: 'Breaking Bad',
      type: 'SERIES' as const,
      genres: ['Drama', 'Crime'],
      year: 2008,
      runtime: null,
      status: 'WATCHED' as Status,
      addedBy: user1.id,
      requestedBy: user2.id,
      position: 11,
      rating: 5.0,
      seriesDetails: {
        seasonCount: 5,
        episodeCount: 62,
        status: 'Ended',
      },
    },
    {
      externalId: '60625',
      title: 'Rick and Morty',
      type: 'SERIES' as const,
      genres: ['Animation', 'Comedy', 'Sci-Fi & Fantasy'],
      year: 2013,
      runtime: null,
      status: 'WATCHING' as Status,
      addedBy: user2.id,
      requestedBy: user1.id,
      position: 12,
      seriesDetails: {
        seasonCount: 7,
        episodeCount: 71,
        status: 'Returning Series',
      },
    },
  ]

  let createdCount = 0

  // Create each content item and list item
  for (const item of contentData) {
    console.log(`Fetching TMDB metadata for: ${item.title}`)

    // Fetch full metadata from TMDB
    let mappedData
    try {
      if (item.type === 'MOVIE') {
        const movieDetails = await getMovieDetails(parseInt(item.externalId))
        mappedData = await mapMovieToContent(movieDetails)
      } else {
        const tvDetails = await getTVShowDetails(parseInt(item.externalId))
        mappedData = await mapTVShowToContent(tvDetails)
      }
    } catch (error) {
      console.error(`Failed to fetch TMDB data for ${item.title}:`, error)
      continue
    }

    // Create or get the content with full metadata including posters
    const content = await prisma.content.upsert({
      where: {
        externalSource_externalId: {
          externalSource: 'TMDB',
          externalId: item.externalId,
        },
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
    })

    // Create series details if applicable (use TMDB data)
    if (item.type === 'SERIES' && mappedData.seasonCount) {
      await prisma.seriesDetails.upsert({
        where: { contentId: content.id },
        create: {
          contentId: content.id,
          seasonCount: mappedData.seasonCount,
          episodeCount: mappedData.episodeCount || null,
          status: mappedData.seriesStatus || null,
          lastAirDate: mappedData.lastAirDate || null,
        },
        update: {
          seasonCount: mappedData.seasonCount,
          episodeCount: mappedData.episodeCount || null,
          status: mappedData.seriesStatus || null,
          lastAirDate: mappedData.lastAirDate || null,
        },
      })
    }

    // Create list item (add to shared list)
    const listItem = await prisma.listItem.upsert({
      where: { contentId: content.id },
      create: {
        contentId: content.id,
        addedById: item.addedBy,
        requestedById: item.requestedBy,
        status: item.status,
        position: item.position,
        rating: item.rating,
      },
      update: {},
    })

    // Create initial status history (only if doesn't exist)
    const existingHistory = await prisma.statusHistory.findFirst({
      where: {
        listItemId: listItem.id,
        toStatus: item.status,
        fromStatus: null,
      },
    })

    if (!existingHistory) {
      await prisma.statusHistory.create({
        data: {
          listItemId: listItem.id,
          fromStatus: null,
          toStatus: item.status,
        },
      })
    }

    createdCount++
  }

  console.log(`Created ${createdCount} list items with content`)

  console.log('Database seed completed successfully! ✨')
  console.log('\nTest credentials:')
  console.log('Username: alice or bob')
  console.log('Password: password123')
}

main()
  .catch(e => {
    console.error('Error seeding database:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
