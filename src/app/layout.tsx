import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { clsx } from 'clsx';
import './globals.css';
import Sidebar from '@/components/Sidebar';
import { StoreProvider } from '@/lib/store';

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
      <body className={clsx(inter.className, "overflow-x-hidden")}>
        <StoreProvider>
          <div className="flex h-screen bg-slate-50 overflow-hidden">
            <Sidebar />
            <main className="flex-1 overflow-y-auto px-4 sm:px-6 lg:px-8 py-4 lg:py-8">
              {/* Note: Ideally RouteGuard wraps just the content or is inside pages, 
                   but putting it here covers global navigation changes generally. 
                   Better strictly to put it inside the body components if specific page logic is needed,
                   but for global redirects this works if Client Component. 
                   Wait, RootLayout is Server Component usually? 
                   Ah, "use client" isn't here. RootLayout is server component.
                   We need to make a client wrapper for the store and sidebar to use RouteGuard?
                   Currently Sidebar works because it has "use client".
                   StoreProvider has "use client".
                   RouteGuard needs "use client".
                   
                   Let's assume RouteGuard is used inside the pages individually as requested:
                   "In each page file: ... redirect".
                   
                   Actually, user said "In each page file". 
                   So I will NOT wrap it globally here to avoid hydration issues if Root is server.
                   I will update the page files as requested.
                */}
              {children}
            </main>
          </div>
        </StoreProvider>
      </body>
    </html>
  );
}
