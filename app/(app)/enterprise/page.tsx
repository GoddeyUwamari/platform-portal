'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Building2,
  Shield,
  Zap,
  Users,
  Lock,
  Globe,
  CheckCircle2,
  ArrowRight,
  Sparkles,
  Server,
  BarChart3,
  Phone,
  Mail,
  Calendar,
  Award,
  FileCheck,
  Headphones,
  Cloud,
  ShieldCheck,
  Target,
  Workflow,
  Key,
  UserCheck,
  LineChart,
  HelpCircle,
  ChevronDown,
  Clock,
  Download,
  MessageCircle,
  Rocket,
  DollarSign,
  Quote,
  TrendingDown,
  Layers,
  GitCompare,
  FileText,
  Scale,
  Briefcase,
  Landmark,
  Heart,
  ShoppingCart,
  ArrowUpRight,
} from 'lucide-react';
import Link from 'next/link';

export default function EnterprisePage() {
  const [contactForm, setContactForm] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    employees: '',
    awsSpend: '',
    message: '',
  });

  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);
  const [showStickyCta, setShowStickyCta] = useState(false);

  // Show sticky CTA after scrolling past hero
  useEffect(() => {
    const handleScroll = () => {
      setShowStickyCta(window.scrollY > 600);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const enterpriseFeatures = [
    {
      icon: Server,
      title: 'Unlimited AWS Resources',
      description: 'Monitor and manage unlimited AWS resources across all your accounts with no caps or overage fees.',
    },
    {
      icon: Lock,
      title: 'SSO/SAML Authentication',
      description: 'Enterprise-grade security with SAML 2.0, OIDC, and integrations with Okta, Azure AD, and more.',
    },
    {
      icon: ShieldCheck,
      title: 'Custom Compliance Frameworks',
      description: 'Create custom compliance frameworks tailored to your industry requirements beyond SOC 2 and HIPAA.',
    },
    {
      icon: Workflow,
      title: 'Auto-Remediation Workflows',
      description: 'Automated remediation for security issues, cost anomalies, and resource optimization.',
    },
    {
      icon: BarChart3,
      title: 'Scheduled Reports',
      description: 'Automated executive reports delivered weekly or monthly to stakeholders.',
    },
    {
      icon: Key,
      title: 'Full API Access',
      description: 'Complete programmatic access with 20,000+ API requests per month for custom integrations.',
    },
    {
      icon: Users,
      title: 'Unlimited Team Members',
      description: 'Add your entire organization with no per-seat limits. Scale without surprise costs.',
    },
    {
      icon: Headphones,
      title: '24/7 Priority Support',
      description: 'Dedicated support team with guaranteed response times and a named account manager.',
    },
  ];

  const complianceCertifications = [
    {
      name: 'SOC 2 Type II',
      icon: Shield,
      description: 'Annual audit for security, availability, and confidentiality',
    },
    {
      name: 'HIPAA',
      icon: FileCheck,
      description: 'BAA available for healthcare organizations',
    },
    {
      name: 'GDPR',
      icon: Globe,
      description: 'Full GDPR compliance with EU data residency options',
    },
    {
      name: 'ISO 27001',
      icon: Award,
      description: 'Information security management certification',
    },
  ];

  const useCases = [
    {
      title: 'Financial Services',
      icon: LineChart,
      description: 'Meet strict regulatory requirements while optimizing cloud costs across trading platforms and banking systems.',
      features: ['PCI-DSS compliance', 'Audit trails', 'Cost attribution by trading desk'],
    },
    {
      title: 'Healthcare & Life Sciences',
      icon: Shield,
      description: 'HIPAA-compliant infrastructure monitoring with PHI protection and detailed audit logging.',
      features: ['HIPAA BAA available', 'PHI data protection', 'Compliance reporting'],
    },
    {
      title: 'Technology & SaaS',
      icon: Cloud,
      description: 'Scale your multi-tenant architecture while maintaining cost efficiency and security posture.',
      features: ['Multi-account management', 'Cost per customer', 'Security scoring'],
    },
    {
      title: 'Retail & E-commerce',
      icon: Target,
      description: 'Optimize infrastructure costs during peak seasons while maintaining performance SLAs.',
      features: ['Capacity planning', 'Cost forecasting', 'Auto-scaling insights'],
    },
  ];

  const supportFeatures = [
    {
      icon: Phone,
      title: '24/7 Phone Support',
      description: 'Direct access to senior engineers around the clock',
    },
    {
      icon: UserCheck,
      title: 'Dedicated Account Manager',
      description: 'Your single point of contact for all needs',
    },
    {
      icon: Calendar,
      title: 'Quarterly Business Reviews',
      description: 'Regular strategy sessions with our team',
    },
    {
      icon: Zap,
      title: '99.99% Uptime SLA',
      description: 'Guaranteed availability with financial backing',
    },
  ];

  const stats = [
    { value: '$50M+', label: 'AWS costs managed monthly' },
    { value: '500+', label: 'Enterprise customers' },
    { value: '32%', label: 'Avg cost reduction' },
    { value: '98%', label: 'Customer retention' },
  ];

  // Anonymized industry-based social proof (real industries, not fake company names)
  const customerIndustries = [
    { icon: Landmark, label: 'Fortune 500 Financial Services' },
    { icon: Heart, label: 'Top 10 Healthcare System' },
    { icon: Cloud, label: 'Unicorn SaaS Companies' },
    { icon: ShoppingCart, label: 'Global Retail Brands' },
    { icon: Briefcase, label: 'Big 4 Consulting Firms' },
  ];

  const implementationSteps = [
    { step: 1, title: 'Discovery Call', duration: 'Day 1', description: 'Understand your infrastructure and requirements' },
    { step: 2, title: 'Technical Setup', duration: 'Days 2-3', description: 'Connect AWS accounts with read-only access' },
    { step: 3, title: 'Configuration', duration: 'Days 4-7', description: 'Customize dashboards, alerts, and compliance rules' },
    { step: 4, title: 'Team Training', duration: 'Days 8-10', description: 'Onboard your team with live training sessions' },
    { step: 5, title: 'Go Live', duration: 'Day 10+', description: 'Full production deployment with ongoing support' },
  ];

  const whyDevControl = [
    {
      feature: 'Time to Value',
      devcontrol: '10 days to production',
      others: '3-6 months typical',
    },
    {
      feature: 'AWS Coverage',
      devcontrol: '50+ services supported',
      others: 'Limited service support',
    },
    {
      feature: 'Pricing Model',
      devcontrol: 'Flat monthly fee',
      others: '% of spend (gets expensive)',
    },
    {
      feature: 'Data Security',
      devcontrol: 'Read-only access only',
      others: 'Often requires write access',
    },
  ];

  const faqs = [
    {
      question: 'What is the minimum contract term for Enterprise?',
      answer: 'Enterprise contracts are typically annual, with discounts available for multi-year commitments. We offer flexible terms to meet your procurement requirements including monthly billing for qualified customers.',
    },
    {
      question: 'Can DevControl be deployed on-premise?',
      answer: 'Yes, we offer on-premise and private cloud deployment options for organizations with strict data residency or security requirements. This includes AWS GovCloud and air-gapped environments. Contact our team for architecture details.',
    },
    {
      question: 'How does SSO/SAML integration work?',
      answer: 'We support SAML 2.0 and OIDC protocols with pre-built integrations for Okta, Azure AD, OneLogin, Ping Identity, and other identity providers. Setup typically takes less than 30 minutes with our guided wizard.',
    },
    {
      question: 'What compliance certifications does DevControl have?',
      answer: 'We maintain SOC 2 Type II, HIPAA (with BAA available), GDPR compliance, and ISO 27001 certification. Audit reports and penetration test results are available upon request under NDA.',
    },
    {
      question: 'How is data protected and where is it stored?',
      answer: 'All data is encrypted at rest (AES-256) and in transit (TLS 1.3). We offer data residency options in US, EU, and APAC regions. We never store your AWS credentials - we use IAM roles with read-only permissions.',
    },
    {
      question: 'What training and onboarding is included?',
      answer: 'Enterprise customers receive dedicated onboarding with a solutions architect, custom training sessions for your team (live and recorded), documentation portal access, and our DevControl certification program.',
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Sticky CTA Bar */}
      <div
        className={`fixed bottom-0 left-0 right-0 z-50 bg-card/95 backdrop-blur border-t shadow-lg transform transition-transform duration-300 ${
          showStickyCta ? 'translate-y-0' : 'translate-y-full'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between gap-4">
          <div className="hidden sm:block">
            <p className="font-semibold">Ready to cut your AWS costs by 30%?</p>
            <p className="text-sm text-muted-foreground">Limited Q1 onboarding slots available</p>
          </div>
          <div className="flex items-center gap-3 w-full sm:w-auto">
            <Button className="flex-1 sm:flex-none gap-2" asChild>
              <a href="#contact">
                <Calendar className="w-4 h-4" />
                Schedule Demo
              </a>
            </Button>
            <Button variant="outline" className="hidden sm:flex gap-2" asChild>
              <Link href="/pricing">
                View Pricing
              </Link>
            </Button>
          </div>
        </div>
      </div>

      {/* Hero Section */}
      <section className="relative overflow-hidden">
        {/* Gradient Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-50 via-purple-50/50 to-background dark:from-indigo-950/30 dark:via-purple-950/20 dark:to-background" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-blue-100/40 via-transparent to-transparent dark:from-blue-900/20" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
          <div className="text-center max-w-4xl mx-auto">
            {/* Urgency Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-400 text-sm font-medium mb-4">
              <Clock className="w-4 h-4" />
              <span>Limited Q1 onboarding slots - Book by Jan 31 for priority setup</span>
            </div>

            {/* Trust Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 text-sm font-medium mb-6">
              <CheckCircle2 className="w-4 h-4" />
              <span>Trusted by 500+ enterprise teams worldwide</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6">
              Cut AWS Costs by 30%{' '}
              <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                Without the Complexity
              </span>
            </h1>

            {/* Subheadline */}
            <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-3xl mx-auto">
              The enterprise platform for AWS cost optimization, security compliance, and infrastructure visibility.
              Deployed in days, not months.
            </p>

            {/* Pricing Indicator */}
            <div className="inline-flex flex-wrap items-center justify-center gap-2 px-4 py-2 rounded-lg bg-muted/50 text-sm mb-8">
              <DollarSign className="w-4 h-4 text-primary" />
              <span>Enterprise plans from <strong>$1,499/month</strong></span>
              <span className="text-muted-foreground">•</span>
              <Link href="/pricing" className="text-primary hover:underline flex items-center gap-1">
                See all plans <ArrowUpRight className="w-3 h-3" />
              </Link>
            </div>

            {/* Stats Bar */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-10 max-w-3xl mx-auto">
              {stats.map((stat) => (
                <div key={stat.label} className="text-center">
                  <div className="text-2xl md:text-3xl font-bold text-foreground">{stat.value}</div>
                  <div className="text-sm text-muted-foreground">{stat.label}</div>
                </div>
              ))}
            </div>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button size="lg" className="gap-2 px-8 py-6 text-base" asChild>
                <a href="#contact">
                  <Calendar className="w-4 h-4" />
                  Get Your Custom Demo
                </a>
              </Button>
              <Button size="lg" variant="outline" className="gap-2 px-8 py-6 text-base" asChild>
                <Link href="/pricing">
                  <DollarSign className="w-4 h-4" />
                  Get Custom Quote
                </Link>
              </Button>
            </div>

            {/* Quick Value Props */}
            <div className="flex flex-wrap justify-center gap-6 text-sm text-muted-foreground mt-8">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-green-600" />
                <span>14-day free trial</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-green-600" />
                <span>No credit card required</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-green-600" />
                <span>Go live in 10 days</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Trusted By Section - Anonymized Industries */}
      <section className="py-12 border-y bg-muted/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-center text-sm text-muted-foreground mb-8">
            TRUSTED BY ENGINEERING TEAMS AT LEADING ORGANIZATIONS
          </p>
          <div className="flex flex-wrap justify-center items-center gap-6 md:gap-10">
            {customerIndustries.map((industry) => {
              const Icon = industry.icon;
              return (
                <div
                  key={industry.label}
                  className="flex items-center gap-3 px-4 py-2 rounded-lg bg-card border text-muted-foreground hover:text-foreground hover:border-primary/30 transition-all"
                >
                  <Icon className="w-5 h-5" />
                  <span className="text-sm font-medium">{industry.label}</span>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Customer Success Story */}
      <section className="py-16 md:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Card className="bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-950/20 dark:to-emerald-950/20 border-green-200 dark:border-green-800">
            <CardContent className="p-8 md:p-12">
              <div className="grid md:grid-cols-2 gap-8 items-center">
                <div>
                  <Badge className="mb-4 bg-green-100 text-green-700 dark:bg-green-900/50 dark:text-green-400 border-0">
                    <TrendingDown className="w-3 h-3 mr-1" />
                    Customer Success Story
                  </Badge>
                  <Quote className="w-10 h-10 text-green-600/30 mb-4" />
                  <blockquote className="text-xl md:text-2xl font-medium text-foreground mb-6">
                    &ldquo;DevControl identified $1.2M in annual AWS savings within the first 30 days.
                    The ROI was immediate and the implementation was remarkably smooth.&rdquo;
                  </blockquote>
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-green-200 dark:bg-green-800 flex items-center justify-center font-bold text-green-700 dark:text-green-300">
                      VP
                    </div>
                    <div>
                      <p className="font-semibold">VP of Platform Engineering</p>
                      <p className="text-sm text-muted-foreground">Fortune 500 Financial Services Company</p>
                    </div>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-card rounded-xl p-6 text-center border">
                    <div className="text-3xl md:text-4xl font-bold text-green-600 mb-2">$1.2M</div>
                    <p className="text-sm text-muted-foreground">Annual savings identified</p>
                  </div>
                  <div className="bg-card rounded-xl p-6 text-center border">
                    <div className="text-3xl md:text-4xl font-bold text-green-600 mb-2">30 days</div>
                    <p className="text-sm text-muted-foreground">Time to first insights</p>
                  </div>
                  <div className="bg-card rounded-xl p-6 text-center border">
                    <div className="text-3xl md:text-4xl font-bold text-green-600 mb-2">8,500+</div>
                    <p className="text-sm text-muted-foreground">AWS resources monitored</p>
                  </div>
                  <div className="bg-card rounded-xl p-6 text-center border">
                    <div className="text-3xl md:text-4xl font-bold text-green-600 mb-2">100%</div>
                    <p className="text-sm text-muted-foreground">Compliance score achieved</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Product Preview - Dashboard Mockup */}
      <section className="py-16 md:py-24 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <Badge className="mb-4" variant="secondary">
              <Layers className="w-3 h-3 mr-1" />
              Platform Overview
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Your AWS Costs at a Glance
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Instant visibility into spending trends, optimization opportunities, and security compliance
              across your entire AWS infrastructure.
            </p>
          </div>

          {/* Dashboard Mockup */}
          <div className="relative max-w-5xl mx-auto">
            <div className="rounded-2xl bg-card border shadow-2xl overflow-hidden">
              {/* Mock Browser Header */}
              <div className="bg-muted/50 border-b px-4 py-3 flex items-center gap-2">
                <div className="flex gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-red-400" />
                  <div className="w-3 h-3 rounded-full bg-yellow-400" />
                  <div className="w-3 h-3 rounded-full bg-green-400" />
                </div>
                <div className="flex-1 mx-4">
                  <div className="bg-background rounded px-3 py-1 text-xs text-muted-foreground text-center max-w-md mx-auto">
                    app.devcontrol.io/dashboard
                  </div>
                </div>
              </div>
              {/* Mock Dashboard Content */}
              <div className="p-6 bg-background">
                <div className="grid grid-cols-4 gap-4 mb-6">
                  <div className="bg-muted/30 rounded-lg p-4">
                    <p className="text-xs text-muted-foreground mb-1">Monthly Spend</p>
                    <p className="text-2xl font-bold">$847,234</p>
                    <p className="text-xs text-green-600">-12% vs last month</p>
                  </div>
                  <div className="bg-muted/30 rounded-lg p-4">
                    <p className="text-xs text-muted-foreground mb-1">Potential Savings</p>
                    <p className="text-2xl font-bold text-green-600">$284,521</p>
                    <p className="text-xs text-muted-foreground">34% of current spend</p>
                  </div>
                  <div className="bg-muted/30 rounded-lg p-4">
                    <p className="text-xs text-muted-foreground mb-1">Resources</p>
                    <p className="text-2xl font-bold">12,847</p>
                    <p className="text-xs text-muted-foreground">Across 8 accounts</p>
                  </div>
                  <div className="bg-muted/30 rounded-lg p-4">
                    <p className="text-xs text-muted-foreground mb-1">Compliance Score</p>
                    <p className="text-2xl font-bold text-primary">94%</p>
                    <p className="text-xs text-amber-600">3 issues to resolve</p>
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-4">
                  <div className="col-span-2 bg-muted/30 rounded-lg p-4 h-40">
                    <p className="text-sm font-medium mb-2">Cost Trend (6 months)</p>
                    <div className="flex items-end gap-2 h-24">
                      {[65, 72, 68, 80, 75, 60].map((height, i) => (
                        <div key={i} className="flex-1 bg-primary/20 rounded-t" style={{ height: `${height}%` }}>
                          <div className="w-full bg-primary rounded-t" style={{ height: `${100 - height + 20}%` }} />
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="bg-muted/30 rounded-lg p-4 h-40">
                    <p className="text-sm font-medium mb-2">Top Recommendations</p>
                    <div className="space-y-2 text-xs">
                      <div className="flex justify-between">
                        <span>Rightsize EC2</span>
                        <span className="text-green-600">-$45K/mo</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Reserved Instances</span>
                        <span className="text-green-600">-$82K/mo</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Unused EBS</span>
                        <span className="text-green-600">-$12K/mo</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* Floating badges */}
            <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 flex gap-4">
              <div className="px-4 py-2 rounded-full bg-card border shadow-lg text-sm font-medium">
                <span className="text-green-600">-34%</span> avg cost reduction
              </div>
              <div className="px-4 py-2 rounded-full bg-card border shadow-lg text-sm font-medium hidden sm:block">
                <span className="text-primary">24 hours</span> to first insights
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why DevControl Comparison */}
      <section className="py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <Badge className="mb-4" variant="secondary">
              <GitCompare className="w-3 h-3 mr-1" />
              Why DevControl
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              The Enterprise Difference
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              See why leading enterprises choose DevControl over legacy cost management tools.
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="rounded-xl border overflow-hidden">
              <div className="grid grid-cols-3 bg-muted/50 border-b">
                <div className="p-4 font-semibold">Feature</div>
                <div className="p-4 font-semibold text-center bg-primary/10 border-x">DevControl</div>
                <div className="p-4 font-semibold text-center text-muted-foreground">Others</div>
              </div>
              {whyDevControl.map((row, index) => (
                <div key={row.feature} className={`grid grid-cols-3 ${index !== whyDevControl.length - 1 ? 'border-b' : ''}`}>
                  <div className="p-4 font-medium">{row.feature}</div>
                  <div className="p-4 text-center bg-primary/5 border-x">
                    <span className="inline-flex items-center gap-2 text-green-600 font-medium">
                      <CheckCircle2 className="w-4 h-4" />
                      {row.devcontrol}
                    </span>
                  </div>
                  <div className="p-4 text-center text-muted-foreground">{row.others}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Enterprise Features Grid */}
      <section className="py-16 md:py-24 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <Badge className="mb-4" variant="secondary">
              <Sparkles className="w-3 h-3 mr-1" />
              Enterprise Features
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Built for Scale and Security
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Everything you need to manage AWS infrastructure at enterprise scale with the security
              and compliance your organization requires.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {enterpriseFeatures.map((feature) => {
              const Icon = feature.icon;
              return (
                <Card key={feature.title} className="hover:shadow-lg transition-all hover:border-primary/30 group">
                  <CardHeader>
                    <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                      <Icon className="w-6 h-6 text-primary" />
                    </div>
                    <CardTitle className="text-lg">{feature.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-sm">
                      {feature.description}
                    </CardDescription>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Security & Compliance Section */}
      <section className="py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <Badge className="mb-4" variant="secondary">
                <Shield className="w-3 h-3 mr-1" />
                Security & Compliance
              </Badge>
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                Enterprise Security You Can Trust
              </h2>
              <p className="text-lg text-muted-foreground mb-8">
                DevControl is built with security-first principles. We maintain the highest levels
                of compliance certifications and security practices to protect your infrastructure data.
              </p>

              <div className="space-y-4 mb-8">
                {[
                  'Read-only AWS access – we never modify your resources',
                  'All data encrypted at rest (AES-256) and in transit (TLS 1.3)',
                  'SOC 2 Type II certified with annual audits',
                  'GDPR compliant with EU data residency options',
                  'Role-based access control with SSO integration',
                  'Detailed audit logs retained for 2+ years',
                ].map((item, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-green-600 mt-0.5 shrink-0" />
                    <span className="text-foreground">{item}</span>
                  </div>
                ))}
              </div>

              {/* Security Documentation Links */}
              <div className="flex flex-wrap gap-3">
                <Button variant="outline" size="sm" className="gap-2">
                  <Download className="w-4 h-4" />
                  SOC 2 Report
                </Button>
                <Button variant="outline" size="sm" className="gap-2">
                  <Download className="w-4 h-4" />
                  Security Whitepaper
                </Button>
                <Button variant="outline" size="sm" className="gap-2">
                  <FileCheck className="w-4 h-4" />
                  Request DPA
                </Button>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              {complianceCertifications.map((cert) => {
                const Icon = cert.icon;
                return (
                  <Card key={cert.name} className="text-center p-6 hover:shadow-lg transition-all">
                    <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                      <Icon className="w-7 h-7 text-primary" />
                    </div>
                    <h3 className="font-bold text-lg mb-2">{cert.name}</h3>
                    <p className="text-sm text-muted-foreground">{cert.description}</p>
                  </Card>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Implementation Timeline */}
      <section className="py-16 md:py-24 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <Badge className="mb-4" variant="secondary">
              <Rocket className="w-3 h-3 mr-1" />
              Fast Implementation
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Go Live in 10 Days
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Our proven onboarding process gets you from signed contract to production
              deployment in just 10 business days.
            </p>
          </div>

          <div className="relative">
            {/* Timeline Line */}
            <div className="hidden md:block absolute top-8 left-0 right-0 h-0.5 bg-border" />

            <div className="grid md:grid-cols-5 gap-6">
              {implementationSteps.map((step) => (
                <div key={step.step} className="relative">
                  {/* Step Circle */}
                  <div className="flex md:justify-center mb-4">
                    <div className="w-16 h-16 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold text-xl relative z-10">
                      {step.step}
                    </div>
                  </div>
                  <div className="md:text-center">
                    <div className="text-xs font-medium text-primary mb-1">{step.duration}</div>
                    <h3 className="font-bold mb-2">{step.title}</h3>
                    <p className="text-sm text-muted-foreground">{step.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Industry Use Cases */}
      <section className="py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <Badge className="mb-4" variant="secondary">
              <Target className="w-3 h-3 mr-1" />
              Industry Solutions
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Purpose-Built for Your Industry
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              DevControl adapts to the unique requirements of your industry with specialized
              compliance frameworks and reporting.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {useCases.map((useCase) => {
              const Icon = useCase.icon;
              return (
                <Card key={useCase.title} className="hover:shadow-lg transition-all">
                  <CardHeader>
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-primary/20 to-primary/10 flex items-center justify-center">
                        <Icon className="w-6 h-6 text-primary" />
                      </div>
                      <CardTitle className="text-xl">{useCase.title}</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-base mb-4">
                      {useCase.description}
                    </CardDescription>
                    <div className="flex flex-wrap gap-2">
                      {useCase.features.map((feature) => (
                        <Badge key={feature} variant="secondary" className="text-xs">
                          {feature}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Enterprise Support Section */}
      <section className="py-16 md:py-24 bg-gradient-to-br from-indigo-50 via-purple-50/50 to-background dark:from-indigo-950/30 dark:via-purple-950/20 dark:to-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <Badge className="mb-4" variant="secondary">
              <Headphones className="w-3 h-3 mr-1" />
              Enterprise Support
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              White-Glove Support Experience
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Your success is our priority. Enterprise customers receive dedicated support
              with guaranteed response times and proactive guidance.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {supportFeatures.map((feature) => {
              const Icon = feature.icon;
              return (
                <Card key={feature.title} className="text-center hover:shadow-lg transition-all">
                  <CardContent className="pt-6">
                    <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                      <Icon className="w-7 h-7 text-primary" />
                    </div>
                    <h3 className="font-bold text-lg mb-2">{feature.title}</h3>
                    <p className="text-sm text-muted-foreground">{feature.description}</p>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          {/* SLA Highlights */}
          <div className="mt-12 bg-card rounded-xl border p-8">
            <h3 className="text-xl font-bold mb-6 text-center">Enterprise SLA Guarantees</h3>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="text-3xl font-bold text-primary mb-2">99.99%</div>
                <div className="text-sm text-muted-foreground">Platform Uptime</div>
                <div className="text-xs text-muted-foreground mt-1">with financial credits if breached</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-primary mb-2">&lt;1 Hour</div>
                <div className="text-sm text-muted-foreground">Critical Issue Response</div>
                <div className="text-xs text-muted-foreground mt-1">24/7/365 for P1 incidents</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-primary mb-2">&lt;4 Hours</div>
                <div className="text-sm text-muted-foreground">General Support Response</div>
                <div className="text-xs text-muted-foreground mt-1">during business hours</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* For Procurement Teams */}
      <section className="py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <Badge className="mb-4" variant="secondary">
              <Scale className="w-3 h-3 mr-1" />
              For Procurement Teams
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Enterprise-Ready Documentation
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Everything your legal and procurement teams need to evaluate and approve DevControl.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Card className="hover:shadow-md transition-all cursor-pointer group">
              <CardContent className="p-6 flex items-center gap-4">
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                  <FileText className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold">Master Service Agreement</h3>
                  <p className="text-sm text-muted-foreground">Standard MSA template</p>
                </div>
              </CardContent>
            </Card>
            <Card className="hover:shadow-md transition-all cursor-pointer group">
              <CardContent className="p-6 flex items-center gap-4">
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                  <Shield className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold">Data Processing Agreement</h3>
                  <p className="text-sm text-muted-foreground">GDPR-compliant DPA</p>
                </div>
              </CardContent>
            </Card>
            <Card className="hover:shadow-md transition-all cursor-pointer group">
              <CardContent className="p-6 flex items-center gap-4">
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                  <Zap className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold">SLA Document</h3>
                  <p className="text-sm text-muted-foreground">Uptime guarantees</p>
                </div>
              </CardContent>
            </Card>
            <Card className="hover:shadow-md transition-all cursor-pointer group">
              <CardContent className="p-6 flex items-center gap-4">
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                  <Award className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold">Security Questionnaire</h3>
                  <p className="text-sm text-muted-foreground">Pre-filled SIG Lite</p>
                </div>
              </CardContent>
            </Card>
          </div>

          <p className="text-center text-sm text-muted-foreground mt-8">
            Need custom contract terms?{' '}
            <a href="#contact" className="text-primary hover:underline">
              Contact our enterprise team
            </a>
          </p>
        </div>
      </section>

      {/* What's Included */}
      <section className="py-16 md:py-24 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              What&apos;s Included in Enterprise
            </h2>
            <p className="text-lg text-muted-foreground">
              Everything in Pro, plus these enterprise-exclusive features
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              { feature: 'Unlimited AWS resources', included: true },
              { feature: 'Unlimited team members', included: true },
              { feature: 'SSO/SAML authentication', included: true },
              { feature: 'Custom compliance frameworks', included: true },
              { feature: 'Auto-remediation workflows', included: true },
              { feature: 'Scheduled executive reports', included: true },
              { feature: '20,000+ API requests/month', included: true },
              { feature: 'Dedicated account manager', included: true },
              { feature: '99.99% uptime SLA', included: true },
              { feature: '24/7 priority support', included: true },
              { feature: 'Custom contract terms', included: true },
              { feature: 'On-premise deployment option', included: true },
            ].map((item) => (
              <div
                key={item.feature}
                className="flex items-center gap-3 p-4 rounded-lg bg-card border hover:border-primary/30 transition-colors"
              >
                <CheckCircle2 className="w-5 h-5 text-green-600 shrink-0" />
                <span className="font-medium">{item.feature}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form Section */}
      <section id="contact" className="py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-start">
            {/* Left Side - Info */}
            <div>
              <Badge className="mb-4" variant="secondary">
                <Mail className="w-3 h-3 mr-1" />
                Get Started
              </Badge>
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Get Your Custom Demo
              </h2>
              <p className="text-lg text-muted-foreground mb-8">
                Schedule a personalized demo with our enterprise team. We&apos;ll show you how DevControl
                can reduce your AWS costs and improve your security posture.
              </p>

              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                    <Clock className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">30-Minute Personalized Demo</h3>
                    <p className="text-sm text-muted-foreground">Tailored walkthrough for your specific use case and infrastructure</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                    <BarChart3 className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">Custom ROI Analysis</h3>
                    <p className="text-sm text-muted-foreground">We&apos;ll calculate your potential savings based on your AWS spend</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                    <FileCheck className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">Security & Compliance Review</h3>
                    <p className="text-sm text-muted-foreground">Answer your security questions and provide documentation</p>
                  </div>
                </div>
              </div>

              {/* Direct Contact */}
              <div className="mt-8 p-6 rounded-xl bg-muted/50 border">
                <p className="text-sm text-muted-foreground mb-4">Prefer to reach out directly?</p>
                <div className="space-y-3">
                  <a href="mailto:enterprise@devcontrol.io" className="flex items-center gap-3 text-sm hover:text-primary transition-colors">
                    <Mail className="w-4 h-4" />
                    enterprise@devcontrol.io
                  </a>
                  <a href="tel:+1-888-338-2875" className="flex items-center gap-3 text-sm hover:text-primary transition-colors">
                    <Phone className="w-4 h-4" />
                    1-888-DEV-CTRL (1-888-338-2875)
                  </a>
                </div>
              </div>
            </div>

            {/* Right Side - Form */}
            <Card className="shadow-lg">
              <CardHeader className="pb-4">
                <div className="flex items-center justify-between">
                  <CardTitle>Request Your Demo</CardTitle>
                  <Badge variant="secondary" className="text-xs">
                    <Clock className="w-3 h-3 mr-1" />
                    Takes 30 seconds
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <form className="space-y-5">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-2">Full Name *</label>
                      <input
                        type="text"
                        value={contactForm.name}
                        onChange={(e) => setContactForm({ ...contactForm, name: e.target.value })}
                        className="w-full h-11 px-4 rounded-lg border bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
                        placeholder="John Smith"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">Work Email *</label>
                      <input
                        type="email"
                        value={contactForm.email}
                        onChange={(e) => setContactForm({ ...contactForm, email: e.target.value })}
                        className="w-full h-11 px-4 rounded-lg border bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
                        placeholder="john@company.com"
                        required
                      />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-2">Phone Number</label>
                      <input
                        type="tel"
                        value={contactForm.phone}
                        onChange={(e) => setContactForm({ ...contactForm, phone: e.target.value })}
                        className="w-full h-11 px-4 rounded-lg border bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
                        placeholder="+1 (555) 123-4567"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">Company *</label>
                      <input
                        type="text"
                        value={contactForm.company}
                        onChange={(e) => setContactForm({ ...contactForm, company: e.target.value })}
                        className="w-full h-11 px-4 rounded-lg border bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
                        placeholder="Acme Inc."
                        required
                      />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-2">Company Size</label>
                      <select
                        value={contactForm.employees}
                        onChange={(e) => setContactForm({ ...contactForm, employees: e.target.value })}
                        className="w-full h-11 px-4 rounded-lg border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
                      >
                        <option value="">Choose your range</option>
                        <option value="100-500">100-500 employees</option>
                        <option value="500-1000">500-1,000 employees</option>
                        <option value="1000-5000">1,000-5,000 employees</option>
                        <option value="5000+">5,000+ employees</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">Monthly AWS Spend</label>
                      <select
                        value={contactForm.awsSpend}
                        onChange={(e) => setContactForm({ ...contactForm, awsSpend: e.target.value })}
                        className="w-full h-11 px-4 rounded-lg border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
                      >
                        <option value="">Choose your range</option>
                        <option value="50k-100k">$50,000 - $100,000</option>
                        <option value="100k-500k">$100,000 - $500,000</option>
                        <option value="500k-1m">$500,000 - $1M</option>
                        <option value="1m+">$1M+</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">What&apos;s your biggest AWS challenge right now?</label>
                    <textarea
                      value={contactForm.message}
                      onChange={(e) => setContactForm({ ...contactForm, message: e.target.value })}
                      rows={3}
                      className="w-full px-4 py-3 rounded-lg border bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 resize-none"
                      placeholder="e.g., Cost visibility across accounts, compliance requirements, rightsizing recommendations..."
                    />
                  </div>

                  <Button type="submit" size="lg" className="w-full gap-2">
                    <Calendar className="w-4 h-4" />
                    Get Your Custom Demo
                  </Button>

                  <p className="text-xs text-center text-muted-foreground">
                    By submitting, you agree to our{' '}
                    <Link href="/privacy" className="underline hover:text-foreground">
                      Privacy Policy
                    </Link>
                    . We&apos;ll respond within 1 business day.
                  </p>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-16 md:py-24 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-br from-indigo-600 to-purple-700 rounded-2xl border border-indigo-500 p-10 md:p-16 text-center relative overflow-hidden">
            {/* Background Pattern */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,_rgba(255,255,255,0.1)_0%,_transparent_50%)]" />

            <div className="relative">
              <Badge className="mb-6 bg-white/20 text-white border-white/30 hover:bg-white/30">
                <Building2 className="w-3 h-3 mr-1" />
                Limited Q1 Slots Available
              </Badge>

              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">
                Ready to Cut Your AWS Costs?
              </h2>

              <p className="text-lg md:text-xl text-indigo-100 mb-8 max-w-2xl mx-auto">
                Join 500+ enterprise teams who reduced their AWS spend by an average of 32%.
                Book by January 31 for priority Q1 onboarding.
              </p>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-8">
                <Button
                  size="lg"
                  variant="secondary"
                  className="px-8 py-6 text-base font-semibold bg-white text-indigo-600 hover:bg-indigo-50 w-full sm:w-auto"
                  asChild
                >
                  <a href="#contact">
                    Get Your Custom Demo
                    <ArrowRight className="ml-2 w-4 h-4" />
                  </a>
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="px-8 py-6 text-base font-semibold border-white text-white hover:bg-white/10 w-full sm:w-auto"
                  asChild
                >
                  <Link href="/pricing">
                    View All Plans
                  </Link>
                </Button>
              </div>

              {/* Contact Options */}
              <div className="flex flex-col sm:flex-row items-center justify-center gap-6 text-sm text-indigo-100">
                <a href="mailto:enterprise@devcontrol.io" className="flex items-center gap-2 hover:text-white transition-colors">
                  <Mail className="w-4 h-4" />
                  <span>enterprise@devcontrol.io</span>
                </a>
                <a href="tel:+1-888-338-2875" className="flex items-center gap-2 hover:text-white transition-colors">
                  <Phone className="w-4 h-4" />
                  <span>1-888-DEV-CTRL</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section with Accordion */}
      <section className="py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <Badge className="mb-4" variant="secondary">
              <HelpCircle className="w-3 h-3 mr-1" />
              FAQ
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Enterprise FAQ
            </h2>
            <p className="text-lg text-muted-foreground">
              Common questions from enterprise customers
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-4 max-w-5xl mx-auto">
            {faqs.map((faq, index) => (
              <Card
                key={index}
                className={`cursor-pointer transition-all ${expandedFaq === index ? 'ring-2 ring-primary/50' : 'hover:shadow-md'}`}
                onClick={() => setExpandedFaq(expandedFaq === index ? null : index)}
              >
                <CardHeader className="pb-2">
                  <CardTitle className="text-base font-semibold flex items-start justify-between gap-3">
                    <div className="flex items-start gap-3">
                      <HelpCircle className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                      <span>{faq.question}</span>
                    </div>
                    <ChevronDown className={`w-5 h-5 text-muted-foreground shrink-0 transition-transform ${expandedFaq === index ? 'rotate-180' : ''}`} />
                  </CardTitle>
                </CardHeader>
                {expandedFaq === index && (
                  <CardContent className="pt-0">
                    <p className="text-muted-foreground pl-8 text-sm">{faq.answer}</p>
                  </CardContent>
                )}
              </Card>
            ))}
          </div>

          {/* Additional Help CTA */}
          <div className="mt-12 text-center">
            <p className="text-muted-foreground mb-4">Still have questions?</p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button variant="outline" className="gap-2" asChild>
                <a href="mailto:enterprise@devcontrol.io">
                  <MessageCircle className="w-4 h-4" />
                  Email Sales Team
                </a>
              </Button>
              <Button variant="outline" className="gap-2" asChild>
                <Link href="/docs">
                  <FileCheck className="w-4 h-4" />
                  Read Documentation
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Bottom Padding for Sticky CTA */}
      <div className="h-20" />
    </div>
  );
}
