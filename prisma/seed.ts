import type { Status } from '@prisma/client'
import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

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
    // Create or get the content (cached metadata)
    const content = await prisma.content.upsert({
      where: {
        externalSource_externalId: {
          externalSource: 'TMDB',
          externalId: item.externalId,
        },
      },
      create: {
        externalId: item.externalId,
        externalSource: 'TMDB',
        title: item.title,
        type: item.type,
        genres: item.genres,
        year: item.year,
        runtime: item.runtime,
      },
      update: {},
    })

    // Create series details if applicable
    if (item.type === 'SERIES' && item.seriesDetails) {
      await prisma.seriesDetails.upsert({
        where: { contentId: content.id },
        create: {
          contentId: content.id,
          seasonCount: item.seriesDetails.seasonCount,
          episodeCount: item.seriesDetails.episodeCount,
          status: item.seriesDetails.status,
        },
        update: {},
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
