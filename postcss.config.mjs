// Tailwind CSS v4 through PostCSS. Works with both bundlers:
// `next dev` (Turbopack) and `next build --webpack` (used for Hostinger, whose
// build servers can't start the extra Node process Turbopack's CSS loader needs).
const config = {
  plugins: {
    "@tailwindcss/postcss": {},
  },
};

export default config;
