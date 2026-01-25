'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import Link from 'next/link';
import {
  Code2,
  Terminal,
  Copy,
  Check,
  Book,
  Zap,
  Shield,
  Clock,
  GitBranch,
  Webhook,
  Key,
  Lock,
  Globe,
  MessageSquare,
  Users,
  FileText,
  ArrowRight,
  CheckCircle2,
  ExternalLink,
  Github,
  Cpu,
  Activity,
  PlayCircle,
  Download,
  RefreshCw,
  HelpCircle,
  ChevronDown,
  ChevronUp,
  Blocks,
  CloudCog,
  FileCode,
  TerminalSquare,
  Braces,
} from 'lucide-react';

export default function DevelopersPage() {
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);
  const [activeLanguage, setActiveLanguage] = useState('python');
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);

  const handleCopy = (text: string, index: number) => {
    navigator.clipboard.writeText(text);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  const codeExamples: Record<string, { install: string; code: string }> = {
    python: {
      install: 'pip install devcontrol-sdk',
      code: `from devcontrol import DevControl

client = DevControl(api_key="your_api_key")

# Get all AWS resources with cost data
resources = client.resources.list(
    cloud="aws",
    include_costs=True
)

for resource in resources:
    print(f"{resource.name}: \${resource.monthly_cost}")`,
    },
    node: {
      install: 'npm install @devcontrol/sdk',
      code: `import { DevControl } from '@devcontrol/sdk';

const client = new DevControl({
  apiKey: 'your_api_key'
});

// Get all AWS resources with cost data
const resources = await client.resources.list({
  cloud: 'aws',
  includeCosts: true
});

resources.forEach(resource => {
  console.log(\`\${resource.name}: $\${resource.monthlyCost}\`);
});`,
    },
    go: {
      install: 'go get github.com/devcontrol/devcontrol-go',
      code: `package main

import (
    "fmt"
    "github.com/devcontrol/devcontrol-go"
)

func main() {
    client := devcontrol.NewClient("your_api_key")

    // Get all AWS resources with cost data
    resources, _ := client.Resources.List(&devcontrol.ListOptions{
        Cloud:        "aws",
        IncludeCosts: true,
    })

    for _, r := range resources {
        fmt.Printf("%s: $%.2f\\n", r.Name, r.MonthlyCost)
    }
}`,
    },
    curl: {
      install: '# No installation needed',
      code: `curl -X GET "https://api.devcontrol.cloud/v1/resources" \\
  -H "Authorization: Bearer your_api_key" \\
  -H "Content-Type: application/json" \\
  -d '{
    "cloud": "aws",
    "include_costs": true
  }'`,
    },
  };

  const sdks = [
    {
      name: 'Python',
      icon: '🐍',
      package: 'devcontrol-sdk',
      version: 'v2.4.1',
      downloads: '45K+',
      color: 'from-yellow-500 to-blue-500',
    },
    {
      name: 'Node.js',
      icon: '⬢',
      package: '@devcontrol/sdk',
      version: 'v2.4.0',
      downloads: '38K+',
      color: 'from-green-500 to-green-600',
    },
    {
      name: 'Go',
      icon: '🔵',
      package: 'devcontrol-go',
      version: 'v2.3.2',
      downloads: '12K+',
      color: 'from-cyan-500 to-blue-500',
    },
    {
      name: 'Ruby',
      icon: '💎',
      package: 'devcontrol-ruby',
      version: 'v2.2.0',
      downloads: '8K+',
      color: 'from-red-500 to-red-600',
    },
    {
      name: 'Java',
      icon: '☕',
      package: 'devcontrol-java',
      version: 'v2.3.1',
      downloads: '15K+',
      color: 'from-orange-500 to-red-500',
    },
    {
      name: 'Terraform',
      icon: '🏗️',
      package: 'terraform-provider-devcontrol',
      version: 'v1.8.0',
      downloads: '22K+',
      color: 'from-purple-500 to-purple-600',
    },
  ];

  const apiFeatures = [
    {
      icon: Zap,
      title: 'RESTful & GraphQL',
      description: 'Choose your preferred API style. Full REST coverage with GraphQL for complex queries.',
    },
    {
      icon: Key,
      title: 'Flexible Authentication',
      description: 'API keys, OAuth 2.0, and JWT tokens. Scoped permissions for granular access control.',
    },
    {
      icon: RefreshCw,
      title: 'Webhooks & Events',
      description: 'Real-time notifications for resource changes, cost alerts, and security events.',
    },
    {
      icon: Shield,
      title: 'Rate Limiting',
      description: '1,000 req/min (Pro), 10,000 req/min (Enterprise). Burst allowance included.',
    },
    {
      icon: GitBranch,
      title: 'API Versioning',
      description: 'Stable v1 API with 24-month deprecation policy. Breaking changes announced 6 months ahead.',
    },
    {
      icon: Activity,
      title: '99.99% Uptime SLA',
      description: 'Enterprise-grade reliability with < 50ms average response time globally.',
    },
  ];

  const documentationLinks = [
    {
      icon: Book,
      title: 'API Reference',
      description: 'Complete endpoint documentation with request/response schemas',
      href: '/docs/api',
      badge: 'OpenAPI 3.0',
    },
    {
      icon: PlayCircle,
      title: 'Quickstart Guide',
      description: 'From zero to first API call in under 5 minutes',
      href: '/docs/quickstart',
      badge: 'Beginner',
    },
    {
      icon: FileCode,
      title: 'Code Examples',
      description: '50+ recipes for common integration patterns',
      href: '/docs/examples',
      badge: 'Updated Weekly',
    },
    {
      icon: Webhook,
      title: 'Webhooks Guide',
      description: 'Set up real-time event notifications',
      href: '/docs/webhooks',
      badge: null,
    },
    {
      icon: Lock,
      title: 'Authentication',
      description: 'API keys, OAuth flows, and security best practices',
      href: '/docs/auth',
      badge: null,
    },
    {
      icon: RefreshCw,
      title: 'Changelog',
      description: 'API updates, new features, and deprecation notices',
      href: '/changelog',
      badge: 'v2.6.0',
    },
  ];

  const devTools = [
    {
      icon: TerminalSquare,
      title: 'DevControl CLI',
      description: 'Powerful command-line interface for automation and scripting',
      install: 'brew install devcontrol-cli',
      link: '/docs/cli',
    },
    {
      icon: Blocks,
      title: 'Terraform Provider',
      description: 'Infrastructure-as-Code for DevControl resources',
      install: 'terraform init',
      link: '/docs/terraform',
    },
    {
      icon: CloudCog,
      title: 'GitHub Actions',
      description: 'Pre-built workflows for CI/CD integration',
      install: 'uses: devcontrol/action@v2',
      link: '/docs/github-actions',
    },
    {
      icon: Braces,
      title: 'VS Code Extension',
      description: 'IntelliSense, snippets, and inline cost previews',
      install: 'ext install devcontrol.vscode',
      link: '/docs/vscode',
    },
  ];

  const securityFeatures = [
    'TLS 1.3 encryption in transit',
    'AES-256 encryption at rest',
    'SOC 2 Type II certified API',
    'HIPAA-compliant endpoints available',
    'IP allowlisting for API access',
    'Comprehensive audit logging',
    'Signed webhook payloads (HMAC-SHA256)',
    'Short-lived token support',
  ];

  const communityResources = [
    {
      icon: MessageSquare,
      title: 'Discord Community',
      description: '2,500+ developers sharing tips and getting help',
      link: '#',
      cta: 'Join Discord',
    },
    {
      icon: Github,
      title: 'GitHub Discussions',
      description: 'Feature requests, bug reports, and open-source SDKs',
      link: '#',
      cta: 'View on GitHub',
    },
    {
      icon: Users,
      title: 'Developer Office Hours',
      description: 'Weekly live sessions with our engineering team',
      link: '#',
      cta: 'Register',
    },
    {
      icon: FileText,
      title: 'Technical Blog',
      description: 'Deep dives, tutorials, and integration guides',
      link: '/blog',
      cta: 'Read Blog',
    },
  ];

  const integrationStory = {
    company: 'Series B Fintech Startup',
    quote: "We integrated DevControl's API into our deployment pipeline in less than a day. Now every PR shows the projected cost impact before merge.",
    author: 'Principal Engineer',
    metrics: [
      { label: 'Integration Time', value: '< 1 day' },
      { label: 'API Calls/Month', value: '2.4M' },
      { label: 'Cost Visibility', value: '100%' },
    ],
  };

  const apiPricing = [
    { tier: 'Pro', calls: '100K/month', rate: '1,000/min', price: 'Included' },
    { tier: 'Business', calls: '1M/month', rate: '5,000/min', price: 'Included' },
    { tier: 'Enterprise', calls: 'Unlimited', rate: '10,000/min', price: 'Included' },
  ];

  const faqItems = [
    {
      question: 'How do I get my API keys?',
      answer: 'API keys are available in your Dashboard under Settings → API Keys. You can create multiple keys with different scopes and permissions. Keys can be rotated or revoked at any time.',
    },
    {
      question: 'What happens if I exceed the rate limit?',
      answer: 'Requests exceeding the rate limit receive a 429 response with a Retry-After header. We include a burst allowance of 2x your limit for short spikes. Enterprise customers can request higher limits.',
    },
    {
      question: 'Is the API compatible with my existing tools?',
      answer: 'Yes. Our REST API follows OpenAPI 3.0 specification, making it compatible with any HTTP client. We also provide native SDKs for Python, Node.js, Go, Ruby, and Java, plus Terraform and Pulumi providers.',
    },
    {
      question: 'How do webhooks handle failures?',
      answer: 'Failed webhook deliveries are retried with exponential backoff (1min, 5min, 30min, 2hr, 24hr). After 5 failures, the webhook is paused and you receive an email notification. All payloads are signed with HMAC-SHA256.',
    },
    {
      question: 'Can I use the API in air-gapped environments?',
      answer: 'Enterprise customers can deploy DevControl on-premises or in a dedicated VPC. Contact our sales team for private deployment options that meet your security requirements.',
    },
    {
      question: 'What is your API deprecation policy?',
      answer: 'We maintain API versions for a minimum of 24 months. Breaking changes are announced 6 months in advance via email, changelog, and response headers. Non-breaking additions happen continuously.',
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 via-white to-slate-50 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950">
      {/* Hero Section */}
      <section className="relative pt-20 pb-16 overflow-hidden">
        <div className="absolute inset-0 bg-grid-slate-100 [mask-image:linear-gradient(0deg,white,rgba(255,255,255,0.5))] dark:bg-grid-slate-700/25" />
        <div className="relative max-w-7xl mx-auto px-6">
          <div className="text-center max-w-4xl mx-auto">
            <Badge variant="outline" className="mb-6 px-4 py-2 text-sm border-primary/30 bg-primary/5">
              <Code2 className="w-4 h-4 mr-2" />
              Developer Platform v2.6
            </Badge>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-slate-900 dark:text-white mb-6 tracking-tight">
              Build Faster with{' '}
              <span className="bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent">
                DevControl APIs
              </span>
            </h1>

            <p className="text-xl text-slate-600 dark:text-slate-300 mb-8 max-w-2xl mx-auto">
              Integrate cloud cost intelligence into your workflows. Production-ready SDKs,
              comprehensive docs, and a developer experience built by engineers, for engineers.
            </p>

            <div className="flex flex-wrap justify-center gap-4 mb-12">
              <Button size="lg" asChild>
                <Link href="/docs">
                  <Book className="w-5 h-5 mr-2" />
                  View Documentation
                </Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link href="/dashboard/settings/api">
                  <Key className="w-5 h-5 mr-2" />
                  Get API Keys
                </Link>
              </Button>
            </div>

            {/* Quick Stats */}
            <div className="flex flex-wrap justify-center gap-8 text-sm">
              <div className="flex items-center gap-2 text-slate-600 dark:text-slate-400">
                <Clock className="w-4 h-4 text-green-500" />
                <span><strong>5 min</strong> to first API call</span>
              </div>
              <div className="flex items-center gap-2 text-slate-600 dark:text-slate-400">
                <Activity className="w-4 h-4 text-green-500" />
                <span><strong>99.99%</strong> API uptime</span>
              </div>
              <div className="flex items-center gap-2 text-slate-600 dark:text-slate-400">
                <Zap className="w-4 h-4 text-green-500" />
                <span><strong>&lt; 50ms</strong> avg response</span>
              </div>
              <div className="flex items-center gap-2 text-slate-600 dark:text-slate-400">
                <Globe className="w-4 h-4 text-green-500" />
                <span><strong>6 regions</strong> worldwide</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Start Section */}
      <section className="py-16 bg-slate-900 dark:bg-slate-950">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold text-white mb-4">Quick Start</h2>
            <p className="text-slate-400">From zero to first API call in under 5 minutes</p>
          </div>

          <div className="max-w-4xl mx-auto">
            {/* Language Tabs */}
            <div className="flex flex-wrap gap-2 mb-4">
              {Object.keys(codeExamples).map((lang) => (
                <button
                  key={lang}
                  onClick={() => setActiveLanguage(lang)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    activeLanguage === lang
                      ? 'bg-primary text-white'
                      : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                  }`}
                >
                  {lang === 'node' ? 'Node.js' : lang.charAt(0).toUpperCase() + lang.slice(1)}
                </button>
              ))}
            </div>

            {/* Install Command */}
            <div className="bg-slate-800 rounded-t-lg border border-slate-700 p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Terminal className="w-4 h-4 text-slate-400" />
                  <code className="text-green-400 text-sm">{codeExamples[activeLanguage].install}</code>
                </div>
                <button
                  onClick={() => handleCopy(codeExamples[activeLanguage].install, 0)}
                  className="p-2 hover:bg-slate-700 rounded transition-colors"
                >
                  {copiedIndex === 0 ? (
                    <Check className="w-4 h-4 text-green-400" />
                  ) : (
                    <Copy className="w-4 h-4 text-slate-400" />
                  )}
                </button>
              </div>
            </div>

            {/* Code Example */}
            <div className="bg-slate-950 rounded-b-lg border border-t-0 border-slate-700 p-4 overflow-x-auto">
              <div className="flex justify-between items-start mb-2">
                <span className="text-xs text-slate-500">Example: List resources with costs</span>
                <button
                  onClick={() => handleCopy(codeExamples[activeLanguage].code, 1)}
                  className="p-2 hover:bg-slate-800 rounded transition-colors"
                >
                  {copiedIndex === 1 ? (
                    <Check className="w-4 h-4 text-green-400" />
                  ) : (
                    <Copy className="w-4 h-4 text-slate-400" />
                  )}
                </button>
              </div>
              <pre className="text-sm text-slate-300 font-mono whitespace-pre-wrap">
                {codeExamples[activeLanguage].code}
              </pre>
            </div>

            <div className="mt-6 text-center">
              <Link
                href="/docs/quickstart"
                className="text-primary hover:underline inline-flex items-center gap-1"
              >
                View full quickstart guide <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* SDKs Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-4">
              Official SDKs & Libraries
            </h2>
            <p className="text-lg text-slate-600 dark:text-slate-400">
              Production-ready libraries maintained by the DevControl team
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {sdks.map((sdk) => (
              <Card key={sdk.name} className="hover:shadow-lg transition-shadow group">
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <span className="text-2xl">{sdk.icon}</span>
                      <div>
                        <CardTitle className="text-lg">{sdk.name}</CardTitle>
                        <CardDescription className="font-mono text-xs">{sdk.package}</CardDescription>
                      </div>
                    </div>
                    <Badge variant="secondary" className="text-xs">{sdk.version}</Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-slate-500 flex items-center gap-1">
                      <Download className="w-3 h-3" />
                      {sdk.downloads} downloads
                    </span>
                    <Link
                      href="#"
                      className="text-primary hover:underline flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      View on GitHub <ExternalLink className="w-3 h-3" />
                    </Link>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* API Features */}
      <section className="py-20 bg-slate-50 dark:bg-slate-900/50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-4">
              API Capabilities
            </h2>
            <p className="text-lg text-slate-600 dark:text-slate-400">
              Enterprise-grade API built for reliability and scale
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {apiFeatures.map((feature) => (
              <Card key={feature.title} className="border-0 shadow-sm">
                <CardHeader>
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                    <feature.icon className="w-6 h-6 text-primary" />
                  </div>
                  <CardTitle className="text-lg">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-slate-600 dark:text-slate-400 text-sm">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Documentation Hub */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-4">
              Documentation
            </h2>
            <p className="text-lg text-slate-600 dark:text-slate-400">
              Everything you need to integrate DevControl
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {documentationLinks.map((doc) => (
              <Link key={doc.title} href={doc.href}>
                <Card className="h-full hover:shadow-lg hover:border-primary/50 transition-all cursor-pointer group">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="w-10 h-10 rounded-lg bg-slate-100 dark:bg-slate-800 flex items-center justify-center group-hover:bg-primary/10 transition-colors">
                        <doc.icon className="w-5 h-5 text-slate-600 dark:text-slate-400 group-hover:text-primary transition-colors" />
                      </div>
                      {doc.badge && (
                        <Badge variant="outline" className="text-xs">{doc.badge}</Badge>
                      )}
                    </div>
                    <CardTitle className="text-lg mt-4 group-hover:text-primary transition-colors">
                      {doc.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-slate-600 dark:text-slate-400 text-sm">{doc.description}</p>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>

          <div className="mt-10 text-center">
            <Button variant="outline" size="lg" asChild>
              <Link href="/docs">
                <Book className="w-5 h-5 mr-2" />
                Browse All Documentation
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Developer Tools */}
      <section className="py-20 bg-slate-900 dark:bg-slate-950">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-white mb-4">
              Developer Tools
            </h2>
            <p className="text-lg text-slate-400">
              CLI, IaC providers, and IDE integrations
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {devTools.map((tool) => (
              <Card key={tool.title} className="bg-slate-800 border-slate-700">
                <CardHeader>
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-lg bg-slate-700 flex items-center justify-center">
                      <tool.icon className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <CardTitle className="text-lg text-white">{tool.title}</CardTitle>
                      <CardDescription className="text-slate-400">{tool.description}</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="bg-slate-900 rounded-lg p-3 flex items-center justify-between">
                    <code className="text-green-400 text-sm">{tool.install}</code>
                    <button
                      onClick={() => handleCopy(tool.install, sdks.length + devTools.indexOf(tool))}
                      className="p-2 hover:bg-slate-700 rounded transition-colors"
                    >
                      {copiedIndex === sdks.length + devTools.indexOf(tool) ? (
                        <Check className="w-4 h-4 text-green-400" />
                      ) : (
                        <Copy className="w-4 h-4 text-slate-400" />
                      )}
                    </button>
                  </div>
                  <Link
                    href={tool.link}
                    className="mt-4 inline-flex items-center text-primary hover:underline text-sm"
                  >
                    View documentation <ArrowRight className="w-4 h-4 ml-1" />
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* API Explorer Teaser */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="bg-gradient-to-br from-primary/10 via-blue-50 to-purple-50 dark:from-primary/5 dark:via-slate-900 dark:to-slate-900 rounded-2xl p-8 md:p-12 border border-primary/20">
            <div className="grid lg:grid-cols-2 gap-8 items-center">
              <div>
                <Badge variant="outline" className="mb-4 border-primary/30">
                  <PlayCircle className="w-3 h-3 mr-1" />
                  Interactive
                </Badge>
                <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-4">
                  API Explorer
                </h2>
                <p className="text-lg text-slate-600 dark:text-slate-400 mb-6">
                  Test API endpoints directly in your browser. No setup required.
                  Use your API keys or our sandbox environment.
                </p>
                <div className="flex flex-wrap gap-4">
                  <Button asChild>
                    <Link href="/docs/explorer">
                      <PlayCircle className="w-5 h-5 mr-2" />
                      Open API Explorer
                    </Link>
                  </Button>
                  <Button variant="outline" asChild>
                    <Link href="#">
                      <ExternalLink className="w-5 h-5 mr-2" />
                      Postman Collection
                    </Link>
                  </Button>
                </div>
              </div>
              <div className="bg-white dark:bg-slate-800 rounded-xl shadow-lg p-6 border">
                <div className="flex items-center gap-2 mb-4">
                  <span className="px-2 py-1 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 text-xs font-medium rounded">GET</span>
                  <code className="text-sm text-slate-600 dark:text-slate-300">/v1/resources</code>
                </div>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between text-slate-500">
                    <span>Status</span>
                    <span className="text-green-500 font-medium">200 OK</span>
                  </div>
                  <div className="flex justify-between text-slate-500">
                    <span>Response Time</span>
                    <span className="font-medium">42ms</span>
                  </div>
                  <div className="flex justify-between text-slate-500">
                    <span>Size</span>
                    <span className="font-medium">2.4 KB</span>
                  </div>
                </div>
                <div className="mt-4 p-3 bg-slate-50 dark:bg-slate-900 rounded-lg">
                  <pre className="text-xs text-slate-600 dark:text-slate-400 overflow-hidden">
{`{
  "data": [
    { "id": "i-abc123", "type": "ec2" },
    { "id": "rds-xyz789", "type": "rds" }
  ],
  "meta": { "total": 247 }
}`}
                  </pre>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Security Section */}
      <section className="py-20 bg-slate-50 dark:bg-slate-900/50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <Badge variant="outline" className="mb-4">
                <Shield className="w-3 h-3 mr-1" />
                Enterprise Security
              </Badge>
              <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-4">
                API Security & Compliance
              </h2>
              <p className="text-lg text-slate-600 dark:text-slate-400 mb-8">
                Built with enterprise security requirements from day one.
                Our API meets the strictest compliance standards.
              </p>
              <ul className="space-y-3">
                {securityFeatures.map((feature) => (
                  <li key={feature} className="flex items-center gap-3 text-slate-700 dark:text-slate-300">
                    <CheckCircle2 className="w-5 h-5 text-green-500 flex-shrink-0" />
                    {feature}
                  </li>
                ))}
              </ul>
              <div className="mt-8">
                <Button variant="outline" asChild>
                  <Link href="/security">
                    <FileText className="w-4 h-4 mr-2" />
                    View Security Documentation
                  </Link>
                </Button>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {['SOC 2 Type II', 'HIPAA', 'ISO 27001', 'GDPR'].map((cert) => (
                <Card key={cert} className="text-center p-6">
                  <Shield className="w-10 h-10 text-primary mx-auto mb-3" />
                  <p className="font-semibold text-slate-900 dark:text-white">{cert}</p>
                  <p className="text-xs text-slate-500 mt-1">Compliant</p>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Integration Story */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-4">
              Developer Success Story
            </h2>
          </div>

          <Card className="max-w-4xl mx-auto bg-gradient-to-br from-slate-50 to-white dark:from-slate-800 dark:to-slate-900 border-2">
            <CardContent className="p-8 md:p-12">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                  <Cpu className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <p className="font-semibold text-slate-900 dark:text-white">{integrationStory.company}</p>
                  <p className="text-sm text-slate-500">{integrationStory.author}</p>
                </div>
              </div>

              <blockquote className="text-xl text-slate-700 dark:text-slate-300 mb-8 italic">
                &ldquo;{integrationStory.quote}&rdquo;
              </blockquote>

              <div className="grid grid-cols-3 gap-6">
                {integrationStory.metrics.map((metric) => (
                  <div key={metric.label} className="text-center">
                    <p className="text-2xl font-bold text-primary">{metric.value}</p>
                    <p className="text-sm text-slate-500">{metric.label}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Community & Support */}
      <section className="py-20 bg-slate-50 dark:bg-slate-900/50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-4">
              Community & Support
            </h2>
            <p className="text-lg text-slate-600 dark:text-slate-400">
              Get help from our team and connect with other developers
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {communityResources.map((resource) => (
              <Card key={resource.title} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center mb-3">
                    <resource.icon className="w-5 h-5 text-primary" />
                  </div>
                  <CardTitle className="text-lg">{resource.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-slate-600 dark:text-slate-400 mb-4">{resource.description}</p>
                  <Link
                    href={resource.link}
                    className="text-primary hover:underline text-sm inline-flex items-center gap-1"
                  >
                    {resource.cta} <ArrowRight className="w-3 h-3" />
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* API Pricing */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-4">
              API Usage by Plan
            </h2>
            <p className="text-lg text-slate-600 dark:text-slate-400">
              API access included with all plans. No per-call charges.
            </p>
          </div>

          <div className="max-w-3xl mx-auto">
            <Card>
              <CardContent className="p-0">
                <table className="w-full">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left p-4 font-semibold text-slate-900 dark:text-white">Plan</th>
                      <th className="text-left p-4 font-semibold text-slate-900 dark:text-white">Monthly Calls</th>
                      <th className="text-left p-4 font-semibold text-slate-900 dark:text-white">Rate Limit</th>
                      <th className="text-left p-4 font-semibold text-slate-900 dark:text-white">Price</th>
                    </tr>
                  </thead>
                  <tbody>
                    {apiPricing.map((tier, index) => (
                      <tr key={tier.tier} className={index !== apiPricing.length - 1 ? 'border-b' : ''}>
                        <td className="p-4 font-medium text-slate-900 dark:text-white">{tier.tier}</td>
                        <td className="p-4 text-slate-600 dark:text-slate-400">{tier.calls}</td>
                        <td className="p-4 text-slate-600 dark:text-slate-400">{tier.rate}</td>
                        <td className="p-4">
                          <Badge variant="secondary">{tier.price}</Badge>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </CardContent>
            </Card>
            <p className="text-center text-sm text-slate-500 mt-4">
              Need higher limits? <Link href="/enterprise" className="text-primary hover:underline">Contact us for Enterprise</Link>
            </p>
          </div>
        </div>
      </section>

      {/* Status & Reliability */}
      <section className="py-16 bg-slate-900 dark:bg-slate-950">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-3 gap-8 text-center">
            <div>
              <div className="w-16 h-16 rounded-full bg-green-500/20 flex items-center justify-center mx-auto mb-4">
                <Activity className="w-8 h-8 text-green-400" />
              </div>
              <p className="text-3xl font-bold text-white mb-2">99.99%</p>
              <p className="text-slate-400">API Uptime (Last 12 Months)</p>
            </div>
            <div>
              <div className="w-16 h-16 rounded-full bg-blue-500/20 flex items-center justify-center mx-auto mb-4">
                <Zap className="w-8 h-8 text-blue-400" />
              </div>
              <p className="text-3xl font-bold text-white mb-2">&lt; 50ms</p>
              <p className="text-slate-400">Average Response Time (P95)</p>
            </div>
            <div>
              <div className="w-16 h-16 rounded-full bg-purple-500/20 flex items-center justify-center mx-auto mb-4">
                <Globe className="w-8 h-8 text-purple-400" />
              </div>
              <p className="text-3xl font-bold text-white mb-2">6 Regions</p>
              <p className="text-slate-400">Global Edge Network</p>
            </div>
          </div>
          <div className="mt-10 text-center">
            <Button variant="outline" className="border-slate-600 text-slate-300 hover:bg-slate-800" asChild>
              <Link href="#">
                <Activity className="w-4 h-4 mr-2" />
                View Status Page
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-4">
              Frequently Asked Questions
            </h2>
          </div>

          <div className="max-w-3xl mx-auto space-y-4">
            {faqItems.map((faq, index) => (
              <Card
                key={index}
                className={`cursor-pointer transition-all ${
                  expandedFaq === index ? 'ring-2 ring-primary/50' : 'hover:shadow-md'
                }`}
                onClick={() => setExpandedFaq(expandedFaq === index ? null : index)}
              >
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <HelpCircle className="w-5 h-5 text-primary flex-shrink-0" />
                      <CardTitle className="text-base font-medium">{faq.question}</CardTitle>
                    </div>
                    {expandedFaq === index ? (
                      <ChevronUp className="w-5 h-5 text-slate-400" />
                    ) : (
                      <ChevronDown className="w-5 h-5 text-slate-400" />
                    )}
                  </div>
                </CardHeader>
                {expandedFaq === index && (
                  <CardContent className="pt-0">
                    <p className="text-slate-600 dark:text-slate-400 text-sm pl-8">
                      {faq.answer}
                    </p>
                  </CardContent>
                )}
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 bg-gradient-to-br from-primary/5 via-blue-50 to-purple-50 dark:from-primary/10 dark:via-slate-900 dark:to-slate-900">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-4">
            Ready to Start Building?
          </h2>
          <p className="text-xl text-slate-600 dark:text-slate-400 mb-8 max-w-2xl mx-auto">
            Get your API keys and make your first call in minutes.
            Our team is here to help if you need anything.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button size="lg" asChild>
              <Link href="/dashboard/settings/api">
                <Key className="w-5 h-5 mr-2" />
                Get API Keys
              </Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link href="/docs">
                <Book className="w-5 h-5 mr-2" />
                Read Documentation
              </Link>
            </Button>
          </div>
          <p className="mt-6 text-sm text-slate-500">
            Questions? <Link href="/contact" className="text-primary hover:underline">Contact our developer support team</Link>
          </p>
        </div>
      </section>
    </div>
  );
}
