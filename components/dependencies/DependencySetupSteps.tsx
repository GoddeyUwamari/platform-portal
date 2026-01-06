'use client';

import Link from 'next/link';
import { Check, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface Step {
  number: number;
  title: string;
  description: string;
  time: string;
  icon: string;
  cta: string;
  href: string;
  completed: boolean;
  disabled: boolean;
}

interface DependencySetupStepsProps {
  hasServices?: boolean;
}

export function DependencySetupSteps({ hasServices = false }: DependencySetupStepsProps) {
  const steps: Step[] = [
    {
      number: 1,
      title: 'Create Services',
      description: 'Add your microservices to the catalog to get started',
      time: '2 min',
      icon: '🎯',
      cta: 'Go to Services',
      href: '/services',
      completed: hasServices,
      disabled: false,
    },
    {
      number: 2,
      title: 'Define Dependencies',
      description: 'Map which services depend on each other',
      time: '5 min',
      icon: '🔗',
      cta: hasServices ? 'Add Dependency' : 'Complete step 1 first',
      href: hasServices ? '/dependencies/new' : '#',
      completed: false,
      disabled: !hasServices,
    },
    {
      number: 3,
      title: 'View Graph',
      description: 'Visualize your architecture automatically',
      time: 'instant',
      icon: '📊',
      cta: 'Auto-generated',
      href: '/dependencies',
      completed: false,
      disabled: true,
    },
    {
      number: 4,
      title: 'Run Impact Analysis',
      description: 'See what breaks when services go down',
      time: 'instant',
      icon: '⚡',
      cta: 'Unlocks after step 2',
      href: '/dependencies',
      completed: false,
      disabled: true,
    },
  ];

  const completedSteps = steps.filter((s) => s.completed).length;
  const progressPercentage = (completedSteps / steps.length) * 100;

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6">
      {/* Header */}
      <div className="mb-5">
        <h2 className="text-xl font-bold text-gray-900 mb-1">
          🚀 Quick Start: 4 Steps to Dependency Mapping
        </h2>
        <p className="text-sm text-gray-600">
          Get started with service dependency tracking in minutes
        </p>
      </div>

      {/* 4 Cards in Row */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-5">
        {steps.map((step) => (
          <Link
            key={step.number}
            href={step.disabled ? '#' : step.href}
            onClick={(e) => step.disabled && e.preventDefault()}
            className={cn(
              'relative flex flex-col items-center',
              'bg-gradient-to-b from-gray-50 to-white',
              'rounded-lg border-2 p-4 transition-all',
              'min-h-[220px]',
              step.completed && 'border-green-300 bg-gradient-to-b from-green-50 to-white',
              step.disabled
                ? 'border-gray-200 opacity-60 cursor-not-allowed'
                : 'border-gray-300 hover:border-blue-400 hover:shadow-md cursor-pointer'
            )}
          >
            {/* Time Badge (absolute top right) */}
            <div className="absolute top-2 right-2">
              <span
                className={cn(
                  'px-2 py-0.5 rounded-full text-[10px] font-semibold',
                  step.completed
                    ? 'bg-green-100 text-green-700'
                    : 'bg-blue-100 text-blue-700'
                )}
              >
                {step.time}
              </span>
            </div>

            {/* Completion Check (absolute top left) */}
            {step.completed && (
              <div className="absolute top-2 left-2">
                <div className="w-5 h-5 bg-green-500 rounded-full flex items-center justify-center">
                  <Check className="w-3 h-3 text-white" />
                </div>
              </div>
            )}

            {/* Step Number Circle */}
            <div
              className={cn(
                'w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm mb-2',
                step.completed
                  ? 'bg-green-600 text-white'
                  : step.disabled
                  ? 'bg-gray-300 text-gray-600'
                  : 'bg-blue-600 text-white'
              )}
            >
              {step.number}
            </div>

            {/* Icon */}
            <div className="text-3xl mb-2">{step.icon}</div>

            {/* Title */}
            <h3 className="text-sm font-semibold text-gray-900 text-center mb-1 px-2">
              {step.title}
            </h3>

            {/* Description */}
            <p className="text-xs text-gray-600 text-center mb-3 px-2 line-clamp-1">
              {step.description}
            </p>

            {/* Spacer to push button to bottom */}
            <div className="flex-grow" />

            {/* CTA Button */}
            <Button
              size="sm"
              variant={step.disabled || step.completed ? 'outline' : 'default'}
              disabled={step.disabled}
              className="w-full text-xs h-8"
            >
              {step.completed
                ? '✓ Done'
                : step.disabled
                ? 'Locked'
                : step.number === 1
                ? 'Go →'
                : 'View →'}
            </Button>
          </Link>
        ))}
      </div>

      {/* Progress Footer */}
      <div className="pt-4 border-t border-gray-200">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs text-gray-600">
            Progress: <span className="font-semibold">{completedSteps} of {steps.length}</span> steps
            completed
          </span>
          {!hasServices && (
            <Link
              href="/services"
              className="text-xs text-blue-600 hover:text-blue-700 font-medium flex items-center gap-1"
            >
              Start with Services
              <ArrowRight className="w-3 h-3" />
            </Link>
          )}
        </div>

        {/* Progress Bar */}
        <div className="w-full bg-gray-200 rounded-full h-1.5">
          <div
            className="bg-blue-600 h-1.5 rounded-full transition-all duration-300"
            style={{ width: `${progressPercentage}%` }}
          />
        </div>
      </div>
    </div>
  );
}
