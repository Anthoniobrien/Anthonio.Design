import React, { useState } from 'react';
import { Layers, CheckCircle2, ShieldCheck, Sparkles, RefreshCw, Eye, Sliders, Code2 } from 'lucide-react';
import { DESIGN_TOKENS } from '../data/portfolioData';

export const DesignSystemShowcase: React.FC = () => {
  const [selectedTokenTab, setSelectedTokenTab] = useState<'colors' | 'typography' | 'components'>('colors');
  const [buttonLoading, setButtonLoading] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [toggleState, setToggleState] = useState(true);

  const handleTestLoad = () => {
    setButtonLoading(true);
    setTimeout(() => setButtonLoading(false), 1200);
  };

  return (
    <section id="design-systems" className="py-16 md:py-24 border-t border-neutral-200 dark:border-neutral-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div className="space-y-2">
            <div className="text-xs font-mono uppercase tracking-wider text-neutral-500 dark:text-neutral-400">
              03. Design Architecture
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-neutral-900 dark:text-neutral-100">
              Tactile Design Tokens & Component Anatomy
            </h2>
            <p className="text-sm sm:text-base text-neutral-600 dark:text-neutral-400 max-w-2xl leading-relaxed">
              Design systems are the operational bridge between design taste and engineering velocity. Every token is strictly mathematically derived for 60-30-10 distribution and WCAG AAA compliance.
            </p>
          </div>

          {/* Segmented Tab Switcher */}
          <div className="flex items-center gap-1.5 p-1 bg-neutral-200 dark:bg-neutral-800 rounded-xl shrink-0 self-start md:self-auto border border-neutral-300 dark:border-neutral-700">
            <button
              type="button"
              onClick={() => setSelectedTokenTab('colors')}
              className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-all ${
                selectedTokenTab === 'colors'
                  ? 'bg-white dark:bg-neutral-950 text-neutral-900 dark:text-white shadow-sm font-semibold'
                  : 'text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white'
              }`}
            >
              Color System
            </button>
            <button
              type="button"
              onClick={() => setSelectedTokenTab('typography')}
              className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-all ${
                selectedTokenTab === 'typography'
                  ? 'bg-white dark:bg-neutral-950 text-neutral-900 dark:text-white shadow-sm font-semibold'
                  : 'text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white'
              }`}
            >
              Typography Scale
            </button>
            <button
              type="button"
              onClick={() => setSelectedTokenTab('components')}
              className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-all ${
                selectedTokenTab === 'components'
                  ? 'bg-white dark:bg-neutral-950 text-neutral-900 dark:text-white shadow-sm font-semibold'
                  : 'text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white'
              }`}
            >
              Component Matrix
            </button>
          </div>
        </div>

        {/* Tab 1: Color System */}
        {selectedTokenTab === 'colors' && (
          <div className="space-y-6 animate-in fade-in duration-150">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {DESIGN_TOKENS[0].tokens.map((token, i) => (
                <div
                  key={i}
                  className="p-4 rounded-2xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 shadow-sm space-y-3"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-xs font-semibold text-neutral-900 dark:text-white">
                      {token.name}
                    </span>
                    <span className="text-[10px] font-mono text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-200 dark:border-emerald-800">
                      WCAG AAA
                    </span>
                  </div>

                  <div className="h-14 rounded-xl border border-neutral-200 dark:border-neutral-700/80 p-2 flex items-end justify-between font-mono text-[11px] text-white"
                       style={{
                         background: token.name.includes('accent')
                           ? '#2563EB'
                           : token.name.includes('success')
                           ? '#059669'
                           : token.name.includes('warning')
                           ? '#D97706'
                           : token.name.includes('elevated')
                           ? '#27272A'
                           : '#18181B'
                       }}>
                    <span className="bg-black/40 px-1.5 py-0.5 rounded text-[10px]">{token.value}</span>
                  </div>

                  <p className="text-xs text-neutral-600 dark:text-neutral-400 leading-normal">
                    {token.usage}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tab 2: Typography Scale */}
        {selectedTokenTab === 'typography' && (
          <div className="space-y-4 animate-in fade-in duration-150">
            <div className="bg-white dark:bg-neutral-900 rounded-3xl border border-neutral-200 dark:border-neutral-800 overflow-hidden shadow-sm divide-y divide-neutral-200 dark:divide-neutral-800">
              {DESIGN_TOKENS[1].tokens.map((token, i) => (
                <div key={i} className="p-4 sm:p-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div className="space-y-1">
                    <span className="font-mono text-xs font-semibold text-blue-600 dark:text-blue-400 block">
                      {token.name}
                    </span>
                    <div className="text-xs text-neutral-500 font-mono">
                      {token.value}
                    </div>
                    <p className="text-xs text-neutral-600 dark:text-neutral-400 mt-1">
                      {token.usage}
                    </p>
                  </div>

                  <div className="text-right shrink-0">
                    <span className="text-lg sm:text-2xl font-bold tracking-tight text-neutral-900 dark:text-white">
                      The quick brown fox
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tab 3: Interactive Component Matrix */}
        {selectedTokenTab === 'components' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 animate-in fade-in duration-150">
            {/* Button States Card */}
            <div className="p-6 rounded-3xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 space-y-4 shadow-sm">
              <div className="space-y-1">
                <h3 className="text-base font-bold text-neutral-900 dark:text-white">
                  Atomic Button Anatomy
                </h3>
                <p className="text-xs text-neutral-500">
                  Padding formula: 1:2 horizontal ratio (`py-2.5 px-5`). Settle duration $\le 150$ms.
                </p>
              </div>

              <div className="space-y-3 pt-2">
                <div className="flex flex-wrap items-center gap-3">
                  {/* Default Action */}
                  <button
                    type="button"
                    className="py-2.5 px-5 rounded-xl bg-neutral-900 dark:bg-white text-white dark:text-neutral-950 text-xs font-semibold hover:opacity-90 active:scale-95 transition-all shadow-xs cursor-pointer"
                  >
                    Primary Default
                  </button>

                  {/* Accent Action */}
                  <button
                    type="button"
                    className="py-2.5 px-5 rounded-xl bg-blue-600 text-white text-xs font-semibold hover:bg-blue-500 active:scale-95 transition-all shadow-md shadow-blue-600/20 cursor-pointer"
                  >
                    High-Intent CTA
                  </button>

                  {/* Secondary Outline */}
                  <button
                    type="button"
                    className="py-2.5 px-5 rounded-xl border border-neutral-300 dark:border-neutral-700 text-neutral-800 dark:text-neutral-200 text-xs font-semibold hover:bg-neutral-50 dark:hover:bg-neutral-800 active:scale-95 transition-all cursor-pointer"
                  >
                    Secondary
                  </button>

                  {/* Loading State Tester */}
                  <button
                    type="button"
                    onClick={handleTestLoad}
                    className="py-2.5 px-5 rounded-xl bg-neutral-800 text-white text-xs font-semibold flex items-center gap-1.5 hover:bg-neutral-700 active:scale-95 transition-all cursor-pointer"
                  >
                    {buttonLoading ? (
                      <>
                        <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                        <span>Settling...</span>
                      </>
                    ) : (
                      <span>Test Async State</span>
                    )}
                  </button>

                  {/* Disabled State */}
                  <button
                    type="button"
                    disabled
                    className="py-2.5 px-5 rounded-xl bg-neutral-200 dark:bg-neutral-800 text-neutral-400 dark:text-neutral-500 text-xs font-semibold cursor-not-allowed"
                  >
                    Disabled
                  </button>
                </div>
              </div>
            </div>

            {/* Input & Switch Micro-Interactions Card */}
            <div className="p-6 rounded-3xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 space-y-4 shadow-sm">
              <div className="space-y-1">
                <h3 className="text-base font-bold text-neutral-900 dark:text-white">
                  Form Field & Toggle Dynamics
                </h3>
                <p className="text-xs text-neutral-500">
                  Sub-frame focus rings, clear error states, and responsive haptic switches.
                </p>
              </div>

              <div className="space-y-4 pt-1">
                {/* Text input */}
                <div className="space-y-1.5">
                  <label className="text-xs font-medium text-neutral-700 dark:text-neutral-300 flex justify-between">
                    <span>Live Validated Input</span>
                    <span className="font-mono text-[10px] text-neutral-400">
                      {inputValue.length > 0 ? `${inputValue.length} chars` : 'Optional'}
                    </span>
                  </label>
                  <input
                    type="text"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    placeholder="Type to test focus-visible ring..."
                    className="w-full py-2.5 px-3.5 rounded-xl bg-neutral-50 dark:bg-neutral-950 border border-neutral-300 dark:border-neutral-700 text-xs text-neutral-900 dark:text-white placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent transition-all"
                  />
                </div>

                {/* Switch toggle */}
                <div className="flex items-center justify-between p-3 rounded-xl bg-neutral-50 dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-800">
                  <div>
                    <span className="text-xs font-semibold text-neutral-900 dark:text-white block">
                      Haptic Audio Feedback
                    </span>
                    <span className="text-[11px] text-neutral-500 block">
                      Discreet 40ms vibration pulse on touch
                    </span>
                  </div>

                  <button
                    type="button"
                    onClick={() => setToggleState(!toggleState)}
                    className={`w-12 h-6 flex items-center rounded-full p-1 cursor-pointer transition-colors duration-200 ${
                      toggleState ? 'bg-blue-600' : 'bg-neutral-300 dark:bg-neutral-700'
                    }`}
                  >
                    <div
                      className={`bg-white w-4 h-4 rounded-full shadow-md transform transition-transform duration-200 ${
                        toggleState ? 'translate-x-6' : 'translate-x-0'
                      }`}
                    />
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
