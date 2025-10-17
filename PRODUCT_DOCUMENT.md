# Product Document: Collaborative Movie & Series Watch List

## Overview

A collaborative web application for couples to manage a shared watch list of movies and TV series. The application enables both partners to add, track, and manage content they want to watch together.

## Core Features

### 1. User Management

- **No Public Sign-up**: Users are created manually by administrators
- **Authentication**: Simple login system with username/password
- **User Profiles**: Basic profile information for each user
- **Two-User System**: Optimized for couples/partners

### 2. Watch List Management

- **Add Content**: Both users can add movies and TV series
- **Content Details**:
  - Title
  - Type (Movie/Series)
  - Genre(s)
  - Release year
  - Description/Synopsis
  - Poster image URL
  - IMDb/TMDB rating (optional)
  - Runtime/Episode count
  - Added by (which user)
  - Date added

### 3. Status Tracking

- **Watch Status**:
  - Want to Watch (default)
  - Watching
  - Watched
  - On Hold
  - Dropped

### 4. Interactive Features

- **Comments/Notes**: Add notes about specific content
- **Priority Levels**: Mark items as high/medium/low priority
- **Filtering & Sorting**:
  - By status
  - By type (movie vs series)
  - By genre
  - By priority
  - By who added it
  - By date added
- **Search**: Quick search functionality

### 5. Collaborative Elements

- **Activity Feed**: See what your partner has added recently
- **Joint Decision Making**: Both users can update status
- **Suggestions**: Flag items as "suggested for tonight"

### 6. Watch Next Queue

- **Sortable Queue**: Manually drag-and-drop to reorder what to watch next
- **Weaved Lists**: Automatically create a fair queue alternating between each user's picks
  - Pattern options: "One of mine, one of hers" (alternating)
  - "Two of mine, one of hers" (custom ratios)
  - Auto-populate from each user's high-priority items
- **Manual Override**: Always able to manually reorder the queue
- **Queue Management**:
  - Add items from watch list to queue
  - Remove items from queue
  - Reorder at any time
  - Queue position indicator
- **Quick Actions**: "Watch This Next" button to add to top of queue

## Technical Architecture

### Frontend

- **Framework**: Nuxt 3 (Vue.js)
- **Styling**: Tailwind CSS
- **State Management**: Vue Query (@tanstack/vue-query) for server state
- **UI Components**: Modern, responsive design optimized for desktop and mobile

### Backend

- **Runtime**: Node.js with Nuxt 3 server routes
- **API**: RESTful API endpoints
- **Authentication**: JWT-based authentication
- **Session Management**: HTTP-only cookies

### Database

- **Database**: PostgreSQL
- **ORM**: Prisma
- **Schema**:
  ```prisma
  - User (id, username, password_hash, name, created_at)
  - Content (id, title, type, genre, year, description, poster_url, rating, runtime, added_by_id, created_at, updated_at)
  - WatchStatus (id, content_id, status, priority, last_updated_by_id, updated_at)
  - Comment (id, content_id, user_id, text, created_at)
  - QueueItem (id, content_id, position, added_by_id, created_at)
  ```

### Infrastructure

- **Containerization**: Docker & Docker Compose
- **Services**:
  - Web Application (Nuxt app)
  - PostgreSQL Database
  - (Optional) Nginx reverse proxy

## Data Models

### User

```typescript
{
  id: string(UUID);
  username: string(unique);
  passwordHash: string;
  displayName: string;
  createdAt: DateTime;
}
```

### Content

```typescript
{
  id: string (UUID)
  title: string
  type: 'MOVIE' | 'SERIES'
  genres: string[]
  year: number
  description: string
  posterUrl: string (optional)
  rating: number (optional)
  runtime: number (optional, in minutes)
  episodeCount: number (optional, for series)
  addedBy: User
  addedById: string
  createdAt: DateTime
  updatedAt: DateTime
}
```

### WatchStatus

```typescript
{
  id: string(UUID);
  contentId: string;
  status: "WANT_TO_WATCH" | "WATCHING" | "WATCHED" | "ON_HOLD" | "DROPPED";
  priority: "LOW" | "MEDIUM" | "HIGH";
  lastUpdatedBy: User;
  lastUpdatedById: string;
  updatedAt: DateTime;
}
```

### Comment

```typescript
{
  id: string(UUID);
  contentId: string;
  userId: string;
  user: User;
  text: string;
  createdAt: DateTime;
}
```

### QueueItem

```typescript
{
  id: string(UUID);
  contentId: string;
  content: Content;
  position: number; // Order in queue (0-based)
  addedBy: User;
  addedById: string;
  createdAt: DateTime;
}
```

## API Endpoints

### Authentication

- `POST /api/auth/login` - Login
- `POST /api/auth/logout` - Logout
- `GET /api/auth/me` - Get current user

### Users

- `POST /api/users` - Create user (admin only)
- `GET /api/users` - List all users

### Content

- `GET /api/content` - List all content (with filters)
- `GET /api/content/:id` - Get single content item
- `POST /api/content` - Add new content
- `PUT /api/content/:id` - Update content
- `DELETE /api/content/:id` - Delete content

### Status

- `PUT /api/content/:id/status` - Update watch status
- `PUT /api/content/:id/priority` - Update priority

### Comments

- `GET /api/content/:id/comments` - Get comments for content
- `POST /api/content/:id/comments` - Add comment
- `DELETE /api/comments/:id` - Delete comment

### Activity

- `GET /api/activity` - Get recent activity feed

### Watch Next Queue

- `GET /api/queue` - Get the current watch queue (ordered)
- `POST /api/queue` - Add item to queue
- `DELETE /api/queue/:id` - Remove item from queue
- `PUT /api/queue/reorder` - Reorder queue items (bulk update positions)
- `POST /api/queue/weave` - Generate weaved queue from user preferences
  - Body: `{ pattern: 'alternate' | 'custom', ratio?: { user1: number, user2: number } }`

## User Interface

### Pages

1. **Login Page** (`/login`)
   - Simple login form
   - No sign-up link

2. **Watch List Page** (`/` or `/watch-list`)
   - Main view with all content
   - Filter and sort controls
   - Add new content button
   - Grid/List view toggle

3. **Content Detail Page** (`/content/:id`)
   - Full details
   - Status and priority controls
   - Comments section
   - Edit/Delete options

4. **Add Content Page** (`/content/new`)
   - Form to add new movie/series
   - Optional: Integration with TMDB API for auto-fill

5. **Activity Feed** (`/activity`)
   - Recent additions and updates
   - Timeline view

6. **Watch Next Queue** (`/queue`)
   - Drag-and-drop sortable list
   - "Weave Lists" button with pattern options
   - Visual indicators showing who added each item
   - Quick add from main watch list
   - Position numbers
   - "Start Watching" action button

## Security Considerations

- Password hashing with bcrypt
- JWT tokens with expiration
- HTTP-only cookies to prevent XSS
- CSRF protection
- Input validation and sanitization
- SQL injection prevention (via Prisma)

## Future Enhancements (v2+)

- Integration with TMDB API for automatic content information
- Streaming service availability tracking (Netflix, Disney+, etc.)
- Calendar view for planned watch dates
- Rating system (personal ratings after watching)
- Watch history with dates
- Statistics and insights (movies watched per month, favorite genres, etc.)
- Mobile app (React Native or PWA)
- Notifications/reminders
- Export watch list to CSV
- Shared notes on content
- Queue history (what was in the queue when)
- "Random pick" from queue or filtered list
- Voting system for tie-breaking
- Estimated watch time for queue (total runtime)

## Development Phases

### Phase 1: Foundation

- Set up Docker environment
- Configure PostgreSQL with Prisma
- Implement user authentication
- Basic CRUD for content
- Simple list view

### Phase 2: Core Features

- Status tracking
- Priority system
- Comments
- Filtering and sorting
- Search functionality
- Watch Next Queue with manual sorting
- Weave lists functionality

### Phase 3: Polish

- Activity feed
- Responsive design refinement
- Performance optimization
- Testing
- Documentation

### Phase 4: Deployment

- Production Docker setup
- Environment configuration
- Backup strategy
- Deployment to hosting service

## Success Metrics

- Both users actively adding content (at least weekly)
- Content is regularly marked as "watched"
- Users engage with comments and notes
- Application is used for decision-making about what to watch

## Technical Requirements

- Node.js 18+
- PostgreSQL 14+
- Docker & Docker Compose
- Modern web browser (Chrome, Firefox, Safari, Edge)

## Environment Variables

```env
DATABASE_URL=postgresql://user:password@db:5432/movielist
JWT_SECRET=<random-secret>
NODE_ENV=production|development
```
