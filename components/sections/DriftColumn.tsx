"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

/**
 * One drifting column of site screenshots (decorative). The loop needs every image
 * twice; the second set is added in the browser only, so the server HTML stays
 * half the size for search engines and AI agents. Motion starts with the copy.
 */
export function DriftColumn({ images, anim, duration }: { images: { key: string; src: string }[]; anim: string; duration: string }) {
  const [looped, setLooped] = useState(false);
  // eslint-disable-next-line react-hooks/set-state-in-effect -- add the loop copy once, after hydration
  useEffect(() => setLooped(true), []);
  const list = looped ? [...images, ...images] : images;
  return (
    <div className={cn("flex flex-col gap-4 motion-reduce:animate-none", looped && anim)} style={{ ["--column-duration" as string]: duration }}>
      {list.map((p, k) => (
        <div key={`${p.key}-${k}`} className="relative aspect-[1170/630] overflow-hidden rounded-xl border border-white/10 bg-white/5 shadow-[0_20px_40px_-20px_rgb(0_0_0/0.6)]">
          <Image src={p.src} alt="" fill sizes="(min-width: 1024px) 220px, (min-width: 640px) 30vw, 45vw" className="object-cover object-top" />
        </div>
      ))}
    </div>
  );
}
