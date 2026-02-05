import Link from "next/link";
// import { redirect } from "next/navigation";
export default function HomePage() {
  return (
    <main className="mx-auto max-w-4xl p-6">
      <h1 className="text-2xl font-semibold">Campaign Dashboard</h1>
      <p className="mt-2 text-neutral-600">
        View and manage your marketing campaigns.
      </p>

      <Link
        href="/campaigns"
        className="mt-6 inline-block rounded border px-4 py-2 hover:bg-neutral-50 transition"
      >
        Go to campaigns
      </Link>
    </main>
  );
}

// export default function HomePage() {
//   redirect("/campaigns");
// }