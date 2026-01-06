'use client';

import { Eye } from 'lucide-react';

export function DependencyGraphPreview() {
  return (
    <div className="bg-white rounded-lg border p-6">
      <div className="mb-4">
        <div className="flex items-center gap-2 mb-2">
          <Eye className="w-5 h-5 text-blue-600" />
          <h2 className="text-xl font-semibold">Preview: Service Dependency Map</h2>
        </div>
        <p className="text-gray-600">
          Visualize how your services connect and depend on each other
        </p>
      </div>

      {/* SVG Graph Preview */}
      <div className="bg-gradient-to-br from-gray-50 to-blue-50 rounded-lg p-6 border-2 border-gray-200">
        <svg className="w-full h-96" viewBox="0 0 800 400" xmlns="http://www.w3.org/2000/svg">
          {/* Define arrow marker */}
          <defs>
            <marker
              id="arrowhead"
              markerWidth="10"
              markerHeight="10"
              refX="9"
              refY="3"
              orient="auto"
            >
              <polygon points="0 0, 10 3, 0 6" fill="#6B7280" />
            </marker>
            <marker
              id="arrowhead-critical"
              markerWidth="10"
              markerHeight="10"
              refX="9"
              refY="3"
              orient="auto"
            >
              <polygon points="0 0, 10 3, 0 6" fill="#EF4444" />
            </marker>
          </defs>

          {/* Edges (Dependencies) */}
          <g id="edges">
            {/* Frontend -> API Gateway */}
            <line
              x1="140"
              y1="80"
              x2="260"
              y2="80"
              stroke="#6B7280"
              strokeWidth="2"
              markerEnd="url(#arrowhead)"
            />
            <text x="200" y="70" fontSize="11" fill="#6B7280" textAnchor="middle">
              runtime
            </text>

            {/* API Gateway -> Auth Service (Critical) */}
            <line
              x1="340"
              y1="110"
              x2="340"
              y2="180"
              stroke="#EF4444"
              strokeWidth="2.5"
              markerEnd="url(#arrowhead-critical)"
              strokeDasharray="4,4"
            >
              <animate
                attributeName="stroke-dashoffset"
                from="8"
                to="0"
                dur="0.5s"
                repeatCount="indefinite"
              />
            </line>
            <text x="360" y="145" fontSize="11" fill="#EF4444" fontWeight="600">
              critical
            </text>

            {/* API Gateway -> Payment Service */}
            <line
              x1="420"
              y1="80"
              x2="540"
              y2="80"
              stroke="#6B7280"
              strokeWidth="2"
              markerEnd="url(#arrowhead)"
            />
            <text x="480" y="70" fontSize="11" fill="#6B7280" textAnchor="middle">
              runtime
            </text>

            {/* Auth Service -> Database */}
            <line
              x1="340"
              y1="240"
              x2="340"
              y2="300"
              stroke="#6B7280"
              strokeWidth="2"
              markerEnd="url(#arrowhead)"
            />
            <text x="360" y="270" fontSize="11" fill="#6B7280">
              data
            </text>

            {/* Payment Service -> Database */}
            <line
              x1="600"
              y1="110"
              x2="420"
              y2="310"
              stroke="#6B7280"
              strokeWidth="2"
              markerEnd="url(#arrowhead)"
            />
            <text x="510" y="200" fontSize="11" fill="#6B7280">
              data
            </text>
          </g>

          {/* Nodes (Services) */}
          <g id="nodes">
            {/* Frontend */}
            <g className="cursor-pointer" transform="translate(0, 0)">
              <rect
                x="60"
                y="50"
                width="120"
                height="60"
                rx="8"
                fill="#3B82F6"
                stroke="#2563EB"
                strokeWidth="2"
              />
              <text x="120" y="75" fill="white" fontSize="14" fontWeight="600" textAnchor="middle">
                Frontend
              </text>
              <text x="120" y="92" fill="#DBEAFE" fontSize="11" textAnchor="middle">
                React App
              </text>
              <circle cx="170" cy="60" r="4" fill="#10B981" />
            </g>

            {/* API Gateway */}
            <g className="cursor-pointer" transform="translate(0, 0)">
              <rect
                x="280"
                y="50"
                width="120"
                height="60"
                rx="8"
                fill="#8B5CF6"
                stroke="#7C3AED"
                strokeWidth="2"
              />
              <text x="340" y="75" fill="white" fontSize="14" fontWeight="600" textAnchor="middle">
                API Gateway
              </text>
              <text x="340" y="92" fill="#EDE9FE" fontSize="11" textAnchor="middle">
                Node.js
              </text>
              <circle cx="390" cy="60" r="4" fill="#10B981" />
            </g>

            {/* Auth Service */}
            <g className="cursor-pointer" transform="translate(0, 0)">
              <rect
                x="280"
                y="200"
                width="120"
                height="60"
                rx="8"
                fill="#EF4444"
                stroke="#DC2626"
                strokeWidth="2"
              />
              <text x="340" y="225" fill="white" fontSize="14" fontWeight="600" textAnchor="middle">
                Auth Service
              </text>
              <text x="340" y="242" fill="#FEE2E2" fontSize="11" textAnchor="middle">
                Critical Path
              </text>
              <circle cx="390" cy="210" r="4" fill="#10B981" />
            </g>

            {/* Payment Service */}
            <g className="cursor-pointer" transform="translate(0, 0)">
              <rect
                x="540"
                y="50"
                width="120"
                height="60"
                rx="8"
                fill="#10B981"
                stroke="#059669"
                strokeWidth="2"
              />
              <text x="600" y="75" fill="white" fontSize="14" fontWeight="600" textAnchor="middle">
                Payment
              </text>
              <text x="600" y="92" fill="#D1FAE5" fontSize="11" textAnchor="middle">
                Stripe API
              </text>
              <circle cx="650" cy="60" r="4" fill="#10B981" />
            </g>

            {/* Database */}
            <g className="cursor-pointer" transform="translate(0, 0)">
              <rect
                x="280"
                y="320"
                width="120"
                height="60"
                rx="8"
                fill="#F59E0B"
                stroke="#D97706"
                strokeWidth="2"
              />
              <text x="340" y="345" fill="white" fontSize="14" fontWeight="600" textAnchor="middle">
                Database
              </text>
              <text x="340" y="362" fill="#FEF3C7" fontSize="11" textAnchor="middle">
                PostgreSQL
              </text>
              <circle cx="390" cy="330" r="4" fill="#10B981" />
            </g>
          </g>

          {/* Legend */}
          <g transform="translate(480, 200)">
            <text x="0" y="0" fontSize="12" fontWeight="600" fill="#374151">
              Legend:
            </text>
            <g transform="translate(0, 15)">
              <circle cx="5" cy="0" r="4" fill="#10B981" />
              <text x="15" y="4" fontSize="11" fill="#6B7280">
                Healthy
              </text>
            </g>
            <g transform="translate(0, 30)">
              <line
                x1="0"
                y1="0"
                x2="20"
                y2="0"
                stroke="#EF4444"
                strokeWidth="2"
                strokeDasharray="4,4"
              />
              <text x="25" y="4" fontSize="11" fill="#6B7280">
                Critical
              </text>
            </g>
            <g transform="translate(0, 45)">
              <line x1="0" y1="0" x2="20" y2="0" stroke="#6B7280" strokeWidth="2" />
              <text x="25" y="4" fontSize="11" fill="#6B7280">
                Standard
              </text>
            </g>
          </g>
        </svg>
      </div>

      <p className="mt-4 text-sm text-gray-500 text-center italic">
        Example: See impact analysis, critical paths, and circular dependencies at a glance
      </p>

      {/* Features Grid */}
      <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="text-center p-4 bg-blue-50 rounded-lg border border-blue-100">
          <div className="text-2xl font-bold text-blue-600 mb-1">5</div>
          <div className="text-sm text-gray-600">Services Mapped</div>
        </div>
        <div className="text-center p-4 bg-green-50 rounded-lg border border-green-100">
          <div className="text-2xl font-bold text-green-600 mb-1">6</div>
          <div className="text-sm text-gray-600">Dependencies Tracked</div>
        </div>
        <div className="text-center p-4 bg-red-50 rounded-lg border border-red-100">
          <div className="text-2xl font-bold text-red-600 mb-1">1</div>
          <div className="text-sm text-gray-600">Critical Path Identified</div>
        </div>
      </div>
    </div>
  );
}
