import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { clsx } from 'clsx';
import './globals.css';
import { StoreProvider } from '@/lib/store';
import { AuthProvider } from '@/context/AuthContext';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Lead Conversion Platform',
  description: 'Frontend Prototype',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={clsx(inter.className, "overflow-x-hidden bg-black")}>
        <div className="stars"></div>
        <div className="stars2"></div>
        <div className="stars3"></div>
        <div className="relative z-10">
          <StoreProvider>
            <AuthProvider>
              {children}
            </AuthProvider>
          </StoreProvider>
        </div>
      </body>
    </html>
  );
}
