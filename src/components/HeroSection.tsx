import { useState } from 'react';
import { ArrowRight, User } from 'lucide-react';
import { PORTFOLIO_PROFILE } from '../data/portfolio';
import { TechBackdrop } from './TechBackdrop';

export function HeroSection() {
  const [imgLoadFailed, setImgLoadFailed] = useState(false);

  return (
    <section
      id="top"
      className="relative overflow-hidden border-b border-slate-800/80 bg-[#090D16]"
    >
      <TechBackdrop />

      <div className="relative mx-auto max-w-6xl px-4 py-14 sm:px-6 sm:py-20 lg:px-8 lg:py-24">
        <div className="grid items-center gap-12 lg:grid-cols-12 lg:gap-16">
          {/* Left column: Hero introduction & CTAs */}
          <div className="min-w-0 lg:col-span-7">
            <p className="text-sm font-medium text-slate-400">
              <span>Computer Science &amp; Engineering</span>
              <span aria-hidden="true" className="mx-2 text-slate-600">·</span>
              <span>Daffodil International University</span>
            </p>

            <h1 className="mt-4 font-display text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-6xl [text-wrap:balance]">
              {PORTFOLIO_PROFILE.name}
            </h1>

            <p className="mt-3 font-display text-lg font-medium text-blue-400 sm:text-xl [text-wrap:balance]">
              {PORTFOLIO_PROFILE.headline}
            </p>

            <p className="mt-6 max-w-2xl text-base leading-relaxed text-slate-300 sm:text-lg">
              {PORTFOLIO_PROFILE.heroIntro}
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-4">
              <a
                href="#projects"
                className="inline-flex items-center justify-center gap-2 rounded-lg bg-blue-600 px-5 py-3 text-sm font-semibold text-white whitespace-nowrap shrink-0 transition-colors duration-150 hover:bg-blue-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400 focus-visible:ring-offset-2 focus-visible:ring-offset-[#090D16]"
              >
                View My Projects
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </a>

              <a
                href="#contact"
                className="inline-flex items-center justify-center rounded-lg border border-slate-700 bg-slate-900/60 px-5 py-3 text-sm font-semibold text-slate-200 whitespace-nowrap shrink-0 transition-colors duration-150 hover:border-slate-500 hover:bg-slate-800/80 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400 focus-visible:ring-offset-2 focus-visible:ring-offset-[#090D16]"
              >
                Contact Me
              </a>
            </div>
          </div>

          {/* Right column: Developer portrait */}
          <div className="min-w-0 lg:col-span-5">
            <div className="mx-auto flex max-w-sm flex-col items-center rounded-2xl border border-slate-800/90 bg-[#0F1624]/90 p-6 sm:p-8">
              <div className="relative h-52 w-52 sm:h-64 sm:w-64 overflow-hidden rounded-full border border-slate-700/80 bg-[#0B111E] shadow-lg">
                {!imgLoadFailed ? (
                  <img
                    src={PORTFOLIO_PROFILE.placeholderImage}
                    alt={`Portrait of ${PORTFOLIO_PROFILE.name}`}
                    referrerPolicy="no-referrer"
                    onError={() => setImgLoadFailed(true)}
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <div className="flex h-full w-full flex-col items-center justify-center bg-slate-900 text-slate-400">
                    <User className="h-14 w-14 stroke-[1.5]" aria-hidden="true" />
                    <span className="mt-2 text-xs font-medium">{PORTFOLIO_PROFILE.name}</span>
                  </div>
                )}
              </div>

              <div className="mt-5 text-center">
                <p className="font-display text-base font-semibold text-slate-100">
                  {PORTFOLIO_PROFILE.name}
                </p>
                <p className="mt-1 text-xs text-slate-400">
                  <span>CSE Student</span>
                  <span aria-hidden="true" className="mx-1.5 text-slate-600">·</span>
                  <span>DIU, Bangladesh</span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
