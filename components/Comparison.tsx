import { COMPARE } from "@/lib/content";
import Reveal from "./Reveal";
import { Tick } from "./ui";

export default function Comparison() {
  return (
    <section aria-labelledby="compare-title" className="border-y border-line bg-white">
      <div className="container-page section-y flex flex-col gap-10">
        <div className="flex max-w-[820px] flex-col gap-5">
          <Reveal as="h2" id="compare-title" className="h2">
            {COMPARE.h2}
          </Reveal>
          <Reveal delay={140}>
            <p className="lead max-w-[62ch]">{COMPARE.sub}</p>
          </Reveal>
        </div>

        <Reveal amount={0.1} className="overflow-x-auto">
          <table className="w-full min-w-[640px] border-separate border-spacing-0 text-[16px]">
            <thead>
              <tr>
                <th className="label border-b border-line px-4 py-[14px] text-left font-semibold">
                  <span className="sr-only">{COMPARE.rowHeader}</span>
                </th>
                <th
                  scope="col"
                  className="rounded-t-[16px] border-b border-line bg-lime-tint px-4 py-[14px] text-left text-[18px] font-bold"
                >
                  {COMPARE.cols[0]}
                </th>
                {COMPARE.cols.slice(1).map((c) => (
                  <th
                    key={c}
                    scope="col"
                    className="border-b border-line px-4 py-[14px] text-left font-semibold text-muted"
                  >
                    {c}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {COMPARE.rows.map((r) => (
                <tr key={r.k}>
                  <th
                    scope="row"
                    className="border-b border-paper px-4 py-[14px] text-left font-normal text-muted"
                  >
                    {r.k}
                  </th>
                  <td className="border-b border-paper bg-lime-tint px-4 py-[14px] font-semibold">
                    <span className="flex items-center gap-2">
                      {r.check ? <Tick size={18} /> : null}
                      {r.a}
                    </span>
                  </td>
                  <td className="border-b border-paper px-4 py-[14px] text-muted">{r.b}</td>
                  <td className="border-b border-paper px-4 py-[14px] text-muted">{r.c}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </Reveal>
      </div>
    </section>
  );
}
