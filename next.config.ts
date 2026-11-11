import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  cacheComponents: true,
  images: {
    // AVIF is ~20–30% smaller than WebP; browsers without it get WebP
    formats: ["image/avif", "image/webp"],
    // Required allowlist in Next 16: 75 = default, 90 = large hero photos
    // (so big photos never look soft or blocky on high-DPI screens)
    qualities: [75, 90],
    // Fewer widths = shorter srcset lists = a much smaller HTML page (AI agents pay per token).
    // 2560 and 3840 stay so full-width photos are sharp on 2x/3x screens.
    deviceSizes: [640, 828, 1200, 1920, 2560, 3840],
    imageSizes: [32, 48, 96, 256, 384],
  },
  partialPrefetching: true,
  // Case studies moved into the Work page
  async redirects() {
    return [
      // One address for search engines: websylime.com → www.websylime.com
      {
        source: "/:path*",
        has: [{ type: "host", value: "websylime.com" }],
        destination: "https://www.websylime.com/:path*",
        permanent: true,
      },
      { source: "/case-studies", destination: "/work", permanent: true },
      { source: "/case-studies/:slug", destination: "/work/:slug", permanent: true },
      // Old site: blog posts we didn't carry over, and tag pages
      { source: "/blog/tag/:tag", destination: "/blog", permanent: true },
      { source: "/blog/wix-security-how-safe", destination: "/blog/wordpress-security-protect-from-hackers", permanent: true },
      { source: "/blog/wix-store-online-shop-guide", destination: "/blog/woocommerce-vs-shopify-2026", permanent: true },
      { source: "/blog/outsource-wordpress-development", destination: "/services/website-design", permanent: true },
      { source: "/blog/white-label-web-development", destination: "/services/website-design", permanent: true },
      { source: "/blog/white-label-web-development-us-uk-agencies", destination: "/services/website-design", permanent: true },
      { source: "/blog/wordpress-maintenance-for-agencies", destination: "/services/website-design", permanent: true },
      // Old site: other pages
      { source: "/portfolios", destination: "/work", permanent: true },
      { source: "/team", destination: "/about", permanent: true },
      { source: "/testimonials", destination: "/about", permanent: true },
      { source: "/services", destination: "/services/website-design", permanent: true },
      { source: "/services/wordpress-development", destination: "/services/website-design", permanent: true },
      { source: "/services/wix-website-design", destination: "/services/website-design", permanent: true },
      { source: "/services/hosting", destination: "/services/website-design", permanent: true },
      { source: "/services/maintenance", destination: "/services/growth", permanent: true },
      { source: "/agencies", destination: "/", permanent: true },
      { source: "/toolkit", destination: "/blog", permanent: true },
    ];
  },
};

export default nextConfig;
