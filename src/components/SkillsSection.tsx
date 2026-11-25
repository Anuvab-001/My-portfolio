import { useState } from 'react';
import { SKILL_CATEGORIES, SkillCategory } from '../data/portfolio';

type FilterId = 'all' | SkillCategory['id'];

const FILTER_TABS: Array<{ id: FilterId; label: string }> = [
  { id: 'all', label: 'All Categories' },
  { id: 'programming', label: 'Programming' },
  { id: 'core-cs', label: 'Core CS' },
  { id: 'tools', label: 'Tools & Web' },
  { id: 'cloud', label: 'Cloud (Learning)' },
];

export function SkillsSection() {
  const [activeFilter, setActiveFilter] = useState<FilterId>('all');

  const visibleCategories =
    activeFilter === 'all'
      ? SKILL_CATEGORIES
      : SKILL_CATEGORIES.filter((category) => category.id === activeFilter);

  return (
    <section id="skills" className="border-b border-slate-800/80 bg-[#090D16] py-16 sm:py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div className="max-w-2xl">
            <p className="text-sm font-medium text-blue-400">02. Technical Skills</p>
            <h2 className="mt-2 font-display text-2xl font-bold tracking-tight text-white sm:text-3xl [text-wrap:balance]">
              Foundations in programming, algorithms, and emerging cloud skills
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-slate-400 sm:text-base">
              Subjects marked as Learning represent active study areas I am building step by step.
            </p>
          </div>

          <div
            role="tablist"
            aria-label="Filter skills by category"
            className="flex flex-wrap items-center gap-1 rounded-lg border border-slate-800 bg-[#0F1624] p-1 self-start md:self-auto"
          >
            {FILTER_TABS.map((tab) => {
              const isSelected = activeFilter === tab.id;
              return (
                <button
                  key={tab.id}
                  type="button"
                  role="tab"
                  aria-selected={isSelected}
                  onClick={() => setActiveFilter(tab.id)}
                  className={`rounded-md px-3 py-1.5 text-xs font-medium whitespace-nowrap shrink-0 transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 ${
                    isSelected
                      ? 'bg-blue-600 text-white'
                      : 'text-slate-300 hover:bg-slate-800/70 hover:text-white'
                  }`}
                >
                  {tab.label}
                </button>
              );
            })}
          </div>
        </div>

        <div
          className={`mt-10 grid gap-6 ${
            visibleCategories.length === 1 ? 'grid-cols-1 max-w-2xl' : 'grid-cols-1 md:grid-cols-2'
          }`}
        >
          {visibleCategories.map((category) => (
            <div
              key={category.id}
              className="rounded-xl border border-slate-800/90 bg-[#0F1624] p-6 sm:p-8 transition-colors duration-150 hover:border-slate-700"
            >
              <h3 className="font-display text-lg font-semibold text-white">
                {category.title}
              </h3>
              <p className="mt-1 text-sm text-slate-400">{category.subtitle}</p>

              <ul className="mt-6 divide-y divide-slate-800/70 border-t border-slate-800/70">
                {category.items.map((skill) => (
                  <li
                    key={skill.name}
                    className="flex items-center justify-between gap-4 py-3 text-sm"
                  >
                    <span className="font-medium text-slate-100">{skill.name}</span>
                    {skill.learning ? (
                      <span className="font-mono text-xs text-blue-400 whitespace-nowrap shrink-0">
                        Learning
                      </span>
                    ) : (
                      <span className="font-mono text-xs text-slate-500 whitespace-nowrap shrink-0">
                        Core
                      </span>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
