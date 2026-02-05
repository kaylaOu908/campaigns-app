import { listCampaigns } from "../../lib/campaigns";
import CampaignListClient from "../../components/campaigns/campaignsListClient";
import { redirect } from "next/navigation";
import { getCurrentUser } from "../../lib/auth";

// CampaignsPage → listCampaigns() → dbListCampaigns() → returns Campaign[]
export default async function CampaignsPage() {
  // check authentication first 
  const user = await getCurrentUser();
  if (!user) {
    redirect("/login");
  }

  // fetch campaigns data only if authenticated
  const campaigns = await listCampaigns();

  const total = campaigns.length;
  const activeCount = campaigns.filter(c => c.status === "active").length;
  const pausedCount = campaigns.filter(c => c.status === "paused").length;

  return (
    <main className="mx-auto max-w-4xl p-6">
      <h1 className="text-2xl font-semibold">Campaigns</h1>

      <div className="mt-2 text-sm text-neutral-600">
        {total} total • {activeCount} active • {pausedCount} paused
      </div>

      {/* Client component handles filtering + rendering */}
      <CampaignListClient campaigns={campaigns} />
    </main>
  );

}