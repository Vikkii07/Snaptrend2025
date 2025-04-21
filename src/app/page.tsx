// src/app/page.tsx
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import Header from '@/components/Header';
import HeroSection from '@/components/HeroSection';
import Footer from '@/components/Footer';
import HomeClientRedirect from '@/components/HomeClientRedirect'; // 👈 client helper

export default async function HomePage() {
  const supabase = createServerComponentClient({ cookies });
  const { data: { session } } = await supabase.auth.getSession();

  return (
    <>
      <HomeClientRedirect /> {/* 🔁 auto-redirect if session available */}
      <Header />
      <HeroSection />
      <Footer />
    </>
  );
}
