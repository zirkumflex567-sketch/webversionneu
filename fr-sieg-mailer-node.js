const http = require('http');
const fs = require('fs');
const nodemailer = require('nodemailer');

const CONTACT_LOG = '/var/www/h-town-duckdns/fr-sieg/v2/contact-submissions.log';
const GMAIL_CREDS_FILE = '/opt/gmail-creds.json';

function loadCreds() {
    try {
        return JSON.parse(fs.readFileSync(GMAIL_CREDS_FILE, 'utf8'));
    } catch (e) {
        console.error('Failed to load creds:', e);
        return null;
    }
}

const server = http.createServer(async (req, res) => {
    // CORS
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    if (req.method === 'OPTIONS') {
        res.writeHead(200);
        res.end();
        return;
    }

    if (req.method === 'POST' && (req.url === '/fr-sieg/api/contact' || req.url === '/fr-sieg/api/lead')) {
        let body = '';
        req.on('data', chunk => body += chunk);
        req.on('end', async () => {
            try {
                const data = JSON.parse(body);
                if (!data.email || !data.message) {
                    res.writeHead(400, { 'Content-Type': 'application/json' });
                    res.end(JSON.stringify({ error: 'Email and message required' }));
                    return;
                }

                const creds = loadCreds();
                if (!creds) {
                    res.writeHead(500, { 'Content-Type': 'application/json' });
                    res.end(JSON.stringify({ error: 'SMTP credentials missing' }));
                    return;
                }

                const transporter = nodemailer.createTransport({
                    host: 'smtp.gmail.com',
                    port: 465,
                    secure: true,
                    auth: {
                        user: creds.email,
                        pass: creds.password
                    }
                });

                const mailOptions = {
                    from: creds.email,
                    to: 'kevin@sieg.me',
                    replyTo: data.email,
                    subject: `FR-SIEG Anfrage: ${data.name || 'Website'}`,
                    html: `
                        <h2>Neue Anfrage von FR-SIEG Website</h2>
                        <p><strong>Name:</strong> ${data.name || 'Unbekannt'}</p>
                        <p><strong>Email:</strong> ${data.email}</p>
                        <p><strong>Telefon:</strong> ${data.phone || 'keine Angabe'}</p>
                        <p><strong>Nachricht:</strong></p>
                        <p>${data.message.replace(/\n/g, '<br>')}</p>
                    `
                };

                await transporter.sendMail(mailOptions);

                // Log entry
                const logEntry = {
                    timestamp: new Date().toISOString(),
                    name: data.name,
                    email: data.email,
                    success: true
                };
                fs.appendFileSync(CONTACT_LOG, JSON.stringify(logEntry) + '\n');

                res.writeHead(200, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ success: true, message: 'Email sent' }));
            } catch (err) {
                console.error(err);
                res.writeHead(500, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ error: err.message }));
            }
        });
    } else {
        res.writeHead(404, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: 'Not found' }));
    }
});

server.listen(3377, '127.0.0.1', () => {
    console.log('FR-SIEG Node Mailer running on 3377');
});
