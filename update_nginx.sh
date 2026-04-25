#!/bin/bash
cat /etc/nginx/conf.d/000-h-town-force.conf > ~/nginx_tmp.conf
# Update script-src
sed -i "s|script-src 'self' 'unsafe-inline' https://challenges.cloudflare.com;|script-src 'self' 'unsafe-inline' https://challenges.cloudflare.com https://accounts.google.com;|g" ~/nginx_tmp.conf
# Update connect-src
sed -i "s|connect-src 'self' https: https://challenges.cloudflare.com;|connect-src 'self' https: https://challenges.cloudflare.com https://accounts.google.com;|g" ~/nginx_tmp.conf
# Update frame-src
sed -i "s|frame-src 'self' https://www.google.com https://maps.google.com https://challenges.cloudflare.com;|frame-src 'self' https://www.google.com https://maps.google.com https://challenges.cloudflare.com https://accounts.google.com;|g" ~/nginx_tmp.conf
# Update style-src
sed -i "s|style-src 'self' 'unsafe-inline' https://fonts.googleapis.com;|style-src 'self' 'unsafe-inline' https://fonts.googleapis.com https://accounts.google.com;|g" ~/nginx_tmp.conf
# Update img-src to allow blob: (for Three.js textures/vfx)
sed -i "s|img-src 'self' data: https:;|img-src 'self' data: https: blob:;|g" ~/nginx_tmp.conf

sudo cp ~/nginx_tmp.conf /etc/nginx/conf.d/000-h-town-force.conf
sudo nginx -t && sudo systemctl reload nginx
rm ~/nginx_tmp.conf
