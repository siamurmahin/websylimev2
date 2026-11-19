import { readFile } from "node:fs/promises";
import { join } from "node:path";

// Shared by the social preview images (app/**/opengraph-image.tsx)

/** Inter Bold (the site's heading font) from Google Fonts. `null` → built-in font. */
export async function loadInterBold(text: string): Promise<ArrayBuffer | null> {
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

export async function dataUrl(publicPath: string, type: string) {
  const file = await readFile(join(process.cwd(), "public", publicPath));
  return `data:${type};base64,${file.toString("base64")}`;
}
