# API Endpoints Reference 🎬

This document describes all available API endpoints for the movie list application.

## Authentication

All endpoints require authentication unless otherwise specified. Authentication is handled via JWT tokens stored in HTTP-only cookies.

### Auth Endpoints

#### Login
```http
POST /api/auth/login
Content-Type: application/json

{
  "username": "string",
  "password": "string"
}
```

#### Logout
```http
POST /api/auth/logout
```

#### Get Current User
```http
GET /api/auth/me
```

---

## Content Search

### Search Content
Search for movies in the database first, then TMDB if no results found. Automatically caches TMDB results.

```http
GET /api/content/search?q=inception

Response: Content[]
```

**Query Parameters:**
- `q` (required): Search query (min 2 characters)

**Response:** Array of Content objects with full movie metadata

---

## List Management

Your personal movie list stored as ListItems linked to Content.

### Get List
Get all movies in your list.

```http
GET /api/list

Response: ListItem[]
```

**Response:** Array of ListItems with nested Content and User data
```json
[
  {
    "id": "uuid",
    "contentId": "uuid",
    "status": "WANT_TO_WATCH",
    "position": 1,
    "rating": 8.5,
    "addedAt": "2024-10-21T12:00:00Z",
    "content": {
      "id": "uuid",
      "title": "Inception",
      "originalTitle": "Inception",
      "type": "MOVIE",
      "overview": "A thief who steals...",
      "tagline": "Your mind is the scene of the crime",
      "genres": ["Action", "Science Fiction"],
      "year": 2010,
      "runtime": 148,
      "posterPath": "/path.jpg",
      "backdropPath": "/path.jpg",
      "imdbId": "tt1375666",
      "releaseDate": "2010-07-15",
      "originalLanguage": "en"
    },
    "addedBy": {
      "id": "uuid",
      "username": "user1",
      "displayName": "User One"
    },
    "requestedBy": {
      "id": "uuid",
      "username": "user2",
      "displayName": "User Two"
    }
  }
]
```

### Add to List
Add existing content to your list.

```http
POST /api/list
Content-Type: application/json

{
  "contentId": "uuid",
  "requestedById": "uuid",
  "status": "WANT_TO_WATCH",  // optional, default: WANT_TO_WATCH
  "position": 1,               // optional, default: end of list
  "rating": 8.5                // optional, 0-10
}
```

**Statuses:**
- `WANT_TO_WATCH` - Movies We'll Love
- `WATCHING` - Watching Together
- `WATCHED` - Our Favorites
- `ON_HOLD` - Taking a Break
- `DROPPED` - Not For Us

### Add from TMDB
Search TMDB, cache the content, and add to list in one request.

```http
POST /api/list/add-from-tmdb
Content-Type: application/json

{
  "tmdbId": 27205,
  "requestedById": "uuid",
  "status": "WANT_TO_WATCH",  // optional
  "position": 1,               // optional
  "rating": 8.5                // optional
}
```

**Benefits:**
- Fetches full movie details from TMDB
- Caches content in database
- Creates list item
- All in one atomic operation

### Update List Item
Update status, position, or rating.

```http
PATCH /api/list/:id
Content-Type: application/json

{
  "status": "WATCHED",     // optional
  "position": 5,           // optional - automatically reorders
  "rating": 9.0            // optional, null to remove
}
```

**Position Changes:**
- Automatically handles reordering
- Shifts other items as needed
- Validates position is in range

**Status Changes:**
- Automatically creates status history entry
- Tracks when status changed and from/to values

### Remove from List
Remove a movie from your list.

```http
DELETE /api/list/:id

Response: { "success": true }
```

**Behavior:**
- Deletes the list item
- Automatically reorders remaining items
- Cascades to delete status history

---

## Data Models

### Content
Movie/series metadata from TMDB.

```typescript
{
  id: string
  externalId: string        // TMDB ID
  externalSource: 'TMDB'
  title: string
  originalTitle: string | null
  type: 'MOVIE' | 'SERIES'
  overview: string | null
  tagline: string | null
  genres: string[]
  originalLanguage: string | null
  releaseDate: string | null  // YYYY-MM-DD
  year: number
  runtime: number | null
  posterPath: string | null
  backdropPath: string | null
  imdbId: string | null
  createdAt: Date
  updatedAt: Date
}
```

### ListItem
Your personal list entry.

```typescript
{
  id: string
  contentId: string
  addedById: string
  requestedById: string
  status: 'WANT_TO_WATCH' | 'WATCHING' | 'WATCHED' | 'ON_HOLD' | 'DROPPED'
  position: number          // Unique, for ordering
  rating: number | null     // 0-10
  addedAt: Date
  
  // Relations
  content: Content
  addedBy: User
  requestedBy: User
  statusHistory: StatusHistory[]
}
```

### StatusHistory
Tracks when list items change status.

```typescript
{
  id: string
  listItemId: string
  fromStatus: Status | null  // null for initial creation
  toStatus: Status
  changedAt: Date
}
```

---

## Common Patterns

### Adding a Movie Flow
1. **Search for movie:**
   ```
   GET /api/content/search?q=inception
   ```
   
2. **Add to list (Option A - if content exists):**
   ```
   POST /api/list
   { contentId: "...", requestedById: "..." }
   ```
   
3. **Add to list (Option B - from TMDB):**
   ```
   POST /api/list/add-from-tmdb
   { tmdbId: 27205, requestedById: "..." }
   ```

### Updating Movie Status
```
PATCH /api/list/:id
{ status: "WATCHED", rating: 9.5 }
```

### Reordering
```
PATCH /api/list/:id
{ position: 3 }
```

---

## Error Responses

All endpoints return consistent error responses:

```json
{
  "statusCode": 400,
  "message": "Error description"
}
```

**Common Status Codes:**
- `400` - Bad Request (validation errors)
- `401` - Unauthorized (not logged in)
- `404` - Not Found
- `500` - Internal Server Error

---

## Rate Limiting

TMDB API has rate limits:
- 40 requests per 10 seconds
- The search endpoint caches results to minimize API calls

---

## Notes

- All list operations maintain proper position ordering
- Status changes are tracked in history
- Content is cached from TMDB for performance
- One content can only have one list item (1:1 relationship)

