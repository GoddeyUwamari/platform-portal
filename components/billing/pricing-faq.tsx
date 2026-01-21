'use client';

import React, { useState } from 'react';
import {
  ChevronDown,
  RefreshCw,
  CreditCard,
  XCircle,
  FileText,
  AlertCircle,
  Tag,
  Clock,
  Shield,
  RotateCcw,
  Download,
  CalendarDays,
  Headphones,
} from 'lucide-react';

interface FAQItem {
  icon: React.ElementType;
  question: string;
  answer: string;
}

const faqs: FAQItem[] = [
  {
    icon: RefreshCw,
    question: 'Can I change plans anytime?',
    answer:
      'Yes, upgrade or downgrade anytime from your account settings. Changes take effect immediately. Upgrades are prorated for the remainder of your billing cycle, and downgrades apply at the end of your current billing period. No penalties or fees.',
  },
  {
    icon: Clock,
    question: 'What happens after my free trial?',
    answer:
      'After your 14-day free trial, your account automatically converts to your chosen paid plan. You\'ll receive email reminders before the trial ends. If you don\'t want to continue, simply cancel before the trial ends - no charge.',
  },
  {
    icon: RotateCcw,
    question: 'Do you offer refunds?',
    answer:
      'Yes! We offer a 14-day money-back guarantee on all paid plans, no questions asked. If you\'re not satisfied within the first 14 days of your subscription, contact support for a full refund.',
  },
  {
    icon: CreditCard,
    question: 'What payment methods do you accept?',
    answer:
      'We accept all major credit cards (Visa, MasterCard, American Express, Discover) through Stripe. For Enterprise plans, we also offer ACH bank transfers and invoicing with NET-30 terms.',
  },
  {
    icon: Headphones,
    question: 'Is support included?',
    answer:
      'Yes! All plans include support. Free tier gets community support. Starter includes email support (24hr response). Pro gets priority support (4hr response) plus Slack integration. Enterprise includes a dedicated account manager and 24/7 priority support.',
  },
  {
    icon: FileText,
    question: 'What\'s included in the 14-day free trial?',
    answer:
      'Full access to all features of your chosen plan for 14 days. No credit card required to start. Connect your AWS account, explore all features, and see real cost savings opportunities. If you need more time, just ask - we\'re happy to extend.',
  },
  {
    icon: CalendarDays,
    question: 'How does annual billing work?',
    answer:
      'Pay annually and save 20% compared to monthly billing. You\'ll receive a single invoice for the full year. Annual subscriptions can be cancelled anytime, with a prorated refund for unused months.',
  },
  {
    icon: Download,
    question: 'Can I export my data?',
    answer:
      'Yes, export all your data anytime in CSV or JSON format. We believe in data portability. Starter plans and above include export functionality. You can also access your data via API on Enterprise plans.',
  },
  {
    icon: XCircle,
    question: 'Can I cancel anytime?',
    answer:
      'Absolutely. Cancel your subscription at any time from your account settings. No cancellation fees, no penalties. Your access continues until the end of your billing period. You can reactivate anytime.',
  },
  {
    icon: AlertCircle,
    question: 'What happens if I exceed my resource limit?',
    answer:
      'We\'ll send you email notifications as you approach your limit. You can either upgrade or remove resources - we never charge surprise overage fees. You have full control over when to upgrade.',
  },
  {
    icon: Tag,
    question: 'Do you offer discounts for startups or nonprofits?',
    answer:
      'Yes! Early-stage startups (< 2 years, < $1M funding) and registered nonprofits get up to 50% off for the first year. Contact sales@devcontrol.app with your details.',
  },
  {
    icon: Shield,
    question: 'How secure is my AWS data?',
    answer:
      'DevControl uses read-only IAM roles - we never store your AWS credentials. All data is encrypted at rest (AES-256) and in transit (TLS 1.3). We\'re GDPR compliant and working toward SOC 2 Type II certification. Your infrastructure data never leaves our secure environment.',
  },
];

export function PricingFAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  // Split FAQs into two columns for desktop
  const midpoint = Math.ceil(faqs.length / 2);
  const leftColumn = faqs.slice(0, midpoint);
  const rightColumn = faqs.slice(midpoint);

  const renderFAQItem = (faq: FAQItem, index: number, columnOffset: number = 0) => {
    const actualIndex = index + columnOffset;
    const Icon = faq.icon;
    const isOpen = openIndex === actualIndex;

    return (
      <div key={actualIndex} className="group">
        <button
          onClick={() => toggleFAQ(actualIndex)}
          className={`w-full text-left p-5 bg-card rounded-xl border-2 transition-all duration-300 ${
            isOpen
              ? 'border-primary shadow-lg'
              : 'border-border hover:border-primary/50 hover:shadow-md'
          }`}
        >
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0 transition-transform group-hover:scale-110">
              <Icon className="w-5 h-5 text-primary" />
            </div>

            <div className="flex-1 min-w-0">
              <h3
                className={`font-semibold mb-1 transition-colors text-left ${
                  isOpen ? 'text-primary' : 'text-foreground group-hover:text-primary'
                }`}
              >
                {faq.question}
              </h3>

              <div
                className={`overflow-hidden transition-all duration-300 ${
                  isOpen ? 'max-h-96 mt-2' : 'max-h-0'
                }`}
              >
                <p className="text-muted-foreground text-sm leading-relaxed text-left">
                  {faq.answer}
                </p>
              </div>
            </div>

            <ChevronDown
              className={`w-5 h-5 flex-shrink-0 transition-all duration-300 ${
                isOpen ? 'rotate-180 text-primary' : 'text-muted-foreground'
              }`}
            />
          </div>
        </button>
      </div>
    );
  };

  return (
    <div className="space-y-10">
      {/* Section Header */}
      <div className="text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">Frequently Asked Questions</h2>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Everything you need to know about pricing and plans
        </p>
      </div>

      {/* FAQ Grid - Two columns on desktop */}
      <div className="grid md:grid-cols-2 gap-4">
        {/* Left Column */}
        <div className="space-y-4">
          {leftColumn.map((faq, index) => renderFAQItem(faq, index, 0))}
        </div>
        {/* Right Column */}
        <div className="space-y-4">
          {rightColumn.map((faq, index) => renderFAQItem(faq, index, midpoint))}
        </div>
      </div>

      {/* Contact CTA */}
      <div className="text-center p-8 bg-card rounded-2xl border shadow-sm">
        <h3 className="text-xl font-semibold mb-2">Still have questions?</h3>
        <p className="text-muted-foreground mb-6">
          Our team is here to help you find the perfect plan
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <a
            href="mailto:sales@devcontrol.app"
            className="inline-flex items-center justify-center px-6 py-3 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90 transition-colors"
          >
            Contact Sales
          </a>
          <a
            href="/docs"
            className="inline-flex items-center justify-center px-6 py-3 bg-muted text-foreground rounded-lg font-medium hover:bg-muted/80 transition-colors"
          >
            Read Documentation
          </a>
        </div>
      </div>
    </div>
  );
}
