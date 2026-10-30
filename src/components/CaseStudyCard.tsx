import React from 'react';
import { ArrowUpRight, Play, CheckCircle2, ShieldCheck, Activity, Terminal } from 'lucide-react';
import { CaseStudy } from '../types/portfolio';

interface CaseStudyCardProps {
  caseStudy: CaseStudy;
  index: number;
  onOpenModal: (caseStudy: CaseStudy) => void;
  onLaunchPrototype: (protoId: 'aura-pay' | 'pulse-health' | 'nova-workspace') => void;
}

export const CaseStudyCard: React.FC<CaseStudyCardProps> = ({
  caseStudy,
  index,
  onOpenModal,
  onLaunchPrototype,
}) => {
  return (
    <article className="group rounded-3xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 p-6 sm:p-8 flex flex-col justify-between hover:border-neutral-300 dark:hover:border-neutral-700 transition-all duration-200 shadow-sm">
      <div className="space-y-5">
        {/* Clean Unboxed Metadata with Typographic Separator (NO PILL BOXES) */}
        <div className="flex flex-wrap items-center gap-2 text-xs text-neutral-500 dark:text-neutral-400 font-mono">
          <span>0{index + 1}</span>
          <span aria-hidden="true">·</span>
          <span>{caseStudy.category}</span>
          <span aria-hidden="true">·</span>
          <span>{caseStudy.year}</span>
          <span aria-hidden="true">·</span>
          <span>{caseStudy.role}</span>
        </div>

        {/* Title & Subtitle */}
        <div className="space-y-1.5">
          <h3 className="text-xl sm:text-2xl font-bold tracking-tight text-neutral-900 dark:text-neutral-100 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
            {caseStudy.title}
          </h3>
          <p className="text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed">
            {caseStudy.subtitle}
          </p>
        </div>

        {/* High-Fidelity Vector Preview Box (Zero Broken Image Fallback) */}
        <div className="w-full h-44 rounded-2xl bg-neutral-100 dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-800 p-4 relative overflow-hidden flex flex-col justify-between">
          <div className="flex items-center justify-between text-xs text-neutral-400 font-mono">
            <span>{caseStudy.client}</span>
            <span className="text-[11px] text-emerald-600 dark:text-emerald-400 font-semibold">
              {caseStudy.impactMetrics[0].value} {caseStudy.impactMetrics[0].label}
            </span>
          </div>

          {/* Bespoke interactive vector motif for each project */}
          {caseStudy.id === 'aura-pay' && (
            <div className="flex items-center justify-center py-2">
              <div className="w-48 bg-neutral-900 text-white p-3 rounded-xl border border-neutral-700 shadow-md space-y-2">
                <div className="flex justify-between items-center text-[10px] text-neutral-400">
                  <span>Aura Split Total</span>
                  <span className="text-emerald-400 font-mono">Rate Locked 48s</span>
                </div>
                <div className="flex justify-between items-baseline font-mono">
                  <span className="text-sm font-bold">$142.50 USD</span>
                  <span className="text-xs text-blue-400">50% Share</span>
                </div>
                <div className="w-full bg-neutral-800 h-1.5 rounded-full overflow-hidden">
                  <div className="bg-blue-500 h-full w-1/2" />
                </div>
              </div>
            </div>
          )}

          {caseStudy.id === 'pulse-health' && (
            <div className="flex items-center justify-center py-2">
              <div className="w-48 bg-neutral-900 text-white p-3 rounded-xl border border-neutral-700 shadow-md flex items-center gap-3">
                <div className="w-10 h-10 rounded-full border-2 border-emerald-500 flex items-center justify-center shrink-0">
                  <Activity className="w-5 h-5 text-emerald-400" />
                </div>
                <div>
                  <div className="text-[10px] text-neutral-400">Continuous Vitals</div>
                  <div className="text-sm font-mono font-bold text-white">104 mg/dL</div>
                  <div className="text-[10px] text-emerald-400">Target In-Range</div>
                </div>
              </div>
            </div>
          )}

          {caseStudy.id === 'nova-workspace' && (
            <div className="flex items-center justify-center py-2">
              <div className="w-48 bg-neutral-900 text-white p-3 rounded-xl border border-neutral-700 shadow-md space-y-1.5">
                <div className="flex items-center justify-between text-[10px] text-violet-400">
                  <span className="flex items-center gap-1"><Terminal className="w-3 h-3" /> Command ⌘K</span>
                  <span className="font-mono text-neutral-400">&lt;50ms</span>
                </div>
                <div className="text-xs font-medium text-white truncate">Spatial Synthesis Node</div>
                <div className="text-[10px] text-neutral-400 font-mono">Tokens · Spacing 8pt</div>
              </div>
            </div>
          )}

          <div className="flex items-center justify-between text-[11px] text-neutral-500 dark:text-neutral-400">
            <span>Duration: {caseStudy.duration}</span>
            <span className="font-mono">{caseStudy.tags.join(' · ')}</span>
          </div>
        </div>

        {/* Quantified Impact Strip */}
        <div className="grid grid-cols-2 gap-3 pt-1">
          {caseStudy.impactMetrics.slice(0, 2).map((m, i) => (
            <div key={i} className="p-3 bg-neutral-50 dark:bg-neutral-950/60 rounded-xl border border-neutral-200/80 dark:border-neutral-800">
              <div className="text-lg font-bold font-mono tracking-tight text-neutral-900 dark:text-neutral-100">
                {m.value}
              </div>
              <div className="text-xs text-neutral-600 dark:text-neutral-400">
                {m.label}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Action Footer */}
      <div className="pt-6 mt-6 border-t border-neutral-100 dark:border-neutral-800 flex items-center justify-between gap-3">
        <button
          type="button"
          onClick={() => onOpenModal(caseStudy)}
          className="text-xs font-semibold text-neutral-900 dark:text-neutral-100 hover:text-blue-600 dark:hover:text-blue-400 flex items-center gap-1 transition-colors cursor-pointer"
        >
          <span>Read Full Deep-Dive</span>
          <ArrowUpRight className="w-3.5 h-3.5" />
        </button>

        <button
          type="button"
          onClick={() => onLaunchPrototype(caseStudy.prototypeId)}
          className="px-3 py-1.5 rounded-lg bg-neutral-100 dark:bg-neutral-800 hover:bg-neutral-200 dark:hover:bg-neutral-700 text-neutral-800 dark:text-neutral-200 text-xs font-medium flex items-center gap-1.5 transition-colors cursor-pointer"
        >
          <Play className="w-3 h-3 fill-current" />
          <span>Test Prototype</span>
        </button>
      </div>
    </article>
  );
};
