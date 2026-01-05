# DevControl - B2B SaaS Pricing Tier Strategy

**Date**: January 3, 2026
**Focus**: Dashboard Features & Monetization
**Goal**: Create value at every tier while naturally encouraging upsell

---

## Executive Summary

This pricing strategy creates three distinct tiers (Free, Pro, Enterprise) that balance:
- **Immediate value** for free users (activation and retention)
- **Clear upgrade triggers** based on real pain points
- **Enterprise-grade features** that justify higher pricing

**Core Philosophy**: Give away visibility, charge for actionability.

---

## Pricing Tier Overview

| Tier | Monthly Price | Target User | Core Value Prop |
|------|--------------|-------------|-----------------|
| **Free** | $0 | Individual developers, small teams (1-3 people) | See what's happening - basic visibility into deployments and services |
| **Pro** | $49/user | Growing teams (5-20 people) | Optimize operations - actionable insights, cost optimization, performance tracking |
| **Enterprise** | Custom ($149-299/user) | Large orgs (20+ people) | Scale with confidence - advanced security, compliance, custom integrations, dedicated support |

---

## Feature Mapping by Category

### 1. Cost Insights & Tracking

#### **Free Tier** - Basic Visibility
**What's Included**:
- ✅ **Current month AWS spend** (single number, no breakdown)
- ✅ **Top 5 most expensive services** (this week only)
- ✅ **Basic cost chart** (7-day view, no drill-down)
- ✅ **One cost alert** (fixed threshold: "$100 overage")

**What's Locked**:
- 🔒 Historical cost trends (>7 days)
- 🔒 Cost breakdown by service/resource type
- 🔒 Cost attribution by team/service
- 🔒 Custom cost alerts
- 🔒 Budget forecasting
- 🔒 Cost anomaly detection

**Why This Works**:
- **Gives enough to activate**: User sees "We spent $1,247 this month" and gets immediate value
- **Creates upgrade trigger**: User asks "Why did we spend $400 more than last month?" → needs historical data → upgrades to Pro

**Dashboard UI**:
```
┌─────────────────────────────────────────┐
│ AWS Spend (This Month)                  │
│ $1,247.52                               │
│ ▲ 24% vs last 7 days                    │
│                                         │
│ [Unlock 12-month history] 🔒 Pro        │
└─────────────────────────────────────────┘
```

---

#### **Pro Tier** - Optimization & Attribution
**What's Unlocked**:
- ✅ **12-month cost history** with interactive charts
- ✅ **Cost breakdown by**:
  - Service (which microservice)
  - Resource type (EC2, RDS, S3, Lambda)
  - Environment (prod, staging, dev)
- ✅ **Team/service attribution** - "Which team is driving costs?"
- ✅ **5 custom cost alerts** with Slack/email notifications
- ✅ **Budget forecasting** - "On track to spend $15,200 this month"
- ✅ **Week-over-week cost anomalies** - "RDS spend up 300% this week"
- ✅ **Cost optimization recommendations** (basic):
  - Underutilized EC2 instances
  - Unattached EBS volumes
  - Old snapshots

**What's Still Locked**:
- 🔒 Multi-year cost analysis
- 🔒 Advanced FinOps recommendations (reserved instances, savings plans)
- 🔒 Cost allocation tags management
- 🔒 Chargeback reports (for internal billing)
- 🔒 Custom cost dashboards

**Why This Works**:
- **Solves the "Why?" question**: Historical data shows trends, attribution shows who's responsible
- **Actionable**: Cost alerts prevent overspending, recommendations reduce waste
- **ROI is obvious**: If you save $500/month from recommendations, Pro ($49/user × 5 users = $245) pays for itself

**Dashboard UI**:
```
┌─────────────────────────────────────────┐
│ Cost Trends (12 months)                 │
│ [Interactive chart with drill-down]     │
│                                         │
│ Top Cost Drivers:                       │
│ • API Gateway: $458 (+12% MoM)          │
│ • RDS Prod: $321 (+3% MoM)              │
│ • S3 Storage: $198 (-5% MoM)            │
│                                         │
│ 💡 3 recommendations could save $420/mo │
│ [View Recommendations]                  │
└─────────────────────────────────────────┘
```

---

#### **Enterprise Tier** - Strategic FinOps
**What's Unlocked**:
- ✅ **Multi-year cost analysis** (3+ years)
- ✅ **Advanced FinOps recommendations**:
  - Reserved Instance optimization
  - Savings Plans analysis
  - Right-sizing with performance data
  - Commitment recommendations (1-year vs 3-year)
- ✅ **Cost allocation tag management** - Auto-tag resources
- ✅ **Chargeback reports** - Internal billing by team/project
- ✅ **Custom cost dashboards** - Build your own views
- ✅ **Unlimited cost alerts** with custom logic
- ✅ **API access** to cost data (for custom reporting)
- ✅ **Dedicated CSM** for quarterly cost optimization reviews

**Why This Works**:
- **Enterprise scale**: At $50k+/month AWS spend, a 10% savings from RI optimization = $5k/month = $60k/year
- **Justifies high price**: If Enterprise costs $299/user × 30 users = $8,970/month, but saves $5k/month, ROI is obvious
- **Custom workflows**: Large orgs need chargeback reports for internal billing

**Dashboard UI**:
```
┌─────────────────────────────────────────┐
│ FinOps Recommendations                  │
│                                         │
│ 🎯 High Impact ($12,400/year savings)   │
│ • Purchase RDS RI (1-year): -$8,200     │
│ • Right-size prod EC2: -$3,100          │
│ • Enable S3 Intelligent-Tiering: -$1,100│
│                                         │
│ [Schedule Review with CSM]              │
└─────────────────────────────────────────┘
```

---

### 2. Security & Compliance Signals

#### **Free Tier** - Basic Awareness
**What's Included**:
- ✅ **Security score** (single number: 72/100)
- ✅ **Top 3 critical issues** (this week only)
  - "2 S3 buckets publicly accessible"
  - "5 EC2 instances with open SSH"
- ✅ **Basic compliance check** (CIS AWS Foundations Benchmark - pass/fail only)

**What's Locked**:
- 🔒 Historical security trends
- 🔒 Detailed remediation steps
- 🔒 Compliance reports (SOC 2, HIPAA, PCI-DSS)
- 🔒 Security alerts and notifications
- 🔒 Policy-as-code enforcement
- 🔒 Vulnerability scanning

**Why This Works**:
- **Creates urgency**: "You have 2 publicly accessible S3 buckets" → user wants to fix it
- **Teases compliance**: "CIS Benchmark: 78% compliant" → user asks "What are we failing?" → upgrade to Pro

**Dashboard UI**:
```
┌─────────────────────────────────────────┐
│ Security Posture                        │
│ Score: 72/100 ⚠️                        │
│                                         │
│ Critical Issues (3):                    │
│ • 2 S3 buckets publicly accessible      │
│ • 5 EC2 instances with port 22 open     │
│ • 1 RDS without encryption              │
│                                         │
│ [See remediation steps] 🔒 Pro          │
└─────────────────────────────────────────┘
```

---

#### **Pro Tier** - Actionable Security
**What's Unlocked**:
- ✅ **90-day security trend** - "Score improving from 65 → 72"
- ✅ **Detailed remediation steps** with Terraform/CloudFormation fixes
- ✅ **Security alerts** via Slack/email/PagerDuty
  - New critical issues detected
  - Security score drops >10 points
- ✅ **Compliance frameworks** (CIS, SOC 2, HIPAA, PCI-DSS)
  - Detailed pass/fail per control
  - Evidence collection for audits
- ✅ **Resource-level security** - Drill down to specific EC2, S3, RDS
- ✅ **Security recommendations** prioritized by risk

**What's Still Locked**:
- 🔒 Multi-year security history
- 🔒 Policy-as-code enforcement (auto-remediation)
- 🔒 Continuous compliance monitoring
- 🔒 Custom compliance frameworks
- 🔒 Advanced threat detection
- 🔒 Security audit logs (1+ year retention)

**Why This Works**:
- **Removes friction**: "Here's how to fix it" → copy-paste Terraform → issue resolved
- **Audit readiness**: SOC 2 compliance reports save weeks of manual work
- **Risk reduction**: Alerts prevent breaches

**Dashboard UI**:
```
┌─────────────────────────────────────────┐
│ Compliance Status                       │
│                                         │
│ SOC 2: 94% compliant ✅                 │
│ • Access Control: 100%                  │
│ • Encryption: 88% ⚠️                    │
│ • Logging: 100%                         │
│                                         │
│ HIPAA: 67% compliant ⚠️                 │
│ • 12 controls failing                   │
│ [View Remediation Plan]                 │
└─────────────────────────────────────────┘
```

---

#### **Enterprise Tier** - Continuous Compliance
**What's Unlocked**:
- ✅ **Multi-year security audit history** (for compliance audits)
- ✅ **Policy-as-code enforcement**:
  - Auto-remediation (close open ports, enable encryption)
  - Prevention (block non-compliant resource creation)
- ✅ **Continuous compliance monitoring** with drift detection
- ✅ **Custom compliance frameworks** - Build your own controls
- ✅ **Advanced threat detection**:
  - Anomalous API calls
  - Unusual IAM activity
  - Data exfiltration patterns
- ✅ **Security audit logs** (7-year retention for compliance)
- ✅ **Dedicated compliance consultant** (quarterly reviews)
- ✅ **API access** for SIEM integration

**Why This Works**:
- **Regulatory requirement**: Banks, healthcare, fintech MUST have multi-year audit logs
- **Reduces risk**: Auto-remediation prevents human error
- **Enterprise scale**: Managing compliance for 500+ AWS accounts requires automation

**Dashboard UI**:
```
┌─────────────────────────────────────────┐
│ Policy Enforcement                      │
│                                         │
│ Auto-Remediation (Last 30 Days):        │
│ • 23 S3 buckets encrypted               │
│ • 12 security groups tightened          │
│ • 5 IAM policies restricted             │
│                                         │
│ Prevention:                             │
│ • 8 non-compliant resources blocked     │
│                                         │
│ [Configure Policies]                    │
└─────────────────────────────────────────┘
```

---

### 3. Actionable Recommendations

#### **Free Tier** - Basic Suggestions
**What's Included**:
- ✅ **3 recommendations total** (refreshed weekly)
  - Top priority only (cost or security)
  - Generic advice: "Consider enabling encryption on RDS"
- ✅ **No historical tracking** - Can't see what was recommended before

**What's Locked**:
- 🔒 Full recommendation list
- 🔒 Prioritization by impact ($$ saved or risk reduced)
- 🔒 Remediation tracking (mark as done, dismiss, snooze)
- 🔒 Recommendation history
- 🔒 Team assignment
- 🔒 Terraform/IaC code generation

**Why This Works**:
- **Teases value**: User gets 3 recommendations, sees value, wants more
- **Creates FOMO**: "You have 12 more recommendations. Upgrade to see all."

**Dashboard UI**:
```
┌─────────────────────────────────────────┐
│ Recommendations (Top 3)                 │
│                                         │
│ 💰 Delete 3 unattached EBS volumes      │
│    Potential savings: $45/month         │
│                                         │
│ 🔒 Enable encryption on RDS prod        │
│    Risk: High                           │
│                                         │
│ ⚡ Right-size t3.large instance          │
│    Potential savings: $28/month         │
│                                         │
│ [See 9 more recommendations] 🔒 Pro     │
└─────────────────────────────────────────┘
```

---

#### **Pro Tier** - Full Recommendations Suite
**What's Unlocked**:
- ✅ **Unlimited recommendations** with prioritization
- ✅ **Impact scoring**:
  - Cost: "$420/month savings" or "$5,040/year"
  - Security: "Critical / High / Medium / Low"
  - Performance: "2x faster query times"
- ✅ **Remediation tracking**:
  - Mark as done
  - Dismiss with reason
  - Snooze for 30/60/90 days
  - Assign to team member
- ✅ **Recommendation history** (6 months)
- ✅ **Copy-paste fixes** - Terraform, AWS CLI, CloudFormation
- ✅ **Bulk actions** - "Apply all cost recommendations"

**What's Still Locked**:
- 🔒 Custom recommendation rules
- 🔒 AI-powered recommendations (ML-based insights)
- 🔒 Multi-year recommendation history
- 🔒 Automated implementation (one-click apply)
- 🔒 ROI tracking (actual savings vs predicted)

**Why This Works**:
- **Actionable**: Copy-paste Terraform → recommendation implemented in 2 minutes
- **Measurable**: "We've saved $1,200 this quarter from recommendations"
- **Team coordination**: Assign recommendations to right person

**Dashboard UI**:
```
┌─────────────────────────────────────────┐
│ All Recommendations (12)                │
│ Potential Total Savings: $840/month     │
│                                         │
│ 💰 Cost (5 recommendations, $620/mo)    │
│ 🔒 Security (4 recommendations)         │
│ ⚡ Performance (3 recommendations)       │
│                                         │
│ Filter: [All] [Assigned to me] [High]  │
│                                         │
│ ✅ 8 completed this quarter             │
│ [View History]                          │
└─────────────────────────────────────────┘
```

---

#### **Enterprise Tier** - AI-Powered Insights
**What's Unlocked**:
- ✅ **Custom recommendation rules** - Define your own policies
- ✅ **AI-powered recommendations**:
  - ML-based anomaly detection
  - Predictive cost optimization
  - Performance regression detection
  - Resource usage patterns
- ✅ **Multi-year recommendation history** (audit trail)
- ✅ **Automated implementation** - One-click apply via GitOps
- ✅ **ROI tracking** - Actual vs predicted savings
- ✅ **Dedicated recommendations review** (quarterly with CSM)
- ✅ **API access** to build custom workflows

**Why This Works**:
- **Scale**: Managing 100+ services needs automation
- **Sophistication**: ML detects issues humans miss
- **Audit trail**: Compliance requires tracking all changes

**Dashboard UI**:
```
┌─────────────────────────────────────────┐
│ AI Insights                             │
│                                         │
│ 🤖 Anomaly Detected:                    │
│ "API service memory usage trending up   │
│  15% week-over-week for 4 weeks.        │
│  Predicted OOM in 12 days."             │
│                                         │
│ Recommendation: Scale to 4GB (from 2GB) │
│ [Auto-Apply via Terraform PR]           │
│                                         │
│ Impact: Prevents downtime               │
└─────────────────────────────────────────┘
```

---

### 4. Reporting & History

#### **Free Tier** - Current State Only
**What's Included**:
- ✅ **7-day history** for all metrics (deployments, costs, security)
- ✅ **No exports** - View only in dashboard
- ✅ **No saved reports**

**What's Locked**:
- 🔒 90+ day history
- 🔒 CSV/PDF exports
- 🔒 Scheduled reports (email, Slack)
- 🔒 Custom date ranges
- 🔒 Report templates
- 🔒 API access to historical data

**Why This Works**:
- **Recent data is enough for solo developers**: "What deployed this week?"
- **Creates upgrade trigger**: Manager asks "Show me last quarter's deployments" → needs Pro

---

#### **Pro Tier** - Operational Reporting
**What's Unlocked**:
- ✅ **12-month history** for all metrics
- ✅ **CSV/PDF/Excel exports** for all reports
- ✅ **Scheduled reports**:
  - Weekly deployment summary → Slack
  - Monthly cost report → Email
  - Quarterly DORA metrics → Email
- ✅ **Custom date ranges** - "Show me Dec 15 - Jan 15"
- ✅ **5 saved report templates** - Reusable reports
- ✅ **Report sharing** - Share link with read-only access

**What's Still Locked**:
- 🔒 Multi-year history (2+ years)
- 🔒 Unlimited saved reports
- 🔒 White-label reports (custom branding)
- 🔒 Advanced analytics (cohort analysis, trend forecasting)
- 🔒 Data warehouse integration
- 🔒 API access to raw data

**Why This Works**:
- **Executive visibility**: Monthly reports to leadership
- **Audit support**: 12 months of history for compliance
- **Team alignment**: Scheduled reports keep everyone informed

**Dashboard UI**:
```
┌─────────────────────────────────────────┐
│ Saved Reports (3/5)                     │
│                                         │
│ 📊 Weekly Deployment Summary            │
│    Schedule: Every Monday 9am → Slack   │
│    [Edit] [Run Now] [Delete]            │
│                                         │
│ 💰 Monthly AWS Cost Breakdown           │
│    Schedule: 1st of month → Email       │
│    [Edit] [Run Now] [Delete]            │
│                                         │
│ [Create New Report]                     │
└─────────────────────────────────────────┘
```

---

#### **Enterprise Tier** - Strategic Analytics
**What's Unlocked**:
- ✅ **Multi-year history** (3-7 years, configurable retention)
- ✅ **Unlimited saved reports**
- ✅ **White-label reports** - Add your company logo, colors
- ✅ **Advanced analytics**:
  - Cohort analysis (team performance over time)
  - Trend forecasting (predictive DORA metrics)
  - Comparative analysis (team A vs team B)
- ✅ **Data warehouse integration** (Snowflake, BigQuery, Redshift)
- ✅ **API access** to raw event data
- ✅ **Custom report builder** - Drag-and-drop UI
- ✅ **Executive dashboards** - Pre-built for C-level

**Why This Works**:
- **Regulatory**: Some industries require 7-year data retention
- **Strategic planning**: Multi-year trends inform hiring, budgets
- **Custom workflows**: API access enables Tableau, Looker, PowerBI integration

**Dashboard UI**:
```
┌─────────────────────────────────────────┐
│ Executive Dashboard                     │
│                                         │
│ 3-Year DORA Metrics Trend:              │
│ • Deployment Frequency: +340%           │
│ • Lead Time: -67%                       │
│ • MTTR: -45%                            │
│ • Change Failure Rate: -28%             │
│                                         │
│ [Export to PowerBI] [Share with Board]  │
└─────────────────────────────────────────┘
```

---

## 5. DORA Metrics (Deployment Performance)

### Free Tier
- ✅ **4 DORA metrics** (current week only):
  - Deployment Frequency
  - Lead Time for Changes
  - Mean Time to Recovery
  - Change Failure Rate
- ✅ **No benchmarking** - Just your numbers
- ✅ **No trends** - Current week snapshot

### Pro Tier
- ✅ **12-month DORA history** with trend charts
- ✅ **Industry benchmarking** - "Top 10% of companies"
- ✅ **Team comparison** - Compare teams within org
- ✅ **Improvement tracking** - "You improved 15% this quarter"
- ✅ **Alerts** - "Deployment frequency down 40% this week"

### Enterprise Tier
- ✅ **Multi-year DORA history**
- ✅ **Custom benchmarks** - Define your own targets
- ✅ **Predictive analytics** - "On track to hit Elite tier in 6 months"
- ✅ **CI/CD integration** - Pull data from GitHub, GitLab, CircleCI
- ✅ **Team scorecards** - Gamification for performance

---

## Upgrade Funnel: How Free Users Convert

### Stage 1: Activation (Day 1-7)
**What Happens**:
- User signs up, completes onboarding
- Sees first dashboard with 7 days of data
- Gets 3 recommendations, implements one
- **Value delivered**: "I found and deleted 3 unused EBS volumes, saved $45/month"

**Upgrade Trigger**: None yet. User is happy with free tier.

---

### Stage 2: Friction Point (Week 2-4)
**What Happens**:
- User asks: "Why did our AWS bill spike last month?"
- Dashboard shows: "🔒 Unlock 12-month cost history to see trends"
- User clicks "Unlock" → sees Pro pricing page

**Upgrade Trigger**: **Historical data locked**

**Conversion Tactic**:
- Show preview: "Here's what you'd see in Pro" (blurred chart)
- Show ROI: "Pro users save an average of $850/month from cost recommendations"
- Offer trial: "Start 14-day Pro trial"

---

### Stage 3: Team Expansion (Month 2-3)
**What Happens**:
- User invites 3 teammates
- Teammates ask: "Can we get a weekly deployment report sent to Slack?"
- Dashboard shows: "🔒 Scheduled reports available in Pro"

**Upgrade Trigger**: **Team collaboration features locked**

**Conversion Tactic**:
- Show testimonial: "Our team saves 5 hours/week with automated reports"
- Offer team trial: "Upgrade your whole team to Pro for 14 days"

---

### Stage 4: Compliance Need (Month 3-6)
**What Happens**:
- Company starts SOC 2 audit
- User needs: "Export 12 months of security compliance data"
- Dashboard shows: "🔒 Compliance reports available in Pro"

**Upgrade Trigger**: **Regulatory requirement**

**Conversion Tactic**:
- Show urgency: "SOC 2 audits require 12 months of evidence. Upgrade to access historical data."
- Show cost: "Hiring a consultant costs $15k. Pro costs $245/month."
- Offer instant upgrade: "Upgrade now, download report in 2 minutes"

---

### Stage 5: Enterprise Sale (Month 6-12)
**What Happens**:
- User (now on Pro) manages 50+ services, 20+ team members
- Needs: "Auto-remediate security issues across all AWS accounts"
- Dashboard shows: "🔒 Policy-as-code enforcement available in Enterprise"

**Upgrade Trigger**: **Scale and automation**

**Conversion Tactic**:
- Assign CSM: "Let's schedule a call to discuss your needs"
- Show ROI: "Automating compliance saves 40 hours/month = $8,000/month labor cost"
- Custom pricing: "Let's build a plan for your 50-person team"

---

## Feature Placement Rationale

### Why Cost Insights are Tiered This Way

**Free: Current month spend**
- **Rationale**: Solo developers need to know "Am I overspending?" but don't need historical trends
- **Upgrade trigger**: First time user sees unexpected spike, they need historical data to investigate

**Pro: 12-month history + attribution**
- **Rationale**: Teams need to understand trends and who's responsible for costs
- **Upgrade trigger**: When AWS spend >$5k/month, cost optimization becomes critical

**Enterprise: Multi-year + FinOps**
- **Rationale**: At scale ($50k+/month), RI optimization and chargeback are mandatory
- **Upgrade trigger**: CFO demands internal billing by team/project

---

### Why Security is Tiered This Way

**Free: Awareness**
- **Rationale**: Knowing "2 S3 buckets are public" is critical for ANY user
- **Upgrade trigger**: User wants to fix it but doesn't know how → needs remediation steps

**Pro: Remediation**
- **Rationale**: Copy-paste Terraform fixes remove all friction
- **Upgrade trigger**: Company starts compliance audit, needs SOC 2 report

**Enterprise: Automation**
- **Rationale**: Managing security for 100+ accounts requires policy-as-code
- **Upgrade trigger**: Company has dedicated security team, needs auto-remediation

---

### Why Recommendations are Tiered This Way

**Free: Top 3**
- **Rationale**: Teaser of value without overwhelming user
- **Upgrade trigger**: User wants to see all 12 recommendations

**Pro: Full list + tracking**
- **Rationale**: Teams need to coordinate on implementing recommendations
- **Upgrade trigger**: Managing 50+ services, needs AI to detect patterns

**Enterprise: AI-powered**
- **Rationale**: Scale requires ML to detect issues humans miss
- **Upgrade trigger**: User wants one-click auto-apply via GitOps

---

### Why Reporting is Tiered This Way

**Free: 7-day view**
- **Rationale**: Recent data is enough for solo developers
- **Upgrade trigger**: Manager asks "Show me Q4 deployments"

**Pro: 12-month + exports**
- **Rationale**: Leadership needs reports for quarterly reviews
- **Upgrade trigger**: Compliance audit needs 3+ years of data

**Enterprise: Multi-year + API**
- **Rationale**: Strategic planning requires long-term trends
- **Upgrade trigger**: Needs integration with corporate BI tools

---

## Dashboard UI: Upgrade Prompts

### Soft Prompt (Passive)
Used for secondary features. Doesn't block workflow.

```tsx
<div className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-950 dark:to-purple-950 p-4 rounded-lg border border-blue-200 dark:border-blue-800">
  <div className="flex items-start gap-3">
    <div className="text-2xl">📊</div>
    <div className="flex-1">
      <h4 className="font-semibold text-sm mb-1">
        See 12-month cost trends
      </h4>
      <p className="text-xs text-gray-600 dark:text-gray-400 mb-3">
        Understand spending patterns and predict future costs with historical data.
      </p>
      <Button variant="outline" size="sm">
        Unlock with Pro →
      </Button>
    </div>
  </div>
</div>
```

---

### Hard Prompt (Active)
Used when user clicks locked feature. Blocks workflow.

```tsx
<Dialog open={showUpgradeModal}>
  <DialogContent className="max-w-md">
    <div className="text-center">
      <div className="text-5xl mb-4">🔒</div>
      <h3 className="text-xl font-bold mb-2">
        Unlock Historical Cost Data
      </h3>
      <p className="text-gray-600 dark:text-gray-400 mb-6">
        See 12 months of cost trends, drill down by service, and get cost optimization recommendations.
      </p>

      {/* Show ROI */}
      <div className="bg-green-50 dark:bg-green-950 p-4 rounded-lg mb-6">
        <p className="text-sm font-semibold text-green-900 dark:text-green-100">
          Pro users save an average of $850/month
        </p>
        <p className="text-xs text-green-700 dark:text-green-300 mt-1">
          That's $10,200/year from cost optimization
        </p>
      </div>

      {/* CTA */}
      <div className="flex gap-3">
        <Button variant="outline" onClick={() => setShowUpgradeModal(false)}>
          Maybe Later
        </Button>
        <Button onClick={() => router.push('/upgrade')}>
          Start 14-Day Trial →
        </Button>
      </div>

      {/* Trust signal */}
      <p className="text-xs text-gray-500 mt-4">
        No credit card required. Cancel anytime.
      </p>
    </div>
  </DialogContent>
</Dialog>
```

---

### Feature Comparison Table
Embedded in dashboard footer or settings.

```tsx
<Table>
  <TableHeader>
    <TableRow>
      <TableHead>Feature</TableHead>
      <TableHead>Free</TableHead>
      <TableHead>Pro</TableHead>
      <TableHead>Enterprise</TableHead>
    </TableRow>
  </TableHeader>
  <TableBody>
    <TableRow>
      <TableCell>Cost History</TableCell>
      <TableCell>7 days</TableCell>
      <TableCell>12 months ✅</TableCell>
      <TableCell>Multi-year ✅</TableCell>
    </TableRow>
    <TableRow>
      <TableCell>Recommendations</TableCell>
      <TableCell>Top 3</TableCell>
      <TableCell>Unlimited ✅</TableCell>
      <TableCell>AI-powered ✅</TableCell>
    </TableRow>
    <TableRow>
      <TableCell>Compliance Reports</TableCell>
      <TableCell>—</TableCell>
      <TableCell>SOC 2, HIPAA ✅</TableCell>
      <TableCell>Custom frameworks ✅</TableCell>
    </TableRow>
  </TableBody>
</Table>
```

---

## Pricing Page Copy

### Free Tier
**Headline**: Start for free. No credit card required.

**Value Props**:
- ✅ Track up to 10 services
- ✅ See current month AWS spend
- ✅ Get security alerts
- ✅ 3 cost/security recommendations
- ✅ 7-day dashboard history
- ✅ Unlimited team members

**CTA**: Get Started Free →

---

### Pro Tier
**Headline**: Optimize operations and reduce costs.

**Value Props**:
- ✅ **Everything in Free, plus:**
- ✅ 12-month historical data
- ✅ Cost attribution by team/service
- ✅ Unlimited recommendations with tracking
- ✅ SOC 2 / HIPAA compliance reports
- ✅ Scheduled reports (Slack, email)
- ✅ CSV/PDF exports
- ✅ 5 custom alerts

**Pricing**: $49/user/month (billed annually) or $59/user/month (monthly)

**ROI Statement**: "Pro users save an average of $850/month from cost optimization"

**CTA**: Start 14-Day Trial →

---

### Enterprise Tier
**Headline**: Scale with confidence. Security, compliance, and automation.

**Value Props**:
- ✅ **Everything in Pro, plus:**
- ✅ Multi-year data retention (3-7 years)
- ✅ Policy-as-code enforcement (auto-remediation)
- ✅ AI-powered recommendations
- ✅ Custom compliance frameworks
- ✅ Dedicated Customer Success Manager
- ✅ API access for custom integrations
- ✅ White-label reports
- ✅ SSO / SAML
- ✅ SLA (99.9% uptime)

**Pricing**: Custom (typically $149-299/user/month)

**ROI Statement**: "Enterprise customers reduce compliance costs by 75% and save 40 hours/month on manual reporting"

**CTA**: Schedule Demo →

---

## Implementation: Gating Logic

### Backend: Feature Flag Check

```typescript
// lib/utils/featureAccess.ts

export enum PricingTier {
  FREE = 'free',
  PRO = 'pro',
  ENTERPRISE = 'enterprise',
}

export enum Feature {
  COST_HISTORY_12_MONTHS = 'cost_history_12_months',
  COST_HISTORY_MULTI_YEAR = 'cost_history_multi_year',
  COST_ATTRIBUTION = 'cost_attribution',
  COMPLIANCE_REPORTS = 'compliance_reports',
  POLICY_AS_CODE = 'policy_as_code',
  UNLIMITED_RECOMMENDATIONS = 'unlimited_recommendations',
  AI_RECOMMENDATIONS = 'ai_recommendations',
  SCHEDULED_REPORTS = 'scheduled_reports',
  API_ACCESS = 'api_access',
}

const FEATURE_MATRIX: Record<Feature, PricingTier[]> = {
  [Feature.COST_HISTORY_12_MONTHS]: [PricingTier.PRO, PricingTier.ENTERPRISE],
  [Feature.COST_HISTORY_MULTI_YEAR]: [PricingTier.ENTERPRISE],
  [Feature.COST_ATTRIBUTION]: [PricingTier.PRO, PricingTier.ENTERPRISE],
  [Feature.COMPLIANCE_REPORTS]: [PricingTier.PRO, PricingTier.ENTERPRISE],
  [Feature.POLICY_AS_CODE]: [PricingTier.ENTERPRISE],
  [Feature.UNLIMITED_RECOMMENDATIONS]: [PricingTier.PRO, PricingTier.ENTERPRISE],
  [Feature.AI_RECOMMENDATIONS]: [PricingTier.ENTERPRISE],
  [Feature.SCHEDULED_REPORTS]: [PricingTier.PRO, PricingTier.ENTERPRISE],
  [Feature.API_ACCESS]: [PricingTier.ENTERPRISE],
};

export function hasAccess(
  organizationTier: PricingTier,
  feature: Feature
): boolean {
  return FEATURE_MATRIX[feature].includes(organizationTier);
}
```

---

### Frontend: Conditional Rendering

```tsx
// components/dashboard/cost-trends.tsx

import { useOrganization } from '@/lib/hooks/useOrganization';
import { hasAccess, Feature } from '@/lib/utils/featureAccess';
import { UpgradePrompt } from '@/components/upgrade/upgrade-prompt';

export function CostTrends() {
  const { organization } = useOrganization();
  const canView12Months = hasAccess(organization.tier, Feature.COST_HISTORY_12_MONTHS);

  if (!canView12Months) {
    return (
      <UpgradePrompt
        feature="12-month cost history"
        description="See spending trends, predict future costs, and identify anomalies."
        requiredTier="Pro"
        ctaText="Unlock with Pro"
      />
    );
  }

  return <CostTrendsChart />;
}
```

---

### API: Enforce Limits

```typescript
// backend/src/routes/costs.routes.ts

router.get('/api/costs/history', authenticate, async (req, res) => {
  const { organizationId } = req.user;
  const { startDate, endDate } = req.query;

  // Get organization tier
  const org = await getOrganization(organizationId);

  // Free tier: Max 7 days
  if (org.tier === 'free') {
    const maxDate = new Date();
    maxDate.setDate(maxDate.getDate() - 7);

    if (new Date(startDate) < maxDate) {
      return res.status(403).json({
        success: false,
        error: 'Free tier limited to 7 days. Upgrade to Pro for 12-month history.',
        upgradeUrl: '/upgrade?reason=cost_history',
      });
    }
  }

  // Pro tier: Max 12 months
  if (org.tier === 'pro') {
    const maxDate = new Date();
    maxDate.setMonth(maxDate.getMonth() - 12);

    if (new Date(startDate) < maxDate) {
      return res.status(403).json({
        success: false,
        error: 'Pro tier limited to 12 months. Contact sales for Enterprise.',
        upgradeUrl: '/contact-sales?reason=cost_history_multi_year',
      });
    }
  }

  // Fetch and return data
  const costHistory = await getCostHistory(organizationId, startDate, endDate);
  res.json({ success: true, data: costHistory });
});
```

---

## Analytics: Track Upgrade Funnel

### Events to Track

```typescript
// When user views locked feature
analytics.track('feature_locked_viewed', {
  feature: 'cost_history_12_months',
  userTier: 'free',
  requiredTier: 'pro',
  location: 'dashboard_cost_widget',
});

// When user clicks "Upgrade" button
analytics.track('upgrade_cta_clicked', {
  feature: 'cost_history_12_months',
  userTier: 'free',
  targetTier: 'pro',
  ctaText: 'Unlock with Pro',
  location: 'dashboard_cost_widget',
});

// When user views pricing page
analytics.track('pricing_page_viewed', {
  source: 'cost_history_upsell',
  userTier: 'free',
});

// When user starts trial
analytics.track('trial_started', {
  tier: 'pro',
  source: 'cost_history_upsell',
  trialDays: 14,
});

// When user converts to paid
analytics.track('subscription_created', {
  tier: 'pro',
  source: 'cost_history_upsell',
  mrr: 245, // Monthly recurring revenue
  users: 5,
});
```

---

### Funnel Analysis

```sql
-- Conversion funnel: Locked feature → Upgrade
WITH funnel AS (
  SELECT
    user_id,
    MAX(CASE WHEN event_name = 'feature_locked_viewed' THEN 1 ELSE 0 END) AS viewed_locked,
    MAX(CASE WHEN event_name = 'upgrade_cta_clicked' THEN 1 ELSE 0 END) AS clicked_upgrade,
    MAX(CASE WHEN event_name = 'pricing_page_viewed' THEN 1 ELSE 0 END) AS viewed_pricing,
    MAX(CASE WHEN event_name = 'trial_started' THEN 1 ELSE 0 END) AS started_trial,
    MAX(CASE WHEN event_name = 'subscription_created' THEN 1 ELSE 0 END) AS converted
  FROM analytics_events
  WHERE created_at >= NOW() - INTERVAL '30 days'
  GROUP BY user_id
)
SELECT
  COUNT(*) FILTER (WHERE viewed_locked = 1) AS viewed_locked_feature,
  COUNT(*) FILTER (WHERE clicked_upgrade = 1) AS clicked_upgrade_cta,
  COUNT(*) FILTER (WHERE viewed_pricing = 1) AS viewed_pricing_page,
  COUNT(*) FILTER (WHERE started_trial = 1) AS started_trial,
  COUNT(*) FILTER (WHERE converted = 1) AS converted_to_paid,

  -- Conversion rates
  ROUND(100.0 * COUNT(*) FILTER (WHERE clicked_upgrade = 1) / NULLIF(COUNT(*) FILTER (WHERE viewed_locked = 1), 0), 2) AS ctr_upgrade_button,
  ROUND(100.0 * COUNT(*) FILTER (WHERE converted = 1) / NULLIF(COUNT(*) FILTER (WHERE viewed_locked = 1), 0), 2) AS conversion_rate
FROM funnel;
```

---

## ROI Justification Examples

### For Engineering Manager (Pro Tier)

**Scenario**: Team of 10 engineers, AWS spend $8,000/month

**Pro Pricing**: $49/user × 10 = $490/month

**Value Delivered**:
- **Cost optimization**: 3 recommendations save $600/month
- **Time savings**: Automated reports save 5 hours/week = $2,500/month (at $125/hr)
- **Compliance**: SOC 2 report saves 20 hours of manual work = $2,500 one-time

**ROI**: $600 + $2,500 = $3,100/month value for $490/month cost = **6.3x ROI**

---

### For Enterprise (Enterprise Tier)

**Scenario**: 50 engineers, AWS spend $80,000/month

**Enterprise Pricing**: $199/user × 50 = $9,950/month

**Value Delivered**:
- **RI optimization**: 10% savings on $80k = $8,000/month
- **Auto-remediation**: Prevents 1 security breach/year = $500k avoided cost
- **Compliance automation**: Saves 40 hours/month = $10,000/month (at $250/hr)
- **Dedicated CSM**: Quarterly reviews optimize architecture = $5,000/month additional savings

**ROI**: $8,000 + $10,000 + $5,000 = $23,000/month value for $9,950/month cost = **2.3x ROI**

---

## Next Steps: Implementation Phases

### Phase 1: Feature Flagging (Week 1)
- [ ] Add `tier` column to `organizations` table (free/pro/enterprise)
- [ ] Create `featureAccess.ts` utility with FEATURE_MATRIX
- [ ] Add middleware to API routes to check tier
- [ ] Return 403 with upgrade URL when feature locked

### Phase 2: UI Gating (Week 2)
- [ ] Create `<UpgradePrompt />` component (soft prompt)
- [ ] Create `<UpgradeModal />` component (hard prompt)
- [ ] Wrap locked features in `hasAccess()` checks
- [ ] Add "Upgrade to Pro" badges on dashboard widgets

### Phase 3: Pricing Page (Week 3)
- [ ] Build pricing page with 3 tiers
- [ ] Add feature comparison table
- [ ] Implement "Start Trial" flow
- [ ] Add testimonials and social proof

### Phase 4: Analytics (Week 4)
- [ ] Track all upgrade funnel events
- [ ] Build internal dashboard for conversion metrics
- [ ] Set up alerts for drop-offs in funnel
- [ ] A/B test upgrade prompt copy

### Phase 5: Stripe Integration (Week 5)
- [ ] Add Stripe subscription checkout
- [ ] Implement trial logic (14 days, no credit card)
- [ ] Add billing portal for upgrades/downgrades
- [ ] Send upgrade confirmation emails

---

## Success Metrics

### Free → Pro Conversion
- **Target**: 5-10% conversion rate within 90 days
- **Key Drivers**:
  - Historical data access (cost/security)
  - Scheduled reports
  - Compliance requirements

### Pro → Enterprise Conversion
- **Target**: 15-20% conversion rate within 12 months
- **Key Drivers**:
  - Scale (20+ users)
  - Automation needs (policy-as-code)
  - Regulatory requirements (multi-year retention)

### Revenue Metrics
- **Average Revenue Per User (ARPU)**: $25-35/user/month (blended across tiers)
- **Customer Lifetime Value (LTV)**: $3,000-5,000 per user
- **LTV:CAC Ratio**: Target 3:1

---

## Conclusion

This pricing strategy creates:

✅ **Immediate value at free tier** - Activation and retention
✅ **Clear upgrade triggers** - Historical data, compliance, automation
✅ **Natural funnel** - Free users hit limits, upgrade to Pro, scale to Enterprise
✅ **ROI justification** - Cost savings and time savings pay for subscription
✅ **Enterprise moat** - Advanced features (AI, policy-as-code) hard to build in-house

**Core Insight**: Give away visibility (metrics, scores), charge for actionability (historical data, automation, compliance).

---

**Status**: Ready for Implementation
**Estimated Timeline**: 5 weeks to full deployment
**Expected Impact**: 5-10% free-to-paid conversion, $25-35 ARPU
