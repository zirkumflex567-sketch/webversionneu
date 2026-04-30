# Deployment Konfiguration für H-Town Combat

## Server-Information
- Domain: h-town.duckdns.org
- Protokoll: HTTPS (Port 443 auf 87.106.11.90)
- Basepath: /combat
- Backend Port: 3102 (Next.js)
- WebSocket Port: 3105 (Multiplayer-Server)

## Umgebungsvariablen
NODE_ENV=production

## Start-Kommando
NODE_ENV=production npm start -- --port 3102

## Nginx-Konfiguration
- HTTP (Port 80) → HTTPS Redirect
- HTTPS (Port 443) auf spezifischer IP (87.106.11.90)
- SSL: Let's Encrypt (/etc/letsencrypt/live/h-town.duckdns.org/)
- Proxy zu http://127.0.0.1:3102

## WICHTIG
- NODE_ENV=production erforderlich damit basePath "/combat" funktioniert
- Tailscale blockiert Port 443 auf IPv6/Tailscale-IP, daher nur IPv4 externe IP
- Google OAuth funktioniert nur mit HTTPS

## Letzter Deploy
- 2026-04-30 15:59 UTC
- Branch: main
- Status: ✅ HTTPS aktiv, Assets geladen, OAuth funktioniert
