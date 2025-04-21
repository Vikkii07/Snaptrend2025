'use client'

import Link from 'next/link'
import { useRouter, usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabaseClient'
import {
  ImageIcon,
  VideoIcon,
  ScissorsIcon,
  CaptionsIcon,
  LayoutIcon,
  LogOut,
  X,
} from 'lucide-react'
import clsx from 'clsx'

import { User } from '@supabase/supabase-js'

export default function PrivateSidebar({
  isOpen = true,
  onClose,
}: {
  isOpen?: boolean
  onClose?: () => void
}) {
  const router = useRouter()
  const pathname = usePathname()

  const [user, setUser] = useState<User | null>(null)
  const [avatarUrl, setAvatarUrl] = useState<string | null>(null)

  useEffect(() => {
    const getSession = async () => {
      const { data: { session } } = await supabase.auth.getSession()
      setUser(session?.user ?? null)

      if (session?.user) {
        // Fetch user profile from the database (e.g., a 'profiles' table)
        const { data, error } = await supabase
          .from('profiles')
          .select('avatar_url')
          .eq('id', session.user.id)
          .single()

        if (error) {
          console.error('Error fetching profile:', error)
        } else {
          setAvatarUrl(data?.avatar_url ?? null) // Set avatar URL or fallback to null
        }
      }
    }
    getSession()
  }, [])

  const handleLogout = async () => {
    await supabase.auth.signOut()
    router.push('/')
    router.refresh()
  }

  const navItems = [
    { href: '/tools/ai-image', icon: <ImageIcon size={18} />, label: 'AI Image Generator' },
    { href: '/tools/ai-video', icon: <VideoIcon size={18} />, label: 'AI Video Generator' },
    { href: '/tools/ai-repurposing', icon: <ScissorsIcon size={18} />, label: 'Video Repurposing' },
    { href: '/tools/auto-caption', icon: <CaptionsIcon size={18} />, label: 'Auto-Caption' },
    { href: '/tools/split-screen', icon: <LayoutIcon size={18} />, label: 'Split Screen Tool' },
  ]

  return (
    <aside
      className={clsx(
        'fixed top-0 right-0 z-50 h-screen w-64 bg-neutral-900 shadow-lg p-6 flex flex-col justify-between transform transition-transform duration-300',
        {
          'translate-x-0': isOpen,
          'translate-x-full': !isOpen,
        }
      )}
    >
      <div>
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-2xl font-bold text-white">
            Snap<span className="text-indigo-400">Trend</span>
          </h1>
          {onClose && (
            <button onClick={onClose} className="md:hidden">
              <X className="text-white w-5 h-5" />
            </button>
          )}
        </div>

        {/* Profile */}
        <Link href="/dashboard" className="mb-8 block">
          {/* Dynamic Profile Image */}
          <img
            src={avatarUrl ?? '/default-avatar.png'} // Use fetched avatar or fallback to default
            alt="Profile"
            className="w-12 h-12 rounded-full mb-4 hover:opacity-80 transition"
          />
        </Link>

        {/* Navigation */}
        <nav className="space-y-6 text-white">
          {navItems.map((item) => (
            <div key={item.href} onClick={onClose}>
              <Link
                href={item.href}
                className={clsx(
                  'flex items-center gap-3 hover:text-indigo-400',
                  pathname === item.href && 'text-indigo-400 font-semibold'
                )}
              >
                {item.icon} {item.label}
              </Link>
            </div>
          ))}
        </nav>
      </div>

      {/* Logout */}
      <button
        onClick={handleLogout}
        className="flex items-center gap-2 text-red-500 mt-6 hover:text-red-400"
      >
        <LogOut size={18} /> Logout
      </button>
    </aside>
  )
}
