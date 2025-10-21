# 🚀 Deploying to Railway

This guide will walk you through deploying your Movie List app to Railway in just a few minutes.

## Prerequisites

- GitHub account
- Railway account (sign up at [railway.app](https://railway.app))
- Your code pushed to a GitHub repository

## Quick Deploy (5 minutes)

### Step 1: Create Railway Project

1. Go to [railway.app](https://railway.app) and sign in with GitHub
2. Click **"New Project"**
3. Select **"Deploy from GitHub repo"**
4. Select your `movie-list` repository
5. Railway will automatically detect your Dockerfile and start building

### Step 2: Add PostgreSQL Database

1. In your Railway project dashboard, click **"New"** → **"Database"** → **"Add PostgreSQL"**
2. Railway automatically creates a `DATABASE_URL` environment variable
3. The database is automatically linked to your app

### Step 3: Configure Environment Variables

1. Click on your app service (not the database)
2. Go to **"Variables"** tab
3. Add the following variables:

```bash
JWT_SECRET=<generate-a-secure-random-string>
NODE_ENV=production
```

To generate a secure JWT_SECRET:

```bash
openssl rand -base64 32
```

Or use an online generator: [generate-secret.now.sh](https://generate-secret.now.sh/32)

### Step 4: Run Database Migrations

Railway will automatically build and deploy your app. After the first deployment:

1. Go to your app service
2. Click **"Settings"** → **"Deploy"**
3. Under **"Custom Start Command"**, add:

```bash
sh -c "pnpm prisma migrate deploy && node .output/server/index.mjs"
```

Or you can run migrations manually once:

1. Click on your app service
2. Go to **"Settings"** tab
3. Scroll to **"Service"** section
4. Click **"Variables"** → **"RAW Editor"**
5. Click on the three dots → **"Run a Command"**
6. Enter: `pnpm prisma migrate deploy`

### Step 5: Deploy! 🎉

1. Railway will automatically deploy on every push to your main branch
2. Once deployed, Railway will provide you with a public URL (e.g., `https://your-app.up.railway.app`)
3. Visit your URL to see your app live!

### Step 6: Seed Database (Optional)

To add sample users:

1. Go to your app service
2. Settings → Run a Command
3. Enter: `pnpm db:seed`

Default users will be created:

- Username: `alice` / Password: `password123`
- Username: `bob` / Password: `password123`

**⚠️ Change these passwords in production!**

---

## Configuration Details

### Environment Variables

Railway automatically provides:

- `DATABASE_URL` - PostgreSQL connection string (from database service)
- `PORT` - Port to run the app on (Railway provides this)

You need to add:

- `JWT_SECRET` - Secret key for JWT tokens (required)
- `NODE_ENV` - Set to `production`

Optional variables:

- `ALLOWED_ORIGINS` - CORS allowed origins (comma-separated)
- `LOG_LEVEL` - Logging level (`info`, `warn`, `error`)

### Dockerfile

Railway uses your existing `Dockerfile` for building. No changes needed!

### Automatic Deployments

Railway automatically deploys when you:

- Push to your main/master branch
- Create a pull request (creates a preview environment)
- Manually trigger a deployment

### Custom Domain

To add your own domain:

1. Go to your app service
2. Click **"Settings"** → **"Networking"**
3. Click **"Custom Domain"**
4. Add your domain and follow DNS instructions
5. Railway provides automatic HTTPS via Let's Encrypt

---

## Updating Your App

Simply push to GitHub:

```bash
git add .
git commit -m "Update app"
git push origin main
```

Railway will automatically:

1. Build the new Docker image
2. Run migrations (if configured in start command)
3. Deploy the new version
4. Perform zero-downtime deployment

---

## Monitoring & Logs

### View Logs

1. Click on your app service
2. Go to **"Deployments"** tab
3. Click on the latest deployment
4. View real-time logs

### Metrics

Railway provides built-in metrics:

- CPU usage
- Memory usage
- Network traffic
- Request count

Access them in the **"Metrics"** tab.

---

## Troubleshooting

### Build Fails

**Check logs:**

1. Go to "Deployments" → Click failed deployment
2. Check build logs for errors

**Common issues:**

- Node version mismatch → Update Dockerfile to use correct Node version
- Missing dependencies → Check package.json
- Prisma issues → Ensure `prisma generate` runs in Dockerfile

### Database Connection Issues

**Check DATABASE_URL:**

1. Go to Variables tab
2. Ensure `DATABASE_URL` exists and looks like: `postgresql://user:pass@host:port/db`

**Database not responding:**

1. Check database service is running (should show green status)
2. Restart database service if needed

### App Not Starting

**Check logs for errors:**

1. Common issue: Missing environment variables
2. Ensure JWT_SECRET is set
3. Check that migrations ran successfully

**Manual migration:**

```bash
# In Railway console
pnpm prisma migrate deploy
```

### 502 Bad Gateway

Usually means the app isn't running on the PORT Railway expects:

1. Nuxt should automatically use `process.env.PORT`
2. Check that your app is listening on port 3000 or Railway's provided PORT

---

## Costs

Railway pricing (as of 2024):

- **Hobby Plan**: $5/month
  - $5 of usage included
  - Pay for what you use beyond that
  - Includes all features

**Typical usage for this app:**

- App: ~$3-5/month
- Database: ~$2-3/month
- **Total: $5-8/month**

Free trial includes $5 credit to test everything out.

---

## Security Best Practices

### ✅ Do This

1. **Strong JWT_SECRET**: Use at least 32 characters, random
2. **Environment Variables**: Never commit secrets to git
3. **HTTPS**: Railway provides this automatically
4. **Database Backups**: Enable in Railway (Settings → Database)
5. **Update Dependencies**: Regularly update packages

### ❌ Don't Do This

1. Don't use default passwords in production
2. Don't expose database publicly
3. Don't commit `.env` files
4. Don't use weak JWT secrets

---

## Scaling

Railway makes scaling easy:

### Vertical Scaling (More Power)

1. Go to Settings → Resources
2. Increase CPU/Memory limits
3. Railway automatically restarts with new resources

### Horizontal Scaling (Multiple Instances)

1. Railway Pro plan supports this
2. Automatic load balancing included
3. Shared database across instances

---

## Advanced Configuration

### Preview Environments

Railway automatically creates preview environments for pull requests:

1. Create a PR on GitHub
2. Railway deploys a temporary environment
3. Test changes before merging
4. Environment is deleted after PR is merged

### Environment Variables Per Branch

1. Go to Variables tab
2. Add variables specific to environments
3. Use different values for production/preview

### Cron Jobs / Background Tasks

If you need scheduled tasks:

1. Add a new service to your Railway project
2. Use the same repo but different start command
3. Configure cron schedule in Railway

---

## Need Help?

- **Railway Docs**: [docs.railway.app](https://docs.railway.app)
- **Railway Discord**: Join for community support
- **Project Issues**: [GitHub Issues](https://github.com/your-repo/issues)

---

## Deployment Checklist

Before going live:

- [ ] Environment variables configured (especially JWT_SECRET)
- [ ] Database migrations run successfully
- [ ] App is accessible at Railway URL
- [ ] Can log in with test user
- [ ] Change default user passwords or remove seed users
- [ ] Set up custom domain (optional)
- [ ] Enable database backups
- [ ] Configure CORS if needed
- [ ] Test all functionality
- [ ] Monitor logs for errors

---

**That's it! Your app should now be live on Railway! 🎉**

_Built with love 💕 and deployed with Railway ✨_
