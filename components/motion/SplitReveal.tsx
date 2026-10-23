import { cn } from "@/lib/utils";

type Props = {
  text: string;
  /** Word(s) from `text` that get the lime marker highlight */
  accent?: string;
  className?: string;
  delay?: number;
  stagger?: number;
};

/*
 * Hero entrance animations. Pure CSS (keyframes in globals.css) so they start
 * on the very first paint instead of waiting for JavaScript to load — the
 * headline is the page's Largest Contentful Paint, so this keeps it fast on
 * slow phones. `animation-fill-mode: both` holds the start state during the
 * delay; reduced motion skips the animation entirely (globals.css).
 */

/**
 * Letter-by-letter headline reveal. Each word is its own clip box so lines
 * never break mid-word; screen readers get the plain text via aria-label.
 */
export function SplitReveal({ text, accent, className, delay = 0, stagger = 0.018 }: Props) {
  const accentWords = new Set(accent?.split(" ") ?? []);
  const words = text.split(" ");
  const total = text.replace(/ /g, "").length;

  let index = 0;

  return (
    <h1 className={className} aria-label={text}>
      {words.map((word, wi) => {
        const chars = Array.from(word).map((char) => {
          const i = index++;
          return (
            <span
              key={i}
              className="inline-block animate-enter-rise will-change-transform"
              style={{ animationDelay: `${delay + i * stagger}s` }}
            >
              {char}
            </span>
          );
        });

        const clip = (
          <span className="-mb-[0.12em] inline-block overflow-hidden pb-[0.12em] align-bottom whitespace-nowrap">
            {chars}
          </span>
        );

        return (
          <span key={wi} aria-hidden>
            {accentWords.has(word) ? (
              <span className="relative isolate inline-block text-ink">
                <span
                  className="absolute inset-x-[-0.08em] top-[0.12em] bottom-[0.02em] -z-10 origin-left animate-enter-mark rounded-[0.18em] bg-lime"
                  style={{ animationDelay: `${delay + total * stagger + 0.15}s` }}
                />
                {clip}
              </span>
            ) : (
              clip
            )}
            {wi < words.length - 1 && " "}
          </span>
        );
      })}
    </h1>
  );
}

export function FadeUp({
  children,
  delay = 0,
  className,
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  return (
    <div className={cn("animate-enter-up", className)} style={delay ? { animationDelay: `${delay}s` } : undefined}>
      {children}
    </div>
  );
}
