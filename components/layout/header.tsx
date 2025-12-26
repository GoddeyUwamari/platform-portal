'use client'

import { usePathname } from 'next/navigation'
import { LogOut } from 'lucide-react'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

const pageTitles: Record<string, string> = {
  '/dashboard': 'Dashboard',
  '/tenants': 'Tenants',
  '/subscriptions': 'Subscriptions',
  '/invoices': 'Invoices',
}

// Mock user data - authentication disabled
const mockUser = {
  firstName: 'Demo',
  lastName: 'User',
  email: 'demo@devcontrol.dev',
}

export function Header() {
  const pathname = usePathname()

  // Get the page title based on the current route
  const getPageTitle = () => {
    // Check for exact match first
    if (pageTitles[pathname]) {
      return pageTitles[pathname]
    }

    // Check for partial match (e.g., /tenants/123 -> Tenants)
    for (const [path, title] of Object.entries(pageTitles)) {
      if (pathname.startsWith(path + '/')) {
        return title
      }
    }

    return 'Dashboard'
  }

  // Get user initials for avatar
  const getUserInitials = () => {
    const firstInitial = mockUser.firstName?.charAt(0) || mockUser.email.charAt(0)
    const lastInitial = mockUser.lastName?.charAt(0) || ''
    return (firstInitial + lastInitial).toUpperCase()
  }

  return (
    <header className="fixed top-0 left-60 right-0 h-16 bg-white border-b border-gray-200 z-10">
      <div className="h-full px-6 flex items-center justify-between">
        {/* Page Title */}
        <h1 className="text-2xl font-semibold text-gray-900">{getPageTitle()}</h1>

        {/* User Menu */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button className="flex items-center gap-2 hover:opacity-80 transition-opacity">
              <Avatar className="w-9 h-9">
                <AvatarImage src="/avatar.png" alt="User" />
                <AvatarFallback className="bg-[#635BFF] text-white text-sm">
                  {getUserInitials()}
                </AvatarFallback>
              </Avatar>
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-48">
            <div className="px-2 py-1.5">
              <p className="text-sm font-medium">{mockUser.firstName} {mockUser.lastName}</p>
              <p className="text-xs text-muted-foreground">{mockUser.email}</p>
            </div>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  )
}
