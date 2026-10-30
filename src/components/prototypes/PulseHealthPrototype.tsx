import React, { useState } from 'react';
import { Activity, Sun, Moon, Pill, CheckCircle2, AlertCircle, Heart, Eye, Sliders } from 'lucide-react';

interface PulseHealthPrototypeProps {
  inspectionMode?: 'interactive' | 'hotspots' | 'redlines' | 'task';
  onTaskStepComplete?: (stepIndex: number) => void;
}

export const PulseHealthPrototype: React.FC<PulseHealthPrototypeProps> = ({
  inspectionMode = 'interactive',
  onTaskStepComplete,
}) => {
  const [selectedTimeHour, setSelectedTimeHour] = useState(8.5); // 8:30 AM
  const [highContrastMode, setHighContrastMode] = useState(false);
  const [medicationTaken, setMedicationTaken] = useState(false);
  const [pressHoldProgress, setPressHoldProgress] = useState(0);
  const [isPressing, setIsPressing] = useState(false);
  const [activeTab, setActiveTab] = useState<'timeline' | 'insights'>('timeline');

  // Glucose calculation based on circadian timeline
  const getGlucoseReading = (hour: number) => {
    // Wave simulation
    if (hour < 7) return { value: 92, status: 'In Range (Fasting)', color: 'text-emerald-400', stroke: '#10B981' };
    if (hour >= 7 && hour <= 9) return { value: 104, status: 'Target Post-Wake', color: 'text-emerald-400', stroke: '#10B981' };
    if (hour > 9 && hour <= 13) return { value: 128, status: 'Mild Rise (Meal)', color: 'text-amber-400', stroke: '#F59E0B' };
    if (hour > 13 && hour <= 19) return { value: 112, status: 'Stable Daytime', color: 'text-emerald-400', stroke: '#10B981' };
    return { value: 98, status: 'Resting Evening', color: 'text-emerald-400', stroke: '#10B981' };
  };

  const currentReading = getGlucoseReading(selectedTimeHour);

  const formatHour = (val: number) => {
    const hours = Math.floor(val);
    const minutes = Math.round((val - hours) * 60);
    const period = hours >= 12 ? 'PM' : 'AM';
    const displayHours = hours % 12 === 0 ? 12 : hours % 12;
    return `${displayHours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')} ${period}`;
  };

  // Press & hold mechanic for medication safety
  const handleMouseDown = () => {
    if (medicationTaken) return;
    setIsPressing(true);
    let current = 0;
    const interval = setInterval(() => {
      current += 10;
      setPressHoldProgress(current);
      if (current >= 100) {
        clearInterval(interval);
        setMedicationTaken(true);
        setIsPressing(false);
        setPressHoldProgress(100);
        if (onTaskStepComplete) {
          onTaskStepComplete(3);
        }
      }
    }, 60);
  };

  const handleMouseUp = () => {
    if (!medicationTaken) {
      setIsPressing(false);
      setPressHoldProgress(0);
    }
  };

  const handleTimeSlider = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = parseFloat(e.target.value);
    setSelectedTimeHour(val);
    if (Math.abs(val - 8.5) < 0.3 && onTaskStepComplete) {
      onTaskStepComplete(1);
    }
  };

  return (
    <div
      className={`w-full h-full flex flex-col font-sans select-none overflow-y-auto p-4 sm:p-5 transition-colors duration-200 ${
        highContrastMode
          ? 'bg-black text-white'
          : 'bg-neutral-900 text-neutral-100'
      }`}
    >
      {/* Top Telemetry Header */}
      <div className="flex items-center justify-between pb-3 border-b border-neutral-800 shrink-0">
        <div className="flex items-center gap-2">
          <Activity className="w-4 h-4 text-emerald-400" />
          <span className="font-semibold text-xs tracking-tight">PulseHealth CGM</span>
        </div>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setHighContrastMode(!highContrastMode)}
            data-hotspot="Toggle WCAG AAA High-Contrast Mode"
            data-spec="Accessibility Toggle · Contrast Ratio: 14.8:1"
            className="flex items-center gap-1 text-[10px] px-2 py-0.5 rounded bg-neutral-800 hover:bg-neutral-700 text-neutral-300 font-mono transition-colors"
          >
            <Eye className="w-3 h-3 text-emerald-400" />
            <span>{highContrastMode ? 'High Contrast ON' : 'Standard'}</span>
          </button>
        </div>
      </div>

      {/* Main Circadian Dial Widget */}
      <div className="flex-1 py-3 flex flex-col justify-between space-y-3.5">
        {/* Circadian Wheel Visualizer */}
        <div
          className="relative bg-neutral-800/40 rounded-2xl p-4 border border-neutral-800 flex flex-col items-center justify-center text-center"
          data-spec="Circadian Wheel View · SVG Dial 160px"
          data-hotspot="Circadian 24h Interactive Ring"
        >
          <div className="relative w-40 h-40 flex items-center justify-center">
            {/* SVG Ring */}
            <svg className="w-full h-full -rotate-90 transform" viewBox="0 0 100 100">
              {/* Outer track */}
              <circle
                cx="50"
                cy="50"
                r="42"
                stroke="currentColor"
                strokeWidth="7"
                fill="transparent"
                className="text-neutral-800"
              />
              {/* Progress arc for current hour */}
              <circle
                cx="50"
                cy="50"
                r="42"
                stroke={currentReading.stroke}
                strokeWidth="7"
                strokeDasharray={264}
                strokeDashoffset={264 - (264 * selectedTimeHour) / 24}
                strokeLinecap="round"
                fill="transparent"
                className="transition-all duration-150"
              />
            </svg>

            {/* Inner Center Display */}
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="text-[10px] uppercase tracking-wider text-neutral-400 font-mono">
                {selectedTimeHour >= 6 && selectedTimeHour <= 18 ? (
                  <span className="flex items-center gap-1 text-amber-400"><Sun className="w-3 h-3" /> Daytime</span>
                ) : (
                  <span className="flex items-center gap-1 text-indigo-400"><Moon className="w-3 h-3" /> Night</span>
                )}
              </span>
              <div className="text-3xl font-extrabold font-mono tracking-tight text-white my-0.5">
                {currentReading.value}
              </div>
              <span className="text-[11px] text-neutral-400 font-mono">mg / dL</span>
            </div>
          </div>

          {/* Time scrubber slider */}
          <div className="w-full mt-3 space-y-1">
            <div className="flex items-center justify-between text-xs">
              <span className="text-neutral-400">Timeline Scrub:</span>
              <span className="font-mono text-emerald-400 font-semibold">{formatHour(selectedTimeHour)}</span>
            </div>
            <input
              type="range"
              min="0"
              max="24"
              step="0.5"
              value={selectedTimeHour}
              onChange={handleTimeSlider}
              data-hotspot="Timeline Scrubber"
              data-spec="Range Slider · 0h to 24h · 30min increments"
              className="w-full h-2 bg-neutral-700 rounded-lg appearance-none cursor-pointer accent-emerald-500"
            />
            <div className="flex justify-between text-[9px] text-neutral-400 font-mono">
              <span>12 AM</span>
              <span>6 AM</span>
              <span>12 PM</span>
              <span>6 PM</span>
              <span>12 AM</span>
            </div>
          </div>
        </div>

        {/* Clinical State & Target Range */}
        <div className="grid grid-cols-2 gap-2" data-spec="Metric Pairs · 2-Column Grid">
          <div className="p-3 bg-neutral-800/60 rounded-xl border border-neutral-700/60">
            <span className="text-[10px] uppercase font-mono text-neutral-400 block">Metabolic Zone</span>
            <span className={`text-xs font-semibold ${currentReading.color} flex items-center gap-1 mt-0.5`}>
              <CheckCircle2 className="w-3 h-3 shrink-0" /> {currentReading.status}
            </span>
          </div>

          <div className="p-3 bg-neutral-800/60 rounded-xl border border-neutral-700/60">
            <span className="text-[10px] uppercase font-mono text-neutral-400 block">Circadian Rhythm</span>
            <span className="text-xs font-semibold text-neutral-200 flex items-center gap-1 mt-0.5">
              <Heart className="w-3 h-3 text-red-400 shrink-0" /> 68 bpm (Resting)
            </span>
          </div>
        </div>

        {/* Medication Safety Hold-to-Confirm Card */}
        <div
          className={`p-3.5 rounded-xl border transition-all ${
            medicationTaken
              ? 'bg-emerald-950/40 border-emerald-800/80'
              : 'bg-neutral-800/70 border-neutral-700'
          }`}
          data-spec="Hold-to-Confirm Safety Pattern · 600ms dwell"
          data-hotspot="Medication Hold Button"
        >
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <Pill className={`w-4 h-4 ${medicationTaken ? 'text-emerald-400' : 'text-amber-400'}`} />
              <div>
                <div className="text-xs font-semibold text-white">Morning Glucophage 500mg</div>
                <div className="text-[10px] text-neutral-400">Scheduled: 08:30 AM · Take with meal</div>
              </div>
            </div>
            {medicationTaken && (
              <span className="text-[10px] text-emerald-400 font-mono bg-emerald-900/40 px-2 py-0.5 rounded border border-emerald-700/50">
                Logged
              </span>
            )}
          </div>

          {!medicationTaken ? (
            <div className="space-y-1.5">
              <button
                type="button"
                onMouseDown={handleMouseDown}
                onMouseUp={handleMouseUp}
                onTouchStart={handleMouseDown}
                onTouchEnd={handleMouseUp}
                className="w-full relative py-2.5 px-3 rounded-lg bg-neutral-700 hover:bg-neutral-600 text-white text-xs font-medium overflow-hidden select-none active:scale-[0.99] transition-transform cursor-pointer"
              >
                {/* Hold Fill Indicator */}
                <div
                  className="absolute inset-y-0 left-0 bg-emerald-600 transition-all duration-75"
                  style={{ width: `${pressHoldProgress}%` }}
                />
                <span className="relative z-10 flex items-center justify-center gap-1.5 font-medium">
                  {isPressing ? 'Holding to confirm...' : 'Press & Hold to Confirm Dose'}
                </span>
              </button>
              <p className="text-[10px] text-neutral-400 text-center font-mono">
                Prevents accidental dosage logging
              </p>
            </div>
          ) : (
            <div className="flex items-center justify-between text-xs text-emerald-300 pt-1">
              <span className="flex items-center gap-1 text-[11px]">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                Verified for 08:30 AM window
              </span>
              <button
                type="button"
                onClick={() => setMedicationTaken(false)}
                className="text-[10px] text-neutral-400 hover:text-white underline"
              >
                Undo
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Footer System Status */}
      <div className="pt-2 text-[10px] text-neutral-400 font-mono flex items-center justify-between border-t border-neutral-800 shrink-0">
        <span>Dexcom G7 Sync: Connected</span>
        <span>WCAG AAA Optical 14.8:1</span>
      </div>
    </div>
  );
};
