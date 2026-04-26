import './globals.css';
import type { Metadata } from 'next';
import { Bebas_Neue, Outfit, Rajdhani } from 'next/font/google';
import { GoogleAuthProvider } from '../src/auth/GoogleAuthProvider';

const bebasNeue = Bebas_Neue({
  subsets: ['latin'],
  weight: ['400'],
  variable: '--font-bebas-neue',
});

const rajdhani = Rajdhani({
  subsets: ['latin'],
  weight: ['400', '600', '700'],
  variable: '--font-rajdhani',
});

const outfit = Outfit({
  subsets: ['latin'],
  weight: ['400', '600', '800', '900'],
  variable: '--font-outfit',
});

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
    <html lang="en" className={`dark ${bebasNeue.variable} ${rajdhani.variable} ${outfit.variable}`}>
      <body>
        <GoogleAuthProvider>
          {children}
        </GoogleAuthProvider>
      </body>
    </html>
  );
}
