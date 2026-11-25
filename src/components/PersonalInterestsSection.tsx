
import { Gamepad2, Music2 } from 'lucide-react';

const INTERESTS = [
  {
    number: '01',
    title: 'Gaming Enthusiast',
    description:
      'I enjoy playing video games, especially racing and adventure games. Gaming gives me an opportunity to explore virtual worlds, enjoy immersive experiences, and take a break from my technical studies.',
    icon: Gamepad2,
  },
  {
    number: '02',
    title: 'Music Enthusiast',
    description:
      'Music is an important part of my everyday life. I enjoy discovering new tracks, exploring different genres, and appreciating the experience of listening to music.',
    icon: Music2,
  },
];

export function PersonalInterestsSection() {
  return (
    <section
      id="interests"
      className="border-b border-slate-800/80 bg-[#0B111E] py-16 sm:py-24"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl">
          <p className="text-sm font-medium text-blue-400">
            03. Beyond the Code
          </p>

          <h2 className="mt-2 font-display text-2xl font-bold tracking-tight text-white sm:text-3xl">
            Personal Interests
          </h2>

          <p className="mt-4 text-base leading-relaxed text-slate-300">
            A little about what I enjoy outside programming and technology.
          </p>
        </div>

        <div className="mt-10 grid gap-5 md:grid-cols-2">
          {INTERESTS.map((interest) => {
            const Icon = interest.icon;

            return (
              <article
                key={interest.number}
                className="rounded-xl border border-slate-800/90 bg-[#0F1624] p-6 sm:p-7"
              >
                <div className="flex items-center gap-4">
                  <div className="rounded-lg border border-blue-400/20 bg-blue-400/10 p-3">
                    <Icon size={25} className="text-blue-400" />
                  </div>

                  <div>
                    <p className="text-xs font-medium text-blue-400">
                      {interest.number}
                    </p>

                    <h3 className="mt-1 font-display text-lg font-semibold text-white">
                      {interest.title}
                    </h3>
                  </div>
                </div>

                <p className="mt-5 text-sm leading-relaxed text-slate-300">
                  {interest.description}
                </p>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
