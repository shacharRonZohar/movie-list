# ✅ Railway Deployment Checklist

Use this checklist before going live with your Movie List app on Railway.

## Pre-Deployment

- [ ] Code is pushed to GitHub repository
- [ ] All recent changes are committed
- [ ] Local development server works correctly
- [ ] Database migrations are up to date locally
- [ ] No linting errors (`pnpm lint`)
- [ ] Production build succeeds locally (`pnpm build`)

## Railway Setup

### 1. Project Creation

- [ ] Created Railway account at [railway.app](https://railway.app)
- [ ] Connected Railway to GitHub account
- [ ] Created new Railway project
- [ ] Selected correct GitHub repository

### 2. Database Configuration

- [ ] Added PostgreSQL database to Railway project
- [ ] Verified `DATABASE_URL` environment variable is auto-created
- [ ] Database is showing as "Active" (green status)

### 3. Environment Variables

- [ ] Set `JWT_SECRET` (minimum 32 characters, random)
  - Generate with: `openssl rand -base64 32`
- [ ] Set `NODE_ENV=production`
- [ ] Optionally set `ALLOWED_ORIGINS` for CORS
- [ ] Verified all variables are saved

### 4. Deployment Configuration

- [ ] Confirmed Railway detected Dockerfile
- [ ] Set custom start command: `sh -c "pnpm prisma migrate deploy && node .output/server/index.mjs"`
- [ ] Verified build completed successfully
- [ ] App deployed successfully (green status)

### 5. Database Migrations

- [ ] Migrations ran automatically via start command, OR
- [ ] Ran migrations manually: `pnpm prisma migrate deploy`
- [ ] Verified migrations completed without errors

## Post-Deployment Testing

### 6. Application Health

- [ ] App is accessible at Railway-provided URL
- [ ] Health check endpoint works: `https://your-app.railway.app/api/health`
- [ ] No errors in Railway logs
- [ ] App responds within reasonable time

### 7. Authentication Testing

- [ ] Can access login page
- [ ] Can create new user account
- [ ] Can log in with created account
- [ ] JWT cookies are set properly
- [ ] Can log out successfully
- [ ] Protected routes redirect to login when not authenticated

### 8. Core Functionality

- [ ] Can add movies to collection
- [ ] Can view movie list
- [ ] Can update movie status
- [ ] Can reorder movies (drag and drop)
- [ ] Can delete movies
- [ ] All CRUD operations work correctly

### 9. Database Operations

- [ ] Data persists after page reload
- [ ] Multiple users can be created
- [ ] User data is isolated correctly
- [ ] No database connection errors in logs

## Optional Enhancements

### 10. Seeding (Optional)

- [ ] Decided whether to seed database with sample users
- [ ] If yes: Ran `pnpm db:seed` in Railway console
- [ ] If yes: Documented default credentials for team
- [ ] If yes: Planned to change/remove default passwords

### 11. Custom Domain (Optional)

- [ ] Purchased/have access to domain
- [ ] Added custom domain in Railway settings
- [ ] Updated DNS records as instructed
- [ ] HTTPS certificate provisioned automatically
- [ ] Domain resolves correctly

### 12. Monitoring & Logging

- [ ] Reviewed Railway metrics (CPU, Memory)
- [ ] Set up log monitoring
- [ ] Configured alerts (if available)
- [ ] Optionally integrated external monitoring (Sentry, etc.)

## Security Checklist

### 13. Security Best Practices

- [ ] JWT_SECRET is strong and unique (not default value)
- [ ] Environment variables contain no hardcoded secrets
- [ ] `.env` files are not committed to git
- [ ] Database is not publicly accessible
- [ ] HTTPS is enabled (automatic with Railway)
- [ ] CORS is configured if needed
- [ ] Rate limiting is in place (check `server/middleware/security.ts`)
- [ ] No sensitive data in logs
- [ ] User passwords are hashed (bcrypt)

### 14. Default Credentials

- [ ] Changed all default passwords if using seed data
- [ ] Removed or documented seed users
- [ ] Created production admin account with strong password
- [ ] Documented credential management process

## Final Steps

### 15. Documentation

- [ ] Updated README with production URL (if sharing)
- [ ] Documented environment variables for team
- [ ] Shared deployment guide with team members
- [ ] Added deployment notes to project documentation

### 16. Backup & Recovery

- [ ] Enabled automated backups in Railway (Settings → Database)
- [ ] Tested database backup/restore process
- [ ] Documented recovery procedures
- [ ] Scheduled regular backup verification

### 17. Performance

- [ ] Verified app loads in < 3 seconds
- [ ] Checked mobile responsiveness
- [ ] Tested on multiple browsers
- [ ] Verified no console errors in browser
- [ ] Monitored Railway metrics for resource usage

### 18. Go Live!

- [ ] Shared app URL with users
- [ ] Monitored logs for first few hours
- [ ] Collected initial feedback
- [ ] Set up automatic deployment for future updates

---

## Quick Reference

### Generate JWT Secret

```bash
openssl rand -base64 32
```

### Railway Start Command

```bash
sh -c "pnpm prisma migrate deploy && node .output/server/index.mjs"
```

### Check Health Endpoint

```bash
curl https://your-app.railway.app/api/health
```

### View Logs (Railway CLI)

```bash
railway logs
```

### Run Migrations Manually

```bash
# In Railway console
pnpm prisma migrate deploy
```

### Seed Database

```bash
# In Railway console
pnpm db:seed
```

---

## Troubleshooting

If something isn't working:

1. ✅ Check Railway deployment logs
2. ✅ Verify all environment variables are set
3. ✅ Confirm database is running and connected
4. ✅ Check health endpoint responds
5. ✅ Review browser console for errors
6. ✅ Verify migrations ran successfully
7. ✅ Restart the service if needed

---

## Support

- **Railway Docs**: [docs.railway.app](https://docs.railway.app)
- **Railway Discord**: Join for community support
- **Deployment Guide**: See [DEPLOYMENT.md](./DEPLOYMENT.md)
- **Quick Start**: See [RAILWAY_QUICK_START.md](./RAILWAY_QUICK_START.md)

---

**🎉 Congratulations on your deployment!**

_Remember: Every push to main = automatic deployment 🚀_

