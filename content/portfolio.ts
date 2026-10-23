/**
 * Website portfolio — one entry per client website. Graphic design work lives
 * separately in content/design-portfolio.ts. Feeds the homepage strip and,
 * later, the Work page and case studies (can move to a CMS later).
 * Screenshots live in public/work/ (1170×630 WebP).
 * TODO.md: fill in each [Category] (e.g. Plumbing, Coaching, Local Business).
 */

export type PortfolioItem = {
  name: string;
  slug: string;
  image: string;
  category: string;
  url?: string;
};

export const portfolio: PortfolioItem[] = [
  { name: "Alpine Online", slug: "alpine-online", image: "/work/alpine-online.webp", category: "[Category]" },
  { name: "alshawa law", slug: "alshawa-law", image: "/work/alshawa-law.webp", category: "[Category]" },
  { name: "anchor conzult", slug: "anchor-conzult", image: "/work/anchor-conzult.webp", category: "[Category]" },
  { name: "Baffo Properties", slug: "baffo-properties", image: "/work/baffo-properties.webp", category: "[Category]" },
  { name: "BroSis Therapy", slug: "brosis-therapy", image: "/work/brosis-therapy.webp", category: "[Category]" },
  { name: "DYLAN PARRY", slug: "dylan-parry", image: "/work/dylan-parry.webp", category: "[Category]" },
  { name: "Flowzuk Ltd", slug: "flowzuk-ltd", image: "/work/flowzuk-ltd.webp", category: "[Category]" },
  { name: "FourthWall Agency", slug: "fourthwall-agency", image: "/work/fourthwall-agency.webp", category: "[Category]" },
  { name: "funeral celebranten", slug: "funeral-celebranten", image: "/work/funeral-celebranten.webp", category: "[Category]" },
  { name: "GH Chiropractic", slug: "gh-chiropractic", image: "/work/gh-chiropractic.webp", category: "[Category]" },
  { name: "Ghelectrical", slug: "ghelectrical", image: "/work/ghelectrical.webp", category: "[Category]" },
  { name: "GT Mining Ltd", slug: "gt-mining-ltd", image: "/work/gt-mining-ltd.webp", category: "[Category]" },
  { name: "Hallmark Contractors", slug: "hallmark-contractors", image: "/work/hallmark-contractors.webp", category: "[Category]" },
  { name: "Hello Scaleup", slug: "hello-scaleup", image: "/work/hello-scaleup.webp", category: "[Category]" },
  { name: "HGC Fine Art", slug: "hgc-fine-art", image: "/work/hgc-fine-art.webp", category: "[Category]" },
  { name: "Home-School Tutoring", slug: "home-school-tutoring", image: "/work/home-school-tutoring.webp", category: "[Category]" },
  { name: "Hunsea Shipping", slug: "hunsea-shipping", image: "/work/hunsea-shipping.webp", category: "[Category]" },
  { name: "Law Sparks", slug: "law-sparks", image: "/work/law-sparks.webp", category: "[Category]" },
  { name: "Lisa Larizadeh Pilates", slug: "lisa-larizadeh-pilates", image: "/work/lisa-larizadeh-pilates.webp", category: "[Category]" },
  { name: "Lyanne Pudney", slug: "lyanne-pudney", image: "/work/lyanne-pudney.webp", category: "[Category]" },
  { name: "Lynch Property Services", slug: "lynch-property-services", image: "/work/lynch-property-services.webp", category: "[Category]" },
  { name: "MACHADO ADVISORY PARTNERS", slug: "machado-advisory-partners", image: "/work/machado-advisory-partners.webp", category: "[Category]" },
  { name: "mañjarī reiki", slug: "manjari-reiki", image: "/work/manjari-reiki.webp", category: "[Category]" },
  { name: "MechElecPro Solutions Ltd", slug: "mechelecpro-solutions-ltd", image: "/work/mechelecpro-solutions-ltd.webp", category: "[Category]" },
  { name: "Motion Travel UK", slug: "motion-travel-uk", image: "/work/motion-travel-uk.webp", category: "[Category]" },
  { name: "Mrs Housing", slug: "mrs-housing", image: "/work/mrs-housing.webp", category: "[Category]" },
  { name: "New Key Group", slug: "new-key-group", image: "/work/new-key-group.webp", category: "[Category]" },
  { name: "Nourish", slug: "nourish", image: "/work/nourish.webp", category: "[Category]" },
  { name: "Powell Spencer & Partners", slug: "powell-spencer-and-partners", image: "/work/powell-spencer-and-partners.webp", category: "[Category]" },
  { name: "PSSM", slug: "pssm", image: "/work/pssm.webp", category: "[Category]" },
  { name: "Putting Data to Work", slug: "putting-data-to-work", image: "/work/putting-data-to-work.webp", category: "[Category]" },
  { name: "Red Rose Care", slug: "red-rose-care", image: "/work/red-rose-care.webp", category: "[Category]" },
  { name: "Reliable Renewables Heat Pump Servicing Ltd", slug: "reliable-renewables-heat-pump-servicing-ltd", image: "/work/reliable-renewables-heat-pump-servicing-ltd.webp", category: "[Category]" },
  { name: "S L Newman Grab Hire", slug: "s-l-newman-grab-hire", image: "/work/s-l-newman-grab-hire.webp", category: "[Category]" },
  { name: "Saucy Grills Ltd", slug: "saucy-grills-ltd", image: "/work/saucy-grills-ltd.webp", category: "[Category]" },
  { name: "SCOTWOOD", slug: "scotwood", image: "/work/scotwood.webp", category: "[Category]" },
  { name: "SeeShell Therapy", slug: "seeshell-therapy", image: "/work/seeshell-therapy.webp", category: "[Category]" },
  { name: "Sole Flooring London", slug: "sole-flooring-london", image: "/work/sole-flooring-london.webp", category: "[Category]" },
  { name: "Stay Property Management", slug: "stay-property-management", image: "/work/stay-property-management.webp", category: "[Category]" },
  { name: "STS Gates", slug: "sts-gates", image: "/work/sts-gates.webp", category: "[Category]" },
  { name: "TEOM AI", slug: "teom-ai", image: "/work/teom-ai.webp", category: "[Category]" },
  { name: "TFO Medical", slug: "tfo-medical", image: "/work/tfo-medical.webp", category: "[Category]" },
  { name: "The International Tiswa", slug: "the-international-tiswa", image: "/work/the-international-tiswa.webp", category: "[Category]" },
  { name: "The Kitesurf Academy", slug: "the-kitesurf-academy", image: "/work/the-kitesurf-academy.webp", category: "[Category]" },
  { name: "tideandtail", slug: "tideandtail", image: "/work/tideandtail.webp", category: "[Category]" },
  { name: "TNT Enaergy", slug: "tnt-enaergy", image: "/work/tnt-enaergy.webp", category: "[Category]" },
  { name: "Tommy Talks Therapy", slug: "tommy-talks-therapy", image: "/work/tommy-talks-therapy.webp", category: "[Category]" },
  { name: "Virtuousearthsolution", slug: "virtuousearthsolution", image: "/work/virtuousearthsolution.webp", category: "[Category]" },
  { name: "WATFORD ACTUALLY", slug: "watford-actually", image: "/work/watford-actually.webp", category: "[Category]" },
  { name: "White Horse Drones", slug: "white-horse-drones", image: "/work/white-horse-drones.webp", category: "[Category]" },
];
