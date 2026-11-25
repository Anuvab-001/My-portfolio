import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { AboutSection } from './components/AboutSection';
import { SkillsSection } from './components/SkillsSection';
import { ProjectsSection } from './components/ProjectsSection';
import { CloudJourneySection } from './components/CloudJourneySection';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { EducationSection } from './components/EducationSection';

export default function App() {
  return (
    <div className="min-h-screen bg-[#090D16] text-slate-100">
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded-lg focus:bg-blue-600 focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-white"
      >
        Skip to main content
      </a>

      <Navbar />

      <main id="main-content">
        <HeroSection />
        <AboutSection />
        <EducationSection />
        <SkillsSection />
        <ProjectsSection />
        <CloudJourneySection />
        <ContactSection />
      </main>

      <Footer />
    </div>
  );
}
