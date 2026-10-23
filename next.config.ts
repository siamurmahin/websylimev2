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
  },
  partialPrefetching: true,
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
