'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { LogOut, User, Settings } from 'lucide-react';
import Logo from './Logo';

export default function DashboardHeader() {
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const router = useRouter();

  const handleLogout = () => {
    localStorage.removeItem('userSession');
    router.replace('/login');
  };

  return (
    <header className="glass-effect fixed w-full top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          <Logo size="medium" />

          {/* User Menu */}
          <div className="relative">
            <button
              onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
              className="flex items-center space-x-2 text-gray-200 hover:text-blue-400 px-3 py-2 text-sm font-medium transition-colors"
            >
              <User className="h-5 w-5" />
              <span>Account</span>
            </button>

            {/* Dropdown Menu */}
            {isUserMenuOpen && (
              <div className="absolute right-0 mt-2 w-48 glass-effect rounded-lg shadow-lg border border-gray-700">
                <div className="py-2">
                  <Link
                    href="/settings"
                    className="w-full flex items-center space-x-2 px-4 py-2 text-sm text-gray-200 hover:text-blue-400 hover:bg-gray-800/50 transition-colors"
                    onClick={() => setIsUserMenuOpen(false)}
                  >
                    <Settings className="h-4 w-4" />
                    <span>Settings</span>
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="w-full flex items-center space-x-2 px-4 py-2 text-sm text-gray-200 hover:text-blue-400 hover:bg-gray-800/50 transition-colors"
                  >
                    <LogOut className="h-4 w-4" />
                    <span>Sign out</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}