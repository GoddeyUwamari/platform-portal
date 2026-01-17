import { Cloud, Shield, DollarSign, Search, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function AWSResourcesEmptyState() {
  return (
    <div className="space-y-10">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg border border-blue-200 p-8 text-center">
        <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <Cloud className="w-10 h-10 text-blue-600" />
        </div>

        <h2 className="text-2xl font-bold text-gray-900 mb-3">
          Discover Your AWS Resources
        </h2>

        <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
          Connect your AWS account to automatically discover all resources, track costs,
          identify security risks, and optimize your infrastructure.
        </p>

        <div className="flex flex-wrap items-center justify-center gap-4">
          <Button size="lg" className="bg-blue-600 hover:bg-blue-700">
            Discover Resources →
          </Button>
          <Button size="lg" variant="outline">
            View Documentation
          </Button>
        </div>

        <p className="text-xs text-gray-500 mt-4">
          ⚡ Takes less than 2 minutes • 🔒 Read-only access • ✅ No credit card required
        </p>
      </div>

      {/* What You'll Discover */}
      <div>
        <h3 className="text-xl font-bold text-gray-900 text-center mb-6">
          What You&apos;ll Discover
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Cost Insights */}
          <div className="bg-white rounded-lg border border-gray-200 p-6 text-center hover:shadow-md transition-shadow">
            <div className="w-16 h-16 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-4">
              <DollarSign className="w-8 h-8 text-green-600" />
            </div>
            <h4 className="font-semibold text-gray-900 mb-2">
              Cost by Resource
            </h4>
            <p className="text-sm text-gray-600 mb-3">
              See exactly what each EC2, RDS, S3 bucket costs per month
            </p>
            <p className="text-xs text-blue-600 font-medium">
              Average savings: $342/month
            </p>
          </div>

          {/* Security Risks */}
          <div className="bg-white rounded-lg border border-gray-200 p-6 text-center hover:shadow-md transition-shadow">
            <div className="w-16 h-16 bg-red-100 rounded-lg flex items-center justify-center mx-auto mb-4">
              <Shield className="w-8 h-8 text-red-600" />
            </div>
            <h4 className="font-semibold text-gray-900 mb-2">
              Security Vulnerabilities
            </h4>
            <p className="text-sm text-gray-600 mb-3">
              Identify public resources, unencrypted data, and compliance issues
            </p>
            <p className="text-xs text-blue-600 font-medium">
              Real-time security scanning
            </p>
          </div>

          {/* Resource Inventory */}
          <div className="bg-white rounded-lg border border-gray-200 p-6 text-center hover:shadow-md transition-shadow">
            <div className="w-16 h-16 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-4">
              <Search className="w-8 h-8 text-blue-600" />
            </div>
            <h4 className="font-semibold text-gray-900 mb-2">
              Complete Inventory
            </h4>
            <p className="text-sm text-gray-600 mb-3">
              Track all resources across regions with tags and metadata
            </p>
            <p className="text-xs text-blue-600 font-medium">
              100% visibility
            </p>
          </div>
        </div>
      </div>

      {/* How It Works */}
      <div className="bg-gray-50 rounded-lg border border-gray-200 p-8">
        <h3 className="text-xl font-bold text-gray-900 text-center mb-6">
          How Resource Discovery Works
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { step: '1', title: 'Connect AWS', desc: 'Use IAM role or access keys', icon: '🔗' },
            { step: '2', title: 'Auto-Scan', desc: 'We discover all resources', icon: '🔍' },
            { step: '3', title: 'Analyze', desc: 'Check costs & security', icon: '📊' },
            { step: '4', title: 'Optimize', desc: 'Get actionable insights', icon: '✨' },
          ].map((item, idx) => (
            <div key={idx} className="text-center">
              <div className="w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center mx-auto mb-3 text-lg font-bold">
                {item.step}
              </div>
              <div className="text-2xl mb-2">{item.icon}</div>
              <h4 className="font-semibold text-gray-900 mb-1">
                {item.title}
              </h4>
              <p className="text-sm text-gray-600">
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom CTA */}
      <div className="bg-blue-50 rounded-lg border border-blue-200 p-6 text-center">
        <h3 className="text-lg font-semibold text-gray-900 mb-2">
          Ready to get started?
        </h3>
        <p className="text-sm text-gray-600 mb-4">
          Click the "Discover Resources" button above to connect your AWS account
        </p>
        <div className="flex items-center justify-center gap-6 text-sm text-gray-600">
          <div className="flex items-center gap-2">
            <Shield className="w-4 h-4 text-green-600" />
            <span>Secure connection</span>
          </div>
          <div className="flex items-center gap-2">
            <Zap className="w-4 h-4 text-blue-600" />
            <span>Instant setup</span>
          </div>
          <div className="flex items-center gap-2">
            <DollarSign className="w-4 h-4 text-green-600" />
            <span>Free tier available</span>
          </div>
        </div>
      </div>
    </div>
  );
}
