import { PORTFOLIO_PROFILE } from '../data/portfolio';

const ACADEMIC_FACTS = [
  { label: 'University', value: 'Daffodil International University (DIU)' },
  { label: 'Program', value: 'B.Sc. in Computer Science & Engineering' },
  { label: 'Primary Direction', value: 'Cloud Engineering & Distributed Systems' },
  { label: 'Core Interests', value: 'Software Development, Networking, Problem Solving' },
];

export function AboutSection() {
  return (
    <section id="about" className="border-b border-slate-800/80 bg-[#0B111E] py-16 sm:py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="min-w-0 lg:col-span-7">
            <p className="text-sm font-medium text-blue-400">01. About Me</p>
            <h2 className="mt-2 font-display text-2xl font-bold tracking-tight text-white sm:text-3xl [text-wrap:balance]">
              Building strong CS fundamentals with a focus on cloud systems
            </h2>

            <div className="mt-6 space-y-4 text-base leading-relaxed text-slate-300">
              {PORTFOLIO_PROFILE.aboutParagraphs.map((paragraph, idx) => (
                <p key={idx}>{paragraph}</p>
              ))}
            </div>
          </div>

          <div className="min-w-0 lg:col-span-5">
            <div className="rounded-xl border border-slate-800/90 bg-[#0F1624] p-6 sm:p-7">
              <h3 className="font-display text-base font-semibold text-white">
                Academic &amp; Direction Summary
              </h3>
              <dl className="mt-5 divide-y divide-slate-800/80">
                {ACADEMIC_FACTS.map((item) => (
                  <div key={item.label} className="py-3.5 first:pt-0 last:pb-0">
                    <dt className="text-xs font-medium text-slate-400">{item.label}</dt>
                    <dd className="mt-1 text-sm font-medium text-slate-100">{item.value}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
