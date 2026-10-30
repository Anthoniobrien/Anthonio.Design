import React, { useState, useEffect } from 'react';
import { X, Play, ArrowRight, ShieldCheck, CheckCircle2, ChevronRight, Sparkles, Terminal, Activity } from 'lucide-react';
import { CaseStudy } from '../types/portfolio';
import { AuraPayPrototype } from './prototypes/AuraPayPrototype';
import { PulseHealthPrototype } from './prototypes/PulseHealthPrototype';
import { NovaWorkspacePrototype } from './prototypes/NovaWorkspacePrototype';

interface CaseStudyModalProps {
  caseStudy: CaseStudy | null;
  onClose: () => void;
  onLaunchFullLab: (protoId: 'aura-pay' | 'pulse-health' | 'nova-workspace') => void;
}

export const CaseStudyModal: React.FC<CaseStudyModalProps> = ({
  caseStudy,
  onClose,
  onLaunchFullLab,
}) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'research' | 'design-system' | 'prototype' | 'impact'>('overview');

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  if (!caseStudy) return null;

  return (
    <div className="fixed inset-0 z-50 bg-neutral-950/80 backdrop-blur-md flex items-center justify-center p-2 sm:p-4 md:p-6 overflow-y-auto">
      <div className="bg-white dark:bg-neutral-900 rounded-3xl border border-neutral-200 dark:border-neutral-800 shadow-2xl max-w-4xl w-full max-h-[92vh] flex flex-col overflow-hidden animate-in zoom-in-95 duration-200">
        {/* Modal Top Bar */}
        <div className="p-4 sm:p-6 border-b border-neutral-200 dark:border-neutral-800 flex items-center justify-between gap-4 shrink-0 bg-white/50 dark:bg-neutral-900/50 backdrop-blur">
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-xs font-mono text-neutral-500 dark:text-neutral-400">
              <span>{caseStudy.client}</span>
              <span aria-hidden="true">·</span>
              <span>{caseStudy.year}</span>
              <span aria-hidden="true">·</span>
              <span>{caseStudy.role}</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-neutral-900 dark:text-white">
              {caseStudy.title}
            </h2>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => onLaunchFullLab(caseStudy.prototypeId)}
              className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-neutral-100 dark:bg-neutral-800 hover:bg-neutral-200 dark:hover:bg-neutral-700 text-xs font-medium text-neutral-800 dark:text-neutral-200 transition-colors"
            >
              <Play className="w-3.5 h-3.5 fill-current" />
              <span>Full Lab Mode</span>
            </button>

            <button
              type="button"
              onClick={onClose}
              aria-label="Close modal"
              className="p-2 rounded-xl text-neutral-500 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-white hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Navigation Tabs (Functional interactive filter buttons with click handlers) */}
        <div className="px-4 sm:px-6 pt-3 border-b border-neutral-200 dark:border-neutral-800 flex items-center gap-1 overflow-x-auto shrink-0 bg-neutral-50 dark:bg-neutral-950/40">
          {[
            { id: 'overview', label: 'Overview & Problem' },
            { id: 'research', label: 'User Research & IA' },
            { id: 'design-system', label: 'Design System & Tokens' },
            { id: 'prototype', label: 'Interactive Prototype' },
            { id: 'impact', label: 'Business Impact' },
          ].map((tab) => (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveTab(tab.id as typeof activeTab)}
              className={`px-3.5 py-2 text-xs font-medium whitespace-nowrap transition-colors border-b-2 -mb-[1px] ${
                activeTab === tab.id
                  ? 'border-blue-600 text-blue-600 dark:text-blue-400 font-semibold'
                  : 'border-transparent text-neutral-500 hover:text-neutral-900 dark:hover:text-white'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Modal Scrollable Body */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 md:p-8 space-y-8">
          {/* TAB 1: OVERVIEW & PROBLEM */}
          {activeTab === 'overview' && (
            <div className="space-y-8 animate-in fade-in duration-150">
              {/* Executive Summary */}
              <div className="space-y-3">
                <h3 className="text-base font-semibold text-neutral-900 dark:text-white">
                  Executive Summary
                </h3>
                <p className="text-sm sm:text-base text-neutral-600 dark:text-neutral-300 leading-relaxed">
                  {caseStudy.heroSummary}
                </p>
              </div>

              {/* Quantified Impact Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 p-4 bg-neutral-50 dark:bg-neutral-950 rounded-2xl border border-neutral-200 dark:border-neutral-800">
                {caseStudy.impactMetrics.map((m, i) => (
                  <div key={i} className="space-y-1">
                    <span className="text-xl sm:text-2xl font-bold font-mono text-neutral-900 dark:text-white block">
                      {m.value}
                    </span>
                    <span className="text-xs font-semibold text-neutral-700 dark:text-neutral-300 block">
                      {m.label}
                    </span>
                    <span className="text-[11px] text-neutral-500 dark:text-neutral-400 block leading-tight">
                      {m.context}
                    </span>
                  </div>
                ))}
              </div>

              {/* The Core Problem */}
              <div className="space-y-4">
                <h3 className="text-base font-semibold text-neutral-900 dark:text-white">
                  The Problem & Friction Points
                </h3>
                <p className="text-sm text-neutral-600 dark:text-neutral-300 leading-relaxed">
                  {caseStudy.problem.context}
                </p>

                <div className="space-y-2 pt-1">
                  {caseStudy.problem.painPoints.map((pt, i) => (
                    <div key={i} className="p-3 rounded-xl bg-neutral-50 dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-800 text-xs sm:text-sm text-neutral-700 dark:text-neutral-300 flex items-start gap-2.5">
                      <span className="font-mono text-neutral-400 mt-0.5">0{i + 1}.</span>
                      <span>{pt}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Attributable User Quote */}
              <div className="p-4 sm:p-5 rounded-2xl bg-neutral-100/70 dark:bg-neutral-800/40 border border-neutral-200 dark:border-neutral-700/60 space-y-2">
                <blockquote className="text-sm italic text-neutral-800 dark:text-neutral-200 leading-relaxed">
                  "{caseStudy.problem.userQuote.text}"
                </blockquote>
                <div className="text-xs text-neutral-500 dark:text-neutral-400 font-mono">
                  — {caseStudy.problem.userQuote.author}, {caseStudy.problem.userQuote.role}
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: RESEARCH & IA */}
          {activeTab === 'research' && (
            <div className="space-y-6 animate-in fade-in duration-150">
              <div className="space-y-2">
                <h3 className="text-base font-semibold text-neutral-900 dark:text-white">
                  Research Methodology & Participant Cohort
                </h3>
                <p className="text-sm text-neutral-600 dark:text-neutral-300 leading-relaxed">
                  {caseStudy.research.methodology}
                </p>
                <div className="text-xs text-neutral-500 font-mono pt-1">
                  Sample: {caseStudy.research.participants}
                </div>
              </div>

              <div className="space-y-3 pt-2">
                <h4 className="text-sm font-semibold text-neutral-900 dark:text-white">
                  Key Qualitative & Quantitative Discoveries
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  {caseStudy.research.findings.map((f, i) => (
                    <div key={i} className="p-4 rounded-xl bg-neutral-50 dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-800 space-y-2">
                      <div className="text-xs font-bold text-neutral-900 dark:text-white">
                        {f.title}
                      </div>
                      <p className="text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed">
                        {f.description}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Solution Architecture Pillars */}
              <div className="space-y-3 pt-4 border-t border-neutral-200 dark:border-neutral-800">
                <h4 className="text-sm font-semibold text-neutral-900 dark:text-white">
                  Solution Architecture Pillars
                </h4>
                <div className="space-y-2.5">
                  {caseStudy.solution.corePillars.map((p, i) => (
                    <div key={i} className="p-3.5 rounded-xl bg-neutral-50 dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-800 flex items-start gap-3">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
                      <div>
                        <div className="text-xs font-bold text-neutral-900 dark:text-white">{p.title}</div>
                        <p className="text-xs text-neutral-600 dark:text-neutral-400 mt-0.5 leading-relaxed">
                          {p.description}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: DESIGN SYSTEM */}
          {activeTab === 'design-system' && (
            <div className="space-y-6 animate-in fade-in duration-150">
              <div className="space-y-2">
                <h3 className="text-base font-semibold text-neutral-900 dark:text-white">
                  Design Tokens & Component Architecture
                </h3>
                <p className="text-sm text-neutral-600 dark:text-neutral-300">
                  Every interface was built on strict semantic tokens to ensure seamless design-to-code parity and sub-frame performance.
                </p>
              </div>

              {/* Color System */}
              <div className="space-y-3">
                <h4 className="text-xs font-mono uppercase tracking-wider text-neutral-400">
                  Semantic Palette
                </h4>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {caseStudy.designSystem.colors.map((c, i) => (
                    <div key={i} className="p-3 rounded-xl bg-neutral-50 dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-800 space-y-2">
                      <div className="w-full h-10 rounded-lg shadow-xs" style={{ backgroundColor: c.hex }} />
                      <div>
                        <div className="text-xs font-semibold text-neutral-900 dark:text-white">{c.name}</div>
                        <div className="text-[10px] font-mono text-neutral-500">{c.hex}</div>
                        <div className="text-[10px] text-neutral-400 leading-tight mt-1">{c.role}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Typography */}
              <div className="space-y-3 pt-3 border-t border-neutral-200 dark:border-neutral-800">
                <h4 className="text-xs font-mono uppercase tracking-wider text-neutral-400">
                  Typography Scale
                </h4>
                <div className="space-y-2">
                  {caseStudy.designSystem.typography.map((t, i) => (
                    <div key={i} className="p-3 rounded-xl bg-neutral-50 dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-800 flex items-center justify-between">
                      <div>
                        <div className="text-xs font-semibold text-neutral-900 dark:text-white">{t.name}</div>
                        <div className="text-[11px] text-neutral-500">{t.role}</div>
                      </div>
                      <span className="font-mono text-xs text-neutral-400 bg-neutral-200/50 dark:bg-neutral-800 px-2 py-1 rounded">
                        {t.sample}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* TAB 4: EMBEDDED PROTOTYPE */}
          {activeTab === 'prototype' && (
            <div className="space-y-4 animate-in fade-in duration-150">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-base font-semibold text-neutral-900 dark:text-white">
                    Live Embedded Prototype
                  </h3>
                  <p className="text-xs text-neutral-500">
                    Interact directly with the production prototype below.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => onLaunchFullLab(caseStudy.prototypeId)}
                  className="px-3 py-1.5 rounded-lg bg-blue-600 text-white text-xs font-semibold hover:bg-blue-500 transition-colors flex items-center gap-1.5"
                >
                  <Play className="w-3.5 h-3.5 fill-current" />
                  <span>Open in Full Usability Lab</span>
                </button>
              </div>

              {/* Embedded Frame */}
              <div className="h-[520px] max-w-md mx-auto rounded-3xl overflow-hidden border border-neutral-300 dark:border-neutral-700 shadow-xl bg-neutral-950">
                {caseStudy.prototypeId === 'aura-pay' && <AuraPayPrototype />}
                {caseStudy.prototypeId === 'pulse-health' && <PulseHealthPrototype />}
                {caseStudy.prototypeId === 'nova-workspace' && <NovaWorkspacePrototype />}
              </div>
            </div>
          )}

          {/* TAB 5: BUSINESS IMPACT */}
          {activeTab === 'impact' && (
            <div className="space-y-6 animate-in fade-in duration-150">
              <div className="space-y-2">
                <h3 className="text-base font-semibold text-neutral-900 dark:text-white">
                  Measured Business & Usability Outcomes
                </h3>
                <p className="text-sm text-neutral-600 dark:text-neutral-300 leading-relaxed">
                  Real post-launch cohort telemetry gathered over 6 months of production deployment.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {caseStudy.impactMetrics.map((m, i) => (
                  <div key={i} className="p-4 rounded-2xl bg-neutral-50 dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-800 space-y-1.5">
                    <div className="text-2xl font-extrabold font-mono text-neutral-900 dark:text-white">
                      {m.value}
                    </div>
                    <div className="text-xs font-semibold text-neutral-700 dark:text-neutral-200">
                      {m.label}
                    </div>
                    <p className="text-xs text-neutral-500 dark:text-neutral-400">
                      {m.context}
                    </p>
                  </div>
                ))}
              </div>

              <div className="p-4 rounded-xl bg-blue-50 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-900/50 text-xs sm:text-sm text-blue-900 dark:text-blue-200 leading-relaxed">
                <strong>Key Takeaway:</strong> High-fidelity tactile prototypes built in code accelerated executive consensus by 4 weeks and gave our engineering team unambiguous specifications, eliminating redesign churn during implementation.
              </div>
            </div>
          )}
        </div>

        {/* Modal Bottom Bar */}
        <div className="p-4 sm:p-5 border-t border-neutral-200 dark:border-neutral-800 bg-white/80 dark:bg-neutral-900/80 backdrop-blur flex items-center justify-between shrink-0">
          <div className="text-xs text-neutral-500 font-mono">
            {caseStudy.team}
          </div>
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 text-xs font-semibold rounded-lg bg-neutral-900 dark:bg-white text-white dark:text-neutral-950 hover:opacity-90 transition-opacity"
          >
            Close Deep-Dive
          </button>
        </div>
      </div>
    </div>
  );
};
