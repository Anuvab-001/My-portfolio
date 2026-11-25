import { useState } from 'react';
import { ExternalLink, Terminal } from 'lucide-react';
import { FEATURED_PROJECTS, ProjectItem } from '../data/portfolio';
import { ProjectInspectorModal } from './ProjectInspectorModal';

export function ProjectsSection() {
  const [selectedProject, setSelectedProject] = useState<ProjectItem | null>(null);

  return (
    <section id="projects" className="border-b border-slate-800/80 bg-[#0B111E] py-16 sm:py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl">
          <p className="text-sm font-medium text-blue-400">03. Featured Projects</p>
          <h2 className="mt-2 font-display text-2xl font-bold tracking-tight text-white sm:text-3xl [text-wrap:balance]">
            Console systems engineered in C
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-slate-400 sm:text-base">
            Applied data structures and algorithms built as C console applications, with repository
            links ready to point to live GitHub repositories.
          </p>
        </div>

        <div className="mt-10 grid gap-8 lg:grid-cols-2">
          {FEATURED_PROJECTS.map((project) => (
            <article
              key={project.id}
              className="flex flex-col justify-between rounded-xl border border-slate-800/90 bg-[#0F1624] p-6 sm:p-8 transition-colors duration-150 hover:border-slate-700"
            >
              <div>
                {/* Unboxed metadata line */}
                <p className="font-mono text-xs text-slate-400">
                  <span className="text-blue-400">{project.language}</span>
                  <span aria-hidden="true" className="mx-2 text-slate-600">·</span>
                  <span>{project.environment}</span>
                </p>

                <h3 className="mt-3 font-display text-xl font-bold text-white sm:text-2xl">
                  {project.title}
                </h3>

                <p className="mt-3 text-sm leading-relaxed text-slate-300 sm:text-base">
                  {project.summary}
                </p>

                <div className="mt-6 grid gap-6 border-t border-slate-800/80 pt-6 sm:grid-cols-2">
                  <div>
                    <h4 className="text-xs font-semibold text-slate-400">
                      Technical Implementation
                    </h4>
                    <ul className="mt-3 space-y-2 text-sm text-slate-200">
                      {project.technicalImplementation.map((tech) => (
                        <li key={tech} className="flex items-start gap-2">
                          <span aria-hidden="true" className="mt-2 h-1 w-1 shrink-0 rounded-full bg-blue-400" />
                          <span>{tech}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <h4 className="text-xs font-semibold text-slate-400">
                      Features
                    </h4>
                    <ul className="mt-3 space-y-2 text-sm text-slate-300">
                      {project.features.map((feature) => (
                        <li key={feature} className="flex items-start gap-2">
                          <span aria-hidden="true" className="mt-2 h-1 w-1 shrink-0 rounded-full bg-slate-500" />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>

              <div className="mt-8 border-t border-slate-800/80 pt-5">
                <div className="flex flex-wrap items-center gap-3">
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-xs font-semibold text-white whitespace-nowrap shrink-0 transition-colors duration-150 hover:bg-blue-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400"
                  >
                    View on GitHub
                    <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" />
                  </a>

                  <button
                    type="button"
                    onClick={() => setSelectedProject(project)}
                    className="inline-flex items-center justify-center gap-2 rounded-lg border border-slate-700 bg-slate-900/60 px-4 py-2 text-xs font-semibold text-slate-200 whitespace-nowrap shrink-0 transition-colors duration-150 hover:border-slate-500 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
                  >
                    <Terminal className="h-3.5 w-3.5 text-blue-400" aria-hidden="true" />
                    Try Interactive Demo
                  </button>
                </div>

                <p className="mt-3 font-mono text-[11px] text-slate-500">
                  Placeholder link: {project.githubPlaceholderNote}
                </p>
              </div>
            </article>
          ))}
        </div>
      </div>

      <ProjectInspectorModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />
    </section>
  );
}
