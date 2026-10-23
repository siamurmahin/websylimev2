import { ImageResponse } from "next/og";
import { site } from "@/content/site";

// Social preview image (Open Graph + Twitter fall back to it). Generated at
// build time and cached; Next adds the og:image tags automatically.
export const alt = site.meta.og.alt;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const LIME = "#c6f24e";
const INK = "#0b0d09";

/** Inter Bold (the site's heading font) from Google Fonts. `null` → built-in font. */
async function loadInterBold(text: string): Promise<ArrayBuffer | null> {
  try {
    const css = await (
      await fetch(`https://fonts.googleapis.com/css2?family=Inter:wght@700&text=${encodeURIComponent(text)}`)
    ).text();
    const url = css.match(/src: url\((.+?)\) format\('(?:opentype|truetype)'\)/)?.[1];
    if (!url) return null;
    const res = await fetch(url);
    return res.ok ? await res.arrayBuffer() : null;
  } catch {
    return null;
  }
}

export default async function OpengraphImage() {
  const { eyebrow, headline, footer } = site.meta.og;
  const { first, second } = site.brand.wordmark;
  const domain = site.meta.url.replace(/^https?:\/\//, "");
  const bold = await loadInterBold(eyebrow + headline + footer + first + second + domain + "→");

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "72px 80px",
          background: INK,
          color: "#ffffff",
          fontFamily: bold ? "Inter" : undefined,
          position: "relative",
        }}
      >
        {/* lime glow (SVG gradient: satori's CSS radial-gradient support is partial) */}
        <svg width="1200" height="630" viewBox="0 0 1200 630" style={{ position: "absolute", top: 0, left: 0 }}>
          <defs>
            <radialGradient id="glow" cx="1020" cy="90" r="520" gradientUnits="userSpaceOnUse">
              <stop offset="0" stopColor={LIME} stopOpacity="0.3" />
              <stop offset="1" stopColor={LIME} stopOpacity="0" />
            </radialGradient>
          </defs>
          <rect width="1200" height="630" fill="url(#glow)" />
        </svg>

        {/* logo */}
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <div
            style={{
              width: 52,
              height: 52,
              borderRadius: 15,
              background: LIME,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <svg width="30" height="30" viewBox="0 0 24 24" fill={INK}>
              <path d="M12 2c5.5 0 10 4.5 10 10 0 5-3.7 9.2-8.6 9.9.4-4.4-1.2-8.2-4.6-11.1 3.6 1.4 6 4.2 7 8 .9-1.8 1.3-3.8 1.1-5.9C16.4 8 13 4.6 8 3.4 9.3 2.5 10.6 2 12 2Z" />
            </svg>
          </div>
          <div style={{ display: "flex", fontSize: 38, letterSpacing: -1 }}>
            <span>{first}</span>
            <span style={{ color: LIME }}>{second}</span>
          </div>
        </div>

        {/* message */}
        <div style={{ display: "flex", flexDirection: "column", gap: 28 }}>
          <div
            style={{
              display: "flex",
              alignSelf: "flex-start",
              padding: "10px 22px",
              borderRadius: 9999,
              border: "1px solid rgba(255,255,255,0.18)",
              background: "rgba(255,255,255,0.06)",
              fontSize: 26,
              color: "rgba(255,255,255,0.8)",
            }}
          >
            {eyebrow}
          </div>
          <div style={{ display: "flex", fontSize: 84, lineHeight: 1.02, letterSpacing: -3.5, maxWidth: 960 }}>
            {headline}
          </div>
        </div>

        {/* footer row */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", fontSize: 28 }}>
          <span style={{ color: "rgba(255,255,255,0.65)" }}>{footer}</span>
          <span
            style={{
              display: "flex",
              padding: "12px 26px",
              borderRadius: 9999,
              background: LIME,
              color: INK,
            }}
          >
            {domain} →
          </span>
        </div>
      </div>
    ),
    {
      ...size,
      fonts: bold ? [{ name: "Inter", data: bold, weight: 700, style: "normal" }] : undefined,
    },
  );
}
