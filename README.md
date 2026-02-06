## 1. Overview
This project is a lightweight marketing campaign dashboard that lets users view, filter, search, and sort campaign data. It includes a campaign list page and a dynamic detail route for each campaign. The current data layer uses a mock in-memory backend to simulate real API behavior, making it easy to replace with an actual backend in the future. <br />

The structure mirrors how I would organize a real project, keeping UI, routing, and data logic clearly separated so backend integration can be added later without major refactoring.<br />

It is built with
- Next.js (App Router),
- React,
- TypeScript,
- Tailwind CSS<br />


and is deployed on Vercel.

  
## 2. Running Locally or Live URL
Prerequisites<br />
- Node.js (v18+ recommended)
- npm or yarn<br />

After cloning the repository:
```bash
npm install

npm run dev
# or
yarn dev
```
Then Open: http://localhost:3000

Or view the live version:
https://campaigns-app-theta.vercel.app

## 3. Project Structure
This project follows a simple folder structure that keeps routing, UI components, and data logic organized and easy to extend.
```bash
app/
  layout.tsx                # Shared layout across all routes
  page.tsx                  # Dashboard landing page
  campaigns/
    page.tsx                # Campaign list page (server component)
    [id]/
      page.tsx              # Dynamic campaign detail route

components/
  campaigns/
    CampaignListClient.tsx  # Client component (search, filters, sorting)

lib/
  auth.ts                   # Authentication stub (simulated logged-in user)
  campaigns.ts              # Service layer (data access abstraction)
  mockDb.ts                 # In-memory mock backend

types/
  campaign.ts               # Shared domain types

```
Main Routes
- / — Dashboard landing page
- /campaigns — Campaign list
- /campaigns/[id] — Dynamic campaign detail
  
## 4. Architectural Practices to Notice
- Server vs Client component split
  - Server routes fetch data and stay simple: app/campaigns/page.tsx, app/campaigns/[id]/page.tsx
  - Client component handles interactive UI (search, filters, sorting): components/campaigns/campaignsListClient.tsx

- Thin service layer between UI and data source
  - Pages call listCampaigns() from lib/campaigns.ts instead of accessing the mock database directly. This keeps page components focused on rendering and not data plumbing.
  - Files: lib/campaigns.ts, lib/mockDb.ts

- Dynamic routing with App Router
  - Dynamic routing is handled through the App Router using app/campaigns/[id], which maps URL segments directly to campaign detail pages.
  - Files: app/campaigns/[id]/page.tsx

- Shared layout for consistent UI
  - Header/nav shared across routes via layout.
  - File: app/layout.tsx

- Typed domain model
  - Campaign data is defined using a shared TypeScript domain model. The types in types/campaign.ts are used across the UI and mock backend to keep everything consistent.
  - Files: types/campaign.ts

## 5. Backend & Authentication Approach
This project does not include a real backend or database. Instead, it includes a small mock data layer that simulates API behavior and keeps the UI independent from the data source. <br />

Campaign data goes through a small service layer (lib/campaigns.ts) that sits between the UI and the mock database (lib/mockDb.ts). In a real implementation, lib/campaigns.ts would be the place to swap in real API calls (REST/GraphQL) or a database-backed backend without changing the page or component code.<br />

Authentication is represented by a lightweight stub (lib/auth.ts) that returns a mock user. In a production app, this would be replaced with session-based auth (Supabase/NextAuth) and role checks at the route or layout level.

## 6. Assumptions & Tradeoffs

- Mock data only
  - I used an in-memory mock database to keep the focus on frontend structure and routing. No real backend or database is included.

- Authentication is a stub
  - Auth is represented by a simple placeholder (lib/auth.ts) to show where session logic and roles would live in a real app.

- Minimal UI by design
  - I kept the UI minimal and focused on clarity, component boundaries, and code organization rather than building a full dashboard product.

- No persistence
  - Changes are not saved because there’s no database layer in this version.

- Filtering/sorting is client-side for simplicity; for large datasets I’d push this to the backend.

- No heavy error/loading states
  - I kept loading/error handling basic since the data source is local. In a real backend scenario, I’d add stronger handling and possibly pagination.
