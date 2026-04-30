# H-Town Combat 67 - Operations Manual

Production deployment operations guide for htown server.

## Quick Reference

| Property | Value |
|----------|-------|
| Server | htown (100.95.155.22 via Tailscale) |
| Public URL | https://www.h-town.duckdns.org/combat |
| App Port | 3102 (localhost, proxied via Nginx) |
| HTTPS Port | 443 (87.106.11.90 external IP only) |
| Node Env | production (MANDATORY) |
| basePath | /combat (automatically set in production) |
| Asset Dir | /opt/webversionneu/public/assets/ |
| Asset Serving | Via Nginx (alias + symlink, not proxied) |
| Certificate | Let's Encrypt (auto-renews) |

## Pre-Deployment Checklist

- [ ] Git LFS installed on server (`yum list installed | grep git-lfs`)
- [ ] Repository cloned to `/opt/webversionneu`
- [ ] HTTPS certificate valid and not expired (`certbot certificates`)
- [ ] Nginx config has correct IPv4 listening address (87.106.11.90, NOT 0.0.0.0)
- [ ] Asset symlink exists: `/var/www/h-town-assets/assets/` → `/opt/webversionneu/public/assets/`
- [ ] Ownership correct: `ls -ld /var/www/h-town-assets` (should be nginx:nginx or similar)

## Deployment Process

### Step 1: Update Code

```bash
ssh htown
cd /opt/webversionneu
git fetch origin main
git reset --hard origin/main
```

### Step 2: Install Dependencies & Fetch Assets

```bash
npm ci
git lfs pull
```

**Critical:** Without `git lfs pull`, asset files will be text pointers (broken).

### Step 3: Build & Test

```bash
npm run build
npm test
```

All tests must pass. If they fail, deployment is blocked.

### Step 4: Start Server

```bash
NODE_ENV=production npm start -- --port 3102 &
disown
```

Wait 5-10 seconds for startup.

### Step 5: Verify Deployment

```bash
# Test localhost
curl -s http://127.0.0.1:3102/combat | head -20

# Test asset serving (external HTTPS)
curl -s -o /dev/null -w "%{http_code}" \
  https://www.h-town.duckdns.org/combat/assets/textures/characters_main.png
# Should return: 200

# Test page loads (in browser or curl)
curl -s https://www.h-town.duckdns.org/combat | grep -o "H-Town Combat"
# Should return: H-Town Combat (or similar content)
```

## Operational Checks

### Daily Health Check

```bash
ssh htown << 'CHECKS'
# 1. Node app running?
curl -s http://127.0.0.1:3102/combat/api/health | jq . 2>/dev/null || echo "FAIL: App not responding"

# 2. Assets loading?
curl -s -o /dev/null -w "Asset status: %{http_code}\n" \
  https://www.h-town.duckdns.org/combat/assets/textures/characters_main.png

# 3. Certificate valid?
certbot certificates | grep -E "(Certificate Path|Expiry Date)"

# 4. Disk space?
df -h /opt/ | tail -1
CHECKS
```

### Weekly Maintenance

```bash
# Check for updates
cd /opt/webversionneu
git log --oneline main..origin/main

# Update if new commits available
git pull origin main
npm ci
npm run build
npm test
systemctl restart h-town (if using systemd)
```

## Common Issues & Fixes

### Issue: Assets Return 404 or Are Text Files

**Symptom:** 
```
file /opt/webversionneu/public/assets/textures/characters_main.png
# Output: ASCII text (BAD - Git LFS pointer)
```

**Root Cause:** Git LFS pointers not resolved to actual files.

**Fix:**
```bash
cd /opt/webversionneu
git lfs pull
# Verify:
file public/assets/textures/characters_main.png
# Output: PNG image data (GOOD)
```

### Issue: Assets Return 403 Forbidden

**Symptom:** Network tab shows `/combat/assets/*` returning 403.

**Root Cause:** Nginx can't read symlinked asset directory.

**Fix:**
```bash
# Check symlink
ls -ld /var/www/h-town-assets/assets/

# Fix ownership (if needed)
sudo chown -R nginx:nginx /var/www/h-town-assets

# Reload Nginx
sudo nginx -t && sudo systemctl reload nginx
```

### Issue: OAuth Returns 403 "Origin Not Allowed"

**Symptom:** Login redirects to Google, but returns 403.

**Cause:** Server not running with NODE_ENV=production or HTTPS not active.

**Fix:**
```bash
# Kill old process
pkill -f "npm start"

# Start with correct env
NODE_ENV=production npm start -- --port 3102 &

# Verify HTTPS is working
curl -I https://www.h-town.duckdns.org/combat
# Should show: HTTP/2 200
```

### Issue: Certificate Expired or Missing

**Symptom:** Browser shows SSL error or certificate warning.

**Root Cause:** Let's Encrypt certificate not renewed.

**Fix:**
```bash
# Check certificate status
certbot certificates

# Manually renew (normally automatic)
sudo certbot renew --force-renewal

# Verify dates
openssl x509 -in /etc/letsencrypt/live/h-town.duckdns.org/fullchain.pem \
  -noout -dates
```

### Issue: Nginx Won't Start

**Symptom:** `systemctl start nginx` fails silently.

**Diagnosis:**
```bash
nginx -t  # Shows syntax errors
journalctl -u nginx -n 50  # Shows what went wrong
```

**Common causes:**
- Port 443 already in use (Tailscale binds to [::]:443)
  - **Fix:** Listen only on IPv4: `listen 87.106.11.90:443`
- Permission denied on certificate files
  - **Fix:** `chmod 644 /etc/letsencrypt/live/.../{fullchain,privkey}.pem`

## Server Restart Procedure

When restarting the Node.js app (e.g., after deployment):

```bash
ssh htown

# 1. Kill old process
pkill -f "npm start"
sleep 2

# 2. Verify it's dead
ps aux | grep npm

# 3. Start new instance
cd /opt/webversionneu
NODE_ENV=production npm start -- --port 3102 &
disown

# 4. Wait for startup
sleep 5

# 5. Verify it's running
curl -s http://127.0.0.1:3102/combat | head -20
```

## Environment Variables

| Variable | Value | Notes |
|----------|-------|-------|
| NODE_ENV | production | MANDATORY - enables basePath="/combat" |
| PORT | 3102 | Used internally, exposed via Nginx |
| DATABASE_URL | [from env file] | If applicable |
| GOOGLE_CLIENT_ID | [from env file] | OAuth credential |
| GOOGLE_CLIENT_SECRET | [from env file] | OAuth credential |

Store secrets in `/opt/webversionneu/.env.local` (not in git).

## Log Locations

- **Application logs:** stdout/stderr (use `journalctl` if using systemd)
- **Nginx access:** `/var/log/nginx/access.log`
- **Nginx errors:** `/var/log/nginx/error.log`
- **System logs:** `journalctl -u nginx` or `journalctl -u h-town`

## Rollback Procedure

If deployment fails:

```bash
ssh htown
cd /opt/webversionneu

# 1. Check current commit
git log --oneline -1

# 2. Revert to previous stable
git reset --hard <previous-commit>
git lfs pull

# 3. Rebuild
npm ci && npm run build && npm test

# 4. Restart server
pkill -f "npm start"
NODE_ENV=production npm start -- --port 3102 &
```

## Monitoring Dashboard

For production monitoring:
- **Status:** https://www.h-town.duckdns.org/combat (should show login page)
- **Certificate:** `certbot certificates`
- **Disk usage:** `df -h /opt/`
- **Server resources:** `ssh htown "free -h && top -b -n 1 | head -20"`

## Contact & Escalation

For deployment issues:
1. Check OPERATIONS_MANUAL.md troubleshooting section
2. Check README.md Production Deployment Guide
3. Verify Nginx config: `nginx -t`
4. Check recent commits: `git log --oneline -10`
5. Escalate if deployment blocks production access

---
Last Updated: 2026-04-30
Maintained by: Deployment Team
