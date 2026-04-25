#!/usr/bin/env python3
from http.server import HTTPServer, BaseHTTPRequestHandler
import json
import smtplib
import sys
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
from datetime import datetime
import os

CONTACT_LOG = '/var/www/h-town-duckdns/fr-sieg/v2/contact-submissions.log'
GMAIL_CREDS_FILE = '/opt/gmail-creds.json'

def load_gmail_creds():
    if os.path.exists(GMAIL_CREDS_FILE):
        with open(GMAIL_CREDS_FILE, 'r') as f:
            return json.load(f)
    return None

def save_gmail_creds(email, password):
    with open(GMAIL_CREDS_FILE, 'w') as f:
        json.dump({'email': email, 'password': password}, f)
    os.chmod(GMAIL_CREDS_FILE, 0o600)

def test_gmail(email, password):
    try:
        with smtplib.SMTP_SSL('smtp.gmail.com', 465, timeout=10) as server:
            server.login(email, password)
        return True, None
    except Exception as e:
        return False, str(e)

def send_contact_email(name, email, phone, message):
    creds = load_gmail_creds()
    if not creds:
        return False, "Gmail credentials not set"
    
    try:
        msg = MIMEMultipart('alternative')
        msg['Subject'] = f"FR-SIEG Anfrage: {name}"
        msg['From'] = creds['email']
        msg['To'] = 'kevin@sieg.me'
        msg['Reply-To'] = email

        html = f"""
        <h2>Neue Anfrage von FR-SIEG Website</h2>
        <p><strong>Name:</strong> {name}</p>
        <p><strong>Email:</strong> {email}</p>
        <p><strong>Telefon:</strong> {phone or 'keine Angabe'}</p>
        <p><strong>Nachricht:</strong></p>
        <p>{message.replace(chr(10), '<br>')}</p>
        """

        msg.attach(MIMEText(html, 'html'))

        with smtplib.SMTP_SSL('smtp.gmail.com', 465, timeout=10) as server:
            server.login(creds['email'], creds['password'])
            server.sendmail(msg['From'], ['kevin@sieg.me'], msg.as_string())
        
        return True, None
    except Exception as e:
        return False, str(e)

class ContactHandler(BaseHTTPRequestHandler):
    def do_OPTIONS(self):
        self.send_response(200)
        self._headers()
        self.end_headers()

    def do_POST(self):
        if self.path == '/fr-sieg/api/gmail-setup':
            return self.handle_gmail_setup()
        elif self.path == '/fr-sieg/api/contact' or self.path == '/fr-sieg/api/lead':
            return self.handle_contact()
        else:
            self.send_response(404)
            self._headers()
            self.wfile.write(json.dumps({'error': 'Not found'}).encode())

    def handle_gmail_setup(self):
        content_length = int(self.headers.get('Content-Length', 0))
        body = self.rfile.read(content_length).decode()
        data = json.loads(body)
        
        email = data.get('email', '').strip()
        password = data.get('password', '').strip()
        
        success, error = test_gmail(email, password)
        
        self.send_response(200)
        self._headers()
        
        if success:
            save_gmail_creds(email, password)
            self.wfile.write(json.dumps({'success': True, 'message': 'Credentials gespeichert!'}).encode())
            print(f"[SETUP] Gmail credentials set for {email}", file=sys.stderr)
        else:
            self.wfile.write(json.dumps({'success': False, 'error': error}).encode())
            print(f"[ERROR] Setup failed: {error}", file=sys.stderr)

    def handle_contact(self):
        content_length = int(self.headers.get('Content-Length', 0))
        body = self.rfile.read(content_length).decode()
        data = json.loads(body)
        
        if not data.get('email') or not data.get('message'):
            self.send_response(400)
            self._headers()
            self.wfile.write(json.dumps({'error': 'Email und Nachricht erforderlich'}).encode())
            return

        timestamp = datetime.now().isoformat()
        submission = {
            'timestamp': timestamp,
            'name': data.get('name', 'Unbekannt'),
            'email': data.get('email', ''),
            'phone': data.get('phone', ''),
            'message': data.get('message', ''),
            'ip': self.client_address[0]
        }

        email_sent, email_error = send_contact_email(
            data.get('name', 'Unbekannt'),
            data.get('email', ''),
            data.get('phone', ''),
            data.get('message', '')
        )

        submission['email_sent'] = email_sent
        if email_error:
            submission['email_error'] = email_error

        try:
            with open(CONTACT_LOG, 'a') as f:
                f.write(json.dumps(submission) + '\n')
        except Exception as e:
            print(f"Log error: {e}", file=sys.stderr)

        self.send_response(200)
        self._headers()
        response = {'success': True, 'message': 'Anfrage empfangen. Wir melden uns bald bei Ihnen.'}
        if email_sent:
            response['email_status'] = 'sent'
        self.wfile.write(json.dumps(response).encode())

    def _headers(self):
        self.send_header('Access-Control-Allow-Origin', '*')
        self.send_header('Access-Control-Allow-Methods', 'POST, OPTIONS')
        self.send_header('Access-Control-Allow-Headers', 'Content-Type')
        self.send_header('Content-Type', 'application/json')

    def log_message(self, format, *args):
        pass

if __name__ == '__main__':
    server = HTTPServer(('127.0.0.1', 3377), ContactHandler)
    print('FR-SIEG API running', file=sys.stderr)
    server.serve_forever()
