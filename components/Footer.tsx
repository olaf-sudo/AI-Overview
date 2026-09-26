import { FOOTER } from "@/lib/content";

/** Alleen een klein tekstje onder de slotkaart: links, KvK/btw en de disclaimer. */
export default function Footer() {
  return (
    <footer className="container-page flex flex-col items-center gap-2 pb-10 text-center text-[13px] leading-[1.5] text-muted">
      <div className="flex flex-wrap justify-center gap-x-4 gap-y-1">
        {FOOTER.links.map((l) => (
          <a key={l.label} href={l.href} className="text-ink">
            {l.label}
          </a>
        ))}
        <span>{FOOTER.kvk}</span>
        <span>{FOOTER.vat}</span>
      </div>
      <p className="m-0 max-w-[70ch] text-pretty">{FOOTER.claim}</p>
    </footer>
  );
}
