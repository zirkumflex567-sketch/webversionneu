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
    protocol_version = "HTTP/1.1"

    def _send_headers(self, status=200):
        self.send_response(status)
        self.send_header('Content-Type', 'application/json')
        self.send_header('Access-Control-Allow-Origin', '*')
        self.send_header('Access-Control-Allow-Methods', 'POST, OPTIONS')
        self.send_header('Access-Control-Allow-Headers', 'Content-Type')
        self.send_header('Connection', 'close')
        self.end_headers()

    def do_OPTIONS(self):
        self._send_headers(200)

    def do_POST(self):
        if self.path in ['/fr-sieg/api/contact', '/fr-sieg/api/lead']:
            self.handle_contact()
        else:
            self._send_headers(404)
            self.wfile.write(json.dumps({'error': 'Not found'}).encode())

    def handle_contact(self):
        try:
            content_length = int(self.headers.get('Content-Length', 0))
            body = self.rfile.read(content_length).decode()
            data = json.loads(body)
            
            if not data.get('email') or not data.get('message'):
                self._send_headers(400)
                self.wfile.write(json.dumps({'error': 'Email und Nachricht erforderlich'}).encode())
                return

            email_sent, email_error = send_contact_email(
                data.get('name', 'Unbekannt'),
                data.get('email', ''),
                data.get('phone', ''),
                data.get('message', '')
            )

            self._send_headers(200)
            response = {'success': True, 'message': 'Anfrage empfangen.'}
            if email_sent:
                response['email_status'] = 'sent'
            else:
                response['email_error'] = email_error
                
            self.wfile.write(json.dumps(response).encode())
        except Exception as e:
            self._send_headers(500)
            self.wfile.write(json.dumps({'error': str(e)}).encode())

    def log_message(self, format, *args):
        pass

if __name__ == '__main__':
    server = HTTPServer(('127.0.0.1', 3377), ContactHandler)
    print('FR-SIEG API running on 3377 (HTTP/1.1)')
    server.serve_forever()
