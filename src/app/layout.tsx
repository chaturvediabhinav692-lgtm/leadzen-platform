import type { Metadata } from 'next';
import './globals.css';
import { StoreProvider } from '@/lib/store';
import { AuthProvider } from '@/context/AuthContext';

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
      <body className="overflow-x-hidden bg-black font-body">
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
