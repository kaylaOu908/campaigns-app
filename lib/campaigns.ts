import { dbGetCampaignById, dbListCampaigns } from "./mockDb";
import { Campaign } from "../types/campaign";

// Service layer for campaign related data access
// UI components will depend on this layer, not the database directly

export async function listCampaigns(): Promise<Campaign[]> {
  return dbListCampaigns();
}

export async function getCampaign(id: string): Promise<Campaign | null> {
  return dbGetCampaignById(id);
}
