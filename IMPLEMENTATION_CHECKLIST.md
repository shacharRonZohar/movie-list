# Implementation Checklist - Collaborative Movie & Series Watch List

## Phase 1: Foundation & Backend Setup

### 1.1 Database & ORM Setup

- [ ] Install Prisma and related dependencies
  - `prisma`, `@prisma/client`, `bcryptjs`, `jsonwebtoken`
  - Dev dependencies: `@types/bcryptjs`, `@types/jsonwebtoken`
- [ ] Initialize Prisma
  - Run `npx prisma init`
- [ ] Create Prisma schema (`prisma/schema.prisma`)
  - User model (id, username, passwordHash, displayName, createdAt)
  - Content model (id, title, type, genres, year, description, posterUrl, rating, runtime, episodeCount, addedById, createdAt, updatedAt)
  - WatchStatus model (id, contentId, status, priority, lastUpdatedById, updatedAt)
  - Comment model (id, contentId, userId, text, createdAt)
  - QueueItem model (id, contentId, position, addedById, createdAt)
- [ ] Configure PostgreSQL in docker-compose.yml
  - Add PostgreSQL service
  - Set up proper networking
  - Configure volumes for data persistence
- [ ] Create `.env` file with DATABASE_URL and JWT_SECRET
- [ ] Run initial migration: `npx prisma migrate dev --name init`
- [ ] Generate Prisma Client: `npx prisma generate`

### 1.2 Utility Functions & Helpers

- [ ] Create `server/utils/auth.ts`
  - Password hashing with bcryptjs (hashPassword, verifyPassword)
  - JWT token generation and verification (generateToken, verifyToken)
  - Get user from token helper
- [ ] Create `server/utils/validation.ts`
  - Input validation helpers
  - Sanitization functions
- [ ] Create `server/utils/errors.ts`
  - Custom error classes
  - Error response formatting

### 1.3 Authentication API

- [ ] Create `server/api/auth/login.post.ts`
  - Validate username/password
  - Verify password with bcrypt
  - Generate JWT token
  - Set HTTP-only cookie
  - Return user data (without password)
- [ ] Create `server/api/auth/logout.post.ts`
  - Clear authentication cookie
  - Return success response
- [ ] Create `server/api/auth/me.get.ts`
  - Extract token from cookie
  - Verify token
  - Return current user data

### 1.4 User Management API

- [ ] Create `server/api/users/index.post.ts`
  - Create new user (admin only - for now just implement)
  - Hash password before saving
  - Validate unique username
  - Return created user (without password)
- [ ] Create `server/api/users/index.get.ts`
  - List all users (for partner selection)
  - Return users without passwords

## Phase 2: Content Management Backend

### 2.1 Content CRUD API

- [ ] Create `server/api/content/index.get.ts`
  - List all content with relations (addedBy, watchStatus)
  - Support query params for filtering:
    - type (MOVIE/SERIES)
    - status (WANT_TO_WATCH, WATCHING, etc.)
    - genre
    - priority
    - addedById
    - search (title)
  - Support sorting by date, title, rating
  - Include watchStatus and comments count
- [ ] Create `server/api/content/index.post.ts`
  - Create new content item
  - Validate required fields
  - Set addedById from authenticated user
  - Create initial WatchStatus (WANT_TO_WATCH, MEDIUM priority)
  - Return created content with relations
- [ ] Create `server/api/content/[id].get.ts`
  - Get single content item by ID
  - Include all relations (addedBy, watchStatus, comments)
  - Return 404 if not found
- [ ] Create `server/api/content/[id].put.ts`
  - Update content item
  - Validate ownership or allow both partners to edit
  - Update updatedAt timestamp
  - Return updated content
- [ ] Create `server/api/content/[id].delete.ts`
  - Delete content item
  - Cascade delete watchStatus, comments, queueItems
  - Return success response

### 2.2 Watch Status & Priority API

- [ ] Create `server/api/content/[id]/status.put.ts`
  - Update watch status
  - Valid statuses: WANT_TO_WATCH, WATCHING, WATCHED, ON_HOLD, DROPPED
  - Update lastUpdatedById
  - Update updatedAt timestamp
  - Return updated watchStatus
- [ ] Create `server/api/content/[id]/priority.put.ts`
  - Update priority level
  - Valid priorities: LOW, MEDIUM, HIGH
  - Update lastUpdatedById
  - Return updated watchStatus

### 2.3 Comments API

- [ ] Create `server/api/content/[id]/comments.get.ts`
  - Get all comments for a content item
  - Include user relation for each comment
  - Order by createdAt (oldest first)
- [ ] Create `server/api/content/[id]/comments.post.ts`
  - Create new comment
  - Validate text is not empty
  - Set userId from authenticated user
  - Return created comment with user relation
- [ ] Create `server/api/comments/[id].delete.ts`
  - Delete comment by ID
  - Validate user owns the comment
  - Return success response

## Phase 3: Watch Next Queue Backend

### 3.1 Queue Management API

- [ ] Create `server/api/queue/index.get.ts`
  - Get all queue items ordered by position
  - Include content and addedBy relations
  - Return ordered array
- [ ] Create `server/api/queue/index.post.ts`
  - Add content to queue
  - Calculate next position (max + 1)
  - Set addedById from authenticated user
  - Prevent duplicates in queue
  - Return created queue item
- [ ] Create `server/api/queue/[id].delete.ts`
  - Remove item from queue
  - Reorder remaining items to fill gap
  - Return success response
- [ ] Create `server/api/queue/reorder.put.ts`
  - Bulk update queue positions
  - Accept array of {id, position}
  - Update all positions in transaction
  - Return updated queue

### 3.2 Queue Weave Functionality

- [ ] Create `server/api/queue/weave.post.ts`
  - Accept pattern: 'alternate' | 'custom'
  - Accept optional ratio: {user1: number, user2: number}
  - Get high-priority items for each user
  - Generate weaved queue based on pattern
  - Clear current queue and create new one
  - Return new queue order

### 3.3 Activity Feed API

- [ ] Create `server/api/activity.get.ts`
  - Aggregate recent activities:
    - New content added
    - Status changes
    - Comments added
    - Queue items added
  - Order by date (most recent first)
  - Limit to last 50 activities
  - Include all relevant relations (user, content)

## Phase 4: Frontend - Authentication & Layout

### 4.1 Authentication Composables

- [ ] Create `src/composables/useAuth.ts`
  - useAuth composable with login, logout, getCurrentUser
  - Use @tanstack/vue-query for state management
  - Handle authentication state reactively
  - Provide user data across app

### 4.2 Middleware

- [ ] Create `src/middleware/auth.ts`
  - Check if user is authenticated
  - Redirect to /login if not authenticated
  - Allow public access to login page

### 4.3 Layouts

- [ ] Create `src/layouts/default.vue`
  - Navigation header with app name
  - User display (logged in as...)
  - Main navigation links (Watch List, Queue, Activity)
  - Logout button
  - Responsive mobile menu
- [ ] Create `src/layouts/auth.vue`
  - Simple layout for login page
  - Centered form design

### 4.4 Login Page

- [ ] Create `src/pages/login.vue`
  - Login form (username, password)
  - Form validation
  - Submit handler with error display
  - Redirect to watch list on success
  - Use auth layout

## Phase 5: Frontend - Main Features

### 5.1 Reusable Components

- [ ] Create `src/components/ContentCard.vue`
  - Display content poster, title, type, genres
  - Show status badge and priority indicator
  - Show who added it and when
  - Quick actions (edit status, priority, add to queue)
  - Click to view details
  - Support grid and list view modes
- [ ] Create `src/components/FilterBar.vue`
  - Filter by status dropdown
  - Filter by type (Movie/Series)
  - Filter by genre
  - Filter by priority
  - Filter by who added
  - Search input
  - Clear filters button
- [ ] Create `src/components/StatusBadge.vue`
  - Display status with appropriate color
  - Different styles for each status type
- [ ] Create `src/components/PriorityIndicator.vue`
  - Visual priority indicator (high/medium/low)
  - Color-coded display
- [ ] Create `src/components/CommentList.vue`
  - Display list of comments
  - Show user, timestamp, text
  - Delete button for own comments
  - Add new comment form
- [ ] Create `src/components/AddContentModal.vue`
  - Modal form to add new content
  - All required fields
  - Type selector (Movie/Series)
  - Genre multi-select
  - Form validation
  - Submit handler

### 5.2 Watch List Page (Main Page)

- [ ] Create `src/pages/index.vue`
  - Use default layout
  - Implement FilterBar component
  - Display grid/list of ContentCard components
  - View toggle (grid/list)
  - Add content button (opens modal)
  - Implement filters with query params
  - Use @tanstack/vue-query for data fetching
  - Loading and error states
  - Empty state when no content

### 5.3 Content Detail Page

- [ ] Create `src/pages/content/[id].vue`
  - Display full content details
  - Large poster image
  - All metadata (genres, year, rating, runtime, etc.)
  - Status and priority controls with dropdowns
  - Update handlers for status/priority
  - CommentList component
  - Edit/Delete buttons
  - "Add to Queue" button
  - "Watch This Next" button (add to top of queue)
  - Back to list navigation

### 5.4 Add/Edit Content Page

- [ ] Create `src/pages/content/new.vue`
  - Full form to add new content
  - All fields with validation
  - Genre multi-select
  - Type selector
  - Optional fields clearly marked
  - Submit handler
  - Redirect to content detail on success
- [ ] Create `src/pages/content/[id]/edit.vue`
  - Similar to new but pre-filled with existing data
  - Update handler
  - Cancel button
  - Redirect to content detail on success

### 5.5 Watch Next Queue Page

- [ ] Create `src/pages/queue.vue`
  - Display ordered list of queue items
  - Drag-and-drop functionality (use a library like vuedraggable or dnd-kit)
  - Position indicators
  - Content cards in queue
  - Remove from queue button
  - "Start Watching" button (updates status to WATCHING)
  - "Weave Lists" button with modal
  - Pattern selection (Alternate, Custom Ratio)
  - Visual indicators of who added each item
  - Empty state with "Add items from watch list"

### 5.6 Queue Weave Modal

- [ ] Create `src/components/WeaveQueueModal.vue`
  - Pattern selection (Alternate, Custom)
  - Custom ratio inputs if custom selected
  - Preview of weave result
  - Confirm button
  - Cancel button
  - Execute weave API call

### 5.7 Activity Feed Page

- [ ] Create `src/pages/activity.vue`
  - Timeline view of recent activities
  - Display activity type with icon
  - Show user who performed action
  - Show content affected
  - Show timestamp (relative: "2 hours ago")
  - Group by date
  - Load more / pagination

## Phase 6: Polish & Optimization

### 6.1 Styling & Responsiveness

- [ ] Ensure all pages are fully responsive
  - Mobile-first approach
  - Test on various screen sizes
  - Optimize touch interactions for mobile
- [ ] Implement consistent color scheme
  - Define Tailwind color palette
  - Status colors (green for watched, yellow for watching, etc.)
  - Priority colors
- [ ] Add loading states and skeletons
  - Content loading skeleton
  - Form submission loading states
  - Optimistic updates where appropriate
- [ ] Add smooth transitions and animations
  - Page transitions
  - Modal animations
  - Drag-and-drop visual feedback

### 6.2 Error Handling & Validation

- [ ] Implement global error handling
  - API error interceptor
  - User-friendly error messages
  - Toast notifications for errors
- [ ] Add form validation throughout
  - Client-side validation
  - Server-side validation
  - Clear error messages

### 6.3 Performance Optimization

- [ ] Optimize images
  - Use appropriate formats
  - Lazy loading for posters
  - Responsive images
- [ ] Implement pagination or virtual scrolling for large lists
- [ ] Add proper caching strategies with Vue Query
- [ ] Code splitting and lazy loading routes

### 6.4 User Experience Enhancements

- [ ] Add confirmation dialogs for destructive actions
  - Delete content
  - Clear queue
  - Weave queue (replaces existing)
- [ ] Implement keyboard shortcuts
  - Quick search (/)
  - Navigate between pages
- [ ] Add tooltips for buttons and actions
- [ ] Implement "suggested for tonight" quick filter

## Phase 7: Docker & Deployment

### 7.1 Docker Configuration

- [ ] Update `Dockerfile`
  - Multi-stage build
  - Install dependencies
  - Build Nuxt app
  - Run Prisma migrations
  - Start production server
- [ ] Update `docker-compose.yml`
  - Web service (Nuxt app)
  - Database service (PostgreSQL)
  - Proper networking
  - Volume configuration
  - Environment variables
  - Health checks
- [ ] Create `.dockerignore`
  - node_modules
  - .nuxt
  - .git
  - Other unnecessary files

### 7.2 Environment Configuration

- [ ] Create `.env.example` file
  - Document all required environment variables
  - Provide example values
- [ ] Add environment variable validation
  - Check required vars on startup
  - Fail gracefully with clear error messages

### 7.3 Database Seeding

- [ ] Create seed script (`prisma/seed.ts`)
  - Create two initial users
  - Add sample content for testing
  - Run with `npx prisma db seed`

### 7.4 Documentation

- [ ] Update `README.md`
  - Project overview
  - Setup instructions
  - Docker commands
  - Environment variables
  - Development workflow
  - API documentation reference
- [ ] Add API documentation
  - Endpoint descriptions
  - Request/response examples
  - Authentication requirements

## Phase 8: Testing & Quality Assurance

### 8.1 Manual Testing Checklist

- [ ] Test authentication flow
  - Login with valid credentials
  - Login with invalid credentials
  - Logout
  - Protected route access
- [ ] Test content management
  - Add new content (movie and series)
  - Edit content
  - Delete content
  - View content details
- [ ] Test filtering and sorting
  - Each filter option
  - Search functionality
  - Sort options
  - Combined filters
- [ ] Test watch status and priority
  - Update status
  - Update priority
  - View filtered by status/priority
- [ ] Test comments
  - Add comment
  - Delete own comment
  - View comments list
- [ ] Test queue functionality
  - Add to queue
  - Remove from queue
  - Reorder queue (drag and drop)
  - Weave queue (alternate pattern)
  - Weave queue (custom ratio)
  - Start watching from queue
- [ ] Test activity feed
  - View recent activities
  - Verify all activity types appear
- [ ] Test responsive design
  - Mobile view
  - Tablet view
  - Desktop view
  - Navigation on mobile

### 8.2 Browser Compatibility

- [ ] Test in Chrome
- [ ] Test in Firefox
- [ ] Test in Safari
- [ ] Test in Edge

### 8.3 Bug Fixes

- [ ] Document and fix any bugs found during testing
- [ ] Verify fixes don't introduce new issues

## Progress Tracking

**Current Phase:** Phase 1 - Foundation & Backend Setup  
**Overall Completion:** 0%

### Phase Completion Status

- Phase 1: ⬜ 0%
- Phase 2: ⬜ 0%
- Phase 3: ⬜ 0%
- Phase 4: ⬜ 0%
- Phase 5: ⬜ 0%
- Phase 6: ⬜ 0%
- Phase 7: ⬜ 0%
- Phase 8: ⬜ 0%

---

## Notes & Decisions

### Technology Stack Confirmed

- Framework: Nuxt 3
- Database: PostgreSQL
- ORM: Prisma
- State Management: @tanstack/vue-query
- Styling: Tailwind CSS
- Authentication: JWT with HTTP-only cookies
- Password Hashing: bcryptjs

### Key Implementation Details

1. Using Nuxt 3's server routes for API endpoints
2. All API routes require authentication except login
3. JWT tokens stored in HTTP-only cookies for security
4. Prisma for type-safe database access
5. Vue Query for efficient client-side data fetching and caching

### Design Decisions

1. Grid view as default for watch list
2. Drag-and-drop for queue reordering
3. Weave queue replaces existing queue (with confirmation)
4. Activity feed limited to 50 most recent items
5. Both users can edit any content (collaborative approach)

---

Last Updated: [Date will be updated as progress is made]
