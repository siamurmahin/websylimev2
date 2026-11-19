import { ImageResponse } from "next/og";
import { site } from "@/content/site";
import { tampa } from "@/content/pages/tampa";
import { dataUrl, loadInterBold } from "@/lib/og";

// Social preview for /tampa (when the link is shared in a text or chat).
// Brand colours from the PDF: forest background, lime accent.
export const alt = `${tampa.meta.ogHeadline} · ${site.brand.name}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const FOREST = "#182D01";
const LIME = "#B8DD38";

export default async function OpengraphImage() {
  const { ogHeadline, ogSub } = tampa.meta;
  const code = `Reader code ${tampa.promoCode} · 20% off`;
  const bold = await loadInterBold(ogHeadline + ogSub + code + "websylime.com/tampa");
  const logo = await dataUrl(site.brand.logo.srcDark, "image/png");
  const words = ogHeadline.split(" ");

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
          background: FOREST,
          backgroundImage: `radial-gradient(circle at 85% 10%, rgba(184,221,56,0.28), transparent 45%)`,
          color: "#ffffff",
          fontFamily: bold ? "Inter" : undefined,
        }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element, jsx-a11y/alt-text -- satori needs a plain img */}
        <img src={logo} width={219} height={72} style={{ display: "flex" }} />

        <div style={{ display: "flex", flexDirection: "column", gap: 22 }}>
          {/* last two words in lime */}
          <div style={{ display: "flex", flexWrap: "wrap", columnGap: 20, fontSize: 84, lineHeight: 1.02, letterSpacing: -3.6, maxWidth: 900 }}>
            {words.map((word, i) => (
              <span key={word} style={i >= words.length - 2 ? { color: LIME } : undefined}>
                {word}
              </span>
            ))}
          </div>
          <div style={{ display: "flex", fontSize: 30, color: "rgba(255,255,255,0.75)" }}>{ogSub}</div>
        </div>

        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div
            style={{
              display: "flex",
              padding: "14px 24px",
              borderRadius: 16,
              background: LIME,
              color: FOREST,
              fontSize: 26,
              letterSpacing: 0.5,
            }}
          >
            {code}
          </div>
          <div style={{ display: "flex", fontSize: 24, color: "rgba(255,255,255,0.65)" }}>websylime.com/tampa</div>
        </div>
      </div>
    ),
    {
      ...size,
      fonts: bold ? [{ name: "Inter", data: bold, weight: 700, style: "normal" }] : undefined,
    },
  );
}
