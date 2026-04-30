# H-Town Combat 67 - Deployment Summary

**Last Updated:** 2026-04-30
**Status:** ✓ Production Live
**URL:** https://www.h-town.duckdns.org/combat

## The Four Sacred Rules of Production Deployment

These rules are NON-NEGOTIABLE:

### Rule 1: NODE_ENV=production (MANDATORY)
Without this, basePath=/combat does NOT work.
- Start server: NODE_ENV=production npm start -- --port 3102
- Verify: basePath should be /combat in next.config.mjs

### Rule 2: HTTPS is REQUIRED
Google OAuth only works with HTTPS (not HTTP).
- Certificate: Let's Encrypt (auto-renews)
- Verify: curl -I https://www.h-town.duckdns.org/combat should show 200

### Rule 3: Git LFS Must Be Pulled
Without git lfs pull, assets are text pointers (broken).
- Install: yum install git-lfs
- After clone: git lfs pull
- Verify: file public/assets/textures/characters_main.png should show PNG

### Rule 4: Nginx Serves Assets Directly
Assets are NOT proxied through Node.js for performance.
- Symlink: /var/www/h-town-assets/assets/ -> /opt/webversionneu/public/assets/
- Verify: curl https://www.h-town.duckdns.org/combat/assets/textures/characters_main.png returns 200

## Quick Deployment

1. cd /opt/webversionneu && git pull origin main
2. npm ci && git lfs pull
3. npm run build && npm test
4. pkill -f npm start
5. NODE_ENV=production npm start -- --port 3102 &
6. Verify: curl https://www.h-town.duckdns.org/combat

## Documentation

- README.md - Complete production deployment guide
- OPERATIONS_MANUAL.md - Deployment checklist and troubleshooting
- INFRASTRUCTURE_CONFIG.md - Nginx, Git LFS, SSL details

See README.md first for complete information.
