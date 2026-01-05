/**
 * UpgradePrompt Component
 * Displays upgrade prompts for gated features
 */

'use client';

import { LucideIcon, Sparkles, Lock, TrendingUp } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useRouter } from 'next/navigation';

interface UpgradePromptProps {
  variant?: 'card' | 'inline' | 'banner';
  title: string;
  description: string;
  requiredTier: 'pro' | 'enterprise';
  feature?: string;
  icon?: LucideIcon;
  ctaText?: string;
  showBadge?: boolean;
  metric?: {
    value: string;
    label: string;
  };
}

export function UpgradePrompt({
  variant = 'card',
  title,
  description,
  requiredTier,
  feature,
  icon: Icon = Sparkles,
  ctaText,
  showBadge = true,
  metric,
}: UpgradePromptProps) {
  const router = useRouter();

  const handleUpgrade = () => {
    router.push('/pricing');
  };

  const tierDisplay = requiredTier === 'pro' ? 'Pro' : 'Enterprise';
  const defaultCtaText = ctaText || `Upgrade to ${tierDisplay}`;

  // Card variant - full card with icon
  if (variant === 'card') {
    return (
      <Card className="border-2 border-dashed border-primary/30 bg-primary/5">
        <CardContent className="pt-6">
          <div className="flex flex-col items-center text-center space-y-4">
            {/* Icon */}
            <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
              <Icon className="h-6 w-6 text-primary" />
            </div>

            {/* Badge */}
            {showBadge && (
              <Badge variant="secondary" className="bg-primary/10 text-primary border-primary/20">
                {tierDisplay} Feature
              </Badge>
            )}

            {/* Content */}
            <div className="space-y-2">
              <h3 className="text-lg font-semibold">{title}</h3>
              <p className="text-sm text-muted-foreground max-w-md">
                {description}
              </p>
            </div>

            {/* Metric (if provided) */}
            {metric && (
              <div className="bg-background border rounded-lg p-4 w-full max-w-xs">
                <div className="text-2xl font-bold text-primary">{metric.value}</div>
                <div className="text-xs text-muted-foreground">{metric.label}</div>
              </div>
            )}

            {/* CTA */}
            <Button onClick={handleUpgrade} className="mt-2">
              <Sparkles className="mr-2 h-4 w-4" />
              {defaultCtaText}
            </Button>

            {feature && (
              <p className="text-xs text-muted-foreground">
                {feature}
              </p>
            )}
          </div>
        </CardContent>
      </Card>
    );
  }

  // Inline variant - compact, horizontal layout
  if (variant === 'inline') {
    return (
      <div className="flex items-center justify-between p-4 border rounded-lg bg-muted/30 border-primary/20">
        <div className="flex items-center gap-3">
          <Lock className="h-5 w-5 text-muted-foreground" />
          <div>
            <div className="font-medium text-sm">{title}</div>
            <div className="text-xs text-muted-foreground">{description}</div>
          </div>
        </div>
        <Button size="sm" onClick={handleUpgrade}>
          {defaultCtaText}
        </Button>
      </div>
    );
  }

  // Banner variant - full-width alert
  if (variant === 'banner') {
    return (
      <div className="flex items-center justify-between p-4 bg-primary/10 border-l-4 border-primary rounded">
        <div className="flex items-center gap-3">
          <TrendingUp className="h-5 w-5 text-primary" />
          <div>
            <div className="font-semibold text-sm">{title}</div>
            <div className="text-xs text-muted-foreground mt-0.5">{description}</div>
          </div>
        </div>
        <Button size="sm" onClick={handleUpgrade} variant="default">
          <Sparkles className="mr-2 h-4 w-4" />
          {defaultCtaText}
        </Button>
      </div>
    );
  }

  return null;
}
