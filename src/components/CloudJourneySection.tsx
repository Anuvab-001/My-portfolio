import { CLOUD_JOURNEY_INTRO, CLOUD_JOURNEY_STAGES } from '../data/portfolio';

export function CloudJourneySection() {
  return (
    <section
      id="cloud-journey"
      className="relative overflow-hidden border-b border-slate-800/80 bg-[#090D16] py-16 sm:py-24"
    >
      {/* Subtle architectural radial tint behind the progression */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-80 bg-[radial-gradient(ellipse_at_top,rgba(59,130,246,0.09),transparent_65%)]"
      />

      <div className="relative mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl">
          <p className="text-sm font-medium text-blue-400">04. Career Direction</p>
          <h2 className="mt-2 font-display text-2xl font-bold tracking-tight text-white sm:text-4xl [text-wrap:balance]">
            My Journey Towards Cloud Engineering
          </h2>
          <p className="mt-4 text-base leading-relaxed text-slate-300 sm:text-lg">
            {CLOUD_JOURNEY_INTRO}
          </p>
        </div>

        {/* 3-stage connected roadmap */}
        <div className="relative mt-12">
          {/* Subtle connecting horizontal rail on desktop */}
          <div
            aria-hidden="true"
            className="hidden lg:block absolute left-8 right-8 top-11 h-px bg-gradient-to-r from-blue-500/40 via-indigo-400/30 to-slate-700/60"
          />

          <div className="grid gap-6 lg:grid-cols-3 lg:gap-8">
            {CLOUD_JOURNEY_STAGES.map((stage, index) => (
              <div
                key={stage.step}
                className="relative flex flex-col rounded-xl border border-slate-800/90 bg-[#0F1624] p-6 sm:p-8 transition-colors duration-150 hover:border-slate-700"
              >
                <div className="flex items-center justify-between gap-4">
                  <span className="inline-flex h-8 w-8 items-center justify-center rounded-lg border border-blue-500/30 bg-blue-500/10 font-mono text-xs font-semibold text-blue-400 tabular-nums">
                    {stage.step}
                  </span>
                  <span className="font-mono text-xs text-slate-500">
                    {index === 0
                      ? 'Active Focus'
                      : index === 1
                        ? 'Exploration'
                        : 'Target Milestone'}
                  </span>
                </div>

                <h3 className="mt-5 font-display text-xl font-semibold text-white">
                  {stage.title}
                </h3>

                <p className="mt-2 text-sm leading-relaxed text-slate-400">
                  {stage.description}
                </p>

                <ul className="mt-6 divide-y divide-slate-800/70 border-t border-slate-800/70">
                  {stage.items.map((item) => (
                    <li
                      key={item}
                      className="flex items-center gap-3 py-2.5 text-sm text-slate-200"
                    >
                      <span
                        aria-hidden="true"
                        className={`h-1.5 w-1.5 shrink-0 rounded-full ${
                          index === 0
                            ? 'bg-blue-400'
                            : index === 1
                              ? 'bg-indigo-400'
                              : 'bg-slate-400'
                        }`}
                      />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
