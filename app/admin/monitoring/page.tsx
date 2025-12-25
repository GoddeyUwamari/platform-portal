'use client'

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Activity, Server, Database, Globe, CheckCircle2, TrendingUp } from 'lucide-react'
import { Badge } from '@/components/ui/badge'

export default function MonitoringPage() {
  const services = [
    {
      name: 'Platform API',
      status: 'healthy',
      icon: Server,
      uptime: '99.9%',
      responseTime: '45ms',
      requests: '1.2M/day'
    },
    {
      name: 'PostgreSQL Database',
      status: 'healthy',
      icon: Database,
      uptime: '100%',
      responseTime: '12ms',
      connections: '45/100'
    },
    {
      name: 'Frontend (Next.js)',
      status: 'healthy',
      icon: Globe,
      uptime: '99.8%',
      responseTime: '120ms',
      users: '2.4K active'
    }
  ]

  return (
    <div className="space-y-6 px-4 md:px-6 lg:px-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight flex items-center gap-2">
          <Activity className="h-8 w-8" />
          System Monitoring
        </h1>
        <p className="text-muted-foreground mt-2">
          Monitor the health and performance of all platform services
        </p>
      </div>

      {/* System Overview */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">System Status</CardTitle>
            <CheckCircle2 className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">All Systems Operational</div>
            <p className="text-xs text-muted-foreground mt-1">
              3 services running smoothly
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Uptime</CardTitle>
            <TrendingUp className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">99.9%</div>
            <p className="text-xs text-muted-foreground mt-1">
              Last 30 days average
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Response Time</CardTitle>
            <Activity className="h-4 w-4 text-purple-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">59ms</div>
            <p className="text-xs text-muted-foreground mt-1">
              Average across all services
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Service Health Cards */}
      <div className="grid gap-4 md:grid-cols-1">
        {services.map((service) => {
          const Icon = service.icon
          return (
            <Card key={service.name}>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-lg bg-blue-50 flex items-center justify-center">
                      <Icon className="h-5 w-5 text-blue-600" />
                    </div>
                    <div>
                      <CardTitle className="text-lg">{service.name}</CardTitle>
                      <CardDescription>Production environment</CardDescription>
                    </div>
                  </div>
                  <Badge className="bg-green-100 text-green-700 border-green-200">
                    <div className="h-2 w-2 rounded-full bg-green-500 mr-2" />
                    Healthy
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <p className="text-sm text-muted-foreground">Uptime</p>
                    <p className="text-lg font-semibold">{service.uptime}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Response Time</p>
                    <p className="text-lg font-semibold">{service.responseTime}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">
                      {service.requests ? 'Requests' : service.connections ? 'Connections' : 'Users'}
                    </p>
                    <p className="text-lg font-semibold">
                      {service.requests || service.connections || service.users}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>

      {/* Coming Soon */}
      <Card className="border-dashed">
        <CardHeader>
          <CardTitle className="text-lg">Advanced Monitoring</CardTitle>
          <CardDescription>
            Prometheus and Grafana integration coming soon
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">
            Detailed metrics, custom dashboards, and alerting will be available in the next release.
          </p>
        </CardContent>
      </Card>
    </div>
  )
}