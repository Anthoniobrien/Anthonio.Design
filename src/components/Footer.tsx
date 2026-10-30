import React from 'react';
import { ArrowUpRight } from 'lucide-react';

interface FooterProps {
  onOpenInquiry: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenInquiry }) => {
  return (
    <footer className="border-t border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-950 py-12 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-1">
            <span className="text-base font-bold tracking-tight text-neutral-900 dark:text-neutral-100">
              Anthonio
            </span>
            <p className="text-xs text-neutral-500">
              Senior UI/UX Product Designer & Interaction Systems Architect.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-6 text-xs text-neutral-600 dark:text-neutral-400">
            <a
              href="mailto:Anthonio314@gmail.com"
              className="hover:text-neutral-900 dark:hover:text-white transition-colors"
            >
              Anthonio314@gmail.com
            </a>
            <a
              href="https://figma.com"
              target="_blank"
              rel="noreferrer"
              className="hover:text-neutral-900 dark:hover:text-white transition-colors flex items-center gap-1"
            >
              <span>Figma Community</span>
              <ArrowUpRight className="w-3 h-3" />
            </a>
            <a
              href="https://read.cv"
              target="_blank"
              rel="noreferrer"
              className="hover:text-neutral-900 dark:hover:text-white transition-colors flex items-center gap-1"
            >
              <span>ReadCV</span>
              <ArrowUpRight className="w-3 h-3" />
            </a>
            <button
              type="button"
              onClick={onOpenInquiry}
              className="text-blue-600 dark:text-blue-400 font-semibold hover:underline"
            >
              Book Design Review
            </button>
          </div>
        </div>

        <div className="pt-6 border-t border-neutral-100 dark:border-neutral-900 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-neutral-400 font-mono">
          <div>
            © {new Date().getFullYear()} Anthonio Studio. Crafted with React, Tailwind CSS & Motion.
          </div>
          <div>
            WCAG AAA Accessible · Zero-Pill Typography
          </div>
        </div>
      </div>
    </footer>
  );
};
