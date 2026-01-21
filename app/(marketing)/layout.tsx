'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from '@/components/ui/dropdown-menu';
import { NavDropdown } from '@/components/ui/nav-dropdown';
import { Footer } from '@/components/footer';
import { AnnouncementBar } from '@/components/announcement-bar';
import {
  solutionsNav,
  resourcesNav,
  marketingStandaloneLinks,
} from '@/lib/navigation-config';
import { cn } from '@/lib/utils';
import { Menu, X } from 'lucide-react';
import { useState } from 'react';

/**
 * Marketing Layout - Public Pages Only
 *
 * Used for marketing pages like homepage, pricing, solutions, docs, etc.
 * Shows marketing navigation with Solutions, Resources, Pricing, etc.
 *
 * TODO: Add authentication check - redirect logged-in users to /dashboard
 */
export default function MarketingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-background">
      {/* Announcement Bar */}
      <AnnouncementBar
        message="🚀 Limited Time Offer: Get 20% off annual plans!"
        linkText="Learn More"
        linkHref="/pricing"
      />

      {/* Marketing Navigation */}
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/60">
        <div className="max-w-7xl mx-auto flex h-16 items-center px-4 sm:px-6 lg:px-8">
          {/* Left: Logo + Marketing Nav */}
          <div className="flex items-center gap-2 lg:gap-6">
            {/* Logo */}
            <Link
              href="/"
              className="flex items-center gap-2 font-semibold shrink-0"
            >
              <div className="w-8 h-8 rounded-md bg-gradient-to-br from-blue-600 to-indigo-600 flex items-center justify-center">
                <span className="text-white text-sm font-bold">DC</span>
              </div>
              <span className="hidden lg:inline-block text-xl">DevControl</span>
            </Link>

            {/* Desktop Marketing Navigation */}
            <nav className="hidden lg:flex items-center gap-0.5">
              {/* Solutions Dropdown */}
              <NavDropdown group={solutionsNav} />

              {/* Resources Dropdown */}
              <NavDropdown group={resourcesNav} />

              {/* Standalone Links */}
              {marketingStandaloneLinks.map((link) => {
                const isActive =
                  pathname === link.href || pathname.startsWith(link.href + '/');
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={cn(
                      'px-3 py-2 text-base font-medium rounded-md transition-colors',
                      'hover:bg-accent hover:text-accent-foreground',
                      isActive ? 'text-foreground' : 'text-muted-foreground'
                    )}
                  >
                    {link.label}
                  </Link>
                );
              })}
            </nav>
          </div>

          {/* Right: CTA Buttons */}
          <div className="ml-auto flex items-center gap-2 lg:gap-3 shrink-0">
            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 hover:bg-accent rounded-md transition-colors"
              aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
            >
              {mobileMenuOpen ? (
                <X className="w-5 h-5" />
              ) : (
                <Menu className="w-5 h-5" />
              )}
            </button>

            {/* Sign In */}
            <Button asChild variant="ghost" size="sm">
              <Link href="/login">Sign In</Link>
            </Button>

            {/* Get Started */}
            <Button asChild size="sm" className="bg-blue-600 hover:bg-blue-700 text-white">
              <Link href="/signup">Get Started</Link>
            </Button>
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden border-t bg-background">
            <div className="px-4 py-4 space-y-4">
              {/* Solutions Links */}
              <div>
                <div className="text-xs uppercase text-muted-foreground font-semibold mb-2 px-2">
                  Solutions
                </div>
                <div className="space-y-1">
                  {solutionsNav.sections?.map((section) =>
                    section.items.map((item) => {
                      const isActive =
                        pathname === item.href ||
                        pathname.startsWith(item.href + '/');
                      return (
                        <Link
                          key={item.href}
                          href={item.href}
                          className={cn(
                            'block px-3 py-2 text-sm rounded-md transition-colors',
                            'hover:bg-accent',
                            isActive
                              ? 'bg-accent text-foreground'
                              : 'text-muted-foreground'
                          )}
                          onClick={() => setMobileMenuOpen(false)}
                        >
                          {item.label}
                        </Link>
                      );
                    })
                  )}
                </div>
              </div>

              <DropdownMenuSeparator />

              {/* Resources Links */}
              <div>
                <div className="text-xs uppercase text-muted-foreground font-semibold mb-2 px-2">
                  Resources
                </div>
                <div className="space-y-1">
                  {resourcesNav.items?.map((item) => {
                    const isActive =
                      pathname === item.href ||
                      pathname.startsWith(item.href + '/');
                    return (
                      <Link
                        key={item.href}
                        href={item.href}
                        className={cn(
                          'block px-3 py-2 text-sm rounded-md transition-colors',
                          'hover:bg-accent',
                          isActive
                            ? 'bg-accent text-foreground'
                            : 'text-muted-foreground'
                        )}
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        {item.label}
                      </Link>
                    );
                  })}
                </div>
              </div>

              <DropdownMenuSeparator />

              {/* Standalone Links */}
              {marketingStandaloneLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    'block px-3 py-2 text-sm font-medium rounded-md transition-colors',
                    'hover:bg-accent',
                    pathname === link.href
                      ? 'bg-accent text-foreground'
                      : 'text-muted-foreground'
                  )}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
        )}
      </header>

      {/* Marketing Content */}
      <main>{children}</main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
