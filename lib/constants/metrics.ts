/**
 * SINGLE SOURCE OF TRUTH for all platform metrics
 * UPDATE THESE VALUES ONLY - they propagate everywhere
 *
 * IMPORTANT: All metrics should be verifiable. If you cannot verify a metric,
 * set it to null and the UI will show generic messaging instead.
 */

export const PLATFORM_METRICS = {
  // ============================================================
  // CUSTOMER METRICS - Set to null if not verifiable
  // ============================================================

  /**
   * Total number of teams/customers using DevControl
   * Set to null to show generic "engineering teams" messaging
   */
  totalTeams: null as string | null, // e.g., "50+" when you can verify

  /**
   * Total number of companies using DevControl
   * Set to null to show generic messaging
   */
  totalCompanies: null as string | null,

  // ============================================================
  // FINANCIAL METRICS - MUST be verifiable
  // ============================================================

  /**
   * Total AWS costs saved across all customers
   * Set to null if you cannot verify this number
   */
  totalSaved: null as string | null, // e.g., "$500K+" when verified

  /**
   * Average monthly savings per customer
   * Only set if you have data to support this
   */
  avgMonthlySavings: "$2,400" as string | null,

  /**
   * Average annual savings per customer
   * MUST match avgMonthlySavings * 12 if both are set
   */
  avgAnnualSavings: "$28,800" as string | null,

  /**
   * Average ROI for customers
   */
  avgROI: "8-10x" as string | null,

  // ============================================================
  // TECHNICAL METRICS
  // ============================================================

  /**
   * Total resources tracked across all customers
   * Set to null if you cannot verify
   */
  resourcesTracked: null as string | null, // e.g., "100K+" when verified

  /**
   * Max resources supported per account
   */
  resourcesPerAccount: "Up to 10,000",

  /**
   * Number of AWS resource types supported
   */
  resourceTypesSupported: "50+",

  // ============================================================
  // OPERATIONAL METRICS - Should be accurate
  // ============================================================

  /**
   * Uptime SLA guarantee
   */
  uptimeSLA: "99.9%",

  /**
   * Average setup time
   */
  setupTime: "3 minutes",

  /**
   * Free trial duration
   */
  trialDays: "14",

  /**
   * Time savings for customers
   */
  timeSavedMonthly: "20+ hours",

} as const;

/**
 * Helper function to get a metric or fallback
 */
export function getMetric(
  key: keyof typeof PLATFORM_METRICS,
  fallback: string = ""
): string {
  const value = PLATFORM_METRICS[key];
  return value !== null ? String(value) : fallback;
}

/**
 * Helper to check if a metric is available
 */
export function hasMetric(key: keyof typeof PLATFORM_METRICS): boolean {
  return PLATFORM_METRICS[key] !== null;
}

/**
 * USAGE RULES:
 * 1. If you can't verify a metric, set it to null or remove it
 * 2. All references to these metrics MUST use this constant
 * 3. Update this file ONLY when you have verified data
 * 4. avgAnnualSavings MUST equal avgMonthlySavings * 12
 * 5. Do not hardcode metrics anywhere else in the codebase
 */
