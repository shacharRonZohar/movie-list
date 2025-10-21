# 🚂 Railway Quick Start - 5 Minutes to Deploy

## Step 1: Push to GitHub

```bash
git add .
git commit -m "Ready for Railway deployment"
git push origin main
```

## Step 2: Deploy on Railway

1. Go to [railway.app](https://railway.app)
2. Click **"New Project"**
3. Select **"Deploy from GitHub repo"**
4. Choose your `movie-list` repository
5. Railway starts building automatically ✨

## Step 3: Add Database

1. Click **"New"** → **"Database"** → **"Add PostgreSQL"**
2. That's it! Railway auto-connects it.

## Step 4: Set Environment Variables

1. Click your app service
2. Go to **"Variables"** tab
3. Add:

```bash
JWT_SECRET=<paste-your-secret-here>
NODE_ENV=production
```

Generate JWT_SECRET:
```bash
openssl rand -base64 32
```

## Step 5: Configure Startup Command

1. Click your app service
2. **"Settings"** → **"Deploy"**
3. **"Custom Start Command"**:

```bash
sh -c "pnpm prisma migrate deploy && node .output/server/index.mjs"
```

## Step 6: Access Your App! 🎉

Railway gives you a URL like: `https://your-app.up.railway.app`

---

## Optional: Seed Database

In Railway console, run:
```bash
pnpm db:seed
```

Default users:
- `alice` / `password123`
- `bob` / `password123`

---

## That's It!

Every push to GitHub = automatic deployment 🚀

**Need detailed instructions?** See [DEPLOYMENT.md](./DEPLOYMENT.md)

