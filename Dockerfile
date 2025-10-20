# Stage 1: Dependencies
FROM node:20-alpine AS deps
RUN apk add --no-cache libc6-compat openssl
WORKDIR /app

# Install pnpm
RUN npm install -g pnpm@10.18.3

# Copy package files
COPY package.json pnpm-lock.yaml ./
COPY prisma ./prisma/

# Install dependencies
RUN pnpm install --frozen-lockfile

# Generate Prisma Client
RUN pnpm prisma generate

# Stage 2: Builder
FROM node:20-alpine AS builder
WORKDIR /app

# Install pnpm
RUN npm install -g pnpm@10.18.3

# Copy dependencies from deps stage
COPY --from=deps /app/node_modules ./node_modules
COPY --from=deps /app/prisma ./prisma

# Copy application code
COPY . .

# Build the application
ENV NODE_ENV=production
RUN pnpm run build

# Stage 3: Runner (Production)
FROM node:20-alpine AS runner
WORKDIR /app

# Install pnpm and openssl for Prisma
RUN apk add --no-cache openssl && \
    npm install -g pnpm@10.18.3

# Set environment to production
ENV NODE_ENV=production

# Create a non-root user for security
RUN addgroup --system --gid 1001 nodejs && \
    adduser --system --uid 1001 nuxtjs

# Copy necessary files from builder
COPY --from=builder --chown=nuxtjs:nodejs /app/.output ./.output
COPY --from=builder --chown=nuxtjs:nodejs /app/node_modules ./node_modules
COPY --from=builder --chown=nuxtjs:nodejs /app/prisma ./prisma
COPY --from=builder --chown=nuxtjs:nodejs /app/package.json ./package.json

# Switch to non-root user
USER nuxtjs

# Expose port (Railway uses PORT env var)
EXPOSE 3000
ENV PORT=3000

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=10s --retries=3 \
  CMD node -e "require('http').get('http://localhost:3000/api/health', (r) => {process.exit(r.statusCode === 200 ? 0 : 1)})"

# Start the application
CMD ["node", ".output/server/index.mjs"]


