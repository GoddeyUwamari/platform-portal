/**
 * Infrastructure Trust Section
 * Shows trust indicators without fake company logos
 *
 * NOTE: Fake company logos (TechCorp, DataFlow, CloudScale, etc.) have been removed
 * for legal compliance. Re-add logos only with written permission from real customers.
 */

import { CheckCircle2, Shield, Clock, Users } from 'lucide-react';

export function InfrastructureTrustSection() {
  return (
    <div className="bg-white rounded-lg border border-gray-200 p-8">
      <div className="text-center mb-8">
        <h2 className="text-2xl md:text-3xl font-semibold text-gray-900 mb-3">
          Built for Engineering Teams
        </h2>
        <p className="text-base text-muted-foreground max-w-2xl mx-auto">
          Trusted by engineering teams from startups to Fortune 500 companies for AWS infrastructure management
        </p>
      </div>

      {/* Trust Indicators */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
        <div className="text-center p-4">
          <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-3">
            <Shield className="w-6 h-6 text-green-600" />
          </div>
          <p className="font-semibold text-gray-900 text-sm mb-1">Enterprise Security</p>
          <p className="text-xs text-muted-foreground">Bank-level encryption</p>
        </div>
        <div className="text-center p-4">
          <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-3">
            <Clock className="w-6 h-6 text-blue-600" />
          </div>
          <p className="font-semibold text-gray-900 text-sm mb-1">Quick Setup</p>
          <p className="text-xs text-muted-foreground">3-minute integration</p>
        </div>
        <div className="text-center p-4">
          <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mx-auto mb-3">
            <CheckCircle2 className="w-6 h-6 text-purple-600" />
          </div>
          <p className="font-semibold text-gray-900 text-sm mb-1">Read-Only Access</p>
          <p className="text-xs text-muted-foreground">We never modify your AWS</p>
        </div>
        <div className="text-center p-4">
          <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mx-auto mb-3">
            <Users className="w-6 h-6 text-orange-600" />
          </div>
          <p className="font-semibold text-gray-900 text-sm mb-1">Team Ready</p>
          <p className="text-xs text-muted-foreground">Role-based access control</p>
        </div>
      </div>

      {/* Value Props */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-6 border-t border-gray-200">
        <div className="text-center">
          <div className="text-3xl font-bold text-gray-900 mb-1">99.9%</div>
          <div className="text-sm text-muted-foreground">Uptime SLA</div>
        </div>
        <div className="text-center">
          <div className="text-3xl font-bold text-gray-900 mb-1">3 min</div>
          <div className="text-sm text-muted-foreground">Average Setup Time</div>
        </div>
        <div className="text-center">
          <div className="text-3xl font-bold text-gray-900 mb-1">14 days</div>
          <div className="text-sm text-muted-foreground">Free Trial</div>
        </div>
      </div>
    </div>
  );
}
