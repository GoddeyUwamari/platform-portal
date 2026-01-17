/**
 * TrustedByLogos Component
 * Social proof section showing company logos
 * Used below the hero section to build trust
 */

'use client';

import React from 'react';

export function TrustedByLogos() {
  const companies = [
    { name: 'TechCorp', width: 120 },
    { name: 'CloudStart', width: 140 },
    { name: 'DevOps Inc', width: 130 },
    { name: 'DataFlow', width: 110 },
    { name: 'ScaleUp', width: 125 },
    { name: 'CloudNative', width: 145 },
  ];

  return (
    <section className="py-12 bg-white border-y border-gray-100">
      <div className="mx-auto max-w-7xl px-4">
        {/* Heading */}
        <div className="text-center mb-8">
          <p className="text-sm font-medium text-gray-500 uppercase tracking-wide">
            Trusted by engineering teams at leading companies
          </p>
        </div>

        {/* Logo grid */}
        <div className="flex flex-wrap items-center justify-center gap-x-12 gap-y-8">
          {companies.map((company, index) => (
            <div
              key={index}
              className="grayscale hover:grayscale-0 opacity-60 hover:opacity-100 transition-all duration-300 cursor-pointer"
              style={{ width: `${company.width}px` }}
            >
              {/* Placeholder logo - using text as simple representation */}
              <div className="h-12 flex items-center justify-center">
                <div className="text-2xl font-bold text-gray-800 tracking-tight">
                  {company.name}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Optional: Add a subtle divider or extra trust indicator */}
        <div className="mt-8 text-center">
          <p className="text-xs text-gray-400">
            Join 500+ engineering teams optimizing their AWS infrastructure
          </p>
        </div>
      </div>
    </section>
  );
}
