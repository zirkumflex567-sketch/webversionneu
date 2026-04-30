# Agent Deployment Guide

Start with DEPLOYMENT_SUMMARY.md (2 min).
Then README.md Production Deployment Guide (10 min).
Then OPERATIONS_MANUAL.md as needed.

THE FOUR RULES (NON-NEGOTIABLE):
1. NODE_ENV=production (or app breaks)
2. HTTPS required (OAuth needs it)
3. git lfs pull required (assets need it)
4. Nginx serves assets directly (performance)

Quick Deploy:
  cd /opt/webversionneu
  git fetch origin main && git reset --hard origin/main
  npm ci && git lfs pull && npm run build && npm test
  pkill -f "npm start" && sleep 2
  NODE_ENV=production npm start -- --port 3102 &
  
Verify: curl -I https://www.h-town.duckdns.org/combat

See README.md for full guide.
