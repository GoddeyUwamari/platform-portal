import type { Node, Edge } from 'reactflow'
import type { ServiceDependency, CircularDependency, ImpactAnalysis } from '@/lib/types'

// Demo service nodes for the dependency graph
export const DEMO_GRAPH_NODES: Node[] = [
  {
    id: 'web-frontend',
    type: 'default',
    position: { x: 400, y: 0 },
    data: { label: 'Web Frontend', status: 'healthy', owner: 'Frontend Team', template: 'react-app' },
  },
  {
    id: 'api-gateway',
    type: 'default',
    position: { x: 400, y: 120 },
    data: { label: 'API Gateway', status: 'healthy', owner: 'Platform Team', template: 'kong' },
  },
  {
    id: 'auth-service',
    type: 'default',
    position: { x: 150, y: 240 },
    data: { label: 'Auth Service', status: 'healthy', owner: 'Security Team', template: 'node-api' },
  },
  {
    id: 'user-service',
    type: 'default',
    position: { x: 400, y: 240 },
    data: { label: 'User Service', status: 'healthy', owner: 'Identity Team', template: 'go-api' },
  },
  {
    id: 'order-service',
    type: 'default',
    position: { x: 650, y: 240 },
    data: { label: 'Order Service', status: 'healthy', owner: 'Commerce Team', template: 'java-spring' },
  },
  {
    id: 'user-database',
    type: 'default',
    position: { x: 275, y: 360 },
    data: { label: 'User Database', status: 'healthy', owner: 'DBA Team', template: 'postgres' },
  },
  {
    id: 'notification-service',
    type: 'default',
    position: { x: 525, y: 360 },
    data: { label: 'Notification Service', status: 'healthy', owner: 'Comms Team', template: 'node-api' },
  },
  {
    id: 'payment-service',
    type: 'default',
    position: { x: 775, y: 360 },
    data: { label: 'Payment Service', status: 'healthy', owner: 'Payments Team', template: 'python-api' },
  },
  {
    id: 'email-queue',
    type: 'default',
    position: { x: 400, y: 480 },
    data: { label: 'Email Queue', status: 'healthy', owner: 'Platform Team', template: 'rabbitmq' },
  },
  {
    id: 'payment-gateway',
    type: 'default',
    position: { x: 650, y: 480 },
    data: { label: 'Payment Gateway', status: 'healthy', owner: 'Payments Team', template: 'external' },
  },
  {
    id: 'inventory-service',
    type: 'default',
    position: { x: 900, y: 240 },
    data: { label: 'Inventory Service', status: 'healthy', owner: 'Warehouse Team', template: 'go-api' },
  },
  {
    id: 'order-database',
    type: 'default',
    position: { x: 900, y: 360 },
    data: { label: 'Order Database', status: 'healthy', owner: 'DBA Team', template: 'postgres' },
  },
]

// Demo dependency edges for the graph
export const DEMO_GRAPH_EDGES: Edge[] = [
  {
    id: 'e1',
    source: 'web-frontend',
    target: 'api-gateway',
    type: 'smoothstep',
    label: 'runtime',
    data: { dependencyType: 'runtime', isCritical: true, description: 'Frontend calls API Gateway' },
  },
  {
    id: 'e2',
    source: 'api-gateway',
    target: 'auth-service',
    type: 'smoothstep',
    label: 'runtime',
    data: { dependencyType: 'runtime', isCritical: true, description: 'Token validation' },
  },
  {
    id: 'e3',
    source: 'api-gateway',
    target: 'user-service',
    type: 'smoothstep',
    label: 'runtime',
    data: { dependencyType: 'runtime', isCritical: false, description: 'User data routing' },
  },
  {
    id: 'e4',
    source: 'api-gateway',
    target: 'order-service',
    type: 'smoothstep',
    label: 'runtime',
    data: { dependencyType: 'runtime', isCritical: true, description: 'Order routing' },
  },
  {
    id: 'e5',
    source: 'auth-service',
    target: 'user-database',
    type: 'smoothstep',
    label: 'data',
    data: { dependencyType: 'data', isCritical: true, description: 'Credential storage' },
  },
  {
    id: 'e6',
    source: 'user-service',
    target: 'user-database',
    type: 'smoothstep',
    label: 'data',
    data: { dependencyType: 'data', isCritical: false, description: 'User data storage' },
  },
  {
    id: 'e7',
    source: 'user-service',
    target: 'notification-service',
    type: 'smoothstep',
    label: 'runtime',
    data: { dependencyType: 'runtime', isCritical: false, description: 'User notifications' },
  },
  {
    id: 'e8',
    source: 'notification-service',
    target: 'email-queue',
    type: 'smoothstep',
    label: 'runtime',
    data: { dependencyType: 'runtime', isCritical: false, description: 'Queue emails' },
  },
  {
    id: 'e9',
    source: 'order-service',
    target: 'payment-service',
    type: 'smoothstep',
    label: 'runtime',
    data: { dependencyType: 'runtime', isCritical: true, description: 'Payment processing' },
  },
  {
    id: 'e10',
    source: 'order-service',
    target: 'inventory-service',
    type: 'smoothstep',
    label: 'runtime',
    data: { dependencyType: 'runtime', isCritical: false, description: 'Stock check' },
  },
  {
    id: 'e11',
    source: 'order-service',
    target: 'order-database',
    type: 'smoothstep',
    label: 'data',
    data: { dependencyType: 'data', isCritical: true, description: 'Order storage' },
  },
  {
    id: 'e12',
    source: 'payment-service',
    target: 'payment-gateway',
    type: 'smoothstep',
    label: 'runtime',
    data: { dependencyType: 'runtime', isCritical: true, description: 'Stripe integration' },
  },
  {
    id: 'e13',
    source: 'inventory-service',
    target: 'order-database',
    type: 'smoothstep',
    label: 'data',
    data: { dependencyType: 'data', isCritical: false, description: 'Inventory sync' },
  },
  {
    id: 'e14',
    source: 'order-service',
    target: 'notification-service',
    type: 'smoothstep',
    label: 'runtime',
    data: { dependencyType: 'runtime', isCritical: false, description: 'Order confirmations' },
  },
  {
    id: 'e15',
    source: 'payment-service',
    target: 'notification-service',
    type: 'smoothstep',
    label: 'runtime',
    data: { dependencyType: 'runtime', isCritical: false, description: 'Payment receipts' },
  },
  // Additional dependencies to reach 23 total
  {
    id: 'e16',
    source: 'auth-service',
    target: 'notification-service',
    type: 'smoothstep',
    label: 'runtime',
    data: { dependencyType: 'runtime', isCritical: false, description: 'Security alerts' },
  },
  {
    id: 'e17',
    source: 'user-service',
    target: 'auth-service',
    type: 'smoothstep',
    label: 'runtime',
    data: { dependencyType: 'runtime', isCritical: false, description: 'Permission checks' },
  },
  {
    id: 'e18',
    source: 'payment-service',
    target: 'order-database',
    type: 'smoothstep',
    label: 'data',
    data: { dependencyType: 'data', isCritical: false, description: 'Transaction records' },
  },
  {
    id: 'e19',
    source: 'web-frontend',
    target: 'notification-service',
    type: 'smoothstep',
    label: 'runtime',
    data: { dependencyType: 'runtime', isCritical: false, description: 'WebSocket notifications' },
  },
  {
    id: 'e20',
    source: 'inventory-service',
    target: 'notification-service',
    type: 'smoothstep',
    label: 'runtime',
    data: { dependencyType: 'runtime', isCritical: false, description: 'Low stock alerts' },
  },
  {
    id: 'e21',
    source: 'api-gateway',
    target: 'inventory-service',
    type: 'smoothstep',
    label: 'runtime',
    data: { dependencyType: 'runtime', isCritical: false, description: 'Inventory queries' },
  },
  {
    id: 'e22',
    source: 'user-service',
    target: 'order-service',
    type: 'smoothstep',
    label: 'runtime',
    data: { dependencyType: 'runtime', isCritical: false, description: 'Order history' },
  },
  {
    id: 'e23',
    source: 'order-service',
    target: 'user-service',
    type: 'smoothstep',
    label: 'runtime',
    data: { dependencyType: 'runtime', isCritical: false, description: 'Customer lookup' },
  },
]

// Demo graph combining nodes and edges
export const DEMO_DEPENDENCY_GRAPH = {
  nodes: DEMO_GRAPH_NODES,
  edges: DEMO_GRAPH_EDGES,
}

// Demo list of service dependencies (flat list format)
export const DEMO_DEPENDENCIES: ServiceDependency[] = DEMO_GRAPH_EDGES.map((edge, index) => ({
  id: edge.id,
  organizationId: 'demo-org',
  sourceServiceId: edge.source,
  targetServiceId: edge.target,
  sourceServiceName: DEMO_GRAPH_NODES.find(n => n.id === edge.source)?.data.label || edge.source,
  targetServiceName: DEMO_GRAPH_NODES.find(n => n.id === edge.target)?.data.label || edge.target,
  dependencyType: (edge.data?.dependencyType || 'runtime') as 'runtime' | 'data' | 'deployment' | 'shared-lib',
  description: edge.data?.description || '',
  isCritical: edge.data?.isCritical || false,
  metadata: {},
  createdBy: 'demo-user',
  createdAt: new Date(Date.now() - (index + 1) * 86400000).toISOString(),
  updatedAt: new Date(Date.now() - (index + 1) * 3600000).toISOString(),
}))

// Demo circular dependencies (empty since we have 0 cycles in demo stats)
export const DEMO_CIRCULAR_DEPENDENCIES: CircularDependency[] = []

// Demo impact analysis for a sample service
export const DEMO_IMPACT_ANALYSIS: ImpactAnalysis = {
  serviceId: 'api-gateway',
  serviceName: 'API Gateway',
  upstreamDependencies: [
    { id: 'web-frontend', name: 'Web Frontend', dependencyType: 'runtime', isCritical: true },
  ],
  downstreamDependencies: [
    { id: 'auth-service', name: 'Auth Service', dependencyType: 'runtime', isCritical: true },
    { id: 'user-service', name: 'User Service', dependencyType: 'runtime', isCritical: false },
    { id: 'order-service', name: 'Order Service', dependencyType: 'runtime', isCritical: true },
    { id: 'inventory-service', name: 'Inventory Service', dependencyType: 'runtime', isCritical: false },
  ],
  totalUpstream: 1,
  totalDownstream: 4,
  totalAffectedIfFails: 11,
  criticalPath: true,
}

// Map of services to their impact analysis for demo mode
export const DEMO_SERVICE_IMPACTS: Record<string, ImpactAnalysis> = {
  'api-gateway': DEMO_IMPACT_ANALYSIS,
  'auth-service': {
    serviceId: 'auth-service',
    serviceName: 'Auth Service',
    upstreamDependencies: [
      { id: 'api-gateway', name: 'API Gateway', dependencyType: 'runtime', isCritical: true },
      { id: 'user-service', name: 'User Service', dependencyType: 'runtime', isCritical: false },
    ],
    downstreamDependencies: [
      { id: 'user-database', name: 'User Database', dependencyType: 'data', isCritical: true },
      { id: 'notification-service', name: 'Notification Service', dependencyType: 'runtime', isCritical: false },
    ],
    totalUpstream: 2,
    totalDownstream: 2,
    totalAffectedIfFails: 8,
    criticalPath: true,
  },
  'order-service': {
    serviceId: 'order-service',
    serviceName: 'Order Service',
    upstreamDependencies: [
      { id: 'api-gateway', name: 'API Gateway', dependencyType: 'runtime', isCritical: true },
      { id: 'user-service', name: 'User Service', dependencyType: 'runtime', isCritical: false },
    ],
    downstreamDependencies: [
      { id: 'payment-service', name: 'Payment Service', dependencyType: 'runtime', isCritical: true },
      { id: 'inventory-service', name: 'Inventory Service', dependencyType: 'runtime', isCritical: false },
      { id: 'order-database', name: 'Order Database', dependencyType: 'data', isCritical: true },
      { id: 'notification-service', name: 'Notification Service', dependencyType: 'runtime', isCritical: false },
      { id: 'user-service', name: 'User Service', dependencyType: 'runtime', isCritical: false },
    ],
    totalUpstream: 2,
    totalDownstream: 5,
    totalAffectedIfFails: 4,
    criticalPath: true,
  },
  'payment-service': {
    serviceId: 'payment-service',
    serviceName: 'Payment Service',
    upstreamDependencies: [
      { id: 'order-service', name: 'Order Service', dependencyType: 'runtime', isCritical: true },
    ],
    downstreamDependencies: [
      { id: 'payment-gateway', name: 'Payment Gateway', dependencyType: 'runtime', isCritical: true },
      { id: 'notification-service', name: 'Notification Service', dependencyType: 'runtime', isCritical: false },
      { id: 'order-database', name: 'Order Database', dependencyType: 'data', isCritical: false },
    ],
    totalUpstream: 1,
    totalDownstream: 3,
    totalAffectedIfFails: 0,
    criticalPath: true,
  },
}

// Demo services list for impact analysis dropdown
export const DEMO_SERVICES_LIST = DEMO_GRAPH_NODES.map(node => ({
  id: node.id,
  name: node.data.label,
  status: node.data.status,
  owner: node.data.owner,
}))
