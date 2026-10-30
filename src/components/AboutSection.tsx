import React from 'react';
import { ArrowUpRight, Check, Compass, Sparkles, Layers, ShieldCheck, HeartHandshake } from 'lucide-react';

interface AboutSectionProps {
  onOpenInquiry: () => void;
}

export const AboutSection: React.FC<AboutSectionProps> = ({ onOpenInquiry }) => {
  const experiences = [
    {
      period: '2024 — Present',
      role: 'Staff Product & Interaction Designer',
      company: 'Aura Financial Systems',
      description: 'Leading global checkout architecture, design token infrastructure, and mobile interaction models across EMEA and North America.'
    },
    {
      period: '2022 — 2024',
      role: 'Lead Interaction & Systems Designer',
      company: 'Pulse Therapeutics',
      description: 'Architected continuous glucose monitoring telemetry apps, circadian day wheels, and WCAG AAA clinical interfaces for chronic care cohorts.'
    },
    {
      period: '2020 — 2022',
      role: 'Senior Product Designer',
      company: 'Nova Spatial Systems',
      description: 'Founding designer for infinite canvas productivity software, sub-50ms command palettes, and collaborative design review tools.'
    },
    {
      period: '2018 — 2020',
      role: 'Product Designer',
      company: 'Form & Matter Studio',
      description: 'Designed 0-to-1 mobile applications, brand identities, and e-commerce flagships for venture-backed startups.'
    }
  ];

  const principles = [
    {
      title: '01. Function Over Ornament',
      description: 'Every tap target, elevation layer, and transition must resolve user anxiety and clarify system state. Novelty without clarity is self-indulgence.'
    },
    {
      title: '02. Code-Grounded Craft',
      description: 'Designers who understand DOM rendering trees, flexbox constraints, and spring physics build products that actually make it into users’ hands intact.'
    },
    {
      title: '03. Zero-Pill & Typographic Restraint',
      description: 'Rely on proportional type scales, calculated margins, and disciplined 60-30-10 color allocation rather than wrapping every noun in candy-colored badges.'
    },
    {
      title: '04. Accessible by Human Right',
      description: 'High contrast ratios, 48px touch targets, screen-reader semantics, and reduced-motion fallbacks are non-negotiable fundamentals.'
    }
  ];

  const toolkit = [
    'Figma & FigJam', 'Protopie & Framer', 'React & TypeScript',
    'Tailwind CSS', 'Motion / Spring Physics', 'Design Systems & Tokens',
    'WCAG AAA Accessibility', 'Mixed-Method User Research', 'Linear & Git'
  ];

  return (
    <section id="about-craft" className="py-16 md:py-24 border-t border-neutral-200 dark:border-neutral-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        {/* Editorial Bio & Philosophy */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
          <div className="lg:col-span-5 space-y-4">
            <div className="text-xs font-mono uppercase tracking-wider text-neutral-500 dark:text-neutral-400">
              04. About & Philosophy
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-neutral-900 dark:text-neutral-100 leading-tight">
              Designing at the intersection of cognitive psychology, tactile motion & systematic scale.
            </h2>
            <p className="text-sm sm:text-base text-neutral-600 dark:text-neutral-400 leading-relaxed">
              Hello, I'm Anthonio. Over the past 8+ years, I've designed digital products used by millions of people across fintech, digital therapeutics, and spatial collaboration.
            </p>
            <p className="text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed">
              I believe great product design lives in the details you barely notice: the 120ms spring settle of a confirmation card, the mathematical rhythm of spacing tokens, and the quiet confidence of an interface that never makes you guess where to look next.
            </p>

            <div className="pt-2">
              <button
                type="button"
                onClick={onOpenInquiry}
                className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold rounded-lg bg-neutral-900 dark:bg-white text-white dark:text-neutral-950 hover:opacity-90 transition-opacity"
              >
                <span>Initiate Project Conversation</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Principles Grid */}
          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4">
            {principles.map((p, i) => (
              <div
                key={i}
                className="p-5 rounded-2xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 shadow-sm space-y-2"
              >
                <div className="text-xs font-bold text-neutral-900 dark:text-white">
                  {p.title}
                </div>
                <p className="text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed">
                  {p.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Experience Timeline */}
        <div className="space-y-6 pt-6 border-t border-neutral-200 dark:border-neutral-800">
          <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2">
            <h3 className="text-xl font-bold tracking-tight text-neutral-900 dark:text-white">
              Selected Track Record
            </h3>
            <span className="text-xs text-neutral-500 font-mono">
              8+ Years in Senior & Staff Roles
            </span>
          </div>

          <div className="space-y-3">
            {experiences.map((exp, i) => (
              <div
                key={i}
                className="p-5 rounded-2xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 flex flex-col md:flex-row md:items-baseline justify-between gap-3 shadow-sm hover:border-neutral-300 dark:hover:border-neutral-700 transition-colors"
              >
                <div className="space-y-1 md:max-w-xl">
                  <div className="flex flex-wrap items-baseline gap-2">
                    <span className="text-sm font-bold text-neutral-900 dark:text-white">
                      {exp.role}
                    </span>
                    <span className="text-xs text-neutral-500 font-medium">
                      at {exp.company}
                    </span>
                  </div>
                  <p className="text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed">
                    {exp.description}
                  </p>
                </div>

                <span className="font-mono text-xs text-neutral-500 dark:text-neutral-400 whitespace-nowrap shrink-0">
                  {exp.period}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Toolkit Strip */}
        <div className="p-6 rounded-3xl bg-neutral-100/60 dark:bg-neutral-900/60 border border-neutral-200 dark:border-neutral-800 space-y-3">
          <div className="text-xs font-mono uppercase tracking-wider text-neutral-500">
            Craft Toolkit & Stack
          </div>
          <div className="flex flex-wrap gap-2">
            {toolkit.map((item, i) => (
              <span
                key={i}
                className="text-xs font-medium text-neutral-700 dark:text-neutral-300 bg-white dark:bg-neutral-800 px-3 py-1.5 rounded-lg border border-neutral-200 dark:border-neutral-700/80 shadow-xs"
              >
                {item}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
