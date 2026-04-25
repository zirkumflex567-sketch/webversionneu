#!/bin/bash
cat <<EOF > /etc/systemd/system/fr-sieg-leads.service
[Unit]
Description=FR-Sieg Lead Intake Mailer (Node.js)
After=network.target

[Service]
Type=simple
User=frsieg
Group=frsieg
WorkingDirectory=/opt
Environment=NODE_PATH=/opt/siggi-assistant/node_modules
ExecStart=/usr/bin/node /opt/fr-sieg-api.js
Restart=always
RestartSec=2
NoNewPrivileges=true
PrivateTmp=true
ProtectSystem=strict
ProtectHome=true
ReadWritePaths=/tmp /var/www/h-town-duckdns/fr-sieg/v2 /opt

[Install]
WantedBy=multi-user.target
EOF
systemctl daemon-reload
systemctl restart fr-sieg-leads.service
