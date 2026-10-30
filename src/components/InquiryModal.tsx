import React, { useState, useEffect } from 'react';
import { X, Check, Send, Calendar, Clock, Sparkles, Mail } from 'lucide-react';

interface InquiryModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const InquiryModal: React.FC<InquiryModalProps> = ({ isOpen, onClose }) => {
  const [scope, setScope] = useState('0-to-1 Product Design');
  const [timeline, setTimeline] = useState('Next 2–4 Weeks');
  const [budget, setBudget] = useState('$15k – $25k');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const handleReset = () => {
    setSubmitted(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-neutral-950/80 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-white dark:bg-neutral-900 rounded-3xl border border-neutral-200 dark:border-neutral-800 shadow-2xl max-w-lg w-full p-6 sm:p-8 space-y-6 animate-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-neutral-100 dark:border-neutral-800">
          <div>
            <span className="text-[11px] font-mono uppercase tracking-wider text-neutral-500">
              Project Inquiries
            </span>
            <h3 className="text-xl font-bold text-neutral-900 dark:text-white">
              Book a Design Review
            </h3>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close modal"
            className="p-1.5 rounded-lg text-neutral-400 hover:text-neutral-900 dark:hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {!submitted ? (
          <form onSubmit={handleSubmit} className="space-y-4 text-xs">
            {/* Scope Selector */}
            <div className="space-y-1.5">
              <label className="font-medium text-neutral-700 dark:text-neutral-300 block">
                Project Scope
              </label>
              <div className="grid grid-cols-2 gap-2">
                {[
                  '0-to-1 Product Design',
                  'Design System & Tokens',
                  'Prototype & UX Audit',
                  'Interaction Advisory',
                ].map((s) => (
                  <button
                    key={s}
                    type="button"
                    onClick={() => setScope(s)}
                    className={`p-2.5 rounded-xl border text-left transition-colors ${
                      scope === s
                        ? 'border-blue-600 bg-blue-50/50 dark:bg-blue-950/30 text-blue-900 dark:text-blue-200 font-semibold'
                        : 'border-neutral-200 dark:border-neutral-800 text-neutral-600 dark:text-neutral-400 hover:border-neutral-300 dark:hover:border-neutral-700'
                    }`}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>

            {/* Timeline & Budget Row */}
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1.5">
                <label className="font-medium text-neutral-700 dark:text-neutral-300 block">
                  Target Timeline
                </label>
                <select
                  value={timeline}
                  onChange={(e) => setTimeline(e.target.value)}
                  className="w-full p-2.5 rounded-xl bg-neutral-50 dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-800 text-neutral-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-blue-600"
                >
                  <option>Immediately</option>
                  <option>Next 2–4 Weeks</option>
                  <option>Next Quarter</option>
                  <option>Flexible / Exploratory</option>
                </select>
              </div>

              <div className="space-y-1.5">
                <label className="font-medium text-neutral-700 dark:text-neutral-300 block">
                  Estimated Budget
                </label>
                <select
                  value={budget}
                  onChange={(e) => setBudget(e.target.value)}
                  className="w-full p-2.5 rounded-xl bg-neutral-50 dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-800 text-neutral-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-blue-600"
                >
                  <option>$10k – $15k</option>
                  <option>$15k – $25k</option>
                  <option>$25k – $50k</option>
                  <option>$50k+</option>
                </select>
              </div>
            </div>

            {/* Name & Email */}
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1.5">
                <label className="font-medium text-neutral-700 dark:text-neutral-300 block">
                  Your Name
                </label>
                <input
                  type="text"
                  required
                  placeholder="Sarah Jenkins"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full p-2.5 rounded-xl bg-neutral-50 dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-800 text-neutral-900 dark:text-white placeholder-neutral-400 focus:outline-none focus:ring-1 focus:ring-blue-600"
                >
                </input>
              </div>

              <div className="space-y-1.5">
                <label className="font-medium text-neutral-700 dark:text-neutral-300 block">
                  Email Address
                </label>
                <input
                  type="email"
                  required
                  placeholder="sarah@company.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full p-2.5 rounded-xl bg-neutral-50 dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-800 text-neutral-900 dark:text-white placeholder-neutral-400 focus:outline-none focus:ring-1 focus:ring-blue-600"
                />
              </div>
            </div>

            {/* Project Summary */}
            <div className="space-y-1.5">
              <label className="font-medium text-neutral-700 dark:text-neutral-300 block">
                Project Overview & Goals
              </label>
              <textarea
                rows={3}
                required
                placeholder="Briefly describe what you are building, key problems, and target dates..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="w-full p-2.5 rounded-xl bg-neutral-50 dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-800 text-neutral-900 dark:text-white placeholder-neutral-400 focus:outline-none focus:ring-1 focus:ring-blue-600"
              />
            </div>

            <div className="pt-2">
              <button
                type="submit"
                className="w-full py-3 px-4 rounded-xl bg-neutral-900 dark:bg-white text-white dark:text-neutral-950 text-xs font-semibold hover:opacity-90 transition-opacity flex items-center justify-center gap-2 cursor-pointer shadow-sm"
              >
                <Send className="w-3.5 h-3.5" />
                <span>Submit Inquiry to Anthonio</span>
              </button>
            </div>

            <div className="text-center pt-1">
              <span className="text-[11px] text-neutral-400">
                Direct email: <a href="mailto:Anthonio314@gmail.com" className="underline hover:text-neutral-700 dark:hover:text-neutral-200">Anthonio314@gmail.com</a>
              </span>
            </div>
          </form>
        ) : (
          <div className="py-6 text-center space-y-4 animate-in fade-in duration-200">
            <div className="w-12 h-12 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mx-auto border border-emerald-200 dark:border-emerald-800">
              <Check className="w-6 h-6 stroke-[3]" />
            </div>
            <div className="space-y-1">
              <h4 className="text-lg font-bold text-neutral-900 dark:text-white">
                Inquiry Received, {name || 'Friend'}
              </h4>
              <p className="text-xs text-neutral-600 dark:text-neutral-400 max-w-xs mx-auto">
                Thank you for reaching out regarding {scope}. I will review your goals and reply within 24 hours.
              </p>
            </div>
            <div className="pt-2">
              <button
                type="button"
                onClick={handleReset}
                className="px-5 py-2.5 rounded-xl bg-neutral-900 dark:bg-white text-white dark:text-neutral-950 text-xs font-semibold hover:opacity-90 transition-opacity"
              >
                Return to Portfolio
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
