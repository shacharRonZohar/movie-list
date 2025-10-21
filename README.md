# 💕 Our Movie Collection

A romantic movie list app built with love, designed as a special gift to share and cherish movie moments together.

## 🎯 Features

- **Authentication System** - Complete JWT-based auth with secure HTTP-only cookies
- **Database Integration** - Prisma ORM with PostgreSQL
- **TypeScript** - Full type safety with strict mode
- **TanStack Query** - Efficient data fetching and caching
- **Tailwind CSS** - Utility-first CSS with custom design system
- **Docker Ready** - Development and production Docker configurations
- **Reusable Components** - Pre-built UI components (Toast, Loading, Tooltips, etc.)
- **Composables** - Utility composables for auth, keyboard shortcuts, toasts, and confirmations
- **Server Utilities** - Auth helpers, validation, and database client

## 🛠️ Tech Stack

### Frontend

- **Nuxt 3** - The Intuitive Vue Framework
- **Vue 3** - Progressive JavaScript Framework with Composition API
- **TypeScript** - Type safety with strict mode
- **TanStack Query (Vue Query)** - Efficient data fetching and caching
- **Tailwind CSS** - Utility-first CSS framework with custom design system

### Backend

- **Nuxt Server Routes** - API endpoints built with Nitro
- **Prisma** - Type-safe database ORM
- **PostgreSQL** - Reliable relational database
- **JWT** - Secure authentication with HTTP-only cookies
- **bcryptjs** - Password hashing

### DevOps

- **Docker** - Containerization for consistent environments
- **Docker Compose** - Multi-container orchestration
- **Multi-stage builds** - Optimized production images
- **Health checks** - Automatic service monitoring

## 🚀 Getting Started

### Prerequisites

**Option 1: Using Docker (Recommended)**

- Docker Desktop (includes Docker and Docker Compose)
- Git

**Option 2: Local Development**

- Node.js v18 or higher
- pnpm v9 or higher
- PostgreSQL 14 or higher

### Quick Start with Docker

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd movie-list
   ```

2. **Copy environment file**

   ```bash
   cp .env.example .env
   ```

3. **Update environment variables** (Edit `.env` file)
   - Change `JWT_SECRET` to a secure random string
   - Update database credentials if needed

4. **Start the application**

   For development:

   ```bash
   docker-compose -f docker-compose.dev.yml up -d
   ```

   For production:

   ```bash
   docker-compose up -d
   ```

5. **Run database migrations**

   ```bash
   docker exec -it movielist-app pnpm prisma migrate deploy
   ```

6. **Seed the database** (Optional - creates sample users)

   ```bash
   docker exec -it movielist-app pnpm prisma db seed
   ```

7. **Access the application**
   - Open your browser to `http://localhost:3000`
   - Default users (if seeded):
     - Username: `alice` / Password: `password123`
     - Username: `bob` / Password: `password123`

### Local Development (Without Docker)

1. **Install dependencies**

   ```bash
   pnpm install
   ```

2. **Set up PostgreSQL**
   - Create a database
   - Update `DATABASE_URL` in `.env`

3. **Run migrations**

   ```bash
   pnpm prisma migrate deploy
   pnpm prisma generate
   ```

4. **Seed the database** (Optional)

   ```bash
   pnpm prisma db seed
   ```

5. **Start development server**

   ```bash
   pnpm dev
   ```

6. **Access at** `http://localhost:3000`

## 📦 Available Scripts

### Development

```bash
pnpm dev              # Start development server
pnpm build            # Build for production
pnpm preview          # Preview production build locally
```

### Database

```bash
pnpm prisma generate        # Generate Prisma Client
pnpm prisma migrate dev     # Create and apply new migration
pnpm prisma migrate deploy  # Apply migrations (production)
pnpm prisma studio          # Open Prisma Studio (database GUI)
pnpm prisma db seed         # Seed database with sample data
```

### Code Quality

```bash
pnpm lint           # Lint code
pnpm lint:fix       # Fix linting issues
pnpm format         # Format code with Prettier
```

### Docker

```bash
# Development
docker-compose -f docker-compose.dev.yml up -d     # Start dev containers
docker-compose -f docker-compose.dev.yml down      # Stop dev containers
docker-compose -f docker-compose.dev.yml logs -f   # View logs

# Production
docker-compose up -d          # Start production containers
docker-compose down           # Stop containers
docker-compose logs -f web    # View app logs
docker-compose restart web    # Restart app container

# Maintenance
docker-compose exec web pnpm prisma migrate deploy  # Run migrations
docker-compose exec web pnpm prisma db seed         # Seed database
docker-compose exec db psql -U movielist -d movielist  # Access database
```

## 📁 Project Structure

```
project/
├── prisma/
│   ├── schema.prisma           # Database schema (User model)
│   ├── migrations/             # Database migrations
│   └── seed.ts                 # Database seeding script
├── src/
│   ├── server/
│   │   ├── api/                # API endpoints
│   │   │   ├── auth/          # Authentication routes
│   │   │   │   ├── login.post.ts
│   │   │   │   ├── logout.post.ts
│   │   │   │   └── me.get.ts
│   │   │   ├── users/         # User management
│   │   │   │   ├── index.get.ts
│   │   │   │   └── index.post.ts
│   │   │   └── health.get.ts  # Health check
│   │   └── utils/             # Server utilities
│   │       ├── auth.ts        # Auth helpers (JWT, password hashing)
│   │       ├── prisma.ts      # Prisma client singleton
│   │       └── validation.ts  # Input validation schemas
│   ├── assets/css/            # Global styles
│   │   └── main.css          # Tailwind + custom styles
│   ├── components/            # Vue components
│   │   ├── ConfirmDialog.vue
│   │   ├── ConfirmDialogContainer.vue
│   │   ├── LoadingSpinner.vue
│   │   ├── SkeletonLoader.vue
│   │   ├── Toast.vue
│   │   ├── ToastContainer.vue
│   │   └── Tooltip.vue
│   ├── composables/           # Composable functions
│   │   ├── useAuth.ts        # Authentication state & methods
│   │   ├── useConfirm.ts     # Confirmation dialogs
│   │   ├── useKeyboard.ts    # Keyboard shortcuts
│   │   └── useToast.ts       # Toast notifications
│   ├── layouts/               # Layout components
│   │   ├── auth.vue          # Auth layout (login/signup)
│   │   └── default.vue       # Default layout with header
│   ├── middleware/            # Route middleware
│   │   └── auth.ts           # Auth protection
│   ├── pages/                 # File-based routing
│   │   ├── index.vue         # Home page
│   │   └── login.vue         # Login page
│   ├── plugins/
│   │   └── vue-query.ts      # TanStack Query setup
│   └── app.vue               # Root component
├── docker-compose.yml         # Production Docker config
├── docker-compose.dev.yml     # Development Docker config
├── Dockerfile                 # Production multi-stage build
├── Dockerfile.dev             # Development build
├── .dockerignore              # Docker ignore file
├── .env.example               # Environment variables template
├── nuxt.config.ts             # Nuxt configuration
├── tailwind.config.js         # Tailwind configuration with custom theme
├── tsconfig.json              # TypeScript configuration
└── package.json               # Dependencies and scripts
```

## 🎨 Romantic Design System

The application features a beautiful romantic theme with warm colors and loving language.

### 💝 Theme Guide

See **[THEMING_GUIDE.md](./THEMING_GUIDE.md)** for complete romantic theme documentation including:

- Color palette (Rose, Blush, Lavender, Gold)
- Loving language guidelines
- Component styling
- Animations and effects
- Dark mode (intimate evenings)

### Pre-built Component Classes

- `.btn-primary` - Rose gradient with glow
- `.btn-secondary` - Soft blush/peach
- `.input` - Gentle focus with rose border
- `.card`, `.card-hover` - Warm, inviting cards
- `.badge` - Status badges with romantic colors

### Custom Colors

- **Love Palette**: Rose, Blush, Cherry, Lavender, Gold, Coral, Peach
- **Backgrounds**: Canvas, Cream, Romantic gradient
- **Status**: Dreaming, Watching Together, Cherished, Paused
- **Priority**: Gentle, Worth It, Can't Wait!

## 🧰 Included Infrastructure

### Server Utilities

- **`server/utils/auth.ts`** - JWT token generation/verification, password hashing
- **`server/utils/prisma.ts`** - Prisma client singleton with connection pooling
- **`server/utils/validation.ts`** - Zod schemas for input validation

### Composables

- **`useAuth()`** - User authentication state, login/logout, user info
- **`useToast()`** - Show success/error/info toast notifications
- **`useConfirm()`** - Show confirmation dialogs before actions
- **`useKeyboard()`** - Register global keyboard shortcuts

### Components

- **Toast System** - Non-blocking notifications
- **Loading Spinner** - Customizable loading indicator
- **Skeleton Loader** - Content placeholders during loading
- **Tooltip** - Hover tooltips with positioning
- **Confirm Dialog** - Reusable confirmation modals

### API Routes

- **`POST /api/auth/login`** - User login
- **`POST /api/auth/logout`** - User logout
- **`GET /api/auth/me`** - Get current user
- **`GET /api/users`** - List users
- **`POST /api/users`** - Create user
- **`GET /api/health`** - Health check endpoint

## 🔒 Environment Variables

Required environment variables (see `.env.example`):

| Variable            | Description                  | Default                                                              |
| ------------------- | ---------------------------- | -------------------------------------------------------------------- |
| `DATABASE_URL`      | PostgreSQL connection string | `postgresql://movielist:movielist_password@localhost:5432/movielist` |
| `JWT_SECRET`        | Secret key for JWT tokens    | (must be changed in production)                                      |
| `NODE_ENV`          | Environment mode             | `development`                                                        |
| `POSTGRES_USER`     | Database user                | `movielist`                                                          |
| `POSTGRES_PASSWORD` | Database password            | `movielist_password`                                                 |
| `POSTGRES_DB`       | Database name                | `movielist`                                                          |
| `APP_PORT`          | Application port             | `3000`                                                               |

## 🔧 Troubleshooting

### Common Issues

**Port already in use**

```bash
# Find and kill process using port 3000
lsof -ti:3000 | xargs kill -9

# Or change APP_PORT in .env file
```

**Database connection issues**

```bash
# Check if database is running
docker-compose ps

# Restart database
docker-compose restart db

# Check database logs
docker-compose logs db
```

**Prisma Client out of sync**

```bash
# Regenerate Prisma Client
pnpm prisma generate

# Or in Docker
docker-compose exec web pnpm prisma generate
```

**Build failures**

```bash
# Clear build cache and rebuild
rm -rf .nuxt .output node_modules
pnpm install
pnpm build
```

## 🚢 Production Deployment

### 🚂 Deploy to Railway (Recommended - 5 Minutes)

**Railway is the easiest way to deploy this app!** It automatically handles Docker, databases, and deployments.

**Quick Start:**

1. Push your code to GitHub
2. Go to [railway.app](https://railway.app) and create a new project
3. Connect your GitHub repository
4. Add PostgreSQL database (one click)
5. Set environment variables: `JWT_SECRET` and `NODE_ENV=production`
6. Configure start command: `sh -c "pnpm prisma migrate deploy && node .output/server/index.mjs"`
7. That's it! Railway gives you a live URL 🎉

**📖 Detailed Guide:** See [DEPLOYMENT.md](./DEPLOYMENT.md) for step-by-step instructions  
**⚡ Quick Reference:** See [RAILWAY_QUICK_START.md](./RAILWAY_QUICK_START.md)

### Other Deployment Options

#### Docker Compose (Self-Hosted)

1. **Build production Docker image**

   ```bash
   docker build -t movie-list:latest .
   ```

2. **Set environment variables**
   - Create `.env` file with production values
   - Use strong `JWT_SECRET` (generate with `openssl rand -base64 32`)
   - Update database credentials

3. **Deploy with Docker Compose**

   ```bash
   docker-compose up -d
   ```

4. **Run migrations**
   ```bash
   docker-compose exec web pnpm prisma migrate deploy
   ```

#### Other Platforms

The app works with any Docker-friendly platform:

- **Fly.io** - Docker-native, global deployment
- **Render** - Simple UI with free tier
- **DigitalOcean App Platform** - Reliable with managed database
- **AWS/GCP/Azure** - Enterprise options with more configuration

## 📚 Resources

- [Nuxt 3 Documentation](https://nuxt.com/docs)
- [Prisma Documentation](https://www.prisma.io/docs)
- [TanStack Query Documentation](https://tanstack.com/query/latest/docs/vue/overview)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [Vue 3 Documentation](https://vuejs.org/)
- [Docker Documentation](https://docs.docker.com/)

## 📄 License

This project is open source and available under the MIT License.

---

_Built with love 💕 for sharing special movie moments together ✨_
