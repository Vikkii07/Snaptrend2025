'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabaseClient';
import { Loader2 } from 'lucide-react';

export default function AuthCallbackPage() {
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    async function handleAuth() {
      // This parses the URL for the OAuth response and sets the session
      const { data, error } = await supabase.auth.getSessionFromUrl({
        storeSession: true,
      });

      if (error) {
        console.error('OAuth callback error:', error);
        // Optionally show a friendly error page or toast
      }

      // Redirect to home (or dashboard)
      router.replace('/');
    }

    handleAuth();
  }, [router]);

  return (
    <div className="flex items-center justify-center h-screen bg-black">
      <div className="text-white flex flex-col items-center">
        <Loader2 className="animate-spin w-10 h-10 mb-4" />
        <p>Finishing sign in…</p>
      </div>
    </div>
  );
}
