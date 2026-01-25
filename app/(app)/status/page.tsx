'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Activity,
  CheckCircle,
  AlertCircle,
  Clock,
  XCircle,
  AlertTriangle,
  Globe,
  Server,
  Database,
  Cloud,
  Zap,
  Bell,
  Mail,
  TrendingUp,
  Calendar,
  ExternalLink,
  ChevronDown,
  ChevronUp,
  Info,
} from 'lucide-react';
import Link from 'next/link';

type ServiceStatus = 'operational' | 'degraded' | 'partial_outage' | 'major_outage' | 'maintenance';
type IncidentStatus = 'investigating' | 'identified' | 'monitoring' | 'resolved';

export default function StatusPage() {
  const [expandedIncidents, setExpandedIncidents] = useState<number[]>([]);
  const [emailSubscribe, setEmailSubscribe] = useState('');

  const overallStatus: ServiceStatus = 'operational'; // Can be calculated from services

  const services = [
    {
      name: 'API',
      status: 'operational' as ServiceStatus,
      uptime: '99.99%',
      responseTime: '45ms',
      icon: Server,
      description: 'REST API endpoints',
    },
    {
      name: 'Dashboard',
      status: 'operational' as ServiceStatus,
      uptime: '99.98%',
      responseTime: '120ms',
      icon: Activity,
      description: 'Web application',
    },
    {
      name: 'Data Pipeline',
      status: 'operational' as ServiceStatus,
      uptime: '99.95%',
      responseTime: '200ms',
      icon: Database,
      description: 'Data processing & analytics',
    },
    {
      name: 'AWS Integration',
      status: 'operational' as ServiceStatus,
      uptime: '99.97%',
      responseTime: '80ms',
      icon: Cloud,
      description: 'Resource discovery & sync',
    },
    {
      name: 'Webhooks',
      status: 'operational' as ServiceStatus,
      uptime: '99.99%',
      responseTime: '35ms',
      icon: Zap,
      description: 'Event notifications',
    },
    {
      name: 'Authentication',
      status: 'operational' as ServiceStatus,
      uptime: '100%',
      responseTime: '25ms',
      icon: Globe,
      description: 'Login & SSO services',
    },
  ];

  const incidents = [
    {
      id: 1,
      date: '2024-01-15',
      title: 'Elevated API Latency',
      status: 'resolved' as IncidentStatus,
      severity: 'minor',
      duration: '15 minutes',
      affectedServices: ['API'],
      updates: [
        {
          time: '14:45 UTC',
          status: 'resolved',
          message: 'All services have returned to normal operation. API response times are back to baseline.',
        },
        {
          time: '14:35 UTC',
          status: 'monitoring',
          message: 'We have deployed a fix and are monitoring the situation. API latency is improving.',
        },
        {
          time: '14:30 UTC',
          status: 'identified',
          message: 'We have identified the issue as a database connection pool exhaustion and are deploying a fix.',
        },
        {
          time: '14:25 UTC',
          status: 'investigating',
          message: 'We are investigating elevated API response times affecting some requests.',
        },
      ],
    },
    {
      id: 2,
      date: '2024-01-10',
      title: 'Dashboard Slow Loading',
      status: 'resolved' as IncidentStatus,
      severity: 'minor',
      duration: '8 minutes',
      affectedServices: ['Dashboard'],
      updates: [
        {
          time: '09:18 UTC',
          status: 'resolved',
          message: 'Dashboard performance has returned to normal. Issue was caused by a CDN cache invalidation.',
        },
        {
          time: '09:10 UTC',
          status: 'investigating',
          message: 'We are investigating reports of slow dashboard loading times.',
        },
      ],
    },
    {
      id: 3,
      date: '2024-01-05',
      title: 'Scheduled Maintenance - Database Upgrade',
      status: 'resolved' as IncidentStatus,
      severity: 'maintenance',
      duration: '30 minutes',
      affectedServices: ['API', 'Dashboard', 'Data Pipeline'],
      updates: [
        {
          time: '02:30 UTC',
          status: 'resolved',
          message: 'Maintenance completed successfully. All services are operational.',
        },
        {
          time: '02:00 UTC',
          status: 'monitoring',
          message: 'Database upgrade in progress. Services may experience brief interruptions.',
        },
      ],
    },
  ];

  const regions = [
    { name: 'US East (Virginia)', status: 'operational' as ServiceStatus, latency: '12ms' },
    { name: 'US West (Oregon)', status: 'operational' as ServiceStatus, latency: '15ms' },
    { name: 'EU (Ireland)', status: 'operational' as ServiceStatus, latency: '18ms' },
    { name: 'Asia Pacific (Tokyo)', status: 'operational' as ServiceStatus, latency: '25ms' },
  ];

  const uptimeData = [
    { day: 'Mon', uptime: 100 },
    { day: 'Tue', uptime: 99.98 },
    { day: 'Wed', uptime: 100 },
    { day: 'Thu', uptime: 100 },
    { day: 'Fri', uptime: 99.95 },
    { day: 'Sat', uptime: 100 },
    { day: 'Sun', uptime: 100 },
  ];

  const getStatusConfig = (status: ServiceStatus) => {
    switch (status) {
      case 'operational':
        return {
          icon: CheckCircle,
          color: 'text-green-600 dark:text-green-500',
          bgColor: 'bg-green-100 dark:bg-green-900/30',
          borderColor: 'border-green-200 dark:border-green-800',
          label: 'Operational',
        };
      case 'degraded':
        return {
          icon: AlertTriangle,
          color: 'text-yellow-600 dark:text-yellow-500',
          bgColor: 'bg-yellow-100 dark:bg-yellow-900/30',
          borderColor: 'border-yellow-200 dark:border-yellow-800',
          label: 'Degraded Performance',
        };
      case 'partial_outage':
        return {
          icon: AlertCircle,
          color: 'text-orange-600 dark:text-orange-500',
          bgColor: 'bg-orange-100 dark:bg-orange-900/30',
          borderColor: 'border-orange-200 dark:border-orange-800',
          label: 'Partial Outage',
        };
      case 'major_outage':
        return {
          icon: XCircle,
          color: 'text-red-600 dark:text-red-500',
          bgColor: 'bg-red-100 dark:bg-red-900/30',
          borderColor: 'border-red-200 dark:border-red-800',
          label: 'Major Outage',
        };
      case 'maintenance':
        return {
          icon: Clock,
          color: 'text-blue-600 dark:text-blue-500',
          bgColor: 'bg-blue-100 dark:bg-blue-900/30',
          borderColor: 'border-blue-200 dark:border-blue-800',
          label: 'Maintenance',
        };
    }
  };

  const overallConfig = getStatusConfig(overallStatus);
  const OverallIcon = overallConfig.icon;

  const toggleIncident = (id: number) => {
    setExpandedIncidents((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

  return (
    <div className="min-h-screen bg-background py-8 md:py-12">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 xl:px-12">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <div
            className={`w-16 h-16 rounded-2xl ${overallConfig.bgColor} flex items-center justify-center mx-auto mb-6 shadow-lg`}
          >
            <OverallIcon className={`w-8 h-8 ${overallConfig.color}`} />
          </div>

          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">
            {overallConfig.label === 'Operational'
              ? 'All Systems Operational'
              : overallConfig.label}
          </h1>

          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto mb-2">
            DevControl platform status and incident updates
          </p>

          <p className="text-sm text-muted-foreground">
            Last updated: {new Date().toLocaleTimeString('en-US', {
              hour: '2-digit',
              minute: '2-digit',
              timeZoneName: 'short'
            })}
          </p>
        </div>

        {/* Quick Stats */}
        <div className="grid md:grid-cols-4 gap-4 mb-12">
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-2xl font-bold text-foreground">99.98%</div>
                  <div className="text-sm text-muted-foreground">Uptime (30d)</div>
                </div>
                <TrendingUp className="w-8 h-8 text-green-600 dark:text-green-500" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-2xl font-bold text-foreground">45ms</div>
                  <div className="text-sm text-muted-foreground">Avg Response</div>
                </div>
                <Activity className="w-8 h-8 text-blue-600 dark:text-blue-500" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-2xl font-bold text-foreground">3</div>
                  <div className="text-sm text-muted-foreground">Incidents (30d)</div>
                </div>
                <AlertCircle className="w-8 h-8 text-amber-600 dark:text-amber-500" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-2xl font-bold text-foreground">4</div>
                  <div className="text-sm text-muted-foreground">Regions</div>
                </div>
                <Globe className="w-8 h-8 text-purple-600 dark:text-purple-500" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Current Status - Service Grid */}
        <div className="mb-12">
          <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-6 flex items-center gap-3">
            <Activity className="w-7 h-7 text-primary" />
            Service Status
          </h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {services.map((service) => {
              const config = getStatusConfig(service.status);
              const Icon = service.icon;
              const StatusIcon = config.icon;

              return (
                <Card
                  key={service.name}
                  className={`border-l-4 ${config.borderColor} hover:shadow-md transition-shadow`}
                >
                  <CardHeader className="pb-3">
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-3">
                        <div className={`w-10 h-10 rounded-lg ${config.bgColor} flex items-center justify-center`}>
                          <Icon className={`w-5 h-5 ${config.color}`} />
                        </div>
                        <div>
                          <CardTitle className="text-base">{service.name}</CardTitle>
                          <CardDescription className="text-xs">
                            {service.description}
                          </CardDescription>
                        </div>
                      </div>
                      <StatusIcon className={`w-5 h-5 ${config.color} shrink-0`} />
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <div className="text-muted-foreground text-xs">Uptime</div>
                        <div className="font-semibold">{service.uptime}</div>
                      </div>
                      <div>
                        <div className="text-muted-foreground text-xs">Response</div>
                        <div className="font-semibold">{service.responseTime}</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>

        {/* Uptime Graph */}
        <Card className="mb-12">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-primary" />
              7-Day Uptime History
            </CardTitle>
            <CardDescription>Overall platform availability</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-end justify-between gap-2 h-32">
              {uptimeData.map((data, index) => (
                <div key={index} className="flex-1 flex flex-col items-center gap-2">
                  <div className="w-full bg-muted rounded-t-lg overflow-hidden relative h-full">
                    <div
                      className={`absolute bottom-0 w-full rounded-t-lg transition-all ${
                        data.uptime === 100
                          ? 'bg-green-500'
                          : data.uptime >= 99.9
                          ? 'bg-green-400'
                          : 'bg-yellow-500'
                      }`}
                      style={{ height: `${data.uptime}%` }}
                    />
                  </div>
                  <div className="text-xs text-muted-foreground">{data.day}</div>
                  <div className="text-xs font-semibold">{data.uptime}%</div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Regional Status */}
        <Card className="mb-12">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Globe className="w-5 h-5 text-primary" />
              Regional Status
            </CardTitle>
            <CardDescription>Status by geographic region</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-4">
              {regions.map((region) => {
                const config = getStatusConfig(region.status);
                const StatusIcon = config.icon;

                return (
                  <div
                    key={region.name}
                    className="flex items-center justify-between p-3 bg-muted/30 rounded-lg"
                  >
                    <div className="flex items-center gap-3">
                      <StatusIcon className={`w-4 h-4 ${config.color}`} />
                      <div>
                        <div className="font-medium text-sm">{region.name}</div>
                        <div className="text-xs text-muted-foreground">
                          Latency: {region.latency}
                        </div>
                      </div>
                    </div>
                    <Badge variant="outline" className={`${config.bgColor} ${config.color} text-xs`}>
                      {config.label}
                    </Badge>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>

        {/* Recent Incidents */}
        <div className="mb-12">
          <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-6 flex items-center gap-3">
            <Clock className="w-7 h-7 text-primary" />
            Incident History
          </h2>

          <Card>
            <CardHeader>
              <CardDescription>Past incidents from the last 30 days</CardDescription>
            </CardHeader>
            <CardContent>
              {incidents.length === 0 ? (
                <div className="text-center py-12">
                  <CheckCircle className="w-12 h-12 text-green-600 dark:text-green-500 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold mb-2">No incidents in the last 30 days</h3>
                  <p className="text-muted-foreground">
                    DevControl has been running smoothly with no reported issues.
                  </p>
                </div>
              ) : (
                <div className="space-y-4">
                  {incidents.map((incident) => {
                    const isExpanded = expandedIncidents.includes(incident.id);
                    const severityColor =
                      incident.severity === 'maintenance'
                        ? 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400'
                        : incident.severity === 'minor'
                        ? 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400'
                        : 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400';

                    return (
                      <div
                        key={incident.id}
                        className="border rounded-lg p-4 hover:shadow-sm transition-shadow"
                      >
                        <div
                          className="flex items-start justify-between cursor-pointer"
                          onClick={() => toggleIncident(incident.id)}
                        >
                          <div className="flex-1">
                            <div className="flex items-center gap-3 mb-2">
                              <h3 className="font-semibold">{incident.title}</h3>
                              <Badge className={`text-xs ${severityColor} border-0`}>
                                {incident.severity}
                              </Badge>
                              <Badge variant="outline" className="text-xs bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400 border-green-200 dark:border-green-800">
                                {incident.status}
                              </Badge>
                            </div>
                            <div className="flex items-center gap-4 text-sm text-muted-foreground">
                              <span className="flex items-center gap-1">
                                <Calendar className="w-3 h-3" />
                                {new Date(incident.date).toLocaleDateString('en-US', {
                                  month: 'short',
                                  day: 'numeric',
                                  year: 'numeric',
                                })}
                              </span>
                              <span className="flex items-center gap-1">
                                <Clock className="w-3 h-3" />
                                {incident.duration}
                              </span>
                              <span className="flex items-center gap-1">
                                <Server className="w-3 h-3" />
                                {incident.affectedServices.join(', ')}
                              </span>
                            </div>
                          </div>
                          <Button variant="ghost" size="sm">
                            {isExpanded ? (
                              <ChevronUp className="w-4 h-4" />
                            ) : (
                              <ChevronDown className="w-4 h-4" />
                            )}
                          </Button>
                        </div>

                        {isExpanded && (
                          <div className="mt-4 pt-4 border-t space-y-3">
                            <h4 className="font-semibold text-sm flex items-center gap-2">
                              <Info className="w-4 h-4 text-primary" />
                              Incident Timeline
                            </h4>
                            <div className="space-y-3 ml-6">
                              {incident.updates.map((update, idx) => (
                                <div key={idx} className="relative pl-4 border-l-2 border-muted pb-3">
                                  <div className="absolute -left-[5px] top-0 w-2 h-2 rounded-full bg-primary" />
                                  <div className="text-xs text-muted-foreground mb-1">
                                    {update.time}
                                  </div>
                                  <div className="flex items-center gap-2 mb-1">
                                    <Badge variant="outline" className="text-xs capitalize">
                                      {update.status}
                                    </Badge>
                                  </div>
                                  <p className="text-sm">{update.message}</p>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Subscribe to Updates */}
        <Card className="bg-gradient-to-r from-primary/10 via-primary/5 to-background border-primary/20 mb-12">
          <CardContent className="pt-8 pb-8">
            <div className="max-w-2xl mx-auto text-center">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                <Bell className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-xl md:text-2xl font-bold mb-3">
                Subscribe to Status Updates
              </h3>
              <p className="text-muted-foreground mb-6">
                Get notified via email when incidents are created, updated, or resolved.
                Stay informed about platform status in real-time.
              </p>

              <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
                <input
                  type="email"
                  placeholder="Enter your email"
                  value={emailSubscribe}
                  onChange={(e) => setEmailSubscribe(e.target.value)}
                  className="flex-1 h-11 px-4 rounded-lg border bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
                />
                <Button className="gap-2 h-11">
                  <Mail className="w-4 h-4" />
                  Subscribe
                </Button>
              </div>

              <p className="text-xs text-muted-foreground mt-4">
                You can unsubscribe at any time. We respect your privacy.
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Footer Links */}
        <div className="grid md:grid-cols-3 gap-6">
          <Card className="hover:shadow-md transition-shadow cursor-pointer group">
            <a href="https://status.devcontrol.io" target="_blank" rel="noopener noreferrer">
              <CardHeader>
                <CardTitle className="text-base flex items-center gap-2 group-hover:text-primary transition-colors">
                  <ExternalLink className="w-4 h-4" />
                  Status History
                </CardTitle>
                <CardDescription className="text-sm">
                  View detailed uptime history and past incidents
                </CardDescription>
              </CardHeader>
            </a>
          </Card>

          <Card className="hover:shadow-md transition-shadow cursor-pointer group">
            <Link href="/docs/api">
              <CardHeader>
                <CardTitle className="text-base flex items-center gap-2 group-hover:text-primary transition-colors">
                  <Server className="w-4 h-4" />
                  API Status
                </CardTitle>
                <CardDescription className="text-sm">
                  Check API health and performance metrics
                </CardDescription>
              </CardHeader>
            </Link>
          </Card>

          <Card className="hover:shadow-md transition-shadow cursor-pointer group">
            <a href="mailto:support@devcontrol.io">
              <CardHeader>
                <CardTitle className="text-base flex items-center gap-2 group-hover:text-primary transition-colors">
                  <Mail className="w-4 h-4" />
                  Contact Support
                </CardTitle>
                <CardDescription className="text-sm">
                  Report an issue or get help from our team
                </CardDescription>
              </CardHeader>
            </a>
          </Card>
        </div>
      </div>
    </div>
  );
}
