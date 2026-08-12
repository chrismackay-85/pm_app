export interface GlanceRow {
  num: string;
  phase: string;
  whatHappens: string;
}

export interface StagePhaseRow {
  num: string;
  phase: string;
  description: string;
  keyDeliverables: string;
  exitCriteria: string;
}

export interface Stage {
  name: string;
  phases: StagePhaseRow[];
}

export const overview = {
  title: "Salesforce CRM Rollout — Ecommerce Brand Managers",
  subtitle: "Product Roadmap • Prepared by Chris Mackay • August 11, 2026",
  execSummary:
    "This roadmap outlines the plan to implement Salesforce CRM for Pattern's Ecommerce Brand Managers, replacing fragmented process tracking with a unified system for onboarding status and customer sentiment data. The plan spans 13 phases across six stages: Foundation, Design & Architecture, Build, Validate, Launch, and Sustain. Beyond the original scope, this version adds stakeholder alignment, data migration and quality readiness, security/data governance, training and enablement, and a post-launch hypercare phase — the additions most rollouts miss and that most often determine whether adoption succeeds.",

  glance: [
    { num: "1", phase: "Stakeholder Alignment & Executive Sponsorship (NEW)", whatHappens: "Confirm executive sponsor, project owner, and Brand Manager representation. Define decision rights, governance, and a change-management/comms plan." },
    { num: "2", phase: "Discovery", whatHappens: "Document current processes and needs for Ecom Brand Managers. Establish baseline metrics to measure success against." },
    { num: "3", phase: "Minimum System Requirements & Data Governance", whatHappens: "Define minimum system requirements, including intersystem customer ID mapping, plus security, access control, and data governance for PII in sentiment data." },
    { num: "4", phase: "Field Mapping & API Documentation", whatHappens: "Map fields for sentiment analysis and onboarding; produce API documentation for integrations." },
    { num: "5", phase: "UX Mockups (Sentiment & Onboarding Status)", whatHappens: "Create mockups for sentiment analysis and onboarding status views inside SFDC. Run in parallel with Phase 4 where possible — mockups often surface field needs." },
    { num: "6", phase: "Data Migration & Quality Readiness (NEW)", whatHappens: "Assess, cleanse, and prepare existing customer/brand data ahead of migration into SFDC." },
    { num: "7", phase: "Build Objects & Fields", whatHappens: "Create the SFDC objects and fields needed to receive data components from other systems." },
    { num: "8", phase: "API Activation", whatHappens: "Activate APIs to flow data into SFDC on schedules or triggers." },
    { num: "9", phase: "Testing & UAT", whatHappens: "System testing and user acceptance testing with Ecom Brand Managers." },
    { num: "10", phase: "Training & Enablement (NEW)", whatHappens: "Build training materials and a support model for Ecom Brand Managers ahead of rollout." },
    { num: "11", phase: "Limited Deployment (Pilot)", whatHappens: "Deploy to a limited group of production users. Monitor closely against defined rollback criteria." },
    { num: "12", phase: "Full Deployment", whatHappens: "Roll out to all Ecom Brand Managers in production." },
    { num: "13", phase: "Post-Launch Hypercare & Continuous Improvement (NEW)", whatHappens: "Run an elevated-support period post-launch. Monitor adoption against baseline metrics and assign ownership for ongoing integration maintenance." },
  ] satisfies GlanceRow[],

  stages: [
    {
      name: "Stage 1 — Foundation",
      phases: [
        { num: "1", phase: "Stakeholder Alignment & Executive Sponsorship (NEW)", description: "Confirm executive sponsor, project owner, and Brand Manager representation. Define decision rights, governance, and a change-management/comms plan.", keyDeliverables: "RACI matrix; confirmed sponsor & steering committee; draft comms/change-management plan.", exitCriteria: "Sponsor and steering committee approved; comms plan signed off." },
        { num: "2", phase: "Discovery", description: "Document current processes and needs for Ecom Brand Managers. Establish baseline metrics to measure success against.", keyDeliverables: "Process documentation; needs assessment; baseline metrics report.", exitCriteria: "Baseline metrics and needs documentation approved by stakeholders." },
        { num: "3", phase: "Minimum System Requirements & Data Governance", description: "Define minimum system requirements, including intersystem customer ID mapping, plus security, access control, and data governance for PII in sentiment data.", keyDeliverables: "System requirements doc; ID mapping schema; access/security model; data governance policy.", exitCriteria: "Requirements and governance model approved by IT/Security." },
      ],
    },
    {
      name: "Stage 2 — Design & Architecture",
      phases: [
        { num: "4", phase: "Field Mapping & API Documentation", description: "Map fields for sentiment analysis and onboarding; produce API documentation for integrations.", keyDeliverables: "Field mapping document; API specification/documentation.", exitCriteria: "Mapping and API docs reviewed and approved by engineering." },
        { num: "5", phase: "UX Mockups (Sentiment & Onboarding Status)", description: "Create mockups for sentiment analysis and onboarding status views inside SFDC. Run in parallel with Phase 4 where possible — mockups often surface field needs.", keyDeliverables: "Approved UI/UX mockups; Brand Manager feedback incorporated.", exitCriteria: "Mockups signed off by Brand Manager representatives." },
        { num: "6", phase: "Data Migration & Quality Readiness (NEW)", description: "Assess, cleanse, and prepare existing customer/brand data ahead of migration into SFDC.", keyDeliverables: "Data quality audit; cleansing plan; migration runbook.", exitCriteria: "Data quality thresholds met; migration plan approved." },
      ],
    },
    {
      name: "Stage 3 — Build",
      phases: [
        { num: "7", phase: "Build Objects & Fields", description: "Create the SFDC objects and fields needed to receive data components from other systems.", keyDeliverables: "Configured objects/fields in sandbox, validated against field mapping.", exitCriteria: "Objects/fields match approved field mapping document." },
        { num: "8", phase: "API Activation", description: "Activate APIs to flow data into SFDC on schedules or triggers.", keyDeliverables: "Live scheduled/triggered integrations in staging.", exitCriteria: "Data flows accurately and on time in staging environment." },
      ],
    },
    {
      name: "Stage 4 — Validate",
      phases: [
        { num: "9", phase: "Testing & UAT", description: "System testing and user acceptance testing with Ecom Brand Managers.", keyDeliverables: "Test plans and results; UAT sign-off.", exitCriteria: "Critical/high defects resolved; UAT sign-off obtained." },
      ],
    },
    {
      name: "Stage 5 — Launch",
      phases: [
        { num: "10", phase: "Training & Enablement (NEW)", description: "Build training materials and a support model for Ecom Brand Managers ahead of rollout.", keyDeliverables: "Training materials; office hours/support model.", exitCriteria: "Pilot group trained; support model operational." },
        { num: "11", phase: "Limited Deployment (Pilot)", description: "Deploy to a limited group of production users. Monitor closely against defined rollback criteria.", keyDeliverables: "Pilot go-live; monitoring dashboard; documented rollback plan.", exitCriteria: "Pilot metrics meet targets (vs. Discovery baseline); go/no-go decision made." },
        { num: "12", phase: "Full Deployment", description: "Roll out to all Ecom Brand Managers in production.", keyDeliverables: "Full production go-live; all users onboarded.", exitCriteria: "All users live; no unresolved critical incidents." },
      ],
    },
    {
      name: "Stage 6 — Sustain",
      phases: [
        { num: "13", phase: "Post-Launch Hypercare & Continuous Improvement (NEW)", description: "Run an elevated-support period post-launch. Monitor adoption against baseline metrics and assign ownership for ongoing integration maintenance.", keyDeliverables: "Hypercare support plan; adoption dashboard; feedback loop; integration maintenance owner.", exitCriteria: "Adoption trending to target; hypercare closed; steady-state support handoff complete." },
      ],
    },
  ] satisfies Stage[],

  risks: [
    "Adoption risk: Brand Managers may default to old workflows without dedicated training, office hours, and visible executive sponsorship.",
    "Data quality risk: legacy customer/brand data migrated without cleansing can undermine trust in the new system from day one.",
    "Security/PII risk: sentiment data crossing systems needs an explicit access and governance model before objects go live.",
    "Integration ownership risk: without a named owner for API/integration maintenance, upstream schema changes post-launch can silently break data flow.",
    "Scope-order risk: finalizing field mapping (Phase 4) before UX mockups (Phase 5) can force rework if mockups surface new field needs — consider running these in parallel.",
  ],

  nextStep:
    "Confirm executive sponsor and steering committee (Phase 1) and lock the baseline metrics in Discovery (Phase 2) before scheduling downstream phases, since every later exit criterion is measured against that baseline.",
};
