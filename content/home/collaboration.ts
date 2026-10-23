// Homepage → collaboration section.
// Edit the text below. [Square brackets] = placeholder still to fill in (see TODO.md).
import type { IconKey } from "@/content/types";
export const collaboration = {
  eyebrow: "How we work together",
  headline: "Seamless collaboration. Zero micromanagement.",
  body: "You get a team that runs itself. We keep you in the loop — you only step in to say yes.",
  cta: { label: "Book a free call", href: "/book-a-call" },
  points: [
    { title: "One dedicated point of contact", body: "One person who knows your business. No ticket queues.", icon: "userRound" },
    { title: "Clear weekly updates", body: "A short update every week: what's done, what's next.", icon: "calendarCheck" },
    { title: "Fast revisions", body: "Changes turned around in [2] days, not weeks.", icon: "zap" },
    { title: "You approve, we execute", body: "Nothing goes live without your OK.", icon: "badgeCheck" },
  ] as { title: string; body: string; icon: IconKey }[],
  // Mini UI on each stacked card (CollaborationStack.tsx)
  visuals: {
    contact: { name: "Your project manager", status: "Online", message: "Hi! I'll handle everything — just tell me what you need." },
    update: { title: "Weekly update · Friday", items: ["New homepage live", "3 social posts scheduled", "Next: Google profile refresh"] },
    revision: { from: "Revision requested", to: "Done", label: "Turnaround" },
    approve: { title: "Homepage redesign", approve: "Approve", change: "Request change" },
  },
};
