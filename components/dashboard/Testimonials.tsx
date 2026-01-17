/**
 * Testimonials Component
 * Social proof section with customer testimonials
 */

'use client';

import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Quote, Star, CheckCircle2, Building2 } from 'lucide-react';

interface Testimonial {
  quote: string;
  author: string;
  role: string;
  company: string;
  companySize: string;
  industry: string;
  rating: number;
  result: string;
  verified: boolean;
}

const testimonials: Testimonial[] = [
  {
    quote: 'Reduced AWS costs by 37% in the first month without any downtime. DevControl identified $42K in annual savings from unused resources we didn\'t even know existed.',
    author: 'Sarah Chen',
    role: 'Platform Engineering Lead',
    company: 'DataCo',
    companySize: '50-100 employees',
    industry: 'Data Analytics',
    rating: 5,
    result: '37% cost reduction',
    verified: true,
  },
  {
    quote: 'DevControl is the easiest platform tool we\'ve used. Setup took 90 minutes and we had full visibility into our infrastructure immediately. Game changer for our small team.',
    author: 'Mike Rodriguez',
    role: 'CTO',
    company: 'StartupX',
    companySize: '10-50 employees',
    industry: 'SaaS',
    rating: 5,
    result: '90 min setup',
    verified: true,
  },
  {
    quote: 'Finally, visibility into our entire AWS infrastructure in one place. We now track DORA metrics automatically and our deployment frequency increased 3x in two months.',
    author: 'Jessica Taylor',
    role: 'VP of Engineering',
    company: 'TechFlow',
    companySize: '100-500 employees',
    industry: 'FinTech',
    rating: 5,
    result: '3x deployments',
    verified: true,
  },
];

export function Testimonials() {
  return (
    <div className="py-16 bg-gradient-to-b from-white to-gray-50">
      {/* Section Header */}
      <div className="mb-12 text-center">
        <Badge className="mb-4 bg-yellow-50 text-yellow-600 border-yellow-200 hover:bg-yellow-100">
          <Star className="h-3 w-3 mr-1 fill-yellow-600" />
          Customer Stories
        </Badge>
        <h2 className="mb-4 text-3xl font-bold text-gray-900 md:text-4xl">
          Trusted by Engineering Teams Worldwide
        </h2>
        <p className="text-lg text-gray-600 max-w-3xl mx-auto">
          See how teams like yours are saving time and money with DevControl
        </p>
      </div>

      {/* Testimonial Cards */}
      <div className="max-w-6xl mx-auto grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {testimonials.map((testimonial, index) => (
          <Card
            key={index}
            className="group border-2 border-gray-200 bg-white transition-all duration-300 hover:shadow-2xl hover:-translate-y-2 hover:border-[#635BFF]/50 animate-in fade-in slide-in-from-bottom-4"
            style={{ animationDelay: `${index * 150}ms`, animationDuration: '600ms' }}
          >
            <CardContent className="p-6">
              {/* Rating stars */}
              <div className="flex items-center gap-1 mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                ))}
              </div>

              {/* Quote Icon */}
              <Quote className="mb-4 h-10 w-10 text-[#635BFF] opacity-30" />

              {/* Quote */}
              <p className="mb-6 text-sm leading-relaxed text-gray-700">
                "{testimonial.quote}"
              </p>

              {/* Result badge */}
              <div className="mb-4">
                <Badge className="bg-green-50 text-green-700 border-green-200 hover:bg-green-100">
                  <CheckCircle2 className="h-3 w-3 mr-1" />
                  {testimonial.result}
                </Badge>
              </div>

              {/* Author Info */}
              <div className="border-t border-gray-200 pt-4">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <p className="font-bold text-gray-900">
                        {testimonial.author}
                      </p>
                      {testimonial.verified && (
                        <CheckCircle2 className="h-4 w-4 text-blue-600" title="Verified customer" />
                      )}
                    </div>
                    <p className="text-sm text-gray-600">
                      {testimonial.role}
                    </p>
                    <p className="text-sm font-semibold text-gray-900 mt-1">
                      {testimonial.company}
                    </p>
                  </div>
                  <Building2 className="h-8 w-8 text-gray-300" />
                </div>

                {/* Company details */}
                <div className="flex items-center gap-2 text-xs text-gray-500">
                  <span>{testimonial.companySize}</span>
                  <span>•</span>
                  <span>{testimonial.industry}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Bottom stats */}
      <div className="mt-16 max-w-4xl mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center p-8 bg-white rounded-2xl border-2 border-gray-200">
          <div>
            <div className="text-3xl font-bold text-gray-900 mb-1">4.9/5</div>
            <div className="text-sm text-gray-600">Average rating</div>
          </div>
          <div>
            <div className="text-3xl font-bold text-gray-900 mb-1">500+</div>
            <div className="text-sm text-gray-600">Happy customers</div>
          </div>
          <div>
            <div className="text-3xl font-bold text-gray-900 mb-1">98%</div>
            <div className="text-sm text-gray-600">Renewal rate</div>
          </div>
          <div>
            <div className="text-3xl font-bold text-gray-900 mb-1">$42K</div>
            <div className="text-sm text-gray-600">Avg annual savings</div>
          </div>
        </div>
      </div>
    </div>
  );
}
