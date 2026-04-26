import './globals.css';
import type { Metadata } from 'next';
import { GoogleAuthProvider } from '../src/auth/GoogleAuthProvider';

export const metadata: Metadata = {
  title: 'H-Town Combat 67',
  description: 'Vehicle extraction roguelite powered by Three.js and Next.js',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Rajdhani:wght@400;600;700&family=Outfit:wght@400;600;800;900&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <GoogleAuthProvider>
          {children}
        </GoogleAuthProvider>
      </body>
    </html>
  );
}
