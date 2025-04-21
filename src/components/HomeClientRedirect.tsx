'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useSession } from '@supabase/auth-helpers-react';

export default function HomeClientRedirect() {
  const session = useSession();
  const router = useRouter();

  useEffect(() => {
    if (session?.user) {
      router.replace('/tools/ai-image');
    }
  }, [session]);

  return null;
}
