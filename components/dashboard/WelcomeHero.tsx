/**
 * WelcomeHero Component
 * Enhanced hero section for dashboard empty state
 */

'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { Rocket } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function WelcomeHero() {
  const router = useRouter();

  return (
    <div className="relative overflow-hidden rounded-lg bg-gradient-to-br from-blue-50 via-white to-blue-50 p-12 text-center shadow-sm">
      {/* Large Icon */}
      <div className="mb-6 flex justify-center">
        <div className="animate-in fade-in zoom-in duration-700 rounded-full bg-blue-100 p-6 shadow-md">
          <Rocket className="h-24 w-24 text-[#635BFF] animate-pulse" style={{ animationDuration: '3s' }} />
        </div>
      </div>

      {/* Heading */}
      <h1 className="mb-4 text-4xl font-bold tracking-tight text-gray-900 md:text-5xl">
        Welcome to DevControl
      </h1>

      {/* Description */}
      <p className="mx-auto mb-6 max-w-2xl text-lg leading-relaxed text-gray-600">
        Your AWS infrastructure at a glance — services, deployments, and real-time costs all in one place.
        Let's get started by connecting your first service or syncing AWS resources.
      </p>

      {/* Trust Signals */}
      <div className="mb-8 flex flex-wrap items-center justify-center gap-6 text-sm text-gray-600">
        <div className="flex items-center gap-2">
          <span className="text-green-600">✓</span>
          <span>2-minute setup</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-green-600">✓</span>
          <span>No credit card required</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-green-600">✓</span>
          <span>14-day free trial</span>
        </div>
      </div>

      {/* CTAs */}
      <div className="flex flex-col items-center justify-center gap-3 sm:flex-row">
        <Button
          size="lg"
          className="bg-[#635BFF] hover:bg-[#4f46e5] text-white px-8 transition-all duration-200 hover:scale-105 hover:shadow-lg"
          onClick={() => router.push('/settings/organization?tab=aws')}
        >
          Connect AWS Account
        </Button>
        <Button
          size="lg"
          variant="outline"
          className="border-[#635BFF] text-[#635BFF] hover:bg-[#635BFF] hover:text-white px-8 transition-all duration-200 hover:scale-105"
          onClick={() => router.push('/services/new')}
        >
          Create First Service
        </Button>
      </div>

      {/* Tip */}
      <div className="mx-auto mt-8 flex max-w-md items-start gap-2 rounded-lg bg-blue-50 p-4">
        <span className="flex-shrink-0 text-lg" aria-hidden="true">
          💡
        </span>
        <p className="text-left text-sm text-blue-900">
          <strong>Tip:</strong> Start with your most active service — you'll see deployment metrics within minutes.
        </p>
      </div>
    </div>
  );
}
