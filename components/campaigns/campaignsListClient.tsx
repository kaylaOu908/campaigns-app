"use client";
// this component runs on the client because it uses React state and interactivity (filters, search, sorting)

import { useMemo, useState } from "react";
import Link from "next/link";
import type { Campaign, CampaignStatus } from "../../types/campaign";

type SortKey = "updatedAt" | "spendUsd";

// color
function statusBadgeClasses(status: CampaignStatus) {
  if (status === "active") return "bg-green-100 text-green-700";
  if (status === "paused") return "bg-yellow-100 text-yellow-700";
  if (status === "draft") return "bg-neutral-200 text-neutral-700";
  return "bg-blue-100 text-blue-700"; // completed
}
// data is fetched on the server and passed in as props
export default function CampaignListClient({ campaigns }: { campaigns: Campaign[] }) {
  const [query, setQuery] = useState("");
  const [status, setStatus] = useState<CampaignStatus | "all">("all");
  const [channel, setChannel] = useState<Campaign["channel"] | "all">("all");
  const [sortKey, setSortKey] = useState<SortKey>("updatedAt");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();

    const rows = campaigns.filter((c) => {
      const matchesQuery = q.length === 0 || c.name.toLowerCase().includes(q);
      const matchesStatus = status === "all" || c.status === status;
      const matchesChannel = channel === "all" || c.channel === channel;
      return matchesQuery && matchesStatus && matchesChannel;
    });

    rows.sort((a, b) => {
      if (sortKey === "updatedAt") {
        return new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime();
      }
      return b.spendUsd - a.spendUsd;
    });

    return rows;
  }, [campaigns, query, status, channel, sortKey]);

  return (
    <div className="mt-6">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div className="flex flex-col gap-3 sm:flex-row">
          <div>
            <div className="text-sm text-neutral-600">Search</div>
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search campaigns..."
              className="mt-1 w-full rounded border bg-white px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-neutral-300 sm:w-56"
            />
          </div>

          <div>
            <div className="text-sm text-neutral-600">Status</div>
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value as CampaignStatus | "all")}
              className="mt-1 w-full rounded border bg-white px-3 py-2 text-sm sm:w-44"
            >
              <option value="all">All</option>
              <option value="draft">Draft</option>
              <option value="active">Active</option>
              <option value="paused">Paused</option>
              <option value="completed">Completed</option>
            </select>
          </div>

          <div>
            <div className="text-sm text-neutral-600">Channel</div>
            <select
              value={channel}
              onChange={(e) => setChannel(e.target.value as Campaign["channel"] | "all")}
              className="mt-1 w-full rounded border bg-white px-3 py-2 text-sm sm:w-44"
            >
              <option value="all">All</option>
              <option value="google">Google</option>
              <option value="meta">Meta</option>
              <option value="tiktok">TikTok</option>
              <option value="email">Email</option>
              <option value="linkedin">LinkedIn</option>
            </select>
          </div>

          <div>
            <div className="text-sm text-neutral-600">Sort</div>
            <select
              value={sortKey}
              onChange={(e) => setSortKey(e.target.value as SortKey)}
              className="mt-1 w-full rounded border bg-white px-3 py-2 text-sm sm:w-44"
            >
              <option value="updatedAt">Recently updated</option>
              <option value="spendUsd">Highest spend</option>
            </select>
          </div>
        </div>

        <div className="text-sm text-neutral-600">
          Showing {filtered.length} of {campaigns.length}
        </div>
      </div>

      <ul className="mt-6 space-y-3">
        {filtered.map((c) => (
          <li key={c.id} className="rounded border bg-white p-4 hover:bg-neutral-50 transition">
            <div className="flex items-start justify-between gap-4">
              <div>
                <div className="font-medium">{c.name}</div>
                <div className="mt-1 text-sm text-neutral-600">
                  {c.channel} • ${c.spendUsd.toLocaleString()} spend
                </div>

                <span
                  className={`mt-2 inline-block rounded px-2 py-1 text-xs font-medium ${statusBadgeClasses(
                    c.status
                  )}`}
                >
                  {c.status}
                </span>
              </div>

              <Link href={`/campaigns/${c.id}`} className="text-sm font-medium underline">
                View
              </Link>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
