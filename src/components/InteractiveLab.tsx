import React, { useState } from 'react';
import { Smartphone, Tablet, Monitor, Crosshair, Code2, CheckCircle2, RotateCw, ZoomIn, Play, Sparkles, RefreshCw, Trophy, ChevronRight } from 'lucide-react';
import { AuraPayPrototype } from './prototypes/AuraPayPrototype';
import { PulseHealthPrototype } from './prototypes/PulseHealthPrototype';
import { NovaWorkspacePrototype } from './prototypes/NovaWorkspacePrototype';
import { USABILITY_CHALLENGES } from '../data/portfolioData';
import { DeviceType, InspectionMode } from '../types/portfolio';

interface InteractiveLabProps {
  initialPrototype?: 'aura-pay' | 'pulse-health' | 'nova-workspace';
  onOpenCaseStudy?: (id: string) => void;
}

export const InteractiveLab: React.FC<InteractiveLabProps> = ({
  initialPrototype = 'aura-pay',
  onOpenCaseStudy,
}) => {
  const [selectedProto, setSelectedProto] = useState<'aura-pay' | 'pulse-health' | 'nova-workspace'>(initialPrototype);
  const [device, setDevice] = useState<DeviceType>('iphone');
  const [mode, setMode] = useState<InspectionMode>('interactive');
  const [scale, setScale] = useState<number>(100);
  const [clickCount, setClickCount] = useState<number>(0);
  const [taskStepsCompleted, setTaskStepsCompleted] = useState<number[]>([]);
  const [taskStartedTime, setTaskStartedTime] = useState<number>(Date.now());
  const [taskCompleteModal, setTaskCompleteModal] = useState<boolean>(false);
  const [inspectTooltip, setInspectTooltip] = useState<{ x: number; y: number; text: string } | null>(null);

  const activeChallenge = USABILITY_CHALLENGES.find((c) => c.prototypeId === selectedProto) || USABILITY_CHALLENGES[0];

  const handleStepComplete = (stepIdx: number) => {
    if (!taskStepsCompleted.includes(stepIdx)) {
      const updated = [...taskStepsCompleted, stepIdx];
      setTaskStepsCompleted(updated);
      if (updated.length >= activeChallenge.steps.length) {
        setTaskCompleteModal(true);
      }
    }
  };

  const handleContainerClick = (e: React.MouseEvent<HTMLDivElement>) => {
    setClickCount((prev) => prev + 1);

    if (mode === 'redlines') {
      const target = e.target as HTMLElement;
      const spec = target.getAttribute('data-spec') || target.closest('[data-spec]')?.getAttribute('data-spec');
      if (spec) {
        const rect = target.getBoundingClientRect();
        setInspectTooltip({
          x: rect.left,
          y: rect.top - 36,
          text: spec,
        });
        setTimeout(() => setInspectTooltip(null), 3500);
      }
    }
  };

  const resetTask = () => {
    setTaskStepsCompleted([]);
    setClickCount(0);
    setTaskStartedTime(Date.now());
    setTaskCompleteModal(false);
  };

  // Dimensions based on device
  const getDeviceDimensions = () => {
    switch (device) {
      case 'iphone':
        return 'w-[375px] h-[720px] rounded-[48px] border-[12px] border-neutral-900 shadow-2xl';
      case 'pixel':
        return 'w-[380px] h-[730px] rounded-[40px] border-[10px] border-neutral-800 shadow-2xl';
      case 'tablet':
        return 'w-[560px] h-[720px] rounded-[36px] border-[14px] border-neutral-900 shadow-2xl';
      case 'desktop':
        return 'w-[680px] h-[520px] rounded-[16px] border border-neutral-700/80 shadow-2xl';
    }
  };

  return (
    <section id="interactive-labs" className="py-16 md:py-24 border-t border-neutral-200 dark:border-neutral-800 bg-neutral-100/60 dark:bg-neutral-900/40 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div className="space-y-2">
            <div className="text-xs font-mono uppercase tracking-wider text-neutral-500 dark:text-neutral-400">
              02. Interactive Usability Lab
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-neutral-900 dark:text-neutral-100">
              Live Interactive Prototypes & Spec HUD
            </h2>
            <p className="text-sm sm:text-base text-neutral-600 dark:text-neutral-400 max-w-2xl leading-relaxed">
              Test real micro-interactions, spring physics, and token redlines directly in-browser. Switch device viewports or toggle UX inspection modes.
            </p>
          </div>

          {/* Prototype Selector Segmented Control */}
          <div className="flex items-center gap-1.5 p-1 bg-neutral-200 dark:bg-neutral-800/90 rounded-xl shrink-0 self-start md:self-auto border border-neutral-300 dark:border-neutral-700">
            <button
              type="button"
              onClick={() => {
                setSelectedProto('aura-pay');
                resetTask();
              }}
              className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-all ${
                selectedProto === 'aura-pay'
                  ? 'bg-white dark:bg-neutral-950 text-neutral-900 dark:text-white shadow-sm font-semibold'
                  : 'text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white'
              }`}
            >
              Aura Pay (Fintech)
            </button>
            <button
              type="button"
              onClick={() => {
                setSelectedProto('pulse-health');
                resetTask();
              }}
              className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-all ${
                selectedProto === 'pulse-health'
                  ? 'bg-white dark:bg-neutral-950 text-neutral-900 dark:text-white shadow-sm font-semibold'
                  : 'text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white'
              }`}
            >
              PulseHealth (MedTech)
            </button>
            <button
              type="button"
              onClick={() => {
                setSelectedProto('nova-workspace');
                resetTask();
              }}
              className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-all ${
                selectedProto === 'nova-workspace'
                  ? 'bg-white dark:bg-neutral-950 text-neutral-900 dark:text-white shadow-sm font-semibold'
                  : 'text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white'
              }`}
            >
              Nova (Spatial AI)
            </button>
          </div>
        </div>

        {/* Toolbar & HUD Mode Selector */}
        <div className="flex flex-wrap items-center justify-between gap-3 p-3 bg-white dark:bg-neutral-950 rounded-2xl border border-neutral-200 dark:border-neutral-800 shadow-sm">
          {/* Inspection Mode Tabs */}
          <div className="flex items-center gap-1">
            <button
              type="button"
              onClick={() => setMode('interactive')}
              className={`px-3 py-1.5 text-xs font-medium rounded-lg flex items-center gap-1.5 transition-colors ${
                mode === 'interactive'
                  ? 'bg-blue-600 text-white font-semibold'
                  : 'text-neutral-600 dark:text-neutral-400 hover:bg-neutral-100 dark:hover:bg-neutral-900'
              }`}
            >
              <Play className="w-3.5 h-3.5" />
              <span>Interactive Usability</span>
            </button>

            <button
              type="button"
              onClick={() => setMode('hotspots')}
              className={`px-3 py-1.5 text-xs font-medium rounded-lg flex items-center gap-1.5 transition-colors ${
                mode === 'hotspots'
                  ? 'bg-blue-600 text-white font-semibold'
                  : 'text-neutral-600 dark:text-neutral-400 hover:bg-neutral-100 dark:hover:bg-neutral-900'
              }`}
            >
              <Crosshair className="w-3.5 h-3.5" />
              <span>UX Tap Hotspots</span>
            </button>

            <button
              type="button"
              onClick={() => setMode('redlines')}
              className={`px-3 py-1.5 text-xs font-medium rounded-lg flex items-center gap-1.5 transition-colors ${
                mode === 'redlines'
                  ? 'bg-blue-600 text-white font-semibold'
                  : 'text-neutral-600 dark:text-neutral-400 hover:bg-neutral-100 dark:hover:bg-neutral-900'
              }`}
            >
              <Code2 className="w-3.5 h-3.5" />
              <span>Design Token Redlines</span>
            </button>

            <button
              type="button"
              onClick={() => setMode('task')}
              className={`px-3 py-1.5 text-xs font-medium rounded-lg flex items-center gap-1.5 transition-colors ${
                mode === 'task'
                  ? 'bg-emerald-600 text-white font-semibold'
                  : 'text-neutral-600 dark:text-neutral-400 hover:bg-neutral-100 dark:hover:bg-neutral-900'
              }`}
            >
              <Trophy className="w-3.5 h-3.5" />
              <span>Usability Mission</span>
            </button>
          </div>

          {/* Device Hardware Viewport Selector */}
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1 p-0.5 bg-neutral-100 dark:bg-neutral-900 rounded-lg border border-neutral-200 dark:border-neutral-800">
              <button
                type="button"
                title="iPhone 16 Pro Viewport"
                onClick={() => setDevice('iphone')}
                className={`p-1.5 rounded text-xs transition-colors ${
                  device === 'iphone'
                    ? 'bg-white dark:bg-neutral-800 text-neutral-900 dark:text-white shadow-xs'
                    : 'text-neutral-500 hover:text-neutral-900 dark:hover:text-white'
                }`}
              >
                <Smartphone className="w-4 h-4" />
              </button>
              <button
                type="button"
                title="Google Pixel 9 Viewport"
                onClick={() => setDevice('pixel')}
                className={`p-1.5 rounded text-xs transition-colors ${
                  device === 'pixel'
                    ? 'bg-white dark:bg-neutral-800 text-neutral-900 dark:text-white shadow-xs'
                    : 'text-neutral-500 hover:text-neutral-900 dark:hover:text-white'
                }`}
              >
                <RotateCw className="w-4 h-4" />
              </button>
              <button
                type="button"
                title="iPad Mini Tablet Viewport"
                onClick={() => setDevice('tablet')}
                className={`p-1.5 rounded text-xs transition-colors ${
                  device === 'tablet'
                    ? 'bg-white dark:bg-neutral-800 text-neutral-900 dark:text-white shadow-xs'
                    : 'text-neutral-500 hover:text-neutral-900 dark:hover:text-white'
                }`}
              >
                <Tablet className="w-4 h-4" />
              </button>
              <button
                type="button"
                title="Desktop Canvas Viewport"
                onClick={() => setDevice('desktop')}
                className={`p-1.5 rounded text-xs transition-colors ${
                  device === 'desktop'
                    ? 'bg-white dark:bg-neutral-800 text-neutral-900 dark:text-white shadow-xs'
                    : 'text-neutral-500 hover:text-neutral-900 dark:hover:text-white'
                }`}
              >
                <Monitor className="w-4 h-4" />
              </button>
            </div>

            {/* Read Case Study Button */}
            {onOpenCaseStudy && (
              <button
                type="button"
                onClick={() => onOpenCaseStudy(selectedProto)}
                className="px-3 py-1.5 text-xs font-medium text-neutral-700 dark:text-neutral-300 hover:text-neutral-900 dark:hover:text-white rounded-lg border border-neutral-300 dark:border-neutral-700 flex items-center gap-1 transition-colors"
              >
                <span>Read Full Case Study</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </div>

        {/* Guided Usability Task Strip (When Task Mode Active) */}
        {mode === 'task' && (
          <div className="p-4 bg-emerald-50 dark:bg-emerald-950/30 rounded-2xl border border-emerald-200 dark:border-emerald-800/80 space-y-3 animate-in fade-in duration-200">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div>
                <span className="text-[11px] font-mono uppercase tracking-wider text-emerald-700 dark:text-emerald-400 font-semibold block">
                  Usability Mission
                </span>
                <h3 className="text-base font-bold text-neutral-900 dark:text-white">
                  {activeChallenge.title}
                </h3>
                <p className="text-xs text-neutral-600 dark:text-neutral-300 mt-0.5">
                  {activeChallenge.goal}
                </p>
              </div>

              <div className="flex items-center gap-4 text-xs font-mono shrink-0">
                <div className="text-right">
                  <span className="text-neutral-500 dark:text-neutral-400 block text-[10px]">Clicks</span>
                  <span className="text-neutral-900 dark:text-white font-bold">{clickCount}</span>
                </div>
                <div className="text-right">
                  <span className="text-neutral-500 dark:text-neutral-400 block text-[10px]">Progress</span>
                  <span className="text-emerald-600 dark:text-emerald-400 font-bold">
                    {taskStepsCompleted.length}/{activeChallenge.steps.length}
                  </span>
                </div>
                <button
                  type="button"
                  onClick={resetTask}
                  className="p-1.5 rounded-lg bg-emerald-100 dark:bg-emerald-900/60 text-emerald-800 dark:text-emerald-200 hover:bg-emerald-200 dark:hover:bg-emerald-900 transition-colors"
                  title="Reset Mission"
                >
                  <RefreshCw className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* Checklist */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2 pt-1">
              {activeChallenge.steps.map((st, i) => {
                const done = taskStepsCompleted.includes(i);
                return (
                  <div
                    key={i}
                    className={`p-2.5 rounded-xl border text-xs flex items-start gap-2 transition-colors ${
                      done
                        ? 'bg-emerald-100/60 dark:bg-emerald-900/40 border-emerald-300 dark:border-emerald-700 text-emerald-900 dark:text-emerald-200'
                        : 'bg-white dark:bg-neutral-900 border-neutral-200 dark:border-neutral-800 text-neutral-600 dark:text-neutral-400'
                    }`}
                  >
                    <CheckCircle2 className={`w-4 h-4 shrink-0 mt-0.5 ${done ? 'text-emerald-600 dark:text-emerald-400' : 'text-neutral-300 dark:text-neutral-700'}`} />
                    <span className="leading-tight">{st}</span>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Live Device Stage Viewport */}
        <div
          className="relative min-h-[760px] bg-neutral-200/50 dark:bg-neutral-950/80 rounded-3xl border border-neutral-300 dark:border-neutral-800/80 p-6 flex flex-col items-center justify-center overflow-hidden design-grid-pattern"
          onClick={handleContainerClick}
        >
          {/* Mode Badge & Instructions Bar */}
          <div className="absolute top-4 left-6 right-6 flex items-center justify-between text-xs text-neutral-500 dark:text-neutral-400 pointer-events-none z-10">
            <span className="font-mono text-[11px] bg-white/80 dark:bg-neutral-900/80 px-2.5 py-1 rounded-md border border-neutral-300 dark:border-neutral-800 backdrop-blur">
              Viewport: {device.toUpperCase()} · 60fps Native Physics
            </span>
            {mode === 'hotspots' && (
              <span className="font-mono text-[11px] bg-blue-500/20 text-blue-600 dark:text-blue-300 px-2.5 py-1 rounded-md border border-blue-400/30 backdrop-blur">
                Hotspots Active: Glowing bounding frames highlight touch targets ≥ 44px
              </span>
            )}
            {mode === 'redlines' && (
              <span className="font-mono text-[11px] bg-amber-500/20 text-amber-700 dark:text-amber-300 px-2.5 py-1 rounded-md border border-amber-400/30 backdrop-blur">
                Click any component to inspect token padding, typography & hex specs
              </span>
            )}
          </div>

          {/* Floating Redline Tooltip */}
          {inspectTooltip && (
            <div
              className="fixed z-50 px-3 py-1.5 rounded-lg bg-neutral-900 text-white text-xs font-mono shadow-2xl border border-neutral-700 pointer-events-none animate-in fade-in duration-100"
              style={{ left: `${inspectTooltip.x}px`, top: `${inspectTooltip.y}px` }}
            >
              {inspectTooltip.text}
            </div>
          )}

          {/* Hardware Device Container */}
          <div
            className={`transition-all duration-300 relative overflow-hidden bg-neutral-950 ${getDeviceDimensions()}`}
            style={{ transform: `scale(${scale / 100})` }}
          >
            {/* iPhone Dynamic Island */}
            {device === 'iphone' && (
              <div className="absolute top-2 left-1/2 -translate-x-1/2 w-24 h-5 bg-black rounded-full z-30 flex items-center justify-end px-2">
                <div className="w-2.5 h-2.5 rounded-full bg-neutral-900 border border-neutral-800" />
              </div>
            )}

            {/* Desktop Window Titlebar */}
            {device === 'desktop' && (
              <div className="h-8 bg-neutral-900 border-b border-neutral-800 flex items-center px-3 gap-2 shrink-0">
                <div className="flex items-center gap-1.5">
                  <div className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
                  <div className="w-2.5 h-2.5 rounded-full bg-amber-500/80" />
                  <div className="w-2.5 h-2.5 rounded-full bg-emerald-500/80" />
                </div>
                <div className="mx-auto text-[10px] text-neutral-400 font-mono">
                  https://app.anthoniostudio.design/{selectedProto}
                </div>
              </div>
            )}

            {/* Interactive Prototype Inner Frame */}
            <div className={`w-full h-full relative ${mode === 'hotspots' ? 'show-hotspots' : ''}`}>
              {selectedProto === 'aura-pay' && (
                <AuraPayPrototype
                  inspectionMode={mode}
                  onTaskStepComplete={handleStepComplete}
                />
              )}
              {selectedProto === 'pulse-health' && (
                <PulseHealthPrototype
                  inspectionMode={mode}
                  onTaskStepComplete={handleStepComplete}
                />
              )}
              {selectedProto === 'nova-workspace' && (
                <NovaWorkspacePrototype
                  inspectionMode={mode}
                  onTaskStepComplete={handleStepComplete}
                />
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Task Completion Celebration Modal */}
      {taskCompleteModal && (
        <div className="fixed inset-0 bg-neutral-950/80 backdrop-blur-md z-50 flex items-center justify-center p-4">
          <div className="bg-white dark:bg-neutral-900 rounded-3xl p-6 sm:p-8 max-w-md w-full border border-neutral-200 dark:border-neutral-800 shadow-2xl space-y-5 animate-in zoom-in-95 duration-200 text-center">
            <div className="w-14 h-14 rounded-2xl bg-emerald-100 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mx-auto border border-emerald-200 dark:border-emerald-800">
              <Trophy className="w-7 h-7" />
            </div>

            <div className="space-y-1">
              <h3 className="text-xl font-bold text-neutral-900 dark:text-white">
                Usability Mission Completed!
              </h3>
              <p className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-400">
                You successfully navigated the {selectedProto} interaction flow.
              </p>
            </div>

            {/* Metrics Breakdown */}
            <div className="grid grid-cols-3 gap-2 p-3 bg-neutral-50 dark:bg-neutral-950 rounded-2xl border border-neutral-200 dark:border-neutral-800">
              <div>
                <span className="text-[10px] text-neutral-500 uppercase font-mono block">Clicks</span>
                <span className="text-base font-bold text-neutral-900 dark:text-white font-mono">{clickCount}</span>
              </div>
              <div>
                <span className="text-[10px] text-neutral-500 uppercase font-mono block">Time Elapsed</span>
                <span className="text-base font-bold text-neutral-900 dark:text-white font-mono">
                  {Math.round((Date.now() - taskStartedTime) / 1000)}s
                </span>
              </div>
              <div>
                <span className="text-[10px] text-neutral-500 uppercase font-mono block">SUS Score</span>
                <span className="text-base font-bold text-emerald-600 dark:text-emerald-400 font-mono">92/100</span>
              </div>
            </div>

            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => setTaskCompleteModal(false)}
                className="flex-1 py-2.5 px-4 rounded-xl bg-neutral-900 dark:bg-white text-white dark:text-neutral-950 text-xs font-semibold hover:opacity-90 transition-opacity"
              >
                Keep Exploring Lab
              </button>
              {onOpenCaseStudy && (
                <button
                  type="button"
                  onClick={() => {
                    setTaskCompleteModal(false);
                    onOpenCaseStudy(selectedProto);
                  }}
                  className="flex-1 py-2.5 px-4 rounded-xl bg-neutral-100 dark:bg-neutral-800 text-neutral-800 dark:text-neutral-200 text-xs font-semibold hover:bg-neutral-200 dark:hover:bg-neutral-700 transition-colors"
                >
                  View Case Study
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
