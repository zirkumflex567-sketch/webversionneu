# Infrastructure Configuration Reference

Production deployment infrastructure setup documentation.

## Git LFS Setup

### Installation
- CentOS/RHEL: sudo yum install git-lfs
- Ubuntu/Debian: sudo apt-get install git-lfs
- After clone: cd /opt/webversionneu && git lfs pull

### Verification
file public/assets/textures/characters_main.png
Should show: PNG image data (not ASCII text)

## Nginx Configuration

Key points:
- Listen ONLY on 87.106.11.90:443 (external IPv4)
- NOT on 0.0.0.0:443 or [::]:443 (Tailscale blocks these)
- Assets served directly from disk via alias
- App proxied to localhost:3102

Location: /etc/nginx/sites-available/h-town-https.conf

## Asset Symlink

sudo ln -s /opt/webversionneu/public/assets /var/www/h-town-assets/assets

Ensures Nginx can serve assets directly (performance optimization).

## SSL/TLS with Let's Encrypt

sudo yum install certbot python3-certbot-nginx
sudo certbot certonly --standalone -d h-town.duckdns.org -d www.h-town.duckdns.org

Auto-renewal via systemd timer.

## Tailscale Network

- Private IP: 100.95.155.22
- Public IP: 87.106.11.90
- Tailscale blocks ports on IPv6 and private IPs
- Nginx workaround: listen only on public IPv4

## See Also

- README.md - Production Deployment Guide
- OPERATIONS_MANUAL.md - Deployment checklist
