'use client';

import React, { useEffect, useState } from 'react';
import DashboardCard from '@/components/DashboardCard';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';

const Page = () => {
  const supabase = createClientComponentClient();
  const [profile, setProfile] = useState<{
    username: string;
    credits: number;
    trial_ends: string;
    daily_trial_used: number;
    plan: string;
  } | null>(null);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getProfile = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();

      const user = session?.user;

      if (!user) {
        setLoading(false);
        return;
      }

      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .single();

      if (error) {
        console.error('Error fetching profile:', error);
      } else {
        setProfile(data);
      }
      setLoading(false);
    };

    getProfile();
  }, []);

  if (loading) {
    return <p className="text-center text-white mt-10">Loading profile...</p>;
  }

  if (!profile) {
    return <p className="text-center text-white mt-10">No profile found.</p>;
  }

  return (
    <div className="min-h-screen bg-black py-10 px-4">
      <DashboardCard
        username={profile.username}
        credits={profile.credits}
        trialEnds={new Date(profile.trial_ends).toLocaleDateString()}
        dailyTrialUsed={profile.daily_trial_used}
        plan={profile.plan}
      />
    </div>
  );
};

export default Page;
