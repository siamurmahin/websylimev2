/**
 * Websy Lime v2 — site content, assembled from small files.
 *
 * Don't write copy here. Each page / section has its own file:
 *   content/shared/   header, footer, brand, meta (used on every page)
 *   content/home/     one file per homepage section
 *   content/services/ one file per service page
 *   content/pages/    other pages (Start Project, 404 …)
 *   content/portfolio.ts, testimonials.ts, design-portfolio.ts — lists
 * See CONTENT.md for how to edit and add things.
 */

import { meta } from "@/content/shared/meta";
import { brand } from "@/content/shared/brand";
import { header } from "@/content/shared/header";
import { hero } from "@/content/home/hero";
import { portfolioStrip } from "@/content/home/portfolio-strip";
import { trustBar } from "@/content/home/trust-bar";
import { painPoints } from "@/content/home/pain-points";
import { shift } from "@/content/home/shift";
import { services } from "@/content/home/services";
import { why } from "@/content/home/why";
import { collaboration } from "@/content/home/collaboration";
import { results } from "@/content/home/results";
import { featuredWork } from "@/content/home/featured-work";
import { process as processSection } from "@/content/home/process";
import { testimonials } from "@/content/home/testimonials";
import { pricing } from "@/content/home/pricing";
import { faq } from "@/content/home/faq";
import { finalCta } from "@/content/home/final-cta";
import { websiteDesign } from "@/content/services/website-design";
import { growth } from "@/content/services/growth";
import { graphicDesign } from "@/content/services/graphic-design";
import { videoEditing } from "@/content/services/video-editing";
import { websychat } from "@/content/products/websychat";
import { startProject } from "@/content/pages/start-project";
import { notFound } from "@/content/pages/not-found";
import { bookACall } from "@/content/pages/book-a-call";
import { pricingPage } from "@/content/pages/pricing";
import { work } from "@/content/pages/work";
import { about } from "@/content/pages/about";
import { contact } from "@/content/pages/contact";
import { faqPage } from "@/content/pages/faq";
import { blog } from "@/content/pages/blog";
import { caseStudiesPage } from "@/content/pages/case-studies";
import { careers } from "@/content/pages/careers";
import { legal } from "@/content/pages/legal";
import { footer } from "@/content/shared/footer";

export type * from "@/content/types";

export const site = {
  meta,
  brand,
  header,
  home: { hero, portfolioStrip, trustBar, painPoints, shift, services, why, collaboration, results, featuredWork, process: processSection, testimonials, pricing, faq, finalCta },
  // Service pages. Order per the plan: problem → solution → what you get →
  // packages → case study → FAQ → CTA. Built one section at a time.
  services: { websiteDesign, growth, graphicDesign, videoEditing },
  products: { websychat },
  startProject,
  bookACall,
  pricingPage,
  work,
  about,
  contact,
  faqPage,
  blog,
  caseStudiesPage,
  careers,
  legal,
  notFound,
  footer,
};

export type Site = typeof site;
