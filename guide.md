# Salesforce CRM Rollout — Ecommerce Brand Managers
 
Product Roadmap • Prepared by Chris Mackay • August 11, 2026
 
## Executive Summary
 
This roadmap outlines the plan to implement Salesforce CRM for Pattern's Ecommerce Brand Managers, replacing fragmented process tracking with a unified system for onboarding status and customer sentiment data. The plan spans 13 phases across six stages: Foundation, Design & Architecture, Build, Validate, Launch, and Sustain. Beyond the original scope, this version adds stakeholder alignment, data migration and quality readiness, security/data governance, training and enablement, and a post-launch hypercare phase — the additions most rollouts miss and that most often determine whether adoption succeeds.
 
## Roadmap at a Glance
 
| # | Phase | What Happens |
|---|---|---|
| 1 | **Stakeholder Alignment & Executive Sponsorship (NEW)** | Confirm executive sponsor, project owner, and Brand Manager representation. Define decision rights, governance, and a change-management/comms plan. |
| 2 | Discovery | Document current processes and needs for Ecom Brand Managers. Establish baseline metrics to measure success against. |
| 3 | Minimum System Requirements & Data Governance | Define minimum system requirements, including intersystem customer ID mapping, plus security, access control, and data governance for PII in sentiment data. |
| 4 | Field Mapping & API Documentation | Map fields for sentiment analysis and onboarding; produce API documentation for integrations. |
| 5 | UX Mockups (Sentiment & Onboarding Status) | Create mockups for sentiment analysis and onboarding status views inside SFDC. Run in parallel with Phase 4 where possible — mockups often surface field needs. |
| 6 | **Data Migration & Quality Readiness (NEW)** | Assess, cleanse, and prepare existing customer/brand data ahead of migration into SFDC. |
| 7 | Build Objects & Fields | Create the SFDC objects and fields needed to receive data components from other systems. |
| 8 | API Activation | Activate APIs to flow data into SFDC on schedules or triggers. |
| 9 | Testing & UAT | System testing and user acceptance testing with Ecom Brand Managers. |
| 10 | **Training & Enablement (NEW)** | Build training materials and a support model for Ecom Brand Managers ahead of rollout. |
| 11 | Limited Deployment (Pilot) | Deploy to a limited group of production users. Monitor closely against defined rollback criteria. |
| 12 | Full Deployment | Roll out to all Ecom Brand Managers in production. |
| 13 | **Post-Launch Hypercare & Continuous Improvement (NEW)** | Run an elevated-support period post-launch. Monitor adoption against baseline metrics and assign ownership for ongoing integration maintenance. |
 
## Phase Detail by Stage
 
### Stage 1 — Foundation
 
| # | Phase | Description | Key Deliverables | Exit Criteria |
|---|---|---|---|---|
| 1 | **Stakeholder Alignment & Executive Sponsorship (NEW)** | Confirm executive sponsor, project owner, and Brand Manager representation. Define decision rights, governance, and a change-management/comms plan. | RACI matrix; confirmed sponsor & steering committee; draft comms/change-management plan. | Sponsor and steering committee approved; comms plan signed off. |
| 2 | Discovery | Document current processes and needs for Ecom Brand Managers. Establish baseline metrics to measure success against. | Process documentation; needs assessment; baseline metrics report. | Baseline metrics and needs documentation approved by stakeholders. |
| 3 | Minimum System Requirements & Data Governance | Define minimum system requirements, including intersystem customer ID mapping, plus security, access control, and data governance for PII in sentiment data. | System requirements doc; ID mapping schema; access/security model; data governance policy. | Requirements and governance model approved by IT/Security. |
 
### Stage 2 — Design & Architecture
 
| # | Phase | Description | Key Deliverables | Exit Criteria |
|---|---|---|---|---|
| 4 | Field Mapping & API Documentation | Map fields for sentiment analysis and onboarding; produce API documentation for integrations. | Field mapping document; API specification/documentation. | Mapping and API docs reviewed and approved by engineering. |
| 5 | UX Mockups (Sentiment & Onboarding Status) | Create mockups for sentiment analysis and onboarding status views inside SFDC. Run in parallel with Phase 4 where possible — mockups often surface field needs. | Approved UI/UX mockups; Brand Manager feedback incorporated. | Mockups signed off by Brand Manager representatives. |
| 6 | **Data Migration & Quality Readiness (NEW)** | Assess, cleanse, and prepare existing customer/brand data ahead of migration into SFDC. | Data quality audit; cleansing plan; migration runbook. | Data quality thresholds met; migration plan approved. |
 
### Stage 3 — Build
 
| # | Phase | Description | Key Deliverables | Exit Criteria |
|---|---|---|---|---|
| 7 | Build Objects & Fields | Create the SFDC objects and fields needed to receive data components from other systems. | Configured objects/fields in sandbox, validated against field mapping. | Objects/fields match approved field mapping document. |
| 8 | API Activation | Activate APIs to flow data into SFDC on schedules or triggers. | Live scheduled/triggered integrations in staging. | Data flows accurately and on time in staging environment. |
 
### Stage 4 — Validate
 
| # | Phase | Description | Key Deliverables | Exit Criteria |
|---|---|---|---|---|
| 9 | Testing & UAT | System testing and user acceptance testing with Ecom Brand Managers. | Test plans and results; UAT sign-off. | Critical/high defects resolved; UAT sign-off obtained. |
 
### Stage 5 — Launch
 
| # | Phase | Description | Key Deliverables | Exit Criteria |
|---|---|---|---|---|
| 10 | **Training & Enablement (NEW)** | Build training materials and a support model for Ecom Brand Managers ahead of rollout. | Training materials; office hours/support model. | Pilot group trained; support model operational. |
| 11 | Limited Deployment (Pilot) | Deploy to a limited group of production users. Monitor closely against defined rollback criteria. | Pilot go-live; monitoring dashboard; documented rollback plan. | Pilot metrics meet targets (vs. Discovery baseline); go/no-go decision made. |
| 12 | Full Deployment | Roll out to all Ecom Brand Managers in production. | Full production go-live; all users onboarded. | All users live; no unresolved critical incidents. |
 
### Stage 6 — Sustain
 
| # | Phase | Description | Key Deliverables | Exit Criteria |
|---|---|---|---|---|
| 13 | **Post-Launch Hypercare & Continuous Improvement (NEW)** | Run an elevated-support period post-launch. Monitor adoption against baseline metrics and assign ownership for ongoing integration maintenance. | Hypercare support plan; adoption dashboard; feedback loop; integration maintenance owner. | Adoption trending to target; hypercare closed; steady-state support handoff complete. |
 
## Risks to Watch
 
- **Adoption risk:** Brand Managers may default to old workflows without dedicated training, office hours, and visible executive sponsorship.
- **Data quality risk:** legacy customer/brand data migrated without cleansing can undermine trust in the new system from day one.
- **Security/PII risk:** sentiment data crossing systems needs an explicit access and governance model before objects go live.
- **Integration ownership risk:** without a named owner for API/integration maintenance, upstream schema changes post-launch can silently break data flow.
- **Scope-order risk:** finalizing field mapping (Phase 4) before UX mockups (Phase 5) can force rework if mockups surface new field needs — consider running these in parallel.
## Suggested Next Step
 
Confirm executive sponsor and steering committee (Phase 1) and lock the baseline metrics in Discovery (Phase 2) before scheduling downstream phases, since every later exit criterion is measured against that baseline.
 
---
 
## Appendix A: RACI Matrix
 
R = Responsible (does the work) • A = Accountable (owns the outcome; one per row) • C = Consulted (input before the decision) • I = Informed (told after the fact). Roles are placeholders — swap in names as the team is staffed.
 
| Decision / Deliverable | Exec Sponsor | PM (Chris) | SFDC Tech Lead | Integration/Data Eng | IT Security | Brand Managers |
|---|---|---|---|---|---|---|
| Baseline metrics & success criteria (Discovery) | A | R | C | I | I | C |
| System requirements & ID mapping approval | I | R | A | C | C | I |
| Data governance / PII access model | I | C | C | C | A | I |
| Field mapping & API documentation sign-off | I | A | R | R | C | C |
| UX mockups sign-off | I | A | C | I | I | R |
| Data migration go/no-go | I | A | C | R | C | I |
| Build objects & fields | I | I | A/R | C | I | I |
| API activation (schedules/triggers) | I | I | C | A/R | C | I |
| UAT sign-off | C | A | R | R | I | R |
| Training materials & rollout comms | I | A | I | I | I | R |
| Pilot go/no-go | A | R | C | C | C | I |
| Full deployment go-live | A | R | C | C | I | I |
| Post-launch adoption review | A | R | I | I | I | C |
 
*Note: the Exec Sponsor is deliberately kept out of Responsible — if a sponsor is doing hands-on work, that's a signal the role isn't scoped correctly. Accountability shifts to IT Security specifically for the PII/governance model, since that is a compliance decision, not a project-management one.*
 
---
 
## Appendix B: Project Charter
 
One-page reference for scope, ownership, and success criteria. Fill in bracketed fields.
 
| Field | Details |
|---|---|
| Project Name | Salesforce CRM Rollout — Ecommerce Brand Managers |
| Executive Sponsor | [Name / Title] |
| Project Manager | Chris Mackay |
| Steering Committee | See Appendix C — Steering Committee Roster |
| Start Date | [Date] |
| Target Full Deployment Date | [Date] |
| Objectives | [2–3 sentences: what this project achieves and why it matters now] |
| Scope — In | [e.g., Sentiment analysis & onboarding-status objects, field mapping, API integrations, Brand Manager UI] |
| Scope — Out | [e.g., Systems/processes explicitly not touched by this rollout] |
| Budget / Resourcing | [Budget figure, internal FTEs, vendor/contractor support] |
| Key Stakeholders | [Departments/roles with a stake: Ecom Brand Managers, IT/Security, Data Eng, Exec Sponsor] |
| Success Metrics | [Pull from Phase 2 — Discovery baseline metrics] |
| Key Risks | See Appendix G — Risk Register |
 
---
 
## Appendix C: Steering Committee Roster
 
Template for the governance group established in Phase 1. First row is an example — replace with your team, then add rows as needed.
 
| Name | Title / Role | Department | RACI Role | Email | Phone |
|---|---|---|---|---|---|
| *Jane Doe* | *VP, Ecommerce* | *Ecommerce* | *A (Sponsor)* | *jane.doe@pattern.com* | *555-0100* |
| | | | | | |
| | | | | | |
| | | | | | |
| | | | | | |
| | | | | | |
| | | | | | |
| | | | | | |
| | | | | | |
 
---
 
## Appendix D: Data Mapping / Dictionary
 
Field-level reference built during Phase 4, used by build and QA teams throughout the project. First row is an example.
 
| Source System | Source Field | Target Object | Target Field | Data Type | Transformation / Logic |
|---|---|---|---|---|---|
| *Support Platform* | *csat_score* | *Sentiment__c* | *Sentiment_Score__c* | *Number* | *Normalize 1–5 scale to 0–100* |
| | | | | | |
| | | | | | |
| | | | | | |
| | | | | | |
| | | | | | |
 
---
 
## Appendix E: Test Plan / UAT Script
 
Test cases tied to Discovery baseline metrics and phase exit criteria, tracked through Phase 9 — Testing & UAT. First row is an example.
 
| Test ID | Description | Expected Result | Actual Result | Pass/Fail | Tester |
|---|---|---|---|---|---|
| *UAT-01* | *Onboarding status updates when source system changes* | *Status reflects change within SLA window* | | | |
| | | | | | |
| | | | | | |
| | | | | | |
| | | | | | |
| | | | | | |
 
---
 
## Appendix F: Communications / Change Management Plan
 
Audience-specific messaging and timing, separate from the training materials built in Phase 10. First row is an example.
 
| Audience | Key Message | Channel | Timing / Phase | Owner |
|---|---|---|---|---|
| *Ecom Brand Managers* | *What's changing, why, and what's expected of you* | *Team meeting + email* | *Phase 10 — Training* | *PM* |
| | | | | |
| | | | | |
| | | | | |
| | | | | |
| | | | | |
 
---
 
## Appendix G: Risk Register
 
Living log reviewed at each phase gate — not a static list. First row is an example.
 
| Risk ID | Description | Likelihood | Impact | Mitigation | Owner | Status |
|---|---|---|---|---|---|---|
| *R-01* | *Brand Managers revert to old workflow post-launch* | *Medium* | *High* | *Dedicated training + office hours through hypercare* | *PM* | *Open* |
| | | | | | | |
| | | | | | | |
| | | | | | | |
| | | | | | | |
| | | | | | | |
 
---
 
## Appendix H: Data Governance & Security Policy Outline
 
Formalizes the governance model approved in Phase 3. Fill in each section before go-live.
 
**1. Data Classification**
[Define categories — e.g., PII, sentiment/customer data, internal operational data — and the handling rules for each.]
 
**2. Access Control Model**
[Define who/what roles can view, edit, or export each data category. Reference Appendix C for named owners.]
 
**3. Retention Policy**
[Define how long each data category is retained in SFDC and downstream systems, and the deletion/archival process.]
 
**4. Compliance Sign-off**
[Name the compliance/legal reviewer and the sign-off date required before Phase 7 — Build Objects & Fields begins.]
 
**5. PII Handling Procedures**
[Define encryption, masking, and audit-logging requirements for sentiment and customer identity data specifically.]
 
---
 
## Appendix I: Cutover / Rollback Runbook
 
Step-by-step procedure for Phase 11 — Limited Deployment and Phase 12 — Full Deployment, including rollback triggers. First row is an example.
 
| Step # | Action | Owner | Go / Rollback Trigger | Rollback Action |
|---|---|---|---|---|
| *1* | *Enable API triggers for pilot users only* | *Integration Eng* | *Data sync error rate > 2%* | *Disable triggers; revert to manual sync* |
| | | | | |
| | | | | |
| | | | | |
| | | | | |
| | | | | |
 
---
 
## Appendix J: Post-Launch Support / SLA
 
Defines the hypercare period and steady-state support model referenced in Phase 13. Fill in bracketed fields.
 
| Support Tier | Description | Response Time Target | Escalation Path | Owner |
|---|---|---|---|---|
| Tier 1 — Hypercare | Elevated support, first 2–4 weeks post-launch | [Target] | [Path] | [Owner] |
| Tier 2 — Standard | Steady-state support after hypercare closes | [Target] | [Path] | [Owner] |
| Tier 3 — Critical/Outage | Data flow stopped or major functionality down | [Target] | [Path] | [Owner] |
| Integration Maintenance | Ongoing ownership of API/schema changes | [Target] | [Path] | [Owner] |
 

