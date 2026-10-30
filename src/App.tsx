import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { CaseStudyCard } from './components/CaseStudyCard';
import { CaseStudyModal } from './components/CaseStudyModal';
import { InteractiveLab } from './components/InteractiveLab';
import { DesignSystemShowcase } from './components/DesignSystemShowcase';
import { AboutSection } from './components/AboutSection';
import { InquiryModal } from './components/InquiryModal';
import { Footer } from './components/Footer';
import { CASE_STUDIES } from './data/portfolioData';
import { CaseStudy } from './types/portfolio';

export default function App() {
  const [darkMode, setDarkMode] = useState<boolean>(true);
  const [selectedCaseStudy, setSelectedCaseStudy] = useState<CaseStudy | null>(null);
  const [inquiryOpen, setInquiryOpen] = useState<boolean>(false);
  const [activeCategoryFilter, setActiveCategoryFilter] = useState<string>('all');
  const [labPrototypeId, setLabPrototypeId] = useState<'aura-pay' | 'pulse-health' | 'nova-workspace'>('aura-pay');

  // Handle dark mode synchronization on document element
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  const toggleTheme = () => setDarkMode((prev) => !prev);

  const handleLaunchLab = (protoId?: 'aura-pay' | 'pulse-health' | 'nova-workspace') => {
    if (protoId) {
      setLabPrototypeId(protoId);
    }
    const labEl = document.getElementById('interactive-labs');
    if (labEl) {
      labEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleOpenCaseStudyFromId = (protoId: string) => {
    const study = CASE_STUDIES.find((c) => c.prototypeId === protoId || c.id === protoId);
    if (study) {
      setSelectedCaseStudy(study);
    }
  };

  // Filtered case studies
  const filteredStudies = activeCategoryFilter === 'all'
    ? CASE_STUDIES
    : CASE_STUDIES.filter((c) => c.category.toLowerCase().includes(activeCategoryFilter.toLowerCase()));

  return (
    <div className="min-h-screen flex flex-col bg-neutral-50 dark:bg-neutral-950 text-neutral-900 dark:text-neutral-100 selection:bg-neutral-900 selection:text-white dark:selection:bg-white dark:selection:text-neutral-950 transition-colors duration-200">
      {/* 3-Zone Top Navigation */}
      <Header
        darkMode={darkMode}
        onToggleTheme={toggleTheme}
        onOpenInquiry={() => setInquiryOpen(true)}
      />

      {/* Main Content */}
      <main className="flex-1">
        {/* Hero Section */}
        <Hero
          onExploreWork={() => {
            const el = document.getElementById('selected-work');
            el?.scrollIntoView({ behavior: 'smooth' });
          }}
          onLaunchLab={() => handleLaunchLab('aura-pay')}
          onOpenInquiry={() => setInquiryOpen(true)}
        />

        {/* Selected Works & Case Studies Section */}
        <section id="selected-work" className="py-16 md:py-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
              <div className="space-y-2">
                <div className="text-xs font-mono uppercase tracking-wider text-neutral-500 dark:text-neutral-400">
                  01. Selected Works
                </div>
                <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-neutral-900 dark:text-neutral-100">
                  Flagship Case Studies & UX Architecture
                </h2>
                <p className="text-sm sm:text-base text-neutral-600 dark:text-neutral-400 max-w-2xl leading-relaxed">
                  End-to-end design deep dives detailing problem discovery, user research, wireframe evolution, and measured production impact.
                </p>
              </div>

              {/* Functional interactive category filter tabs */}
              <div className="flex items-center gap-1.5 p-1 bg-neutral-200/80 dark:bg-neutral-900 rounded-xl shrink-0 self-start md:self-auto border border-neutral-300 dark:border-neutral-800">
                {[
                  { id: 'all', label: 'All Projects' },
                  { id: 'fintech', label: 'Fintech' },
                  { id: 'health', label: 'HealthTech' },
                  { id: 'productivity', label: 'Spatial AI' },
                ].map((f) => (
                  <button
                    key={f.id}
                    type="button"
                    onClick={() => setActiveCategoryFilter(f.id)}
                    className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors cursor-pointer ${
                      activeCategoryFilter === f.id
                        ? 'bg-white dark:bg-neutral-800 text-neutral-900 dark:text-white shadow-xs font-semibold'
                        : 'text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white'
                    }`}
                  >
                    {f.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Case Studies Grid */}
            <div id="case-studies" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pt-4">
              {filteredStudies.map((study, idx) => (
                <CaseStudyCard
                  key={study.id}
                  caseStudy={study}
                  index={idx}
                  onOpenModal={setSelectedCaseStudy}
                  onLaunchPrototype={(id) => handleLaunchLab(id)}
                />
              ))}
            </div>
          </div>
        </section>

        {/* Live Interactive Usability Lab */}
        <InteractiveLab
          initialPrototype={labPrototypeId}
          onOpenCaseStudy={handleOpenCaseStudyFromId}
        />

        {/* Design Systems & Tokens Architecture */}
        <DesignSystemShowcase />

        {/* About & Philosophy */}
        <AboutSection onOpenInquiry={() => setInquiryOpen(true)} />
      </main>

      {/* Quiet Footer */}
      <Footer onOpenInquiry={() => setInquiryOpen(true)} />

      {/* Case Study Full Deep-Dive Reader Modal */}
      <CaseStudyModal
        caseStudy={selectedCaseStudy}
        onClose={() => setSelectedCaseStudy(null)}
        onLaunchFullLab={(id) => {
          setSelectedCaseStudy(null);
          handleLaunchLab(id);
        }}
      />

      {/* Inquiry & Review Booking Modal */}
      <InquiryModal
        isOpen={inquiryOpen}
        onClose={() => setInquiryOpen(false)}
      />
    </div>
  );
}
