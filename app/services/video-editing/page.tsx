import type { Metadata } from "next";
import { site } from "@/content/site";
import { PhotoHero } from "@/components/sections/PhotoHero";
import { VideoNow, VideoWaitlist, VideoWhat } from "@/components/sections/services/video/VideoSections";

const v = site.services.videoEditing;

export const metadata: Metadata = {
  title: v.meta.title,
  description: v.meta.description,
  alternates: { canonical: "/services/video-editing" },
  openGraph: { url: "/services/video-editing", title: `${v.meta.title} · ${site.brand.name}`, description: v.meta.description },
};

/**
 * Video Editing — coming soon. Short on purpose: photo hero → what we'll edit
 * → waitlist (#waitlist) → "need video now?" Market Leader banner.
 * When it launches, add plans + FAQ like the Graphic Design page.
 */
export default function VideoEditingPage() {
  return (
    <main id="main" className="relative">
      <PhotoHero data={v.hero} />
      <VideoWhat />
      <VideoWaitlist />
      <VideoNow />
    </main>
  );
}
