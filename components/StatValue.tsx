import { CountUp } from "@/components/motion/CountUp";
import { Copy } from "@/lib/copy";

const NUMBER = /^(.*?)(\[?)(\d[\d,]*)(\]?)(.*)$/;

/**
 * Renders a stat like "[800]+" or "90%": the number counts up on scroll, a
 * [placeholder] stays visibly marked, leading words ("Since") sit small.
 * `count: false` shows the value as-is (e.g. a year).
 */
export function StatValue({ value, count = true }: { value: string; count?: boolean }) {
  const m = value.match(NUMBER);
  if (!m) return <Copy text={value} />;

  const [, before, open, digits, close, after] = m;
  const prefix = before.trim() && (
    <span className="mr-2 align-[0.55em] text-[0.32em] font-semibold tracking-normal">{before.trim()}</span>
  );

  if (!count) {
    return (
      <span className="whitespace-nowrap">
        {prefix}
        <Copy text={`${open}${digits}${close}${after}`} />
      </span>
    );
  }

  const counter = <CountUp to={Number(digits.replace(/,/g, ""))} />;

  return (
    <span className="whitespace-nowrap">
      {prefix}
      {open && close ? (
        <span className="placeholder-mark" title="Placeholder — see TODO.md">
          [{counter}]
        </span>
      ) : (
        counter
      )}
      <Copy text={after} />
    </span>
  );
}
