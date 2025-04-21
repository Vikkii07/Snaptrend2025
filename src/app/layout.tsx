// src/app/layout.tsx

import '@/globals.css'; // ✅ use path alias for clarity

import { cookies } from 'next/headers';
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { Geist, Geist_Mono } from 'next/font/google';

import { SupabaseProvider } from '@/components/SupabaseProvider';
import { type Database } from '@/types/supabase';

// Load fonts
const geistSans = Geist({
  subsets: ['latin'],
  variable: '--font-geist-sans',
});

const geistMono = Geist_Mono({
  subsets: ['latin'],
  variable: '--font-geist-mono',
});

// Metadata
export const metadata = {
  title: 'SnapTrend',
  description: 'AI-powered content repurposing platform',
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = createServerComponentClient<Database>({ cookies });

  const {
    data: { session },
  } = await supabase.auth.getSession();

  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <SupabaseProvider initialSession={session}>
          {children}
        </SupabaseProvider>
      </body>
    </html>
  );
}
