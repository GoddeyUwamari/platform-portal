/**
 * Subscription Hook
 * Provides access to user's subscription tier and feature access checks
 */

'use client';

import { useQuery } from '@tanstack/react-query';
import { getSubscription } from '@/lib/services/stripe.service';
import { SubscriptionTier } from '@/types/billing';

export interface SubscriptionFeatures {
  // AWS Resources
  maxResources: number | 'unlimited';
  canViewCompliance: boolean;
  canViewOrphanedResources: boolean;
  canViewCostAttribution: boolean;
  canViewRiskScore: boolean;
  maxBulkActions: number | 'unlimited';
  canExportReports: boolean;
  canAutoRemediate: boolean;

  // General
  tier: SubscriptionTier;
  isLoading: boolean;
  isFree: boolean;
  isPro: boolean;
  isEnterprise: boolean;
}

const TIER_FEATURES: Record<SubscriptionTier, Omit<SubscriptionFeatures, 'tier' | 'isLoading' | 'isFree' | 'isPro' | 'isEnterprise'>> = {
  free: {
    maxResources: 20,
    canViewCompliance: false,
    canViewOrphanedResources: false,
    canViewCostAttribution: false,
    canViewRiskScore: false,
    maxBulkActions: 5,
    canExportReports: false,
    canAutoRemediate: false,
  },
  starter: {
    maxResources: 50,
    canViewCompliance: false,
    canViewOrphanedResources: false,
    canViewCostAttribution: false,
    canViewRiskScore: false,
    maxBulkActions: 10,
    canExportReports: false,
    canAutoRemediate: false,
  },
  pro: {
    maxResources: 'unlimited',
    canViewCompliance: true,
    canViewOrphanedResources: true,
    canViewCostAttribution: true,
    canViewRiskScore: true,
    maxBulkActions: 'unlimited',
    canExportReports: true,
    canAutoRemediate: false,
  },
  enterprise: {
    maxResources: 'unlimited',
    canViewCompliance: true,
    canViewOrphanedResources: true,
    canViewCostAttribution: true,
    canViewRiskScore: true,
    maxBulkActions: 'unlimited',
    canExportReports: true,
    canAutoRemediate: true,
  },
};

export function useSubscription(): SubscriptionFeatures {
  const { data, isLoading } = useQuery({
    queryKey: ['subscription'],
    queryFn: async () => {
      const result = await getSubscription();
      return result.success && result.data ? result.data.tier : 'free';
    },
    staleTime: 5 * 60 * 1000, // 5 minutes
    retry: 1,
  });

  const tier = (data as SubscriptionTier) || 'free';
  const features = TIER_FEATURES[tier];

  return {
    ...features,
    tier,
    isLoading,
    isFree: tier === 'free',
    isPro: tier === 'pro',
    isEnterprise: tier === 'enterprise',
  };
}
