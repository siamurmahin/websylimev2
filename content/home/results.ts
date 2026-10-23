// Homepage → results section.
// Edit the text below. [Square brackets] = placeholder still to fill in (see TODO.md).
export const results = {
  eyebrow: "The numbers",
  headline: "Results that speak.",
  // Numbers count up on scroll. `count: false` shows the value as-is (e.g. a year).
  // Start year: plan stats say 2017, the About timeline says 2024 — confirm (TODO.md).
  body: "No vanity metrics. Just what happens when one team owns your whole online presence.",
  cta: { label: "See the work behind the numbers", href: "/work" },
  // Small labels inside the tile graphics
  graphics: {
    ring: "9 in 10",
    timelineStart: "[2017]",
    timelineEnd: "Today",
    flowFrom: "Your project",
    // Where the 2% goes — same placeholder as the pricing charity card
    flowTo: "[Charity / cause name]",
  },
  // `visual` picks the mini graphic on each tile (components/sections/Results.tsx).
  // "Leads generated" was replaced: it needs a tracked real number. Add it back
  // here once you have one, e.g. { value: "12,000+", label: "leads generated", visual: "bars" }
  stats: [
    { value: "90%", label: "of clients stay with us", visual: "ring" },
    { value: "[800]+", label: "websites launched", visual: "grid" },
    { value: "Since [2017]", label: "helping businesses grow", count: false, visual: "timeline" },
    { value: "2%", label: "of every project goes to charity", visual: "heart" },
  ] as {
    value: string;
    label: string;
    count?: boolean;
    visual: "ring" | "grid" | "timeline" | "heart";
  }[],
};
