// src/components/DashboardCard.tsx
'use client';

import React from 'react';
import {
  Sparkles,
  Calendar,
  Coins,
  UserCircle,
  Lightbulb,
} from 'lucide-react';

interface DashboardCardProps {
  username?: string;
  credits: number;
  trialEnds: string;
  dailyTrialUsed: number;
  plan?: string;
}

const DashboardCard: React.FC<DashboardCardProps> = ({
  username = 'User',
  credits,
  trialEnds,
  dailyTrialUsed,
  plan = 'Pro',
}) => {
  return (
    <div className="w-full max-w-3xl mx-auto p-6 bg-neutral-900 rounded-3xl shadow-2xl text-white space-y-6">
      <div className="flex items-center gap-4 border-b border-neutral-700 pb-5">
        <UserCircle className="w-12 h-12 text-blue-400" />
        <div>
          <h2 className="text-xl font-semibold">Welcome, {username} 👋</h2>
          <p className="text-sm text-neutral-400">
            Plan: <span className="font-medium text-white">{plan}</span>
          </p>
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-gradient-to-tr from-yellow-500 to-yellow-600 p-4 rounded-xl text-black shadow-lg">
          <div className="flex items-center gap-2">
            <Coins className="w-5 h-5" />
            <span className="text-sm">Credits</span>
          </div>
          <h3 className="text-2xl font-bold mt-2">{credits}</h3>
        </div>
        <div className="bg-gradient-to-tr from-purple-500 to-purple-600 p-4 rounded-xl text-black shadow-lg">
          <div className="flex items-center gap-2">
            <Sparkles className="w-5 h-5" />
            <span className="text-sm">Trial Ends</span>
          </div>
          <h3 className="text-lg font-semibold mt-2">{trialEnds}</h3>
        </div>
        <div className="bg-gradient-to-tr from-blue-500 to-blue-600 p-4 rounded-xl text-black shadow-lg">
          <div className="flex items-center gap-2">
            <Calendar className="w-5 h-5" />
            <span className="text-sm">Used Today</span>
          </div>
          <h3 className="text-xl font-bold mt-2">{dailyTrialUsed} / 3</h3>
        </div>
      </div>
      <div className="bg-neutral-800 p-4 rounded-xl flex items-start gap-3 border border-neutral-700">
        <Lightbulb className="w-6 h-6 text-yellow-300" />
        <div>
          <h4 className="font-semibold">Tip of the Day</h4>
          <p className="text-sm text-neutral-300">
            Use short, clear prompts for faster AI results and optimal credits.
          </p>
        </div>
      </div>
      <div className="pt-2">
        <h4 className="text-sm text-neutral-400 mb-1">Daily Usage</h4>
        <div className="w-full h-3 bg-neutral-700 rounded-full overflow-hidden">
          <div
            className="h-full bg-blue-500 transition-all duration-300"
            style={{ width: `${(dailyTrialUsed / 3) * 100}%` }}
          />
        </div>
      </div>
    </div>
  );
};

export default DashboardCard;
