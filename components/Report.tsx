import { AIS, REPORT } from "@/lib/content";
import Reveal from "./Reveal";
import { AiLogo, Cross, Tick } from "./ui";

export default function Report() {
  return (
    <section aria-labelledby="report-title" className="cv-auto border-y border-line bg-white">
      <div className="container-page section-y flex flex-col items-center gap-10">
        <div className="flex max-w-[820px] flex-col items-center gap-5 text-center">
          <Reveal as="h2" id="report-title" className="h2">
            {REPORT.h2}
          </Reveal>
          <Reveal>
            <p className="lead max-w-[62ch]">{REPORT.sub}</p>
          </Reveal>
        </div>

        <Reveal
          className="ui-font w-full max-w-[960px] overflow-hidden rounded-[20px] border border-line bg-beige"
        >
          {/* Topbalk van het venster */}
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-line bg-white px-[18px] py-3">
            <div className="flex items-center gap-2">
              <span className="size-[10px] rounded-full bg-line" />
              <span className="size-[10px] rounded-full bg-line" />
              <span className="size-[10px] rounded-full bg-line" />
              <span className="num ml-3 text-[12px] text-muted">{REPORT.window}</span>
            </div>
            <span className="num inline-flex items-center gap-2 text-[12px] uppercase text-ink">
              <span className="size-2 rounded-full bg-lime" />
              {REPORT.status}
            </span>
          </div>

          {/* Tabel, horizontaal scrollbaar binnen het venster */}
          <div className="p-5">
            <div className="overflow-x-auto rounded-[14px] border border-line bg-white">
              <table className="w-full min-w-[520px] table-fixed border-separate border-spacing-0 text-[14px]">
                <caption className="sr-only">{REPORT.caption}</caption>
                <thead>
                  <tr>
                    <th className="num border-b border-line px-4 py-[10px] text-left text-[11px] font-normal uppercase tracking-[0.04em] text-muted">
                      {REPORT.colQuestion}
                    </th>
                    {AIS.map((ai) => (
                      <th
                        key={ai.key}
                        scope="col"
                        className="num w-24 border-b border-line px-2 py-[10px] text-[11px] font-normal uppercase tracking-[0.04em] text-muted"
                      >
                        <span className="flex items-center justify-center gap-[6px]">
                          <AiLogo ai={ai} size={14} alt="" />
                          {ai.short}
                        </span>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {REPORT.rows.map((r) => (
                    <tr key={r.q}>
                      <th
                        scope="row"
                        className="truncate border-b border-paper px-4 py-[13px] text-left font-normal"
                      >
                        {r.q}
                      </th>
                      {r.ai.map((v, i) => (
                        <td key={AIS[i].key} className="border-b border-paper px-2 py-[13px]">
                          <span className="flex justify-center">
                            {v ? <Tick size={20} /> : <Cross size={20} />}
                            <span className="sr-only">
                              {v ? REPORT.mentioned : REPORT.notMentioned} in {AIS[i].name}
                            </span>
                          </span>
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </Reveal>

        <Reveal className="flex">
          <a href="#check" className="btn btn-blue px-[22px] py-[14px] text-[16px]">
            {REPORT.cta}
          </a>
        </Reveal>
      </div>
    </section>
  );
}
