/**
 * WelcomeModal Component
 * Auto-opens on first login to introduce DevControl
 */

'use client';

import React, { useEffect, useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { useOnboarding } from '@/lib/stores/onboarding-store';

export function WelcomeModal() {
  const { currentStage, completeStep } = useOnboarding();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    // Auto-open on welcome stage
    if (currentStage === 'welcome') {
      // Small delay for better UX
      const timer = setTimeout(() => {
        setOpen(true);

        // Track analytics
        if (typeof window !== 'undefined' && (window as any).analytics) {
          (window as any).analytics.track('onboarding_welcome_shown');
        }
      }, 500);

      return () => clearTimeout(timer);
    }
  }, [currentStage]);

  const handleGetStarted = async () => {
    // Track analytics
    if (typeof window !== 'undefined' && (window as any).analytics) {
      (window as any).analytics.track('onboarding_welcome_completed');
    }

    await completeStep('welcome');
    setOpen(false);
  };

  const handleSkip = () => {
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle className="text-2xl">Welcome to DevControl 👋</DialogTitle>
        </DialogHeader>

        <div className="space-y-4 py-4">
          <p className="text-gray-600 dark:text-gray-400">
            DevControl helps you manage AWS infrastructure, track deployments, and optimize
            costs — all in one place.
          </p>

          <div className="grid grid-cols-3 gap-4 py-4">
            <div className="text-center">
              <div className="text-3xl mb-2" aria-hidden="true">
                🚀
              </div>
              <h4 className="font-semibold text-sm mb-1">Track Services</h4>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                Monitor all your microservices
              </p>
            </div>

            <div className="text-center">
              <div className="text-3xl mb-2" aria-hidden="true">
                💰
              </div>
              <h4 className="font-semibold text-sm mb-1">AWS Costs</h4>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                Real-time spend tracking
              </p>
            </div>

            <div className="text-center">
              <div className="text-3xl mb-2" aria-hidden="true">
                📊
              </div>
              <h4 className="font-semibold text-sm mb-1">DORA Metrics</h4>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                Measure DevOps performance
              </p>
            </div>
          </div>

          <div className="bg-blue-50 dark:bg-blue-950 p-4 rounded-lg">
            <h4 className="font-semibold text-sm mb-2">Quick Setup (5 minutes)</h4>
            <ol className="text-sm text-gray-700 dark:text-gray-300 space-y-1 ml-4 list-decimal">
              <li>Create your first service</li>
              <li>Log a deployment</li>
              <li>Connect your AWS account</li>
              <li>Discover resources</li>
            </ol>
          </div>
        </div>

        <div className="flex justify-end gap-3">
          <Button variant="outline" onClick={handleSkip}>
            I'll Do This Later
          </Button>
          <Button onClick={handleGetStarted}>Get Started</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
