import { Users } from 'lucide-react';

export function ServicePreview() {
  return (
    <div className="bg-white rounded-lg border border-gray-200 p-8">
      <div className="mb-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-2">
          Preview: What You&apos;ll Track
        </h2>
        <p className="text-gray-600">
          Here&apos;s what each service will show after you add it
        </p>
      </div>

      {/* Example Service Card */}
      <div className="bg-gray-50 rounded-lg border-2 border-gray-200 p-6">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center text-2xl">
              📦
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900">payment-api</h3>
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <Users className="w-4 h-4" />
                <span>Backend Team</span>
                <span>•</span>
                <span>Node.js</span>
                <span>•</span>
                <span className="px-2 py-0.5 bg-green-100 text-green-700 rounded text-xs font-medium">
                  Production
                </span>
              </div>
            </div>
          </div>
          <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-medium flex items-center gap-1">
            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
            Healthy
          </span>
        </div>

        {/* Metrics */}
        <div className="space-y-3">
          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-600">🚀 Deployments</span>
            <span className="font-medium text-gray-900">42 this month • Last: 2 hours ago</span>
          </div>

          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-600">⚡ DORA Metrics</span>
            <span className="font-medium text-gray-900">Lead Time: 15min | Deploy Freq: 8.2/day</span>
          </div>

          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-600">🎯 Performance</span>
            <span className="px-2 py-1 bg-green-100 text-green-700 rounded text-xs font-semibold">
              Excellent
            </span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="mt-4 pt-4 border-t border-gray-200 flex gap-2">
          <button className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50">
            View Details
          </button>
          <button className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50">
            Deploy History
          </button>
        </div>
      </div>

      {/* Annotation */}
      <p className="mt-4 text-sm text-gray-500 text-center italic">
        This is what each service will show after you add it
      </p>
    </div>
  );
}
