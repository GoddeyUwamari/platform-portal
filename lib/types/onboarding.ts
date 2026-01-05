/**
 * Onboarding Types
 * TypeScript interfaces for onboarding system
 */

export interface OnboardingStage {
  id: string;
  name: string;
  title: string;
  description: string;
  completed: boolean;
  completedAt: string | null;
  completedBy: string | null;
  order: number;
}

export interface OnboardingNextStep {
  action: string;
  cta: string;
  route?: string;
}

export interface OnboardingStatus {
  currentStage: string;
  progress: number; // 0-100
  completedStages: string[];
  stages: OnboardingStage[];
  isCompleted: boolean;
  isDismissed: boolean;
  dismissedAt: string | null;
  startedAt: string;
  completedAt: string | null;
  nextStep: OnboardingNextStep | null;
}

export interface OnboardingMetrics {
  total_orgs: number;
  completed_orgs: number;
  dismissed_orgs: number;
  avg_stages_completed: number;
  completion_rate_pct: number;
  avg_hours_to_complete: number;
}

export interface OnboardingFunnelStage {
  stage: string;
  count: number;
  rate: number;
}

export interface OnboardingFunnel {
  total_started: number;
  funnel: OnboardingFunnelStage[];
}

// API Response types
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

export type OnboardingAction =
  | 'dismiss_welcome'
  | 'open_create_service_modal'
  | 'navigate_to_deployments'
  | 'navigate_to_aws_settings'
  | 'trigger_aws_discovery';
