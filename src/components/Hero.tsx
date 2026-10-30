import React, { useState } from 'react';
import { ArrowRight, Play, Sparkles, Layers, Sliders, CheckCircle2, ShieldCheck, Compass } from 'lucide-react';

interface HeroProps {
  onExploreWork: () => void;
  onLaunchLab: () => void;
  onOpenInquiry: () => void;
}

export const Hero: React.FC<HeroProps> = ({
  onExploreWork,
  onLaunchLab,
  onOpenInquiry,
}) => {
  // Interactive mini-widget state for the right column
  const [activeTab, setActiveTab] = useState<'haptic' | 'tokens' | 'tokenscale'>('haptic');
  const [springTension, setSpringTension] = useState(65);
  const [isTriggered, setIsTriggered] = useState(false);

  const handleTestSpring = () => {
    setIsTriggered(true);
    setTimeout(() => setIsTriggered(false), 300);
  };

  return (
    <section className="pt-12 pb-16 md:pt-20 md:pb-24 border-b border-neutral-200 dark:border-neutral-800 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Split-Screen Hero */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-stretch">
          {/* Left Column: Typographic Hierarchy */}
          <div className="lg:col-span-7 flex flex-col justify-center space-y-6">
            {/* Quiet unboxed kicker */}
            <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-neutral-500 dark:text-neutral-400">
              <span>Staff Product & Interaction Designer</span>
              <span aria-hidden="true">·</span>
              <span>Design Systems Architect</span>
            </div>

            {/* Display Headline */}
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-neutral-900 dark:text-neutral-100 leading-[1.12]" style={{ textWrap: 'balance' }}>
              Crafting fluid digital products, tactile interaction models & systematic velocity.
            </h1>

            {/* Lead Prose */}
            <p className="text-base sm:text-lg text-neutral-600 dark:text-neutral-400 max-w-2xl leading-relaxed">
              I partner with high-growth fintech, health telemetry, and spatial computing teams to turn dense, ambiguous problem spaces into elegant, habit-forming software. Grounded in cognitive psychology, obsessive typography, and sub-frame micro-interactions.
            </p>

            {/* Action Buttons */}
            <div className="pt-2 flex flex-wrap items-center gap-3">
              <button
                type="button"
                onClick={onLaunchLab}
                className="py-3 px-5 rounded-xl bg-neutral-900 dark:bg-white text-white dark:text-neutral-950 text-sm font-semibold hover:bg-neutral-800 dark:hover:bg-neutral-100 transition-all flex items-center gap-2 shadow-sm cursor-pointer"
              >
                <Play className="w-4 h-4 fill-current" />
                <span>Launch Interactive Prototype Lab</span>
              </button>

              <button
                type="button"
                onClick={onExploreWork}
                className="py-3 px-5 rounded-xl bg-white dark:bg-neutral-900 text-neutral-800 dark:text-neutral-200 text-sm font-semibold border border-neutral-300 dark:border-neutral-700 hover:bg-neutral-50 dark:hover:bg-neutral-800 transition-colors flex items-center gap-1.5 cursor-pointer"
              >
                <span>View Selected Case Studies</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Right Column: Interactive Tactile Switchboard */}
          <div className="lg:col-span-5 flex flex-col justify-between p-6 rounded-3xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 shadow-sm relative overflow-hidden">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-semibold text-neutral-900 dark:text-white">
                    Tactile Design Console
                  </span>
                  <span className="text-[10px] font-mono text-neutral-400">60fps Preview</span>
                </div>

                {/* Tabs */}
                <div className="flex items-center gap-1 p-0.5 bg-neutral-100 dark:bg-neutral-800 rounded-lg text-[11px]">
                  <button
                    type="button"
                    onClick={() => setActiveTab('haptic')}
                    className={`px-2 py-1 rounded transition-colors ${
                      activeTab === 'haptic'
                        ? 'bg-white dark:bg-neutral-950 text-neutral-900 dark:text-white font-medium shadow-xs'
                        : 'text-neutral-500 hover:text-neutral-900 dark:hover:text-white'
                    }`}
                  >
                    Physics
                  </button>
                  <button
                    type="button"
                    onClick={() => setActiveTab('tokens')}
                    className={`px-2 py-1 rounded transition-colors ${
                      activeTab === 'tokens'
                        ? 'bg-white dark:bg-neutral-950 text-neutral-900 dark:text-white font-medium shadow-xs'
                        : 'text-neutral-500 hover:text-neutral-900 dark:hover:text-white'
                    }`}
                  >
                    Redlines
                  </button>
                  <button
                    type="button"
                    onClick={() => setActiveTab('tokenscale')}
                    className={`px-2 py-1 rounded transition-colors ${
                      activeTab === 'tokenscale'
                        ? 'bg-white dark:bg-neutral-950 text-neutral-900 dark:text-white font-medium shadow-xs'
                        : 'text-neutral-500 hover:text-neutral-900 dark:hover:text-white'
                    }`}
                  >
                    Contrast
                  </button>
                </div>
              </div>

              {/* Console Tab 1: Spring Physics */}
              {activeTab === 'haptic' && (
                <div className="space-y-4 pt-2">
                  <div className="p-4 bg-neutral-50 dark:bg-neutral-950 rounded-2xl border border-neutral-200 dark:border-neutral-800 text-center space-y-3">
                    <div className="text-[11px] text-neutral-500 dark:text-neutral-400 font-mono">
                      Spring Curve: cubic-bezier(0.16, 1, 0.3, 1)
                    </div>

                    <div className="py-4 flex justify-center">
                      <button
                        type="button"
                        onClick={handleTestSpring}
                        style={{
                          transform: isTriggered ? 'scale(0.92)' : 'scale(1)',
                          transition: `transform ${120 - springTension}ms cubic-bezier(0.16, 1, 0.3, 1)`,
                        }}
                        className="py-3 px-6 rounded-2xl bg-blue-600 hover:bg-blue-500 text-white font-semibold text-sm shadow-lg shadow-blue-500/25 flex items-center gap-2 cursor-pointer select-none"
                      >
                        <Sparkles className="w-4 h-4 text-blue-200" />
                        <span>Tap to Feel Haptic Settle</span>
                      </button>
                    </div>

                    <div className="space-y-1">
                      <div className="flex justify-between text-xs text-neutral-500">
                        <span>Spring Tension:</span>
                        <span className="font-mono text-neutral-900 dark:text-white">{springTension}%</span>
                      </div>
                      <input
                        type="range"
                        min="20"
                        max="90"
                        value={springTension}
                        onChange={(e) => setSpringTension(Number(e.target.value))}
                        className="w-full h-1.5 bg-neutral-200 dark:bg-neutral-700 rounded-lg appearance-none cursor-pointer accent-blue-600"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* Console Tab 2: Redline Mode */}
              {activeTab === 'tokens' && (
                <div className="space-y-2 pt-1 font-mono text-xs">
                  <div className="p-3 bg-neutral-50 dark:bg-neutral-950 rounded-xl border border-neutral-200 dark:border-neutral-800 space-y-1.5">
                    <div className="flex justify-between text-neutral-500">
                      <span>Outer Radius:</span>
                      <span className="text-neutral-900 dark:text-neutral-100">16px (1rem)</span>
                    </div>
                    <div className="flex justify-between text-neutral-500">
                      <span>Nested Child Radius:</span>
                      <span className="text-neutral-900 dark:text-neutral-100">8px (r_inner = r_out - pad)</span>
                    </div>
                    <div className="flex justify-between text-neutral-500">
                      <span>Touch Target:</span>
                      <span className="text-emerald-600 dark:text-emerald-400">48px (≥ 44px WCAG)</span>
                    </div>
                    <div className="flex justify-between text-neutral-500">
                      <span>Button Padding:</span>
                      <span className="text-neutral-900 dark:text-neutral-100">py-3 px-5 (1:2 ratio)</span>
                    </div>
                  </div>
                </div>
              )}

              {/* Console Tab 3: Contrast Matrix */}
              {activeTab === 'tokenscale' && (
                <div className="space-y-2 pt-1 text-xs">
                  <div className="p-3 bg-neutral-50 dark:bg-neutral-950 rounded-xl border border-neutral-200 dark:border-neutral-800 space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-neutral-600 dark:text-neutral-400">Cobalt on Dark Surface</span>
                      <span className="font-mono text-emerald-600 dark:text-emerald-400 font-bold">5.8:1 (AAA)</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-neutral-600 dark:text-neutral-400">Neutral Text on Canvas</span>
                      <span className="font-mono text-emerald-600 dark:text-emerald-400 font-bold">14.2:1 (AAA)</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-neutral-600 dark:text-neutral-400">Emerald Confirmation</span>
                      <span className="font-mono text-emerald-600 dark:text-emerald-400 font-bold">4.9:1 (AA)</span>
                    </div>
                  </div>
                </div>
              )}
            </div>

            <div className="mt-4 pt-3 border-t border-neutral-100 dark:border-neutral-800 flex items-center justify-between text-xs text-neutral-500">
              <span className="flex items-center gap-1.5 font-mono text-[11px]">
                <ShieldCheck className="w-3.5 h-3.5 text-blue-500" />
                Zero-slop discipline
              </span>
              <button
                type="button"
                onClick={onOpenInquiry}
                className="text-neutral-900 dark:text-white font-medium hover:underline text-[11px]"
              >
                Inquire for Q1/Q2 →
              </button>
            </div>
          </div>
        </div>

        {/* Claim-to-Proof Adjacency Row (Full-width below hero split) */}
        <div className="pt-6 border-t border-neutral-200 dark:border-neutral-800">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="space-y-1">
              <div className="text-2xl sm:text-3xl font-extrabold font-mono tracking-tight text-neutral-900 dark:text-neutral-100">
                -28%
              </div>
              <div className="text-xs sm:text-sm font-medium text-neutral-700 dark:text-neutral-300">
                Checkout Abandonment
              </div>
              <p className="text-[11px] text-neutral-500 dark:text-neutral-400 leading-tight">
                Aura Pay multi-currency checkout across 12k international shoppers.
              </p>
            </div>

            <div className="space-y-1">
              <div className="text-2xl sm:text-3xl font-extrabold font-mono tracking-tight text-neutral-900 dark:text-neutral-100">
                4.9 ★
              </div>
              <div className="text-xs sm:text-sm font-medium text-neutral-700 dark:text-neutral-300">
                App Store Rating
              </div>
              <p className="text-[11px] text-neutral-500 dark:text-neutral-400 leading-tight">
                PulseHealth chronic care telemetry across 45,000+ patient reviews.
              </p>
            </div>

            <div className="space-y-1">
              <div className="text-2xl sm:text-3xl font-extrabold font-mono tracking-tight text-neutral-900 dark:text-neutral-100">
                140k+
              </div>
              <div className="text-xs sm:text-sm font-medium text-neutral-700 dark:text-neutral-300">
                Figma Kit Installs
              </div>
              <p className="text-[11px] text-neutral-500 dark:text-neutral-400 leading-tight">
                Tactile UI token library & accessibility system used worldwide.
              </p>
            </div>

            <div className="space-y-1">
              <div className="text-2xl sm:text-3xl font-extrabold font-mono tracking-tight text-neutral-900 dark:text-neutral-100">
                2025
              </div>
              <div className="text-xs sm:text-sm font-medium text-neutral-700 dark:text-neutral-300">
                Red Dot Award
              </div>
              <p className="text-[11px] text-neutral-500 dark:text-neutral-400 leading-tight">
                Best of the Best in Interaction Design & Interface Ergonomics.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
