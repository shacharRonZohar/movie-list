# 🍪 Railway Cookie Troubleshooting Guide

## Changes Made

Updated cookie configuration to work better with Railway's production environment:

1. **`sameSite: 'strict'`** in production (was 'lax')
2. **Proper cookie clearing** with matching flags
3. **Async context** enabled in Nitro

## How to Verify Cookies Work

### 1. Check in Browser DevTools

After deploying, test login:

1. Open your Railway app URL
2. Open DevTools → **Application** tab → **Cookies**
3. Login
4. Look for `auth_token` cookie with these properties:
   - ✅ **HttpOnly**: Yes
   - ✅ **Secure**: Yes
   - ✅ **SameSite**: Strict
   - ✅ **Path**: /
   - ✅ **Expires**: 7 days from now

### 2. Check Network Tab

1. Open DevTools → **Network** tab
2. Login (POST to `/api/auth/login`)
3. Check **Response Headers** for:
   ```
   Set-Cookie: auth_token=...; Path=/; HttpOnly; Secure; SameSite=Strict
   ```

### 3. Test Cookie Persistence

1. Login
2. Refresh the page
3. Check if you're still logged in
4. Navigate to different pages
5. You should stay logged in ✅

## Common Issues & Fixes

### Issue 1: Cookie Set But Not Sent

**Symptom:** Cookie appears in DevTools but isn't sent with requests

**Fix:** 
- Check `SameSite` is `Strict` or `Lax`
- Verify `Secure` is `true` on HTTPS
- Ensure `Path` is `/`

### Issue 2: Cookie Not Set At All

**Symptom:** No `auth_token` cookie in DevTools after login

**Possible causes:**
1. **NODE_ENV not set to 'production'**
   - In Railway Variables, ensure: `NODE_ENV=production`

2. **Mixed HTTP/HTTPS**
   - Railway should force HTTPS automatically
   - Check URL starts with `https://`

3. **CSP Blocking Cookies**
   - Check browser console for CSP errors
   - Our CSP should allow cookies (it does!)

### Issue 3: Cookie Cleared on Navigation

**Symptom:** Logged in on one page, logged out on another

**Fix:**
- Ensure cookie `Path=/` (✅ we set this)
- Check domain matches (no explicit domain = correct)

### Issue 4: CORS Issues

**Symptom:** API calls fail with CORS errors

**Fix:**
If you have a separate frontend domain, you need to:
1. Set `ALLOWED_ORIGINS` in Railway env vars
2. Add CORS middleware (we can add this if needed)

## Environment Variables Checklist

In Railway, verify these are set:

```bash
✅ NODE_ENV=production
✅ JWT_SECRET=<your-secret>
✅ DATABASE_URL=<auto-set-by-railway>
✅ TMDB_API_KEY=<your-key>
```

## Testing the Fix

After deploying these changes:

### Test 1: Login
```bash
curl -X POST https://your-app.railway.app/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"username":"alice","password":"password123"}' \
  -v
```

Look for `Set-Cookie` in response headers.

### Test 2: Authenticated Request
```bash
curl https://your-app.railway.app/api/auth/me \
  -H "Cookie: auth_token=YOUR_TOKEN_HERE" \
  -v
```

Should return user data.

### Test 3: Browser Test
1. Go to your Railway URL
2. Login with `alice` / `password123`
3. You should see "Welcome, Alice!"
4. Refresh - still logged in ✅
5. Close tab, reopen - still logged in ✅

## Still Having Issues?

### Check Railway Logs

1. Go to Railway dashboard
2. Click your app service
3. Click **"Deployments"** → Latest deployment
4. Check for errors related to:
   - Cookie setting
   - JWT verification
   - Database connection

### Enable Debug Logging

Add this to your code temporarily to debug:

```typescript
// In auth.ts setAuthCookie function
console.log('Setting cookie with options:', {
  httpOnly: true,
  secure: isProduction,
  sameSite: isProduction ? 'strict' : 'lax',
  path: '/',
})
```

Then check Railway logs after login attempt.

## What Changed

### Before:
```typescript
sameSite: 'lax',  // Too permissive
// No explicit clearing options
```

### After:
```typescript
sameSite: isProduction ? 'strict' : 'lax',  // Stricter in prod
// Matching options on clear
```

**Why?**
- `strict` prevents cookies from being sent in cross-site requests
- More secure for production
- Works better with Railway's HTTPS setup

## Related Files

- `src/server/utils/auth.ts` - Cookie configuration
- `nuxt.config.ts` - Nitro proxy settings
- `src/server/middleware/security.ts` - Security headers

---

**Need more help?** Check Railway logs or open an issue with:
- Browser console output
- Network tab screenshots
- Railway deployment logs

💕 Built with love, secured with cookies ✨

