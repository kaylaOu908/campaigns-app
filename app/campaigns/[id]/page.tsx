import { notFound } from "next/navigation";
import { getCampaign } from "../../../lib/campaigns";

type Props = {
  params: Promise<{ id: string }>;
};
// detail page for a single campaign
export default async function CampaignDetailPage({ params }: Props) {

  const {id} = await params;
  const campaign = await getCampaign(id);
  if (!campaign) return notFound();

  return (
    <main className="mx-auto max-w-4xl p-6">
      <h1 className="text-2xl font-semibold">{campaign.name}</h1>
      <div className="mt-2 text-sm text-neutral-600">
        {campaign.channel} • {campaign.status}
      </div>

      <div className="mt-6 grid gap-3 sm:grid-cols-2">
        <div className="rounded border p-4">
          <div className="text-sm text-neutral-600">Budget</div>
          <div>${campaign.budgetUsd.toLocaleString()}</div>
        </div>

        <div className="rounded border p-4">
          <div className="text-sm text-neutral-600">Spend</div>
          <div>${campaign.spendUsd.toLocaleString()}</div>
        </div>
      </div>
    </main>
  );
}
