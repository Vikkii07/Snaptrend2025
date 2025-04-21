'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { createBrowserSupabaseClient } from '@supabase/auth-helpers-nextjs'
import { type User, type Session } from '@supabase/supabase-js'
import { Menu, X, Wand2, ChevronDown } from 'lucide-react'

const Header = () => {
  const [supabase] = useState(() => createBrowserSupabaseClient())
  const [user, setUser] = useState<User | null>(null)
  const [mobileNavOpen, setMobileNavOpen] = useState(false)
  const [toolsOpen, setToolsOpen] = useState(false)
  const router = useRouter()

  useEffect(() => {
    const fetchUser = async () => {
      const { data: { session } } = await supabase.auth.getSession()
      setUser(session?.user ?? null)
    }

    fetchUser()

    const { data: authListener } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null)
    })

    return () => {
      authListener?.subscription.unsubscribe()
    }
  }, [supabase])

  const handleLogout = async () => {
    await supabase.auth.signOut()
    setUser(null)
    router.push('/')
    router.refresh()
  }

  const toggleMobileNav = () => setMobileNavOpen(!mobileNavOpen)
  const toggleTools = () => setToolsOpen(!toolsOpen)

  return (
    <header className="w-full fixed top-0 md:top-10 left-0 z-50 border-b border-white/10 bg-black/40 backdrop-blur-md font-sans">
      <div className="max-w-screen-2xl mx-auto px-4 lg:px-7 flex items-center justify-between h-[80px]">
        {/* Logo */}
        <Link href="/" className="text-4xl font-extrabold tracking-tight text-white">
          <span className="text-white">Snap</span>
          <span className="text-indigo-400">Trend</span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden lg:flex items-center space-x-15 text-sm text-gray-300 font-medium relative">
          <Link href="/" className="hover:text-white transition">Home</Link>
          {/* Tools Dropdown */}
          <div className="relative">
            <button onClick={toggleTools} className="hover:text-white transition flex items-center gap-1">
              <Wand2 size={16} />
              Tools
              <ChevronDown
                size={16}
                className={`${toolsOpen ? 'rotate-180' : ''} transition-transform duration-200`}
              />
            </button>
            {toolsOpen && (
              <div className="absolute top-full left-1/2 -translate-x-1/2 mt-4 w-60 bg-neutral-900 border border-white/10 rounded-sm shadow-xl z-40 p-4 space-y-7">
                <Link href="/Signup" className="block text-sm text-white hover:text-indigo-400">AI Image Generator</Link>
                <Link href="/Signup" className="block text-sm text-white hover:text-indigo-400">AI Video Generator</Link>
                <Link href="/Signup" className="block text-sm text-white hover:text-indigo-400">AI Video Repurposing</Link>
                <Link href="/Signup" className="block text-sm text-white hover:text-indigo-400">Auto-Caption</Link>
                <Link href="/Signup" className="block text-sm text-white hover:text-indigo-400">Split Screen Tool</Link>
              </div>
            )}
          </div>

          <Link href="/Pricing" className="hover:text-white transition">Pricing</Link>
          <Link href="/FAQ" className="hover:text-white transition">FAQ</Link>
          <Link href="/Support" className="hover:text-white transition">Support</Link>
        </nav>

        {/* Auth Buttons */}
        <div className="flex items-center gap-x-5">
          {!user && (
            <>
              <Link href="/Login" className="text-lg text-blue-500 font-medium lg:block hidden">Login</Link>
              <Link href="/Signup" className="hidden lg:inline-block px-3 py-2 bg-white text-black text-sm font-bold rounded-sm hover:bg-gray-200 transition">
                Start Creating
              </Link>
              {/* Mobile login button */}
              <Link href="/Login" className="lg:hidden text-lg text-blue-500 font-medium">Login</Link>
            </>
          )}

          {user && (
            <button onClick={handleLogout} className="text-sm text-red-400 font-medium hover:underline hidden lg:block">
              Logout
            </button>
          )}

          {/* Mobile Nav Toggle */}
          <button onClick={toggleMobileNav} className="lg:hidden text-white">
            {mobileNavOpen ? <X size={26} /> : <Menu size={26} />}
          </button>
        </div>
      </div>

      {/* Mobile Nav Dropdown */}
      {mobileNavOpen && (
        <div className="lg:hidden bg-black/90 p-4 space-y-4 text-white">
          <Link href="/" onClick={() => setMobileNavOpen(false)} className="block">Home</Link>
          <Link href="/Pricing" onClick={() => setMobileNavOpen(false)} className="block">Pricing</Link>
          <Link href="/FAQ" onClick={() => setMobileNavOpen(false)} className="block">FAQ</Link>
          <Link href="/Support" onClick={() => setMobileNavOpen(false)} className="block">Support</Link>

          {!user ? (
            <>
              <Link href="/Login" onClick={() => setMobileNavOpen(false)} className="block text-blue-400">Login</Link>
              <Link href="/Signup" onClick={() => setMobileNavOpen(false)} className="block text-white">Start Creating</Link>
            </>
          ) : (
            <button onClick={handleLogout} className="block text-red-400">Logout</button>
          )}
        </div>
      )}
    </header>
  )
}

export default Header
