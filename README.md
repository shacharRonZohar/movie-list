# Movie List

A modern Nuxt 3 application built with TypeScript, TanStack Query (Vue Query), and Tailwind CSS.

## Tech Stack

- **Nuxt 3** - The Intuitive Vue Framework
- **Vue 3** - Progressive JavaScript Framework
- **TypeScript** - Type safety with strict mode
- **TanStack Query (Vue Query)** - Data fetching and caching
- **Tailwind CSS** - Utility-first CSS framework
- **Prettier** - Code formatter
- **ESLint** - Code linting

## Features

- 🚀 File-based routing (automatic routes from `pages/` directory)
- 🎨 Tailwind CSS for rapid UI development
- 🔄 TanStack Query for efficient data fetching
- 📱 Fully responsive design
- 🛠️ TypeScript with strict mode
- 💅 Prettier for consistent code formatting
- ✅ ESLint for code quality
- 🔍 Vue Query Devtools included
- ⚡️ Server-side rendering (SSR) ready
- 🎯 Auto-imported components and composables

## Getting Started

### Prerequisites

- Node.js (v18 or higher recommended)
- pnpm (v9 or higher recommended)

If you don't have pnpm installed:

```bash
npm install -g pnpm
```

### Installation

1. Install dependencies:

```bash
pnpm install
```

### Development

Start the development server on `http://localhost:3000`:

```bash
pnpm dev
```

### Build

Build the application for production:

```bash
pnpm build
```

### Preview Production Build

Locally preview production build:

```bash
pnpm preview
```

### Code Quality

Lint your code:

```bash
pnpm lint
```

Fix linting issues:

```bash
pnpm lint:fix
```

Format code with Prettier:

```bash
pnpm format
```

## Project Structure

```
movie-list/
├── assets/
│   └── css/
│       └── main.css          # Global styles with Tailwind directives
├── components/               # Auto-imported Vue components
├── pages/                    # File-based routing
│   └── index.vue            # Home page (/)
├── plugins/
│   └── vue-query.ts         # TanStack Query setup
├── public/                  # Static assets
├── app.vue                  # Root component
├── nuxt.config.ts          # Nuxt configuration
├── tailwind.config.js      # Tailwind CSS configuration
├── tsconfig.json           # TypeScript configuration
├── eslint.config.mjs       # ESLint configuration
├── .prettierrc             # Prettier configuration
└── package.json            # Dependencies and scripts
```

## File-based Routing

Nuxt automatically creates routes based on your file structure in the `pages/` directory:

- `pages/index.vue` → `/`
- `pages/movies/index.vue` → `/movies`
- `pages/movies/[id].vue` → `/movies/:id`
- `pages/about.vue` → `/about`

## Using TanStack Query

TanStack Query is set up and ready to use in any component:

```vue
<script setup lang="ts">
import { useQuery } from "@tanstack/vue-query";

const { data, isLoading, error } = useQuery({
  queryKey: ["movies"],
  queryFn: async () => {
    const response = await fetch("/api/movies");
    return response.json();
  },
});
</script>
```

## Next Steps

1. Set up your API endpoints (in `server/api/` directory)
2. Create your movie data types
3. Add more pages in the `pages/` directory
4. Create reusable components in `components/`
5. Implement movie fetching with TanStack Query
6. Add filtering and search functionality

## Resources

- [Nuxt 3 Documentation](https://nuxt.com/docs)
- [TanStack Query (Vue Query) Documentation](https://tanstack.com/query/latest/docs/vue/overview)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [Vue 3 Documentation](https://vuejs.org/)

Happy coding! 🎬
