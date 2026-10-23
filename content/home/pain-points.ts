// Homepage → painPoints section.
// Edit the text below. [Square brackets] = placeholder still to fill in (see TODO.md).
import type { IconKey } from "@/content/types";
export const painPoints = {
  eyebrow: "Sound familiar?",
  headline: "Running a business is hard enough.",
  // Screen-reader prefix for each card's answer line
  fixLabel: "How we fix it",
  cards: [
    {
      icon: "trendingDown",
      title: "Your website looks fine. It just doesn't sell.",
      body: "Visitors look around, then leave without calling.",
      fix: "Sites designed to get you calls.",
    },
    {
      icon: "mapPinOff",
      title: "Customers find your competitor first.",
      body: "They show up on Google. You don't.",
      fix: "We get you found locally.",
    },
    {
      icon: "users",
      title: "Five freelancers. Zero accountability.",
      body: "Website, social and ads all with different people.",
      fix: "One team. One invoice.",
    },
    {
      icon: "calendarX",
      title: "Your last post was months ago.",
      body: "No time to keep social media alive.",
      fix: "A dedicated team keeps you posting.",
    },
    {
      icon: "receipt",
      title: "Agency quotes that blow your budget.",
      body: "Big agency prices don't fit a local business.",
      fix: "Monthly packages that fit your budget.",
    },
    {
      icon: "phoneMissed",
      title: "Every missed call is a lost job.",
      body: "You're on a job, the phone rings, the lead is gone.",
      fix: "WebsyChat answers 24/7.",
    },
  ] as { icon: IconKey; title: string; body: string; fix: string }[],
};
