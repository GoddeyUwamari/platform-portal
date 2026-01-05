/**
 * QuickStartGuide Component
 * Visual stepper showing the getting started process
 */

'use client';

import React from 'react';
import { Cloud, Search, DollarSign, ArrowRight } from 'lucide-react';

interface Step {
  number: number;
  icon: React.ReactNode;
  title: string;
  time: string;
}

const steps: Step[] = [
  {
    number: 1,
    icon: <Cloud className="h-6 w-6" />,
    title: 'Connect AWS',
    time: '2 minutes',
  },
  {
    number: 2,
    icon: <Search className="h-6 w-6" />,
    title: 'Discover Resources',
    time: 'automatic',
  },
  {
    number: 3,
    icon: <DollarSign className="h-6 w-6" />,
    title: 'Start Saving',
    time: 'immediate',
  },
];

export function QuickStartGuide() {
  return (
    <div className="rounded-lg bg-gradient-to-br from-blue-50 to-white p-8 md:p-12">
      {/* Section Header */}
      <div className="mb-8 text-center">
        <h2 className="mb-2 text-2xl font-bold text-gray-900">
          Get Started in 3 Easy Steps
        </h2>
        <p className="text-gray-600">
          Set up DevControl in minutes and start optimizing your AWS infrastructure
        </p>
      </div>

      {/* Steps */}
      <div className="flex flex-col items-center gap-6 md:flex-row md:justify-center">
        {steps.map((step, index) => (
          <React.Fragment key={step.number}>
            {/* Step Card */}
            <div
              className="flex w-full max-w-xs flex-col items-center text-center md:w-auto transition-all duration-300 hover:scale-105"
              style={{ animationDelay: `${index * 150}ms` }}
            >
              {/* Number Circle */}
              <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-[#635BFF] text-2xl font-bold text-white shadow-lg transition-all duration-300 hover:shadow-xl hover:scale-110">
                {step.number}
              </div>

              {/* Icon */}
              <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-lg bg-blue-100 text-[#635BFF] transition-colors duration-200 hover:bg-blue-200">
                {step.icon}
              </div>

              {/* Title */}
              <h3 className="mb-1 text-lg font-semibold text-gray-900">
                {step.title}
              </h3>

              {/* Time */}
              <p className="text-sm text-gray-500">
                {step.time}
              </p>
            </div>

            {/* Arrow (hidden on mobile, shown between steps on desktop) */}
            {index < steps.length - 1 && (
              <div className="hidden text-gray-300 md:block">
                <ArrowRight className="h-8 w-8" />
              </div>
            )}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
}
