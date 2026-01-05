/**
 * OnboardingProgress Component
 * Shows progress banner at top of app with dismiss option
 */

'use client';

import React from 'react';
import { CheckCircle2, Circle, X } from 'lucide-react';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import { useOnboarding } from '@/lib/stores/onboarding-store';

export function OnboardingProgress() {
  const { stages, progress, isCompleted, isDismissed, dismiss } = useOnboarding();

  // Don't show if completed or dismissed
  if (isCompleted || isDismissed || !stages.length) {
    return null;
  }

  const remainingSteps = stages.filter((s) => !s.completed).length;

  return (
    <div className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-950 dark:to-indigo-950 border-b border-blue-200 dark:border-blue-800">
      <div className="max-w-7xl mx-auto px-4 py-4">
        <div className="flex items-center justify-between mb-3">
          <div>
            <h3 className="text-sm font-semibold text-gray-900 dark:text-gray-100">
              Getting Started with DevControl
            </h3>
            <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">
              {progress}% complete · {remainingSteps} step{remainingSteps !== 1 ? 's' : ''}{' '}
              remaining
            </p>
          </div>

          <Button
            variant="ghost"
            size="sm"
            onClick={() => dismiss()}
            className="text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
            aria-label="Dismiss onboarding"
          >
            <X className="w-4 h-4" />
          </Button>
        </div>

        {/* Progress Bar */}
        <Progress value={progress} className="mb-4 h-2" />

        {/* Steps List */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-2">
          {stages.map((stage) => (
            <div
              key={stage.id}
              className={`flex items-center gap-2 text-xs ${
                stage.completed
                  ? 'text-green-700 dark:text-green-400'
                  : 'text-gray-500 dark:text-gray-400'
              }`}
            >
              {stage.completed ? (
                <CheckCircle2 className="w-4 h-4 flex-shrink-0" aria-label="Completed" />
              ) : (
                <Circle className="w-4 h-4 flex-shrink-0" aria-label="Pending" />
              )}
              <span className="truncate">{stage.name}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
