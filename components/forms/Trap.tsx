import { site } from "@/content/site";

const email = site.footer.contact.email;

/** Hidden field people never see or fill in. Bots usually do, so the server drops those. */
export function Trap({ ref }: { ref: React.Ref<HTMLInputElement> }) {
  return (
    <input
      ref={ref}
      type="text"
      name="website_url"
      tabIndex={-1}
      autoComplete="off"
      aria-hidden
      className="pointer-events-none absolute -left-[9999px] h-px w-px opacity-0"
    />
  );
}

/** Shown under a form when sending fails. */
export function SendError({ show }: { show: boolean }) {
  if (!show) return null;
  return (
    <p role="alert" className="mt-3 text-sm font-medium text-rose-600 dark:text-rose-400">
      Sorry, that didn&apos;t send. Please try again, or email us at{" "}
      <a href={`mailto:${email}`} className="underline underline-offset-4">
        {email}
      </a>
      .
    </p>
  );
}
