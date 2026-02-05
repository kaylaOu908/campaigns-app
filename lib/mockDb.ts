import { Campaign } from "../types/campaign";

// Mock in-memory database used to simulate backend behavior
const campaigns: Campaign[] = [
  {
    id: "cmp_001",
    name: "Winter Promo",
    channel: "google",
    status: "active",
    startDate: "2026-01-10",
    endDate: "2026-02-28",
    budgetUsd: 8000,
    impressions: 240000,
    clicks: 4800,
    spendUsd: 3650,
    conversions: 220,
    updatedAt: "2026-02-01T19:30:00Z",
  },
  {
    id: "cmp_002",
    name: "Retargeting Always-On",
    channel: "meta",
    status: "paused",
    startDate: "2025-11-01",
    budgetUsd: 12000,
    impressions: 410000,
    clicks: 6100,
    spendUsd: 9100,
    conversions: 310,
    updatedAt: "2026-01-25T22:10:00Z",
  },
  {
    id: "cmp_003",
    name: "Spring Launch Teaser",
    channel: "tiktok",
    status: "active",
    startDate: "2026-02-05",
    endDate: "2026-03-15",
    budgetUsd: 5000,
    impressions: 180000,
    clicks: 3200,
    spendUsd: 2100,
    conversions: 140,
    updatedAt: "2026-02-03T16:45:00Z",
  },
  {
    id: "cmp_004",
    name: "LinkedIn B2B Outreach",
    channel: "linkedin",
    status: "draft",
    startDate: "2026-03-01",
    budgetUsd: 15000,
    impressions: 0,
    clicks: 0,
    spendUsd: 0,
    conversions: 0,
    updatedAt: "2026-02-04T09:15:00Z",
  },
  {
    id: "cmp_005",
    name: "Holiday Clearance Push",
    channel: "google",
    status: "completed",
    startDate: "2025-12-01",
    endDate: "2025-12-31",
    budgetUsd: 20000,
    impressions: 890000,
    clicks: 14500,
    spendUsd: 19800,
    conversions: 980,
    updatedAt: "2026-01-02T12:05:00Z",
  },
  {
    id: "cmp_006",
    name: "Brand Awareness Meta Video",
    channel: "meta",
    status: "active",
    startDate: "2026-01-20",
    endDate: "2026-03-01",
    budgetUsd: 10000,
    impressions: 520000,
    clicks: 7300,
    spendUsd: 6400,
    conversions: 260,
    updatedAt: "2026-02-02T14:20:00Z",
  },
  {
    id: "cmp_007",
    name: "Influencer Collab Boost",
    channel: "tiktok",
    status: "paused",
    startDate: "2026-01-05",
    budgetUsd: 7000,
    impressions: 275000,
    clicks: 3900,
    spendUsd: 5200,
    conversions: 180,
    updatedAt: "2026-01-30T18:55:00Z",
  },
  {
    id: "cmp_008",
    name: "Quarterly Retention Email",
    channel: "email",
    status: "active",
    startDate: "2026-02-01",
    budgetUsd: 3000,
    impressions: 120000,
    clicks: 9500,
    spendUsd: 850,
    conversions: 420,
    updatedAt: "2026-02-04T11:40:00Z",
  }
];

// Simulates network or database latency
function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

// Returns all campaigns from the mock database
export async function dbListCampaigns(): Promise<Campaign[]> {
  await sleep(150);
  return [...campaigns];
}

// get a single campaign by ID from the mock database
export async function dbGetCampaignById(id: string): Promise<Campaign | null> {
  await sleep(120);
  return campaigns.find((c) => c.id === id) ?? null;
}
