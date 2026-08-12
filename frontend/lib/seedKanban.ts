import type { KanbanCard, KanbanColumn } from "./types";

export const seedColumns: KanbanColumn[] = [
  { id: "backlog", name: "Backlog" },
  { id: "in-progress", name: "In Progress" },
  { id: "blocked", name: "Blocked" },
  { id: "in-review", name: "In Review" },
  { id: "done", name: "Done" },
];

interface SeedCard {
  columnId: string;
  title: string;
  details: string;
}

const seedCardList: SeedCard[] = [
  {
    columnId: "done",
    title: "Stakeholder Alignment & Executive Sponsorship",
    details:
      "Confirm executive sponsor, project owner, and Brand Manager representation. Define decision rights, governance, and a change-management/comms plan.",
  },
  {
    columnId: "done",
    title: "Discovery",
    details:
      "Document current processes and needs for Ecom Brand Managers. Establish baseline metrics to measure success against.",
  },
  {
    columnId: "done",
    title: "Minimum System Requirements & Data Governance",
    details:
      "Define minimum system requirements, including intersystem customer ID mapping, plus security, access control, and data governance for PII in sentiment data.",
  },
  {
    columnId: "in-review",
    title: "Field Mapping & API Documentation",
    details:
      "Map fields for sentiment analysis and onboarding; produce API documentation for integrations.",
  },
  {
    columnId: "in-review",
    title: "UX Mockups (Sentiment & Onboarding Status)",
    details:
      "Create mockups for sentiment analysis and onboarding status views inside SFDC. Run in parallel with Phase 4 where possible.",
  },
  {
    columnId: "in-progress",
    title: "Data Migration & Quality Readiness",
    details:
      "Assess, cleanse, and prepare existing customer/brand data ahead of migration into SFDC.",
  },
  {
    columnId: "in-progress",
    title: "Build Objects & Fields",
    details:
      "Create the SFDC objects and fields needed to receive data components from other systems.",
  },
  {
    columnId: "blocked",
    title: "API Activation",
    details: "Activate APIs to flow data into SFDC on schedules or triggers.",
  },
  {
    columnId: "blocked",
    title: "Testing & UAT",
    details: "System testing and user acceptance testing with Ecom Brand Managers.",
  },
  {
    columnId: "backlog",
    title: "Training & Enablement",
    details:
      "Build training materials and a support model for Ecom Brand Managers ahead of rollout.",
  },
  {
    columnId: "backlog",
    title: "Limited Deployment (Pilot)",
    details:
      "Deploy to a limited group of production users. Monitor closely against defined rollback criteria.",
  },
  {
    columnId: "backlog",
    title: "Full Deployment",
    details: "Roll out to all Ecom Brand Managers in production.",
  },
  {
    columnId: "backlog",
    title: "Post-Launch Hypercare & Continuous Improvement",
    details:
      "Run an elevated-support period post-launch. Monitor adoption against baseline metrics and assign ownership for ongoing integration maintenance.",
  },
];

export function createSeedCards(): Record<string, KanbanCard> {
  const cards: Record<string, KanbanCard> = {};
  seedCardList.forEach((card, index) => {
    const id = `card-${index + 1}`;
    cards[id] = { id, title: card.title, details: card.details, columnId: card.columnId, archived: false };
  });
  return cards;
}

export function createSeedCardOrder(cards: Record<string, KanbanCard>): Record<string, string[]> {
  const order: Record<string, string[]> = {};
  seedColumns.forEach((column) => {
    order[column.id] = [];
  });
  Object.values(cards).forEach((card) => {
    order[card.columnId].push(card.id);
  });
  return order;
}
