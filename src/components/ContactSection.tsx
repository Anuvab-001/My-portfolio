import { FormEvent, useState } from 'react';
import { Check, Copy, ExternalLink, Github, Linkedin, Mail, Send } from 'lucide-react';
import { PORTFOLIO_PROFILE } from '../data/portfolio';
import { ContactDraft, validateContactDraft } from '../utils/profileImage';

export function ContactSection() {
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [draft, setDraft] = useState<ContactDraft>({
    name: '',
    subject: '',
    message: '',
  });
  const [errors, setErrors] = useState<Partial<Record<keyof ContactDraft, string>>>({});
  const [submittedNotice, setSubmittedNotice] = useState<string | null>(null);

  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText(PORTFOLIO_PROFILE.contact.email);
      setCopiedEmail(true);
      window.setTimeout(() => setCopiedEmail(false), 2000);
    } catch {
      setCopiedEmail(false);
    }
  };

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    const validation = validateContactDraft(draft);
    if (!validation.valid) {
      setErrors(validation.errors);
      setSubmittedNotice(null);
      return;
    }

    setErrors({});
    const mailtoHref = `mailto:${encodeURIComponent(
      PORTFOLIO_PROFILE.contact.email
    )}?subject=${encodeURIComponent(draft.subject.trim())}&body=${encodeURIComponent(
      `From: ${draft.name.trim()}\n\n${draft.message.trim()}`
    )}`;

    window.location.href = mailtoHref;
    setSubmittedNotice(
      `Email draft prepared for ${PORTFOLIO_PROFILE.contact.email}. If your mail client did not open, copy the email address on the left.`
    );
  };

  return (
    <section id="contact" className="bg-[#0B111E] py-16 sm:py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          {/* Left column: Direct contact channels */}
          <div className="min-w-0 lg:col-span-5">
            <p className="text-sm font-medium text-blue-400">05. Contact</p>
            <h2 className="mt-2 font-display text-2xl font-bold tracking-tight text-white sm:text-3xl [text-wrap:balance]">
              Let&apos;s connect
            </h2>
            <p className="mt-4 text-sm leading-relaxed text-slate-300 sm:text-base">
              I welcome conversations about software development, computer science coursework,
              networking, and opportunities to learn more about cloud infrastructure.
            </p>

            <div className="mt-8 space-y-4">
              {/* Email channel */}
              <div className="rounded-xl border border-slate-800/90 bg-[#0F1624] p-4">
                <div className="flex flex-wrap items-center justify-between gap-3 sm:flex-nowrap">
                  <div className="flex items-center gap-3 min-w-0 flex-1">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-slate-800 bg-[#090D16] text-blue-400">
                      <Mail className="h-4 w-4" aria-hidden="true" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="text-xs font-medium text-slate-400">
                        Email (Placeholder — editable)
                      </p>
                      <a
                        href={`mailto:${PORTFOLIO_PROFILE.contact.email}`}
                        className="block truncate font-mono text-sm text-slate-100 hover:text-blue-400"
                      >
                        {PORTFOLIO_PROFILE.contact.email}
                      </a>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={handleCopyEmail}
                    aria-label="Copy email address"
                    className="inline-flex items-center gap-1.5 rounded-lg border border-slate-700 px-3 py-1.5 text-xs font-medium text-slate-200 whitespace-nowrap shrink-0 transition-colors hover:border-slate-600 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
                  >
                    {copiedEmail ? (
                      <>
                        <Check className="h-3.5 w-3.5 text-blue-400" aria-hidden="true" />
                        Copied
                      </>
                    ) : (
                      <>
                        <Copy className="h-3.5 w-3.5" aria-hidden="true" />
                        Copy
                      </>
                    )}
                  </button>
                </div>
              </div>

              {/* GitHub channel */}
              <a
                href={PORTFOLIO_PROFILE.contact.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between gap-3 rounded-xl border border-slate-800/90 bg-[#0F1624] p-4 transition-colors duration-150 hover:border-slate-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
              >
                <div className="flex items-center gap-3 min-w-0">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-slate-800 bg-[#090D16] text-slate-200">
                    <Github className="h-4 w-4" aria-hidden="true" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-xs font-medium text-slate-400">GitHub</p>
                    <p className="truncate font-mono text-sm text-slate-100">
                      {PORTFOLIO_PROFILE.contact.githubLabel}
                    </p>
                  </div>
                </div>
                <ExternalLink className="h-4 w-4 shrink-0 text-slate-400" aria-hidden="true" />
              </a>

              {/* LinkedIn placeholder channel */}
              <a
                href={PORTFOLIO_PROFILE.contact.linkedinUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between gap-3 rounded-xl border border-slate-800/90 bg-[#0F1624] p-4 transition-colors duration-150 hover:border-slate-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
              >
                <div className="flex items-center gap-3 min-w-0">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-slate-800 bg-[#090D16] text-blue-400">
                    <Linkedin className="h-4 w-4" aria-hidden="true" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-xs font-medium text-slate-400">
                      LinkedIn (Placeholder — editable)
                    </p>
                    <p className="truncate font-mono text-sm text-slate-100">
                      {PORTFOLIO_PROFILE.contact.linkedinLabel}
                    </p>
                  </div>
                </div>
                <ExternalLink className="h-4 w-4 shrink-0 text-slate-400" aria-hidden="true" />
              </a>
            </div>
          </div>

          {/* Right column: Static message composer */}
          <div className="min-w-0 lg:col-span-7">
            <form
              onSubmit={handleSubmit}
              noValidate
              className="rounded-xl border border-slate-800/90 bg-[#0F1624] p-6 sm:p-8"
            >
              <h3 className="font-display text-lg font-semibold text-white">
                Send a Quick Message
              </h3>
              <p className="mt-1 text-sm text-slate-400">
                Opens your default email client with a formatted message draft.
              </p>

              <div className="mt-6 grid gap-5 sm:grid-cols-2">
                <div>
                  <label htmlFor="contact-name" className="block text-xs font-medium text-slate-300">
                    Your Name
                  </label>
                  <input
                    id="contact-name"
                    type="text"
                    value={draft.name}
                    onChange={(e) => setDraft((prev) => ({ ...prev, name: e.target.value }))}
                    placeholder="Enter your name"
                    className="mt-1.5 w-full rounded-lg border border-slate-700 bg-[#090D16] px-3.5 py-2.5 text-sm text-slate-100 placeholder:text-slate-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
                  />
                  {errors.name && (
                    <p className="mt-1.5 text-xs text-rose-400">{errors.name}</p>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="contact-subject"
                    className="block text-xs font-medium text-slate-300"
                  >
                    Subject
                  </label>
                  <input
                    id="contact-subject"
                    type="text"
                    value={draft.subject}
                    onChange={(e) => setDraft((prev) => ({ ...prev, subject: e.target.value }))}
                    placeholder="Project or collaboration inquiry"
                    className="mt-1.5 w-full rounded-lg border border-slate-700 bg-[#090D16] px-3.5 py-2.5 text-sm text-slate-100 placeholder:text-slate-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
                  />
                  {errors.subject && (
                    <p className="mt-1.5 text-xs text-rose-400">{errors.subject}</p>
                  )}
                </div>
              </div>

              <div className="mt-5">
                <label htmlFor="contact-message" className="block text-xs font-medium text-slate-300">
                  Message
                </label>
                <textarea
                  id="contact-message"
                  rows={4}
                  value={draft.message}
                  onChange={(e) => setDraft((prev) => ({ ...prev, message: e.target.value }))}
                  placeholder="Write your message here..."
                  className="mt-1.5 w-full rounded-lg border border-slate-700 bg-[#090D16] px-3.5 py-2.5 text-sm text-slate-100 placeholder:text-slate-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
                />
                {errors.message && (
                  <p className="mt-1.5 text-xs text-rose-400">{errors.message}</p>
                )}
              </div>

              {submittedNotice && (
                <p
                  role="status"
                  className="mt-4 rounded-lg border border-blue-500/30 bg-blue-500/10 px-3.5 py-2.5 text-xs text-blue-200"
                >
                  {submittedNotice}
                </p>
              )}

              <div className="mt-6 flex flex-wrap items-center justify-between gap-4">
                <button
                  type="submit"
                  className="inline-flex items-center justify-center gap-2 rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white whitespace-nowrap shrink-0 transition-colors duration-150 hover:bg-blue-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400"
                >
                  <Send className="h-4 w-4" aria-hidden="true" />
                  Send Message
                </button>

                <a
                  href={`mailto:${PORTFOLIO_PROFILE.contact.email}`}
                  className="text-xs font-medium text-slate-400 transition-colors hover:text-slate-200"
                >
                  Or email directly
                </a>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
