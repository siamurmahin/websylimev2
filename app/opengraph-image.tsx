import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";
import { site } from "@/content/site";

// Social preview image (Open Graph + Twitter fall back to it). Generated at
// build time and cached; Next adds the og:image tags automatically.
// The background photo (AI-generated, no text) is public/brand/og-background.jpg;
// the logo and words are real, placed on top here so they stay sharp and correct.
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

async function dataUrl(publicPath: string, type: string) {
  const file = await readFile(join(process.cwd(), "public", publicPath));
  return `data:${type};base64,${file.toString("base64")}`;
}

export default async function OpengraphImage() {
  const { headline } = site.meta.og;
  const domain = site.meta.url.replace(/^https?:\/\//, "");
  const bold = await loadInterBold(headline + domain);
  // The dark-mode logo, since this image always has a dark background
  const logo = await dataUrl(site.brand.logo.srcDark, "image/png");
  const background = await dataUrl("/brand/og-background.jpg", "image/jpeg");
  const words = headline.split(" ");

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "56px 64px",
          background: INK,
          color: "#ffffff",
          fontFamily: bold ? "Inter" : undefined,
          position: "relative",
        }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element, jsx-a11y/alt-text -- satori needs a plain img */}
        <img src={background} width={1200} height={630} style={{ position: "absolute", top: 0, left: 0 }} />

        {/* eslint-disable-next-line @next/next/no-img-element, jsx-a11y/alt-text -- satori needs a plain img */}
        <img src={logo} width={219} height={72} style={{ display: "flex" }} />

        {/* message: the last word in lime, like the marker on the site heroes */}
        <div style={{ display: "flex", flexWrap: "wrap", columnGap: 17, fontSize: 76, lineHeight: 1.04, letterSpacing: -3.4, maxWidth: 520 }}>
          {words.map((word, i) => (
            <span key={word} style={i === words.length - 1 ? { color: LIME } : undefined}>
              {word}
            </span>
          ))}
        </div>

        {/* footer row */}
        <div style={{ display: "flex", alignItems: "center", gap: 14, fontSize: 22, color: "rgba(255,255,255,0.7)" }}>
          <span style={{ display: "flex", width: 8, height: 8, borderRadius: 9999, background: LIME }} />
          {domain}
        </div>
      </div>
    ),
    {
      ...size,
      fonts: bold ? [{ name: "Inter", data: bold, weight: 700, style: "normal" }] : undefined,
    },
  );
}
