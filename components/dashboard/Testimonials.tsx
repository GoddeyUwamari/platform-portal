/**
 * Testimonials Component
 * Social proof section with customer testimonials
 */

'use client';

import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Quote } from 'lucide-react';

interface Testimonial {
  quote: string;
  author: string;
  role: string;
  company: string;
}

const testimonials: Testimonial[] = [
  {
    quote: 'Reduced AWS costs by 37% in the first month',
    author: 'Sarah Chen',
    role: 'Platform Engineering Lead',
    company: 'DataCo',
  },
  {
    quote: 'DevControl is the easiest platform tool we\'ve used',
    author: 'Mike Rodriguez',
    role: 'CTO',
    company: 'StartupX',
  },
  {
    quote: 'Finally, visibility into our entire AWS infrastructure in one place',
    author: 'Jessica Taylor',
    role: 'VP of Engineering',
    company: 'TechFlow',
  },
];

export function Testimonials() {
  return (
    <div className="py-8">
      {/* Section Header */}
      <div className="mb-8 text-center">
        <h2 className="mb-2 text-2xl font-bold text-gray-900">
          Trusted by Engineering Teams
        </h2>
        <p className="text-gray-600">
          See what our customers have to say
        </p>
      </div>

      {/* Testimonial Cards */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {testimonials.map((testimonial, index) => (
          <Card
            key={index}
            className="group border-gray-200 bg-gray-50 transition-all duration-300 hover:shadow-lg hover:-translate-y-1 hover:bg-white animate-in fade-in slide-in-from-bottom-3"
            style={{ animationDelay: `${index * 150}ms`, animationDuration: '500ms' }}
          >
            <CardContent className="p-6">
              {/* Quote Icon */}
              <Quote className="mb-4 h-8 w-8 text-[#635BFF] opacity-50 transition-opacity duration-300 group-hover:opacity-70" />

              {/* Quote */}
              <p className="mb-4 text-base font-medium text-gray-900">
                "{testimonial.quote}"
              </p>

              {/* Author Info */}
              <div className="border-t border-gray-200 pt-4">
                <p className="font-semibold text-gray-900">
                  {testimonial.author}
                </p>
                <p className="text-sm text-gray-600">
                  {testimonial.role}
                </p>
                <p className="text-sm text-gray-500">
                  {testimonial.company}
                </p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
