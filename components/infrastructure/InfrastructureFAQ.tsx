'use client';

import { useState } from 'react';
import { ChevronDown, ChevronRight } from 'lucide-react';

interface FAQItem {
  question: string;
  answer: string;
}

export function InfrastructureFAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs: FAQItem[] = [
    {
      question: 'Is my AWS data secure?',
      answer: 'Yes. We use read-only IAM roles with minimal permissions. Your AWS credentials are never stored in our system. All data is encrypted in transit and at rest.',
    },
    {
      question: 'How often is cost data updated?',
      answer: 'Cost data is updated daily from AWS Cost Explorer. Resource inventory and metrics are updated in real-time as changes occur in your AWS account.',
    },
    {
      question: 'Do you support multi-account organizations?',
      answer: 'AWS Organizations support is coming soon. Currently, you can connect multiple AWS accounts individually and view them separately in the dashboard.',
    },
    {
      question: 'What AWS services are tracked?',
      answer: 'We track all major AWS services including EC2, RDS, S3, ELB, Lambda, ECS, CloudFront, and more. New services are added regularly.',
    },
    {
      question: 'Can I export cost reports?',
      answer: 'Yes. You can export cost reports as PDF or CSV files. Reports can be customized by date range, service type, team, or tag.',
    },
  ];

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-8">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          ❓ Frequently Asked Questions
        </h2>
        <p className="text-gray-600">
          Common questions about AWS infrastructure tracking
        </p>
      </div>

      <div className="space-y-3">
        {faqs.map((faq, index) => (
          <div
            key={index}
            className="border border-gray-200 rounded-lg overflow-hidden"
          >
            <button
              onClick={() => setOpenIndex(openIndex === index ? null : index)}
              className="w-full px-6 py-4 flex items-center justify-between text-left hover:bg-gray-50 transition-colors"
            >
              <span className="font-medium text-gray-900">
                {faq.question}
              </span>
              {openIndex === index ? (
                <ChevronDown className="w-5 h-5 text-gray-500 flex-shrink-0" />
              ) : (
                <ChevronRight className="w-5 h-5 text-gray-500 flex-shrink-0" />
              )}
            </button>

            {openIndex === index && (
              <div className="px-6 pb-4">
                <p className="text-gray-600 text-sm leading-relaxed">
                  {faq.answer}
                </p>
              </div>
            )}
          </div>
        ))}
      </div>

      <div className="mt-6 pt-6 border-t border-gray-200 text-center">
        <p className="text-sm text-gray-600 mb-3">
          Still have questions?
        </p>
        <button className="text-blue-600 hover:text-blue-700 font-medium">
          Contact Support →
        </button>
      </div>
    </div>
  );
}
