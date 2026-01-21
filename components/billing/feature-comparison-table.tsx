'use client';

import React from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Check, X, HelpCircle } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';

interface Feature {
  category: string;
  name: string;
  free: boolean | string;
  starter: boolean | string;
  pro: boolean | string;
  enterprise: boolean | string;
  tooltip?: string;
  highlight?: boolean;
}

const features: Feature[] = [
  // Resources
  { category: 'Resources', name: 'AWS Resources', free: '20', starter: '60', pro: '500', enterprise: 'Unlimited', tooltip: 'Number of AWS resources you can track and manage' },
  { category: 'Resources', name: 'Resource Types', free: '3 types', starter: '10 types', pro: 'All types', enterprise: 'All types', tooltip: 'EC2, RDS, S3, Lambda, CloudFront, VPC, ELB, and more' },
  { category: 'Resources', name: 'Multi-region support', free: true, starter: true, pro: true, enterprise: true },

  // Security & Compliance
  { category: 'Security & Compliance', name: 'Basic security flags', free: true, starter: true, pro: true, enterprise: true },
  { category: 'Security & Compliance', name: 'Advanced security scanning', free: false, starter: true, pro: true, enterprise: true, tooltip: 'Automated detection of security misconfigurations' },
  { category: 'Security & Compliance', name: 'Compliance scanning (SOC 2, HIPAA)', free: false, starter: false, pro: true, enterprise: true, highlight: true, tooltip: 'Automated compliance checks against industry frameworks' },
  { category: 'Security & Compliance', name: 'Custom compliance frameworks', free: false, starter: false, pro: false, enterprise: true, highlight: true },
  { category: 'Security & Compliance', name: 'Auto-remediation workflows', free: false, starter: false, pro: false, enterprise: true, highlight: true, tooltip: 'Automatically fix issues based on your defined policies' },

  // Cost Management
  { category: 'Cost Management', name: 'Total cost visibility', free: true, starter: true, pro: true, enterprise: true },
  { category: 'Cost Management', name: 'Cost attribution by team/service', free: false, starter: true, pro: true, enterprise: true, tooltip: 'See costs broken down by team, project, or service' },
  { category: 'Cost Management', name: 'Orphaned resource detection', free: false, starter: true, pro: true, enterprise: true, tooltip: 'Find and eliminate unused resources wasting money' },
  { category: 'Cost Management', name: 'Smart savings recommendations', free: false, starter: true, pro: true, enterprise: true, highlight: true },
  { category: 'Cost Management', name: 'Reserved Instance opportunities', free: false, starter: false, pro: true, enterprise: true },

  // Features
  { category: 'Features', name: 'Manual tagging', free: '5 at a time', starter: '25 at a time', pro: 'Unlimited', enterprise: 'Unlimited' },
  { category: 'Features', name: 'Bulk actions', free: false, starter: true, pro: true, enterprise: true },
  { category: 'Features', name: 'Bulk remediation', free: false, starter: false, pro: false, enterprise: true },
  { category: 'Features', name: 'Risk score & trends', free: false, starter: false, pro: true, enterprise: true, tooltip: 'Track infrastructure health over time' },

  // Integrations
  { category: 'Integrations', name: 'Export reports (CSV/PDF)', free: false, starter: true, pro: true, enterprise: true },
  { category: 'Integrations', name: 'Scheduled reports', free: false, starter: false, pro: false, enterprise: true },
  { category: 'Integrations', name: 'Slack integration', free: false, starter: false, pro: true, enterprise: true },
  { category: 'Integrations', name: 'Email alerts', free: true, starter: true, pro: true, enterprise: true },
  { category: 'Integrations', name: 'Jira/Linear ticket creation', free: false, starter: false, pro: true, enterprise: true },

  // API & Advanced
  { category: 'API Access', name: 'REST API access', free: false, starter: false, pro: false, enterprise: true, highlight: true },
  { category: 'API Access', name: 'API requests/hour', free: '500', starter: '2,000', pro: '5,000', enterprise: '20,000' },
  { category: 'API Access', name: 'Webhooks', free: false, starter: false, pro: false, enterprise: true },

  // Team & Support
  { category: 'Team', name: 'Team members', free: '1', starter: '5', pro: '10', enterprise: 'Unlimited' },
  { category: 'Team', name: 'Role-based access control', free: false, starter: true, pro: true, enterprise: true },
  { category: 'Team', name: 'SSO/SAML authentication', free: false, starter: false, pro: false, enterprise: true, highlight: true },
  { category: 'Team', name: 'Audit logs', free: false, starter: false, pro: true, enterprise: true },

  // Support
  { category: 'Support & SLA', name: 'Email support', free: true, starter: true, pro: true, enterprise: true },
  { category: 'Support & SLA', name: 'Priority support (4hr response)', free: false, starter: false, pro: true, enterprise: true },
  { category: 'Support & SLA', name: 'Dedicated account manager', free: false, starter: false, pro: false, enterprise: true, highlight: true },
  { category: 'Support & SLA', name: 'Custom SLA', free: false, starter: false, pro: false, enterprise: true },
  { category: 'Support & SLA', name: 'Uptime guarantee', free: '99%', starter: '99.5%', pro: '99.9%', enterprise: '99.99%' },
];

function FeatureValue({ value, highlight }: { value: boolean | string; highlight?: boolean }) {
  if (typeof value === 'boolean') {
    return value ? (
      <div className="flex items-center justify-center">
        <div className={`w-6 h-6 rounded-full ${highlight ? 'bg-green-100 dark:bg-green-900/50' : ''} flex items-center justify-center`}>
          <Check className={`w-4 h-4 ${highlight ? 'text-green-600 dark:text-green-400' : 'text-green-600 dark:text-green-400'}`} />
        </div>
      </div>
    ) : (
      <X className="w-4 h-4 text-muted-foreground/30 mx-auto" />
    );
  }
  return (
    <span className={`text-sm font-medium ${highlight ? 'text-primary font-semibold' : ''}`}>
      {value}
    </span>
  );
}

function FeatureName({ feature }: { feature: Feature }) {
  const content = (
    <span className={`${feature.highlight ? 'font-semibold text-foreground' : 'font-medium'}`}>
      {feature.name}
      {feature.highlight && (
        <Badge variant="secondary" className="ml-2 text-[10px] px-1.5 py-0">
          Key
        </Badge>
      )}
    </span>
  );

  if (feature.tooltip) {
    return (
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <div className="flex items-center gap-1.5 cursor-help">
              {content}
              <HelpCircle className="w-3.5 h-3.5 text-muted-foreground/50" />
            </div>
          </TooltipTrigger>
          <TooltipContent side="right" className="max-w-[200px]">
            <p className="text-xs">{feature.tooltip}</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    );
  }

  return content;
}

export function FeatureComparisonTable() {
  const categories = Array.from(new Set(features.map((f) => f.category)));

  return (
    <div className="space-y-8">
      {/* Section Header */}
      <div className="text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">Compare All Features</h2>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Detailed feature comparison to help you choose the right plan
        </p>
      </div>

      {/* Table Container with horizontal scroll on mobile */}
      <div className="bg-card border rounded-xl overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <Table className="min-w-[800px]">
            <TableHeader>
              <TableRow className="bg-muted/50 border-b-2">
                <TableHead className="w-[280px] font-semibold text-foreground sticky left-0 bg-muted/50 z-10">
                  Feature
                </TableHead>
                <TableHead className="text-center font-semibold text-foreground w-[120px]">
                  <div className="space-y-1">
                    <div>Free</div>
                    <div className="text-xs font-normal text-muted-foreground">$0/mo</div>
                  </div>
                </TableHead>
                <TableHead className="text-center font-semibold text-foreground w-[120px]">
                  <div className="space-y-1">
                    <div>Starter</div>
                    <div className="text-xs font-normal text-muted-foreground">$79/mo</div>
                  </div>
                </TableHead>
                <TableHead className="text-center font-semibold text-foreground w-[140px] bg-primary/5 border-x border-primary/20">
                  <div className="space-y-1">
                    <div className="flex items-center justify-center gap-1">
                      Pro
                      <Badge className="text-[10px] px-1.5 py-0 bg-primary/20 text-primary hover:bg-primary/30">
                        Popular
                      </Badge>
                    </div>
                    <div className="text-xs font-normal text-muted-foreground">$299/mo</div>
                  </div>
                </TableHead>
                <TableHead className="text-center font-semibold text-foreground w-[140px]">
                  <div className="space-y-1">
                    <div>Enterprise</div>
                    <div className="text-xs font-normal text-muted-foreground">Custom</div>
                  </div>
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {categories.map((category) => {
                const categoryFeatures = features.filter((f) => f.category === category);
                return (
                  <React.Fragment key={category}>
                    <TableRow className="bg-muted/30 hover:bg-muted/30">
                      <TableCell colSpan={5} className="font-semibold text-sm py-3 text-foreground sticky left-0 bg-muted/30">
                        {category}
                      </TableCell>
                    </TableRow>
                    {categoryFeatures.map((feature, index) => (
                      <TableRow
                        key={`${category}-${index}`}
                        className={`${feature.highlight ? 'bg-primary/[0.02]' : ''} hover:bg-muted/50`}
                      >
                        <TableCell className="sticky left-0 bg-card z-10">
                          <FeatureName feature={feature} />
                        </TableCell>
                        <TableCell className="text-center">
                          <FeatureValue value={feature.free} highlight={feature.highlight} />
                        </TableCell>
                        <TableCell className="text-center">
                          <FeatureValue value={feature.starter} highlight={feature.highlight} />
                        </TableCell>
                        <TableCell className="text-center bg-primary/5 border-x border-primary/10">
                          <FeatureValue value={feature.pro} highlight={feature.highlight} />
                        </TableCell>
                        <TableCell className="text-center">
                          <FeatureValue value={feature.enterprise} highlight={feature.highlight} />
                        </TableCell>
                      </TableRow>
                    ))}
                  </React.Fragment>
                );
              })}
            </TableBody>
          </Table>
        </div>
      </div>

      {/* Footer Note */}
      <div className="text-center space-y-2">
        <p className="text-sm text-muted-foreground">
          All paid plans include a <span className="font-semibold text-foreground">14-day free trial</span>. No credit card required to start.
        </p>
        <p className="text-xs text-muted-foreground">
          Need a custom plan? <a href="mailto:sales@devcontrol.app" className="text-primary hover:underline">Contact our sales team</a>
        </p>
      </div>
    </div>
  );
}
