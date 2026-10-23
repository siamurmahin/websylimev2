// Homepage → process section.
// Edit the text below. [Square brackets] = placeholder still to fill in (see TODO.md).
import type { IconKey } from "@/content/types";
export const process = {
  eyebrow: "How it works",
  headline: "From idea to impact in [2] weeks.",
  cta: { label: "Start step 1", href: "/start-project" },
  // `gets` = what you walk away with at each step
  steps: [
    { title: "Discover", body: "We learn your business.", icon: "search", gets: ["Kickoff call", "Goals & audience brief"] },
    { title: "Design", body: "We craft your look.", icon: "penTool", gets: ["Homepage design", "Your colors & fonts"] },
    { title: "Build", body: "We bring it to life.", icon: "code", gets: ["Mobile-first pages", "Fast & search-ready"] },
    { title: "Launch", body: "We go live.", icon: "rocket", gets: ["Domain & hosting set up", "Final check together"] },
    { title: "Grow", body: "We keep it working.", icon: "trending", gets: ["Monthly updates", "Leads tracked"] },
  ] as { title: string; body: string; icon: IconKey; gets: string[] }[],
  // Labels inside the "website building itself" mockup (ProcessBuild.tsx)
  mockup: {
    url: "yourbusiness.com",
    notes: ["Goals", "Customers", "Competitors"],
    live: "Live",
    launched: "Your site is live!",
    lead: "New lead · just now",
    stageLabels: ["Planning", "Designing", "Building", "Launching", "Growing"],
  },
};
