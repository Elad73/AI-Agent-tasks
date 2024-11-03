'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

export const Header = () => {
  const pathname = usePathname()

  return (
    <header className="bg-white shadow-sm">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <Link 
              href="/" 
              className="flex items-center px-2 py-2 text-gray-900 font-medium"
            >
              AI Agent System
            </Link>
            <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
              <Link
                href="/agents"
                className={`inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium ${
                  pathname.startsWith('/agents')
                    ? 'border-indigo-500 text-gray-900'
                    : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'
                }`}
              >
                Agents
              </Link>
            </div>
          </div>
        </div>
      </nav>
    </header>
  )
}
