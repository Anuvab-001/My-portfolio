
const EDUCATION = [
  {
    number: '01',
    institution: 'Faridpur Zilla School',
    location: 'Faridpur, Bangladesh',
    qualification: 'Secondary School Certificate (SSC)',
    year: '2022',
    result: 'GPA 5.00',
  },
  {
    number: '02',
    institution: 'Government Rajendra College',
    location: 'Faridpur, Bangladesh',
    qualification: 'Higher Secondary Certificate (HSC)',
    year: '2024',
    result: 'GPA 5.00',
  },
  {
    number: '03',
    institution: 'Daffodil International University',
    location: 'Bangladesh',
    qualification: 'B.Sc. in Computer Science & Engineering',
    year: 'Currently Studying',
    result: '',
  },
];

export function EducationSection() {
  return (
    <section
      id="education"
      className="border-b border-slate-800/80 bg-[#090D16] py-16 sm:py-24"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl">
          <p className="text-sm font-medium text-blue-400">
            02. Education
          </p>

          <h2 className="mt-2 font-display text-2xl font-bold tracking-tight text-white sm:text-3xl">
            Academic Journey
          </h2>

          <p className="mt-4 text-base leading-relaxed text-slate-300">
            My educational journey, from secondary school to my
            current university studies in Computer Science and
            Engineering.
          </p>
        </div>

        <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {EDUCATION.map((item) => (
            <article
              key={item.number}
              className="rounded-xl border border-slate-800/90 bg-[#0F1624] p-6 sm:p-7"
            >
              <p className="text-sm font-medium text-blue-400">
                {item.number}
              </p>

              <h3 className="mt-4 font-display text-lg font-semibold text-white">
                {item.institution}
              </h3>

              <p className="mt-2 text-sm text-slate-400">
                {item.location}
              </p>

              <div className="mt-5 border-t border-slate-800/80 pt-4">
                <p className="text-sm leading-relaxed text-slate-300">
                  {item.qualification}
                </p>

                <p className="mt-3 text-sm font-medium text-slate-400">
                  {item.year}
                </p>

                {item.result && (
                  <p className="mt-3 inline-flex rounded-md border border-emerald-500/20 bg-emerald-500/10 px-3 py-1 text-sm font-medium text-emerald-400">
                    {item.result}
                  </p>
                )}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
