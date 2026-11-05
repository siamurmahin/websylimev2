/**
 * Website portfolio: one entry per client website. Graphic design work lives
 * separately in content/design-portfolio.ts. Feeds the homepage, Work page and
 * case studies. Screenshots live in public/work/ (1170×630 WebP).
 *
 * SEO rule: no client names here (or in image file names). We rank for the
 * industry, never for the client. The private list is content/case-study-clients.md.
 */

export type PortfolioItem = {
  /** What the client does, without their name */
  label: string;
  slug: string;
  image: string;
  category: string;
  hasStudy: boolean;
};

/** Our main audience: shown first on the Work page and first in its filter. */
export const FOCUS_CATEGORY = "Home services";

export const portfolio: PortfolioItem[] = [
  { label: "Data analytics consultancy", slug: "data-analytics-consultancy-website-design", image: "/work/data-analytics-consultancy-website-design.webp", category: "Consulting & tech", hasStudy: true },
  { label: "Corporate law firm", slug: "corporate-law-firm-website-design", image: "/work/corporate-law-firm-website-design.webp", category: "Legal & finance", hasStudy: true },
  { label: "Recruitment & HR consultancy", slug: "recruitment-agency-website-design", image: "/work/recruitment-agency-website-design.webp", category: "Consulting & tech", hasStudy: true },
  { label: "Property management company", slug: "property-management-company-website-design", image: "/work/property-management-company-website-design.webp", category: "Property", hasStudy: true },
  { label: "Therapist directory", slug: "therapist-directory-website-design", image: "/work/therapist-directory-website-design.webp", category: "Health & wellness", hasStudy: true },
  { label: "Brand & UX copywriter", slug: "copywriter-portfolio-website-design", image: "/work/copywriter-portfolio-website-design.webp", category: "Creative & media", hasStudy: true },
  { label: "Health supplement brand", slug: "supplement-store-website-design", image: "/work/supplement-store-website-design.webp", category: "Online stores", hasStudy: true },
  { label: "Employer branding agency", slug: "employer-branding-agency-website-design", image: "/work/employer-branding-agency-website-design.webp", category: "Creative & media", hasStudy: false },
  { label: "Funeral celebrant", slug: "funeral-celebrant-website-design", image: "/work/funeral-celebrant-website-design.webp", category: "Local services", hasStudy: true },
  { label: "Chiropractic clinic", slug: "chiropractor-website-design", image: "/work/chiropractor-website-design.webp", category: "Health & wellness", hasStudy: true },
  { label: "Electrical supplies store", slug: "electrical-supplies-online-store-design", image: "/work/electrical-supplies-online-store-design.webp", category: "Online stores", hasStudy: true },
  { label: "Mining consultancy", slug: "mining-consultancy-website-design", image: "/work/mining-consultancy-website-design.webp", category: "Industry & logistics", hasStudy: true },
  { label: "Home renovation contractor", slug: "home-renovation-contractor-website-design", image: "/work/home-renovation-contractor-website-design.webp", category: "Home services", hasStudy: true },
  { label: "Fractional CMO & growth advisory", slug: "fractional-cmo-website-design", image: "/work/fractional-cmo-website-design.webp", category: "Consulting & tech", hasStudy: true },
  { label: "Contemporary art dealer", slug: "art-dealer-website-design", image: "/work/art-dealer-website-design.webp", category: "Creative & media", hasStudy: true },
  { label: "Private & SEND tutoring company", slug: "tutoring-company-website-design", image: "/work/tutoring-company-website-design.webp", category: "Local services", hasStudy: true },
  { label: "Ship management company", slug: "ship-management-company-website-design", image: "/work/ship-management-company-website-design.webp", category: "Industry & logistics", hasStudy: true },
  { label: "Legal technology consultancy", slug: "legal-tech-consultancy-website-design", image: "/work/legal-tech-consultancy-website-design.webp", category: "Legal & finance", hasStudy: true },
  { label: "Private Pilates studio", slug: "pilates-studio-website-design", image: "/work/pilates-studio-website-design.webp", category: "Health & wellness", hasStudy: true },
  { label: "EMDR psychotherapist", slug: "psychotherapist-website-design", image: "/work/psychotherapist-website-design.webp", category: "Health & wellness", hasStudy: true },
  { label: "Property inspection company", slug: "property-inspection-company-website-design", image: "/work/property-inspection-company-website-design.webp", category: "Property", hasStudy: true },
  { label: "Investment banking & M&A advisory", slug: "investment-banking-advisory-website-design", image: "/work/investment-banking-advisory-website-design.webp", category: "Legal & finance", hasStudy: true },
  { label: "Reiki practitioner", slug: "reiki-practitioner-website-design", image: "/work/reiki-practitioner-website-design.webp", category: "Health & wellness", hasStudy: true },
  { label: "Industrial engineering company", slug: "industrial-engineering-company-website-design", image: "/work/industrial-engineering-company-website-design.webp", category: "Industry & logistics", hasStudy: true },
  { label: "Luxury travel agency", slug: "luxury-travel-agency-website-design", image: "/work/luxury-travel-agency-website-design.webp", category: "Local services", hasStudy: true },
  { label: "Expat housing advisor", slug: "relocation-housing-advisor-website-design", image: "/work/relocation-housing-advisor-website-design.webp", category: "Property", hasStudy: true },
  { label: "Luxury construction company", slug: "luxury-construction-company-website-design", image: "/work/luxury-construction-company-website-design.webp", category: "Home services", hasStudy: true },
  { label: "Yoga & meditation teacher", slug: "yoga-studio-website-design", image: "/work/yoga-studio-website-design.webp", category: "Health & wellness", hasStudy: true },
  { label: "Criminal & family law firm", slug: "criminal-family-law-firm-website-design", image: "/work/criminal-family-law-firm-website-design.webp", category: "Legal & finance", hasStudy: true },
  { label: "Driving school", slug: "driving-school-website-design", image: "/work/driving-school-website-design.webp", category: "Local services", hasStudy: true },
  { label: "Data strategy consultancy", slug: "data-strategy-consultant-website-design", image: "/work/data-strategy-consultant-website-design.webp", category: "Consulting & tech", hasStudy: true },
  { label: "Care provider", slug: "care-provider-website-design", image: "/work/care-provider-website-design.webp", category: "Health & wellness", hasStudy: false },
  { label: "Heat pump service company", slug: "heat-pump-company-website-design", image: "/work/heat-pump-company-website-design.webp", category: "Home services", hasStudy: true },
  { label: "Grab hire & aggregates company", slug: "grab-hire-company-website-design", image: "/work/grab-hire-company-website-design.webp", category: "Home services", hasStudy: true },
  { label: "Custom food trailer builder", slug: "food-trailer-builder-website-design", image: "/work/food-trailer-builder-website-design.webp", category: "Local services", hasStudy: true },
  { label: "Office fit-out company", slug: "office-fit-out-company-website-design", image: "/work/office-fit-out-company-website-design.webp", category: "Home services", hasStudy: true },
  { label: "Grief coach", slug: "grief-coach-website-design", image: "/work/grief-coach-website-design.webp", category: "Health & wellness", hasStudy: true },
  { label: "Bespoke flooring company", slug: "flooring-company-website-design", image: "/work/flooring-company-website-design.webp", category: "Home services", hasStudy: true },
  { label: "Lettings & property management company", slug: "lettings-agency-website-design", image: "/work/lettings-agency-website-design.webp", category: "Property", hasStudy: true },
  { label: "Gate & fencing manufacturer", slug: "gate-fencing-company-website-design", image: "/work/gate-fencing-company-website-design.webp", category: "Home services", hasStudy: true },
  { label: "Deep-tech AI startup", slug: "deep-tech-startup-website-design", image: "/work/deep-tech-startup-website-design.webp", category: "Consulting & tech", hasStudy: true },
  { label: "Healthcare recruitment consultancy", slug: "healthcare-recruitment-website-design", image: "/work/healthcare-recruitment-website-design.webp", category: "Consulting & tech", hasStudy: false },
  { label: "Independent social work agency", slug: "social-work-agency-website-design", image: "/work/social-work-agency-website-design.webp", category: "Local services", hasStudy: true },
  { label: "Kitesurf school & gear shop", slug: "kitesurf-school-website-design", image: "/work/kitesurf-school-website-design.webp", category: "Local services", hasStudy: true },
  { label: "Pet & farm supplies store", slug: "pet-supplies-online-store-design", image: "/work/pet-supplies-online-store-design.webp", category: "Online stores", hasStudy: false },
  { label: "Sports nutrition brand", slug: "sports-nutrition-store-website-design", image: "/work/sports-nutrition-store-website-design.webp", category: "Online stores", hasStudy: true },
  { label: "Counseling & therapy practice", slug: "counseling-practice-website-design", image: "/work/counseling-practice-website-design.webp", category: "Health & wellness", hasStudy: true },
  { label: "Sustainable agriculture organization", slug: "sustainable-agriculture-website-design", image: "/work/sustainable-agriculture-website-design.webp", category: "Local services", hasStudy: false },
  { label: "Local media & town guide", slug: "local-media-website-design", image: "/work/local-media-website-design.webp", category: "Creative & media", hasStudy: true },
  { label: "Commercial drone services company", slug: "drone-services-company-website-design", image: "/work/drone-services-company-website-design.webp", category: "Local services", hasStudy: true },
];
