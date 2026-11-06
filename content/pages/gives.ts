// Page → Websy Lime Gives (/gives): where the 2% goes, and the proof.
//
// To add a donation, add one entry to `record` below and put its photo in public/gives/.
// Only add what really happened, with a date and a receipt or photo. Don't show the
// faces or names of children. The total on the page adds itself up.

export type Donation = {
  /** YYYY-MM-DD */
  date: string;
  title: string;
  /** Town, or the organization it went through */
  where: string;
  /** In US dollars */
  amountUsd: number;
  /** One short line on what it paid for */
  detail: string;
  /** A photo or receipt. No children's faces. */
  proof: { src: string; alt: string } | null;
};

export const record: Donation[] = [
  // {
  //   date: "2026-12-15",
  //   title: "Winter clothes",
  //   where: "Dhaka",
  //   amountUsd: 150,
  //   detail: "Warm clothes for people sleeping outside.",
  //   proof: { src: "/gives/2026-12-winter-clothes.webp", alt: "Boxes of warm clothes ready to hand out" },
  // },
];

export const gives = {
  meta: {
    title: "Websy Lime Gives",
    description: "Websy Lime sets aside 2% of our revenue to sponsor orphaned children in Bangladesh and help homeless people through winter. See updates and receipts.",
  },
  hero: {
    eyebrow: "Websy Lime Gives",
    headline: "2% of what we earn goes back.",
    headlineAccent: "goes back.",
    subheadline: "We set aside 2% of our revenue to sponsor orphaned children in Bangladesh and help homeless people through winter. Every project we take on helps fund it.",
    primaryCta: { label: "See what we've given", href: "#record" },
    secondaryCta: { label: "Start a project", href: "/start-project" },
    points: ["2% of our revenue", "Children in Bangladesh", "Updates and receipts"],
    image: { src: "/images/gives-hero.webp", alt: "Folded winter clothes, school books and meal boxes on a wooden table" },
  },
  goals: {
    eyebrow: "Our goals",
    headline: "What we're working toward.",
    subheadline: "These are our goals. What we've actually done is in the record below.",
    items: [
      { icon: "school", title: "Sponsor 10 children a year", body: "Sponsor at least 10 orphaned children in Bangladesh every year, covering their full yearly costs: education, food, clothing and daily necessities." },
      { icon: "grow", title: "Support more each year", body: "As our fund grows, support more children each year." },
      { icon: "clothes", title: "Keep people warm", body: "Every winter, provide warm clothes, blankets and other essentials for homeless people." },
    ],
  },
  funding: {
    eyebrow: "How we fund it",
    headline: "Where the money comes from.",
    items: [
      { title: "2% of our revenue", body: "Websy Lime sets aside 2% of our revenue for this initiative, and we do as much as we can with it." },
      { title: "No public fundraising", body: "We are a for-profit company, not a nonprofit, so we don't run public fundraising. The only contributions we accept come from our existing clients who choose to be part of it. All contributions are voluntary and are not tax-deductible." },
      { title: "You can see it", body: "We share updates, receipts and photos of the work, so everyone can see where the money goes." },
    ],
    note: "To protect the children, we don't show their faces or names.",
  },
  recordSection: {
    eyebrow: "Our giving record",
    headline: "What we've given.",
    subheadline: "Every donation, with its date and amount.",
    totalLabel: "Given so far",
    countLabel: "Donations",
    empty: {
      title: "Our first report is on its way.",
      body: "When we make a donation, it goes here with the date, the amount and a photo or receipt. If it isn't here, we don't claim it.",
    },
  },
  cta: {
    title: "Grow your business. Help someone else.",
    body: "Every project we take on helps fund this work.",
    label: "Start a project",
    href: "/start-project",
  },
};
