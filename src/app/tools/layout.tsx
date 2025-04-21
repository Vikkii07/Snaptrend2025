'use client';

import { ReactNode, useState } from 'react';
import { Menu } from 'lucide-react';
import PrivateSidebar from '@/components/PrivateSidebar';

export default function ToolsLayout({ children }: { children: ReactNode }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="relative min-h-screen bg-black text-white overflow-x-hidden">
      {/* Mobile Header */}
      <div className="md:hidden flex justify-end px-4 pt-4">
        <button
          onClick={() => setIsSidebarOpen(true)}
          className="text-white focus:outline-none"
          aria-label="Open sidebar"
        >
          <Menu className="w-6 h-6" />
        </button>
      </div>

      {/* Main Content */}
      <main className=" md:pr-[250px]">
        {children}
      </main>

      {/* Desktop Sidebar */}
      <aside className="hidden md:block fixed top-0 right-0 h-full w-[250px] z-30">
        <PrivateSidebar />
      </aside>

      {/* Mobile Sidebar Overlay */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 z-50 bg-black bg-opacity-90 backdrop-blur-sm transition-all duration-300 flex justify-end"
          onClick={() => setIsSidebarOpen(false)}
          aria-label="Sidebar overlay"
        >
          <div
            className="h-full w-[250px] bg-[#121212] shadow-xl"
            onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside
          >
            <PrivateSidebar onClose={() => setIsSidebarOpen(false)} />
          </div>
        </div>
      )}
    </div>
  );
}
