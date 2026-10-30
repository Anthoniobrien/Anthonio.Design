import React, { useState, useEffect } from 'react';
import { CreditCard, Check, ArrowRight, ShieldCheck, RefreshCw, Zap, Users, Sparkles, Share2 } from 'lucide-react';

interface AuraPayPrototypeProps {
  inspectionMode?: 'interactive' | 'hotspots' | 'redlines' | 'task';
  onTaskStepComplete?: (stepIndex: number) => void;
}

export const AuraPayPrototype: React.FC<AuraPayPrototypeProps> = ({
  inspectionMode = 'interactive',
  onTaskStepComplete,
}) => {
  const [totalBill] = useState(142.50);
  const [splitRatio, setSplitRatio] = useState(50); // percentage user pays
  const [tipPercent, setTipPercent] = useState(18);
  const [selectedCurrency, setSelectedCurrency] = useState<'USD' | 'EUR' | 'GBP'>('EUR');
  const [exchangeRate, setExchangeRate] = useState(0.924);
  const [rateCountdown, setRateCountdown] = useState(48);
  const [activeCardIndex, setActiveCardIndex] = useState(0);
  const [isAuthorizing, setIsAuthorizing] = useState(false);
  const [authComplete, setAuthComplete] = useState(false);
  const [showReceipt, setShowReceipt] = useState(false);

  // Cards
  const cards = [
    { id: '1', name: 'Aura Titanium Black', number: '•••• 8821', brand: 'Visa Infinite', balance: '$8,420.00', color: 'from-neutral-900 to-neutral-800 text-white border-neutral-700' },
    { id: '2', name: 'Aura Sapphire Rewards', number: '•••• 3140', brand: 'Mastercard World', balance: '$3,190.50', color: 'from-blue-900 to-indigo-950 text-white border-blue-800' },
  ];

  // FX countdown timer
  useEffect(() => {
    const interval = setInterval(() => {
      setRateCountdown((prev) => (prev > 1 ? prev - 1 : 60));
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  // Exchange rate mapping
  useEffect(() => {
    if (selectedCurrency === 'EUR') setExchangeRate(0.924);
    if (selectedCurrency === 'USD') setExchangeRate(1.000);
    if (selectedCurrency === 'GBP') setExchangeRate(0.785);
  }, [selectedCurrency]);

  const tipAmount = (totalBill * tipPercent) / 100;
  const billWithTip = totalBill + tipAmount;
  const userOwedUSD = (billWithTip * splitRatio) / 100;
  const mayaOwedUSD = billWithTip - userOwedUSD;
  const convertedTotal = (userOwedUSD * exchangeRate).toFixed(2);

  const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = Number(e.target.value);
    setSplitRatio(val);
    if (val === 50 && onTaskStepComplete) {
      onTaskStepComplete(0);
    }
  };

  const handleCurrencyChange = (curr: 'USD' | 'EUR' | 'GBP') => {
    setSelectedCurrency(curr);
    if (curr === 'EUR' && onTaskStepComplete) {
      onTaskStepComplete(1);
    }
  };

  const handleAuthorize = () => {
    setIsAuthorizing(true);
    setTimeout(() => {
      setIsAuthorizing(false);
      setAuthComplete(true);
      setShowReceipt(true);
      if (onTaskStepComplete) {
        onTaskStepComplete(2);
      }
    }, 900);
  };

  const handleReset = () => {
    setAuthComplete(false);
    setShowReceipt(false);
    setSplitRatio(50);
  };

  return (
    <div className="w-full h-full flex flex-col bg-neutral-900 text-neutral-100 font-sans select-none overflow-y-auto p-4 sm:p-5 relative">
      {/* Prototype App Status Bar */}
      <div className="flex items-center justify-between text-xs text-neutral-400 pb-3 border-b border-neutral-800/80 shrink-0">
        <span className="font-mono text-[11px] tracking-tight">09:41</span>
        <div className="flex items-center gap-2">
          <span className="text-[10px] uppercase font-mono text-neutral-400">AURA CORE PAY</span>
          <div className="flex items-center gap-1">
            <div className="w-2 h-2 rounded-full bg-emerald-500" />
            <span className="text-[10px] text-emerald-400">Live FX</span>
          </div>
        </div>
      </div>

      {/* Main Flow Container */}
      <div className="flex-1 py-3 flex flex-col justify-between space-y-4">
        {/* Merchant & Original Bill Header */}
        <div className="bg-neutral-800/60 rounded-xl p-3 border border-neutral-700/60 flex items-center justify-between"
             data-spec="Padding: 12px · Background: #262626"
             data-hotspot="Merchant Details">
          <div>
            <div className="text-[11px] text-neutral-400 uppercase tracking-wider">Restaurant L'Atelier</div>
            <div className="text-xl font-bold text-white tracking-tight flex items-baseline gap-1.5">
              <span>${totalBill.toFixed(2)}</span>
              <span className="text-xs font-normal text-neutral-400">USD</span>
            </div>
          </div>
          <div className="text-right">
            <span className="text-[10px] text-neutral-400 block">Locked Table Bill</span>
            <span className="text-xs font-mono text-emerald-400 flex items-center gap-1 justify-end">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" /> Verified POS
            </span>
          </div>
        </div>

        {/* Currency Switcher & Rate Lock Bar */}
        <div className="space-y-1.5" data-spec="FX Currency Switcher · 3 Tabs">
          <div className="flex items-center justify-between text-[11px] text-neutral-400">
            <span>Settlement Currency</span>
            <span className="font-mono text-emerald-400 flex items-center gap-1 text-[10px]">
              <RefreshCw className="w-3 h-3 animate-spin" style={{ animationDuration: '6s' }} />
              Rate locked: {rateCountdown}s
            </span>
          </div>
          <div className="grid grid-cols-3 gap-1.5 p-1 bg-neutral-950/80 rounded-lg border border-neutral-800">
            {(['EUR', 'USD', 'GBP'] as const).map((curr) => (
              <button
                key={curr}
                type="button"
                onClick={() => handleCurrencyChange(curr)}
                data-hotspot={`Select Currency ${curr}`}
                className={`py-1.5 text-xs font-medium rounded-md transition-all flex items-center justify-center gap-1 ${
                  selectedCurrency === curr
                    ? 'bg-blue-600 text-white shadow-sm font-semibold'
                    : 'text-neutral-400 hover:text-white hover:bg-neutral-800'
                }`}
              >
                {curr}
                <span className="text-[10px] opacity-70 font-mono">
                  {curr === 'EUR' ? '€' : curr === 'GBP' ? '£' : '$'}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Dynamic Split-Bill Tactile Slider */}
        <div className="bg-neutral-800/40 rounded-xl p-3.5 border border-neutral-800 space-y-3"
             data-spec="Tactile Split Control · Touch Target: 48px"
             data-hotspot="Interactive Split Slider">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1.5 text-xs font-medium text-neutral-200">
              <Users className="w-3.5 h-3.5 text-blue-400" />
              <span>Split with Maya</span>
            </div>
            <div className="text-xs font-mono text-blue-400 font-semibold">
              {splitRatio}% You · {100 - splitRatio}% Maya
            </div>
          </div>

          {/* Draggable Slider */}
          <div className="relative py-1">
            <input
              type="range"
              min="10"
              max="90"
              step="5"
              value={splitRatio}
              onChange={handleSliderChange}
              className="w-full h-2 bg-neutral-700 rounded-lg appearance-none cursor-pointer accent-blue-500 focus:outline-none"
            />
            <div className="flex justify-between text-[10px] text-neutral-400 font-mono pt-1">
              <span>You: ${userOwedUSD.toFixed(2)}</span>
              <span>Maya: ${mayaOwedUSD.toFixed(2)}</span>
            </div>
          </div>

          {/* Tip Presets */}
          <div className="pt-1 flex items-center justify-between gap-1">
            <span className="text-[11px] text-neutral-400">Gratuity</span>
            <div className="flex items-center gap-1">
              {[0, 15, 18, 20].map((tip) => (
                <button
                  key={tip}
                  type="button"
                  onClick={() => setTipPercent(tip)}
                  className={`px-2 py-0.5 text-[11px] rounded transition-colors ${
                    tipPercent === tip
                      ? 'bg-blue-600/40 text-blue-300 border border-blue-500/50'
                      : 'text-neutral-400 bg-neutral-800 hover:text-white'
                  }`}
                >
                  {tip === 0 ? 'None' : `${tip}%`}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Card Carousel Selection */}
        <div className="space-y-1.5" data-spec="Card Selector · Active State" data-hotspot="Wallet Card Switcher">
          <div className="flex items-center justify-between text-[11px] text-neutral-400">
            <span>Payment Method</span>
            <span className="text-[10px] text-neutral-400">Tap to toggle</span>
          </div>

          <div
            onClick={() => setActiveCardIndex((prev) => (prev === 0 ? 1 : 0))}
            className={`p-3 rounded-xl bg-gradient-to-r ${cards[activeCardIndex].color} border cursor-pointer transition-all hover:scale-[1.01] active:scale-[0.99] shadow-md`}
          >
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold tracking-wide">{cards[activeCardIndex].name}</span>
              <CreditCard className="w-4 h-4 text-neutral-400" />
            </div>
            <div className="mt-2 flex items-center justify-between">
              <span className="font-mono text-sm tracking-widest text-neutral-300">
                {cards[activeCardIndex].number}
              </span>
              <span className="text-[11px] font-mono text-neutral-400">
                Avail: {cards[activeCardIndex].balance}
              </span>
            </div>
          </div>
        </div>

        {/* Final Conversion Total & Authorize CTA */}
        <div className="pt-2 space-y-2.5">
          <div className="flex items-baseline justify-between px-1">
            <span className="text-xs text-neutral-400">Your Net Settlement</span>
            <div className="text-right">
              <div className="text-2xl font-bold font-mono tracking-tight text-white">
                {selectedCurrency === 'EUR' ? `€${convertedTotal}` : selectedCurrency === 'GBP' ? `£${convertedTotal}` : `$${convertedTotal}`}
              </div>
              <div className="text-[10px] text-neutral-400 font-mono">
                1 USD = {exchangeRate} {selectedCurrency} (Zero Spread Fee)
              </div>
            </div>
          </div>

          <button
            type="button"
            onClick={handleAuthorize}
            disabled={isAuthorizing}
            data-hotspot="Authorize Biometrics CTA"
            data-spec="Primary Action · Height: 44px · Color: #2563EB"
            className="w-full py-3 px-4 rounded-xl bg-blue-600 hover:bg-blue-500 active:bg-blue-700 text-white text-sm font-semibold transition-all flex items-center justify-center gap-2 shadow-lg shadow-blue-900/30 disabled:opacity-75 cursor-pointer"
          >
            {isAuthorizing ? (
              <>
                <RefreshCw className="w-4 h-4 animate-spin text-white" />
                <span>Verifying Biometric Passkey...</span>
              </>
            ) : (
              <>
                <Zap className="w-4 h-4 text-blue-200" />
                <span>Authorize & Settle via Biometrics</span>
                <ArrowRight className="w-4 h-4 text-blue-200" />
              </>
            )}
          </button>
        </div>
      </div>

      {/* Instant Receipt Overlay */}
      {showReceipt && (
        <div className="absolute inset-0 bg-neutral-950/95 backdrop-blur-md p-5 flex flex-col justify-between z-30 animate-in fade-in duration-200">
          <div className="space-y-4">
            <div className="flex items-center justify-center">
              <div className="w-12 h-12 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center border border-emerald-500/40">
                <Check className="w-6 h-6 stroke-[3]" />
              </div>
            </div>

            <div className="text-center space-y-1">
              <h3 className="text-lg font-bold text-white">Payment Authorized</h3>
              <p className="text-xs text-neutral-400">
                Settled in {selectedCurrency} with Restaurant L'Atelier
              </p>
            </div>

            <div className="bg-neutral-900 rounded-xl p-3.5 border border-neutral-800 space-y-2 text-xs">
              <div className="flex justify-between py-1 border-b border-neutral-800">
                <span className="text-neutral-400">Your Share ({splitRatio}%)</span>
                <span className="font-mono text-white">${userOwedUSD.toFixed(2)} USD</span>
              </div>
              <div className="flex justify-between py-1 border-b border-neutral-800">
                <span className="text-neutral-400">Final Debit</span>
                <span className="font-mono font-bold text-emerald-400">
                  {selectedCurrency === 'EUR' ? `€${convertedTotal}` : selectedCurrency === 'GBP' ? `£${convertedTotal}` : `$${convertedTotal}`}
                </span>
              </div>
              <div className="flex justify-between py-1">
                <span className="text-neutral-400">Maya's Request Link</span>
                <span className="text-blue-400 font-mono text-[11px] flex items-center gap-1">
                  Sent via Aura Ping <Share2 className="w-3 h-3" />
                </span>
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <button
              type="button"
              onClick={handleReset}
              className="w-full py-2.5 rounded-lg bg-neutral-800 hover:bg-neutral-700 text-white text-xs font-medium transition-colors"
            >
              Reset Prototype State
            </button>
            <div className="text-center">
              <span className="text-[10px] text-neutral-400">Aura Interaction Prototype v2.4 · 60fps Spring Motion</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
