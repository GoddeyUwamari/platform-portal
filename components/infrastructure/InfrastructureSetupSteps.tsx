'use client';

import { Shield, Link2, Check, BarChart3, Lock } from 'lucide-react';
import { useState } from 'react';

interface Step {
  number: number;
  icon: React.ReactNode;
  title: string;
  description: string;
  time: string;
  action: string;
  completed: boolean;
  locked: boolean;
}

export function InfrastructureSetupSteps() {
  const [currentStep] = useState(1);

  const steps: Step[] = [
    {
      number: 1,
      icon: <Shield className="w-8 h-8" />,
      title: 'Create IAM Role',
      description: 'Set up read-only IAM role for DevControl',
      time: '1 min',
      action: 'Start Setup',
      completed: false,
      locked: false,
    },
    {
      number: 2,
      icon: <Link2 className="w-8 h-8" />,
      title: 'Connect AWS',
      description: 'Enter AWS Account ID and Role ARN',
      time: '30 sec',
      action: 'Connect',
      completed: false,
      locked: true,
    },
    {
      number: 3,
      icon: <Check className="w-8 h-8" />,
      title: 'Grant Access',
      description: 'Verify permissions and test connection',
      time: '30 sec',
      action: 'Test Connection',
      completed: false,
      locked: true,
    },
    {
      number: 4,
      icon: <BarChart3 className="w-8 h-8" />,
      title: 'View Data',
      description: 'Initial sync and data population',
      time: 'instant',
      action: 'View Dashboard',
      completed: false,
      locked: true,
    },
  ];

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-8">
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          🚀 Quick Setup: Connect AWS in 3 Minutes
        </h2>
        <p className="text-gray-600">
          Follow these 4 simple steps to start tracking your infrastructure
        </p>
      </div>

      {/* Steps Grid */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
        {steps.map((step, index) => (
          <div key={index} className="relative">
            {/* Connector Line (not on last step) */}
            {index < steps.length - 1 && (
              <div className="hidden md:block absolute top-16 left-full w-full h-0.5 bg-gray-200 -translate-x-1/2">
                <div className="h-full bg-blue-600" style={{ width: '0%' }} />
              </div>
            )}

            <div className={`relative bg-white rounded-lg border-2 p-6 transition-all ${
              step.locked
                ? 'border-gray-200 opacity-50'
                : step.completed
                ? 'border-green-500'
                : 'border-blue-500 shadow-md'
            }`}>
              {/* Step Number Badge */}
              <div className="absolute -top-3 -left-3 w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold text-sm">
                {step.number}
              </div>

              {/* Lock Icon (if locked) */}
              {step.locked && (
                <div className="absolute top-4 right-4">
                  <Lock className="w-5 h-5 text-gray-400" />
                </div>
              )}

              {/* Icon */}
              <div className={`w-16 h-16 rounded-lg flex items-center justify-center mb-4 mx-auto ${
                step.locked ? 'bg-gray-100 text-gray-400' : 'bg-blue-100 text-blue-600'
              }`}>
                {step.icon}
              </div>

              {/* Content */}
              <h3 className="text-lg font-semibold text-gray-900 mb-2 text-center">
                {step.title}
              </h3>

              <p className="text-sm text-gray-600 mb-3 text-center">
                {step.description}
              </p>

              <div className="text-xs text-gray-500 text-center mb-4">
                ⏱️ {step.time}
              </div>

              {/* Action Button */}
              <button
                disabled={step.locked}
                className={`w-full py-2 px-4 rounded-lg font-medium text-sm transition-colors ${
                  step.locked
                    ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                    : 'bg-blue-600 text-white hover:bg-blue-700'
                }`}
              >
                {step.action}
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Progress Bar */}
      <div className="space-y-2">
        <div className="flex items-center justify-between text-sm">
          <span className="text-gray-600">Progress</span>
          <span className="font-medium text-gray-900">1 of 4 steps</span>
        </div>
        <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
          <div
            className="h-full bg-blue-600 transition-all duration-300"
            style={{ width: '25%' }}
          />
        </div>
      </div>
    </div>
  );
}
