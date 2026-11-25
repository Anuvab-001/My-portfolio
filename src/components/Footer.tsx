import { Github, Linkedin, Mail } from 'lucide-react';
import { PORTFOLIO_PROFILE } from '../data/portfolio';

export function Footer() {
  return (
    <footer className="border-t border-slate-800/80 bg-[#090D16] py-10">
      <div className="mx-auto flex max-w-6xl flex-col gap-6 px-4 sm:flex-row sm:items-center sm:justify-between sm:px-6 lg:px-8">
        <div>
          <p className="font-display text-sm font-semibold text-slate-100">
            {PORTFOLIO_PROFILE.name}
          </p>
          <p className="mt-1 text-xs text-slate-400">
            &copy; {new Date().getFullYear()} Anuvab · CSE Student at Daffodil International University
          </p>
        </div>

        <nav aria-label="Footer Navigation" className="flex flex-wrap items-center gap-5 text-xs text-slate-400">
          <a href="#about" className="transition-colors hover:text-slate-100">
            About
          </a>
          <a href="#skills" className="transition-colors hover:text-slate-100">
            Skills
          </a>
          <a href="#projects" className="transition-colors hover:text-slate-100">
            Projects
          </a>
          <a href="#cloud-journey" className="transition-colors hover:text-slate-100">
            Cloud Journey
          </a>
          <a href="#contact" className="transition-colors hover:text-slate-100">
            Contact
          </a>
        </nav>

        <div className="flex items-center gap-3">
          <a
            href={PORTFOLIO_PROFILE.contact.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Anuvab on GitHub"
            className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-slate-800 text-slate-400 transition-colors hover:border-slate-700 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
          >
            <Github className="h-4 w-4" aria-hidden="true" />
          </a>
          <a
            href={PORTFOLIO_PROFILE.contact.linkedinUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Anuvab on LinkedIn"
            className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-slate-800 text-slate-400 transition-colors hover:border-slate-700 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
          >
            <Linkedin className="h-4 w-4" aria-hidden="true" />
          </a>
          <a
            href={`mailto:${PORTFOLIO_PROFILE.contact.email}`}
            aria-label="Send email to Anuvab"
            className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-slate-800 text-slate-400 transition-colors hover:border-slate-700 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
          >
            <Mail className="h-4 w-4" aria-hidden="true" />
          </a>
        </div>
      </div>
    </footer>
  );
}
