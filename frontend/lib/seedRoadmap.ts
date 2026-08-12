import type { AppendixTable, FreeformSection } from "./types";

function rows(columns: string[], data: string[][]): AppendixTable["rows"] {
  return data.map((values, index) => {
    const row: AppendixTable["rows"][number] = { id: `row-${index + 1}` };
    columns.forEach((key, i) => {
      row[key] = values[i] ?? "";
    });
    return row;
  });
}

const blankRow = (count: number) => new Array(count).fill("");

export const appendixOrder = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J"];

export const appendices: Record<string, AppendixTable> = {
  A: {
    id: "A",
    letter: "A",
    title: "RACI Matrix",
    description:
      "R = Responsible (does the work) · A = Accountable (owns the outcome; one per row) · C = Consulted (input before the decision) · I = Informed (told after the fact).",
    columns: [
      { key: "decision", label: "Decision / Deliverable" },
      { key: "execSponsor", label: "Exec Sponsor" },
      { key: "pm", label: "PM (Chris)" },
      { key: "sfdcTechLead", label: "SFDC Tech Lead" },
      { key: "integrationDataEng", label: "Integration/Data Eng" },
      { key: "itSecurity", label: "IT Security" },
      { key: "brandManagers", label: "Brand Managers" },
    ],
    rows: rows(
      ["decision", "execSponsor", "pm", "sfdcTechLead", "integrationDataEng", "itSecurity", "brandManagers"],
      [
        ["Baseline metrics & success criteria (Discovery)", "A", "R", "C", "I", "I", "C"],
        ["System requirements & ID mapping approval", "I", "R", "A", "C", "C", "I"],
        ["Data governance / PII access model", "I", "C", "C", "C", "A", "I"],
        ["Field mapping & API documentation sign-off", "I", "A", "R", "R", "C", "C"],
        ["UX mockups sign-off", "I", "A", "C", "I", "I", "R"],
        ["Data migration go/no-go", "I", "A", "C", "R", "C", "I"],
        ["Build objects & fields", "I", "I", "A/R", "C", "I", "I"],
        ["API activation (schedules/triggers)", "I", "I", "C", "A/R", "C", "I"],
        ["UAT sign-off", "C", "A", "R", "R", "I", "R"],
        ["Training materials & rollout comms", "I", "A", "I", "I", "I", "R"],
        ["Pilot go/no-go", "A", "R", "C", "C", "C", "I"],
        ["Full deployment go-live", "A", "R", "C", "C", "I", "I"],
        ["Post-launch adoption review", "A", "R", "I", "I", "I", "C"],
      ]
    ),
  },
  B: {
    id: "B",
    letter: "B",
    title: "Project Charter",
    description: "One-page reference for scope, ownership, and success criteria.",
    columns: [
      { key: "field", label: "Field" },
      { key: "details", label: "Details" },
    ],
    rows: rows(
      ["field", "details"],
      [
        ["Project Name", "Salesforce CRM Rollout — Ecommerce Brand Managers"],
        ["Executive Sponsor", "[Name / Title]"],
        ["Project Manager", "Chris Mackay"],
        ["Steering Committee", "See Appendix C — Steering Committee Roster"],
        ["Start Date", "[Date]"],
        ["Target Full Deployment Date", "[Date]"],
        ["Objectives", "[2–3 sentences: what this project achieves and why it matters now]"],
        ["Scope — In", "[e.g., Sentiment analysis & onboarding-status objects, field mapping, API integrations, Brand Manager UI]"],
        ["Scope — Out", "[e.g., Systems/processes explicitly not touched by this rollout]"],
        ["Budget / Resourcing", "[Budget figure, internal FTEs, vendor/contractor support]"],
        ["Key Stakeholders", "[Departments/roles with a stake: Ecom Brand Managers, IT/Security, Data Eng, Exec Sponsor]"],
        ["Success Metrics", "[Pull from Phase 2 — Discovery baseline metrics]"],
        ["Key Risks", "See Appendix G — Risk Register"],
      ]
    ),
  },
  C: {
    id: "C",
    letter: "C",
    title: "Steering Committee Roster",
    description:
      "Template for the governance group established in Phase 1. First row is an example — replace with your team, then add rows as needed.",
    columns: [
      { key: "name", label: "Name" },
      { key: "titleRole", label: "Title / Role" },
      { key: "department", label: "Department" },
      { key: "raciRole", label: "RACI Role" },
      { key: "email", label: "Email" },
      { key: "phone", label: "Phone" },
    ],
    rows: rows(
      ["name", "titleRole", "department", "raciRole", "email", "phone"],
      [
        ["Jane Doe", "VP, Ecommerce", "Ecommerce", "A (Sponsor)", "jane.doe@pattern.com", "555-0100"],
        ...Array.from({ length: 8 }, () => blankRow(6)),
      ]
    ),
  },
  D: {
    id: "D",
    letter: "D",
    title: "Data Mapping / Dictionary",
    description:
      "Field-level reference built during Phase 4, used by build and QA teams throughout the project. First row is an example.",
    columns: [
      { key: "sourceSystem", label: "Source System" },
      { key: "sourceField", label: "Source Field" },
      { key: "targetObject", label: "Target Object" },
      { key: "targetField", label: "Target Field" },
      { key: "dataType", label: "Data Type" },
      { key: "transformationLogic", label: "Transformation / Logic" },
    ],
    rows: rows(
      ["sourceSystem", "sourceField", "targetObject", "targetField", "dataType", "transformationLogic"],
      [
        ["Support Platform", "csat_score", "Sentiment__c", "Sentiment_Score__c", "Number", "Normalize 1–5 scale to 0–100"],
        ...Array.from({ length: 5 }, () => blankRow(6)),
      ]
    ),
  },
  E: {
    id: "E",
    letter: "E",
    title: "Test Plan / UAT Script",
    description:
      "Test cases tied to Discovery baseline metrics and phase exit criteria, tracked through Phase 9 — Testing & UAT. First row is an example.",
    columns: [
      { key: "testId", label: "Test ID" },
      { key: "description", label: "Description" },
      { key: "expectedResult", label: "Expected Result" },
      { key: "actualResult", label: "Actual Result" },
      { key: "passFail", label: "Pass/Fail" },
      { key: "tester", label: "Tester" },
    ],
    rows: rows(
      ["testId", "description", "expectedResult", "actualResult", "passFail", "tester"],
      [
        ["UAT-01", "Onboarding status updates when source system changes", "Status reflects change within SLA window", "", "", ""],
        ...Array.from({ length: 5 }, () => blankRow(6)),
      ]
    ),
  },
  F: {
    id: "F",
    letter: "F",
    title: "Communications / Change Management Plan",
    description:
      "Audience-specific messaging and timing, separate from the training materials built in Phase 10. First row is an example.",
    columns: [
      { key: "audience", label: "Audience" },
      { key: "keyMessage", label: "Key Message" },
      { key: "channel", label: "Channel" },
      { key: "timingPhase", label: "Timing / Phase" },
      { key: "owner", label: "Owner" },
    ],
    rows: rows(
      ["audience", "keyMessage", "channel", "timingPhase", "owner"],
      [
        ["Ecom Brand Managers", "What's changing, why, and what's expected of you", "Team meeting + email", "Phase 10 — Training", "PM"],
        ...Array.from({ length: 5 }, () => blankRow(5)),
      ]
    ),
  },
  G: {
    id: "G",
    letter: "G",
    title: "Risk Register",
    description: "Living log reviewed at each phase gate — not a static list. First row is an example.",
    columns: [
      { key: "riskId", label: "Risk ID" },
      { key: "description", label: "Description" },
      { key: "likelihood", label: "Likelihood" },
      { key: "impact", label: "Impact" },
      { key: "mitigation", label: "Mitigation" },
      { key: "owner", label: "Owner" },
      { key: "status", label: "Status" },
    ],
    rows: rows(
      ["riskId", "description", "likelihood", "impact", "mitigation", "owner", "status"],
      [
        [
          "R-01",
          "Brand Managers revert to old workflow post-launch",
          "Medium",
          "High",
          "Dedicated training + office hours through hypercare",
          "PM",
          "Open",
        ],
        ...Array.from({ length: 6 }, () => blankRow(7)),
      ]
    ),
  },
  I: {
    id: "I",
    letter: "I",
    title: "Cutover / Rollback Runbook",
    description:
      "Step-by-step procedure for Phase 11 — Limited Deployment and Phase 12 — Full Deployment, including rollback triggers. First row is an example.",
    columns: [
      { key: "step", label: "Step #" },
      { key: "action", label: "Action" },
      { key: "owner", label: "Owner" },
      { key: "goRollbackTrigger", label: "Go / Rollback Trigger" },
      { key: "rollbackAction", label: "Rollback Action" },
    ],
    rows: rows(
      ["step", "action", "owner", "goRollbackTrigger", "rollbackAction"],
      [
        [
          "1",
          "Enable API triggers for pilot users only",
          "Integration Eng",
          "Data sync error rate > 2%",
          "Disable triggers; revert to manual sync",
        ],
        ...Array.from({ length: 5 }, () => blankRow(5)),
      ]
    ),
  },
  J: {
    id: "J",
    letter: "J",
    title: "Post-Launch Support / SLA",
    description:
      "Defines the hypercare period and steady-state support model referenced in Phase 13. Fill in bracketed fields.",
    columns: [
      { key: "supportTier", label: "Support Tier" },
      { key: "description", label: "Description" },
      { key: "responseTimeTarget", label: "Response Time Target" },
      { key: "escalationPath", label: "Escalation Path" },
      { key: "owner", label: "Owner" },
    ],
    rows: rows(
      ["supportTier", "description", "responseTimeTarget", "escalationPath", "owner"],
      [
        ["Tier 1 — Hypercare", "Elevated support, first 2–4 weeks post-launch", "[Target]", "[Path]", "[Owner]"],
        ["Tier 2 — Standard", "Steady-state support after hypercare closes", "[Target]", "[Path]", "[Owner]"],
        ["Tier 3 — Critical/Outage", "Data flow stopped or major functionality down", "[Target]", "[Path]", "[Owner]"],
        ["Integration Maintenance", "Ongoing ownership of API/schema changes", "[Target]", "[Path]", "[Owner]"],
      ]
    ),
  },
};

export const appendixHSeed: { title: string; sections: FreeformSection[] } = {
  title: "Data Governance & Security Policy Outline",
  sections: [
    {
      id: "data-classification",
      heading: "1. Data Classification",
      body: "[Define categories — e.g., PII, sentiment/customer data, internal operational data — and the handling rules for each.]",
    },
    {
      id: "access-control-model",
      heading: "2. Access Control Model",
      body: "[Define who/what roles can view, edit, or export each data category. Reference Appendix C for named owners.]",
    },
    {
      id: "retention-policy",
      heading: "3. Retention Policy",
      body: "[Define how long each data category is retained in SFDC and downstream systems, and the deletion/archival process.]",
    },
    {
      id: "compliance-sign-off",
      heading: "4. Compliance Sign-off",
      body: "[Name the compliance/legal reviewer and the sign-off date required before Phase 7 — Build Objects & Fields begins.]",
    },
    {
      id: "pii-handling-procedures",
      heading: "5. PII Handling Procedures",
      body: "[Define encryption, masking, and audit-logging requirements for sentiment and customer identity data specifically.]",
    },
  ],
};
