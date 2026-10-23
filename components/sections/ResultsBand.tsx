// Previous Results design (lime band). Kept to switch back: use <ResultsBand /> in app/page.tsx.
import { site } from "@/content/site";
import { StatValue } from "@/components/StatValue";
import { StaggerReveal } from "@/components/motion/StaggerReveal";
import { Copy } from "@/lib/copy";

export function ResultsBand() {
  const { eyebrow, headline, stats } = site.home.results;

  return (
    <section id="results" aria-labelledby="results-title" className="relative py-10 sm:py-14">
      <StaggerReveal className="container-site">
        <div className="relative isolate overflow-hidden rounded-[2rem] bg-lime px-6 py-12 text-ink sm:rounded-[2.5rem] sm:px-12 sm:py-16 lg:px-16 lg:py-20 [&_.placeholder-mark]:bg-white/45 [&_.placeholder-mark]:text-ink [&_.placeholder-mark]:outline-ink/40">
          {/* dotted texture + soft light */}
          <div
            aria-hidden
            className="absolute inset-0 -z-10 bg-[radial-gradient(rgb(11_13_9/0.12)_1px,transparent_1px)] [mask-image:linear-gradient(to_bottom,black,transparent_85%)] bg-[size:18px_18px]"
          />
          <div aria-hidden className="absolute -top-32 -right-24 -z-10 size-96 rounded-full bg-white/40 blur-3xl" />

          <div className="max-w-2xl">
            <p
              data-reveal
              className="inline-flex items-center gap-2 rounded-full border border-ink/15 bg-white/30 px-3.5 py-1.5 text-sm font-semibold"
            >
              <span aria-hidden className="size-1.5 rounded-full bg-ink" />
              {eyebrow}
            </p>
            <h2
              id="results-title"
              data-reveal
              className="mt-5 font-display text-[clamp(2.25rem,5vw,4rem)] leading-[1.02] font-bold tracking-[-0.04em]"
            >
              {headline}
            </h2>
          </div>

          <dl className="mt-12 grid grid-cols-1 gap-x-8 gap-y-10 sm:mt-16 sm:grid-cols-2 lg:grid-cols-4">
            {stats.map((stat) => (
              <div key={stat.label} data-reveal className="border-t border-ink/20 pt-6">
                <dt className="sr-only">{stat.label}</dt>
                <dd>
                  <span className="block font-display text-[clamp(2.5rem,4.3vw,3.75rem)] leading-none font-bold tracking-[-0.045em]">
                    <StatValue value={stat.value} count={stat.count} />
                  </span>
                  <span className="mt-3 block text-base font-medium text-ink/70">
                    <Copy text={stat.label} />
                  </span>
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </StaggerReveal>
    </section>
  );
}
