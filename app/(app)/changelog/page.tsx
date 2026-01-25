'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Sparkles,
  Zap,
  Bug,
  Calendar,
  Search,
  Mail,
  ArrowRight,
  ExternalLink,
  BookOpen,
  Star,
  Shield,
  Rocket,
  Filter,
  AlertCircle,
  Package,
  Trash2,
} from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

type ChangeType = 'feature' | 'improvement' | 'fix' | 'security' | 'breaking' | 'deprecation';

export default function ChangelogPage() {
  const [selectedFilter, setSelectedFilter] = useState<ChangeType | 'all'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [emailSubscribe, setEmailSubscribe] = useState('');

  const releases = [
    {
      version: '2.6.0',
      date: '2024-01-20',
      title: 'AI-Powered Cost Recommendations',
      featured: true,
      image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80',
      summary: 'Introducing machine learning-based cost optimization recommendations that can save you up to 40% on AWS bills.',
      blogPost: '/blog/ai-cost-recommendations',
      changes: [
        { type: 'feature' as ChangeType, text: 'AI-powered cost optimization recommendations based on usage patterns', category: 'Cost Management' },
        { type: 'feature' as ChangeType, text: 'Automated rightsizing suggestions for EC2 and RDS instances', category: 'Cost Management' },
        { type: 'feature' as ChangeType, text: 'Predictive cost forecasting with 95% accuracy', category: 'Cost Management' },
        { type: 'improvement' as ChangeType, text: 'Enhanced cost allocation tags support', category: 'Cost Management' },
        { type: 'improvement' as ChangeType, text: '3x faster dashboard load times', category: 'Performance' },
      ],
      stats: {
        newFeatures: 3,
        improvements: 2,
        bugFixes: 0,
      },
    },
    {
      version: '2.5.0',
      date: '2024-01-15',
      title: 'DORA Metrics Dashboard',
      featured: true,
      image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80',
      summary: 'Comprehensive DORA metrics tracking to measure and improve your software delivery performance.',
      blogPost: '/blog/dora-metrics',
      changes: [
        { type: 'feature' as ChangeType, text: 'New DORA metrics dashboard with deployment frequency, lead time, change failure rate, and MTTR', category: 'Platform Engineering' },
        { type: 'feature' as ChangeType, text: 'Team-level DORA metrics comparison and benchmarking', category: 'Platform Engineering' },
        { type: 'feature' as ChangeType, text: 'Historical trend analysis for DORA metrics', category: 'Platform Engineering' },
        { type: 'improvement' as ChangeType, text: 'Improved service dependency visualization with interactive graph', category: 'Services' },
        { type: 'fix' as ChangeType, text: 'Fixed timezone issues in deployment tracking', category: 'Deployments' },
        { type: 'fix' as ChangeType, text: 'Resolved memory leak in real-time metrics updates', category: 'Performance' },
      ],
      stats: {
        newFeatures: 3,
        improvements: 1,
        bugFixes: 2,
      },
    },
    {
      version: '2.4.0',
      date: '2024-01-10',
      title: 'Enhanced AWS Resource Discovery',
      featured: false,
      image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=800&q=80',
      summary: 'Expanded support for AWS resources with faster discovery and better cost allocation.',
      changes: [
        { type: 'feature' as ChangeType, text: 'Automatic discovery of RDS, ElastiCache, and Lambda resources', category: 'AWS Integration' },
        { type: 'feature' as ChangeType, text: 'Support for S3 bucket analysis and cost breakdown', category: 'AWS Integration' },
        { type: 'feature' as ChangeType, text: 'Cost allocation by resource tag with custom grouping', category: 'Cost Management' },
        { type: 'improvement' as ChangeType, text: 'Faster initial sync for large AWS accounts (50% reduction)', category: 'Performance' },
        { type: 'improvement' as ChangeType, text: 'Better error handling for AWS API rate limits', category: 'AWS Integration' },
        { type: 'fix' as ChangeType, text: 'Fixed pagination in resource listing for accounts with 10,000+ resources', category: 'AWS Integration' },
        { type: 'security' as ChangeType, text: 'Enhanced IAM role validation and security checks', category: 'Security' },
      ],
      stats: {
        newFeatures: 3,
        improvements: 2,
        bugFixes: 1,
      },
    },
    {
      version: '2.3.0',
      date: '2024-01-05',
      title: 'Team Management & RBAC',
      featured: false,
      image: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=800&q=80',
      summary: 'Powerful team management features with role-based access control for enterprise customers.',
      changes: [
        { type: 'feature' as ChangeType, text: 'Create and manage engineering teams with custom hierarchies', category: 'Teams' },
        { type: 'feature' as ChangeType, text: 'Assign service ownership to teams with notifications', category: 'Teams' },
        { type: 'feature' as ChangeType, text: 'Team-based access control with granular permissions', category: 'Security' },
        { type: 'feature' as ChangeType, text: 'Team dashboards with aggregated metrics', category: 'Teams' },
        { type: 'improvement' as ChangeType, text: 'Improved onboarding flow for new users', category: 'Onboarding' },
        { type: 'improvement' as ChangeType, text: 'Bulk user import via CSV', category: 'Teams' },
      ],
      stats: {
        newFeatures: 4,
        improvements: 2,
        bugFixes: 0,
      },
    },
    {
      version: '2.2.0',
      date: '2023-12-28',
      title: 'Security & Compliance Updates',
      featured: false,
      changes: [
        { type: 'security' as ChangeType, text: 'SOC 2 Type II certification completed', category: 'Security' },
        { type: 'security' as ChangeType, text: 'GDPR compliance enhancements with data export tools', category: 'Security' },
        { type: 'feature' as ChangeType, text: 'Security scanning dashboard with vulnerability tracking', category: 'Security' },
        { type: 'feature' as ChangeType, text: 'Compliance framework templates (CIS, NIST, PCI-DSS)', category: 'Security' },
        { type: 'improvement' as ChangeType, text: 'Audit log retention increased to 2 years', category: 'Security' },
        { type: 'fix' as ChangeType, text: 'Fixed false positives in security checks', category: 'Security' },
      ],
      stats: {
        newFeatures: 2,
        improvements: 1,
        bugFixes: 1,
      },
    },
    {
      version: '2.1.0',
      date: '2023-12-20',
      title: 'Webhooks & API Enhancements',
      featured: false,
      changes: [
        { type: 'feature' as ChangeType, text: 'Webhooks for real-time event notifications', category: 'API' },
        { type: 'feature' as ChangeType, text: 'GraphQL API beta release', category: 'API' },
        { type: 'improvement' as ChangeType, text: 'REST API rate limits increased to 10,000 requests/hour', category: 'API' },
        { type: 'improvement' as ChangeType, text: 'API response times reduced by 40%', category: 'Performance' },
        { type: 'breaking' as ChangeType, text: 'Deprecated v1 endpoints (use v2 by March 2024)', category: 'API' },
        { type: 'fix' as ChangeType, text: 'Fixed inconsistent API error responses', category: 'API' },
      ],
      stats: {
        newFeatures: 2,
        improvements: 2,
        bugFixes: 1,
      },
    },
  ];

  const changeTypeConfig = {
    feature: {
      icon: Sparkles,
      label: 'New',
      color: 'text-blue-600 dark:text-blue-400',
      bgColor: 'bg-blue-100 dark:bg-blue-900/30',
      borderColor: 'border-blue-200 dark:border-blue-800',
    },
    improvement: {
      icon: Zap,
      label: 'Improved',
      color: 'text-green-600 dark:text-green-400',
      bgColor: 'bg-green-100 dark:bg-green-900/30',
      borderColor: 'border-green-200 dark:border-green-800',
    },
    fix: {
      icon: Bug,
      label: 'Fixed',
      color: 'text-orange-600 dark:text-orange-400',
      bgColor: 'bg-orange-100 dark:bg-orange-900/30',
      borderColor: 'border-orange-200 dark:border-orange-800',
    },
    security: {
      icon: Shield,
      label: 'Security',
      color: 'text-purple-600 dark:text-purple-400',
      bgColor: 'bg-purple-100 dark:bg-purple-900/30',
      borderColor: 'border-purple-200 dark:border-purple-800',
    },
    breaking: {
      icon: AlertCircle,
      label: 'Breaking',
      color: 'text-red-600 dark:text-red-400',
      bgColor: 'bg-red-100 dark:bg-red-900/30',
      borderColor: 'border-red-200 dark:border-red-800',
    },
    deprecation: {
      icon: Trash2,
      label: 'Deprecated',
      color: 'text-amber-600 dark:text-amber-400',
      bgColor: 'bg-amber-100 dark:bg-amber-900/30',
      borderColor: 'border-amber-200 dark:border-amber-800',
    },
  };

  const filters: { value: ChangeType | 'all'; label: string; icon: any }[] = [
    { value: 'all', label: 'All Updates', icon: Package },
    { value: 'feature', label: 'New Features', icon: Sparkles },
    { value: 'improvement', label: 'Improvements', icon: Zap },
    { value: 'fix', label: 'Bug Fixes', icon: Bug },
    { value: 'security', label: 'Security', icon: Shield },
  ];

  // Filter releases
  const filteredReleases = releases.filter((release) => {
    const matchesFilter =
      selectedFilter === 'all' ||
      release.changes.some((change) => change.type === selectedFilter);
    const matchesSearch =
      searchQuery === '' ||
      release.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      release.summary?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      release.changes.some((change) =>
        change.text.toLowerCase().includes(searchQuery.toLowerCase())
      );
    return matchesFilter && matchesSearch;
  });

  const featuredReleases = releases.filter((r) => r.featured);

  return (
    <div className="min-h-screen bg-background py-8 md:py-12">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 xl:px-12">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary/20 to-primary/10 flex items-center justify-center mx-auto mb-6 shadow-lg shadow-primary/20">
            <Sparkles className="w-8 h-8 text-primary" />
          </div>

          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">
            What&apos;s New in DevControl
          </h1>

          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
            All the latest updates, improvements, and fixes to DevControl. We ship new features
            every week to help you build better.
          </p>

          {/* Search Bar */}
          <div className="relative max-w-xl mx-auto mb-6">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search updates..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full h-12 pl-12 pr-4 rounded-lg border bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
            />
          </div>

          {/* Subscribe CTA */}
          <div className="flex items-center justify-center gap-3">
            <Button asChild variant="outline" className="gap-2">
              <Link href="/blog">
                <BookOpen className="w-4 h-4" />
                Read Blog
              </Link>
            </Button>
            <Button asChild className="gap-2">
              <a href="#subscribe">
                <Mail className="w-4 h-4" />
                Subscribe to Updates
              </a>
            </Button>
          </div>
        </div>

        {/* Filters */}
        <div className="mb-12">
          <div className="flex items-center gap-2 mb-4">
            <Filter className="w-4 h-4 text-muted-foreground" />
            <span className="text-sm font-medium text-muted-foreground">Filter by type</span>
          </div>
          <div className="flex flex-wrap gap-3">
            {filters.map((filter) => {
              const Icon = filter.icon;
              return (
                <Button
                  key={filter.value}
                  variant={selectedFilter === filter.value ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setSelectedFilter(filter.value)}
                  className="gap-2"
                >
                  <Icon className="w-4 h-4" />
                  {filter.label}
                </Button>
              );
            })}
          </div>
        </div>

        {/* Featured Releases */}
        {selectedFilter === 'all' && searchQuery === '' && featuredReleases.length > 0 && (
          <div className="mb-12">
            <div className="flex items-center gap-2 mb-6">
              <Star className="w-5 h-5 text-amber-500" />
              <h2 className="text-2xl font-bold text-foreground">Featured Releases</h2>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              {featuredReleases.map((release) => (
                <Card
                  key={release.version}
                  className="group hover:shadow-xl transition-all cursor-pointer overflow-hidden"
                >
                  {/* Featured Image */}
                  <div className="relative h-48 overflow-hidden bg-muted">
                    <Image
                      src={release.image!}
                      alt={release.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                      unoptimized
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                    <div className="absolute top-3 right-3">
                      <Badge className="bg-amber-500 text-white border-0 shadow-lg">
                        <Star className="w-3 h-3 mr-1" />
                        Featured
                      </Badge>
                    </div>
                    <div className="absolute bottom-3 left-3">
                      <Badge className="bg-primary text-primary-foreground border-0 font-bold shadow-lg">
                        v{release.version}
                      </Badge>
                    </div>
                  </div>

                  <CardHeader>
                    <div className="flex items-center gap-3 mb-2">
                      <span className="flex items-center gap-1 text-xs text-muted-foreground">
                        <Calendar className="w-3 h-3" />
                        {new Date(release.date).toLocaleDateString('en-US', {
                          month: 'long',
                          day: 'numeric',
                          year: 'numeric',
                        })}
                      </span>
                    </div>
                    <CardTitle className="text-xl group-hover:text-primary transition-colors">
                      {release.title}
                    </CardTitle>
                    <CardDescription className="mt-2">{release.summary}</CardDescription>
                  </CardHeader>

                  <CardContent>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4 text-xs text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <Sparkles className="w-3 h-3" />
                          {release.stats.newFeatures} new
                        </span>
                        <span className="flex items-center gap-1">
                          <Zap className="w-3 h-3" />
                          {release.stats.improvements} improved
                        </span>
                        {release.stats.bugFixes > 0 && (
                          <span className="flex items-center gap-1">
                            <Bug className="w-3 h-3" />
                            {release.stats.bugFixes} fixed
                          </span>
                        )}
                      </div>
                      {release.blogPost && (
                        <Button asChild variant="ghost" size="sm" className="gap-1">
                          <Link href={release.blogPost}>
                            Read more
                            <ArrowRight className="w-3 h-3" />
                          </Link>
                        </Button>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* All Releases */}
        <div className="mb-12">
          {selectedFilter !== 'all' || searchQuery !== '' ? (
            <div className="mb-6">
              <h2 className="text-2xl font-bold text-foreground">
                {filteredReleases.length} {filteredReleases.length === 1 ? 'Release' : 'Releases'}
                {searchQuery && ` matching "${searchQuery}"`}
              </h2>
            </div>
          ) : (
            <div className="mb-6">
              <h2 className="text-2xl font-bold text-foreground">All Releases</h2>
            </div>
          )}

          {filteredReleases.length === 0 ? (
            <Card className="p-12 text-center">
              <Package className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">No releases found</h3>
              <p className="text-muted-foreground mb-4">
                Try adjusting your search or filter criteria
              </p>
              <Button
                onClick={() => {
                  setSearchQuery('');
                  setSelectedFilter('all');
                }}
                variant="outline"
              >
                Clear filters
              </Button>
            </Card>
          ) : (
            <div className="space-y-8">
              {filteredReleases.map((release) => (
                <Card key={release.version} className="hover:shadow-md transition-shadow">
                  <CardHeader>
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <div className="flex items-center gap-3 mb-2">
                          <Badge className="bg-primary text-primary-foreground border-0 font-bold">
                            v{release.version}
                          </Badge>
                          <span className="flex items-center gap-1 text-sm text-muted-foreground">
                            <Calendar className="w-3 h-3" />
                            {new Date(release.date).toLocaleDateString('en-US', {
                              month: 'long',
                              day: 'numeric',
                              year: 'numeric',
                            })}
                          </span>
                        </div>
                        <CardTitle className="text-2xl">{release.title}</CardTitle>
                        {release.summary && (
                          <CardDescription className="mt-2 text-base">
                            {release.summary}
                          </CardDescription>
                        )}
                      </div>
                      {release.blogPost && (
                        <Button asChild variant="outline" size="sm" className="gap-2">
                          <Link href={release.blogPost}>
                            <BookOpen className="w-4 h-4" />
                            Read more
                            <ExternalLink className="w-3 h-3" />
                          </Link>
                        </Button>
                      )}
                    </div>

                    {/* Stats */}
                    <div className="flex items-center gap-4 text-xs text-muted-foreground mt-4 pt-4 border-t">
                      <span className="flex items-center gap-1">
                        <Sparkles className="w-3 h-3" />
                        {release.stats.newFeatures} new features
                      </span>
                      <span className="flex items-center gap-1">
                        <Zap className="w-3 h-3" />
                        {release.stats.improvements} improvements
                      </span>
                      {release.stats.bugFixes > 0 && (
                        <span className="flex items-center gap-1">
                          <Bug className="w-3 h-3" />
                          {release.stats.bugFixes} bug fixes
                        </span>
                      )}
                    </div>
                  </CardHeader>

                  <CardContent>
                    <div className="space-y-3">
                      {release.changes
                        .filter((change) => selectedFilter === 'all' || change.type === selectedFilter)
                        .map((change, idx) => {
                          const config = changeTypeConfig[change.type];
                          const Icon = config.icon;

                          return (
                            <div key={idx} className="flex items-start gap-3 group/item">
                              <div
                                className={`flex items-center gap-1.5 mt-0.5 px-2 py-1 rounded-md ${config.bgColor} shrink-0`}
                              >
                                <Icon className={`w-3.5 h-3.5 ${config.color}`} />
                                <span className={`text-xs font-semibold ${config.color}`}>
                                  {config.label}
                                </span>
                              </div>
                              <div className="flex-1 min-w-0">
                                <p className="text-sm text-foreground">{change.text}</p>
                                {change.category && (
                                  <span className="text-xs text-muted-foreground">
                                    {change.category}
                                  </span>
                                )}
                              </div>
                            </div>
                          );
                        })}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>

        {/* Subscribe Section */}
        <Card
          id="subscribe"
          className="bg-gradient-to-r from-primary/10 via-primary/5 to-background border-primary/20 mb-12"
        >
          <CardContent className="pt-8 pb-8">
            <div className="max-w-2xl mx-auto text-center">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                <Mail className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-xl md:text-2xl font-bold mb-3">
                Never Miss an Update
              </h3>
              <p className="text-muted-foreground mb-6">
                Get notified about new features, improvements, and important updates delivered to
                your inbox every week.
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
                  Subscribe
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </div>

              <p className="text-xs text-muted-foreground mt-4">
                Join 8,000+ subscribers. Unsubscribe anytime.
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Footer Links */}
        <div className="grid md:grid-cols-3 gap-6">
          <Card className="hover:shadow-md transition-shadow cursor-pointer group">
            <Link href="/docs">
              <CardHeader>
                <CardTitle className="text-base flex items-center gap-2 group-hover:text-primary transition-colors">
                  <BookOpen className="w-4 h-4" />
                  Documentation
                  <ArrowRight className="w-4 h-4 ml-auto opacity-0 group-hover:opacity-100 transition-opacity" />
                </CardTitle>
                <CardDescription className="text-sm">
                  Learn how to use all the new features
                </CardDescription>
              </CardHeader>
            </Link>
          </Card>

          <Card className="hover:shadow-md transition-shadow cursor-pointer group">
            <Link href="/blog">
              <CardHeader>
                <CardTitle className="text-base flex items-center gap-2 group-hover:text-primary transition-colors">
                  <Rocket className="w-4 h-4" />
                  Blog
                  <ArrowRight className="w-4 h-4 ml-auto opacity-0 group-hover:opacity-100 transition-opacity" />
                </CardTitle>
                <CardDescription className="text-sm">
                  Read in-depth articles about new releases
                </CardDescription>
              </CardHeader>
            </Link>
          </Card>

          <Card className="hover:shadow-md transition-shadow cursor-pointer group">
            <a href="mailto:feedback@devcontrol.io">
              <CardHeader>
                <CardTitle className="text-base flex items-center gap-2 group-hover:text-primary transition-colors">
                  <Sparkles className="w-4 h-4" />
                  Request a Feature
                  <ArrowRight className="w-4 h-4 ml-auto opacity-0 group-hover:opacity-100 transition-opacity" />
                </CardTitle>
                <CardDescription className="text-sm">
                  Have an idea? We&apos;d love to hear it
                </CardDescription>
              </CardHeader>
            </a>
          </Card>
        </div>
      </div>
    </div>
  );
}
