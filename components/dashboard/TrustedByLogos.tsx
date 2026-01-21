/**
 * TrustedByLogos Component - UPDATED
 * Social proof section with generic trust messaging
 *
 * NOTE: Fake company logos (TechCorp, CloudStart, DevOps Inc, etc.) have been removed
 * for legal compliance. Re-add logos only with written permission from real customers.
 */

'use client';

import React from 'react';
import { Shield, Clock, CheckCircle2, Award } from 'lucide-react';

export function TrustedByLogos() {
  const trustIndicators = [
    { icon: Shield, label: 'Enterprise Security', desc: 'AES-256 encryption' },
    { icon: Clock, label: 'Quick Setup', desc: '3-minute integration' },
    { icon: CheckCircle2, label: 'Read-Only Access', desc: 'We never modify AWS' },
    { icon: Award, label: '99.9% Uptime', desc: 'Enterprise SLA' },
  ];

  return (
    <section className="py-12 bg-white border-y border-gray-100">
      <div className="mx-auto max-w-7xl px-4">
        {/* Heading */}
        <div className="text-center mb-8">
          <p className="text-sm font-medium text-gray-500 uppercase tracking-wide">
            Trusted by engineering teams from startups to Fortune 500 companies
          </p>
        </div>

        {/* Trust indicators grid */}
        <div className="flex flex-wrap items-center justify-center gap-8">
          {trustIndicators.map((item, index) => {
            const Icon = item.icon;
            return (
              <div
                key={index}
                className="flex items-center gap-3 px-6 py-3 bg-gray-50 rounded-lg border border-gray-100 hover:border-gray-200 transition-colors"
              >
                <Icon className="h-5 w-5 text-blue-600" />
                <div>
                  <p className="text-sm font-semibold text-gray-900">{item.label}</p>
                  <p className="text-xs text-gray-500">{item.desc}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
