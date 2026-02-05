// These types are shared across the frontend and mock backend layer

export type CampaignStatus = "draft" | "active" | "paused" | "completed";

export type Campaign = {
  id: string;
  name: string;
  channel: "google" | "meta" | "tiktok" | "email" | "linkedin";
  status: CampaignStatus;

  startDate: string;
  endDate?: string; // may or may not have an end date

  budgetUsd: number;
  impressions: number;
  clicks: number;
  spendUsd: number;
  conversions: number;

  updatedAt: string;
};
