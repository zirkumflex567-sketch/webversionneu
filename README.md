# H-Town Combat 67 / Scherbenhimmel

H-Town Combat 67 is a web-based vehicle extraction roguelite project with a 20-hour Scherbenhimmel campaign scope.

## Critical Rules

- Campaign structure is fixed: `Hub -> Quest -> Area Instance -> Extraction -> Hub`.
- The first 20-hour campaign is **not** a seamless open world.
- Player-facing text must be DE/EN localized through stable keys.
- Agent/code instructions and technical contracts are maintained in English.

## Documentation Entry

Start here for any implementation or audit work:

1. [docs/README.md](docs/README.md)
2. [docs/preproduction/20H_DOCUMENTATION_INDEX.md](docs/preproduction/20H_DOCUMENTATION_INDEX.md)
3. [docs/SOURCE_OF_TRUTH.md](docs/SOURCE_OF_TRUTH.md)
4. [docs/STATUS_VERIFICATION.md](docs/STATUS_VERIFICATION.md)

## Source of Truth

- Authoritative hierarchy: [docs/SOURCE_OF_TRUTH.md](docs/SOURCE_OF_TRUTH.md)
- Current status and verification evidence: [docs/STATUS_VERIFICATION.md](docs/STATUS_VERIFICATION.md)
- Conflict tracking: [docs/audit/DOC_CONFLICT_REGISTER.md](docs/audit/DOC_CONFLICT_REGISTER.md)
- Code-vs-doc traceability: [docs/audit/CODE_DOC_TRACEABILITY_MATRIX.md](docs/audit/CODE_DOC_TRACEABILITY_MATRIX.md)

## Build/Test Commands

```powershell
npm ci
npm test
npm run build
npm run lint
npm run test:viewport
npm run test:fps
npm audit --audit-level=high
```

Interpret results only through [docs/STATUS_VERIFICATION.md](docs/STATUS_VERIFICATION.md) and the latest audit report.

## Production Deployment Guide

### Critical Requirements

**PRODUCTION RULES - MUST BE FOLLOWED:**

1. **NODE_ENV=production** (REQUIRED)
   - Without this, basePath="/combat" is NOT active
   - Application WILL NOT work on subpath without production mode
   - Start server: `NODE_ENV=production npm start -- --port 3102`

2. **HTTPS is MANDATORY**
   - Google OAuth only works over HTTPS in production
   - Self-signed or test certificates will fail OAuth
   - Use Let's Encrypt for valid certificates

3. **basePath Configuration**
   - Development: `basePath = ""` (empty)
   - Production: `basePath = "/combat"` (via next.config.mjs)
   - Asset loading uses dynamic basePath detection from Next.js scripts
   - See: `src/config/assetPath.ts` for asset path resolution

4. **Git LFS for Binary Assets**
   - All PNG, FBX, and binary game assets are stored in Git LFS
   - Install git-lfs on server: `yum install git-lfs`
   - After clone: `git lfs pull` (fetches actual binary files, not pointers)
   - Without this, assets will be text pointers, not binary files

### Server Setup (htown)

**Host:** 100.95.155.22 (via Tailscale)  
**External IP:** 87.106.11.90  
**Domain:** www.h-town.duckdns.org  
**Application Path:** /opt/webversionneu  
**Server Port:** 3102 (localhost only)  
**HTTPS Port:** 443 (external IPv4 only, 87.106.11.90:443)  

### Nginx Configuration

```nginx
# /etc/nginx/sites-available/h-town-https.conf
server {
    listen 87.106.11.90:443 ssl http2;
    listen [::1]:443 ssl http2;
    server_name h-town.duckdns.org www.h-town.duckdns.org;

    ssl_certificate /etc/letsencrypt/live/h-town.duckdns.org/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/h-town.duckdns.org/privkey.pem;

    # Asset serving - direct from disk, not proxied
    location ^~ /combat/assets/ {
        rewrite ^/combat/assets/(.*)$ /assets/$1 break;
        alias /var/www/h-town-assets/assets/;
        access_log off;
        expires 30d;
        add_header Cache-Control "public, immutable";
    }

    # Proxy to Node.js app
    location /combat {
        proxy_pass http://127.0.0.1:3102;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection "upgrade";
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }

    # Root redirect
    location / {
        return 301 https://$server_name/combat;
    }
}
```

### Asset Serving Pipeline

1. **Asset Files:** `/opt/webversionneu/public/assets/`
   - PNG textures (e.g., characters_main.png, 806K)
   - FBX models and other binary assets
   - Managed via Git LFS

2. **Symlink:** `/var/www/h-town-assets/assets/` → `/opt/webversionneu/public/assets/`
   - Created for direct Nginx access (bypasses Next.js proxy)
   - Improves performance for static asset delivery

3. **Asset Loading in Code:** `src/game/AssetManager.ts`
   - Uses `assetPath()` function from `src/config/assetPath.ts`
   - Example: `assetPath('/assets/textures/characters_main.png')`
   - Returns: `http://domain/combat/assets/textures/characters_main.png` (in production)

### Deployment Steps

1. **Clone or Update Repository**
   ```bash
   cd /opt
   git clone https://github.com/zirkumflex567-sketch/webversionneu.git
   cd webversionneu
   ```

2. **Install Dependencies & Fetch Assets**
   ```bash
   npm ci
   git lfs pull
   ```

3. **Verify Build**
   ```bash
   npm run build
   npm test
   ```

4. **Start Server**
   ```bash
   NODE_ENV=production npm start -- --port 3102 &
   ```

5. **Verify Deployment**
   - Check https://www.h-town.duckdns.org/combat loads
   - Verify assets load (check network for 200 responses)
   - Check console for no 404 errors on assets

### Tailscale Network Notes

- Server is accessible via Tailscale private network: 100.95.155.22
- Public access: 87.106.11.90 (external IP)
- **CRITICAL:** Tailscale blocks port 443 on IPv6 and Tailscale IPs
- **FIX:** Nginx listens ONLY on external IPv4 (87.106.11.90:443), NOT on [::]:443 or 0.0.0.0
- HTTP port 80 can listen on all interfaces (for ACME cert renewal)

### SSL/HTTPS Setup with Let's Encrypt

```bash
# Install certbot
yum install certbot python3-certbot-nginx

# Get certificate
certbot certonly --standalone -d h-town.duckdns.org -d www.h-town.duckdns.org

# Certificate paths (automatic renewal via systemd timer)
/etc/letsencrypt/live/h-town.duckdns.org/fullchain.pem
/etc/letsencrypt/live/h-town.duckdns.org/privkey.pem
```

### Troubleshooting

**Assets Return 404**
- Check: `file /opt/webversionneu/public/assets/textures/characters_main.png`
- If output is "ASCII text", Git LFS pointers not downloaded
- Fix: Run `git lfs pull` in /opt/webversionneu

**Assets Return 403 Forbidden**
- Check Nginx alias directive and symlink permissions
- Fix: Ensure /var/www/h-town-assets is owned by nginx user
- `chown -R nginx:nginx /var/www/h-town-assets`

**OAuth Returns 403 "origin not allowed"**
- Check: Server running with NODE_ENV=production
- Check: HTTPS is active (not HTTP)
- Add domain to Google OAuth credentials in Cloud Console

**Page Loads but No Styles/Assets**
- Check: basePath="/combat" active (verify next.config.mjs)
- Check: NODE_ENV=production set when starting server
- Check: Nginx asset location rule is correct

**Next.js HMR Issues**
- Production mode doesn't support HMR (hot module reload)
- Use development build for debugging: `npm run dev`

### Configuration Files Reference

- **next.config.mjs** - basePath switching based on NODE_ENV
- **src/config/assetPath.ts** - Dynamic asset path resolution
- **src/game/AssetManager.ts** - Asset loading with error handling
- **nginx conf** - Reverse proxy and static asset serving
- **DEPLOYMENT_CONFIG.md** - Additional deployment notes
