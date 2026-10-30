import React, { useState } from 'react';
import { Sun, Moon, ArrowUpRight, Menu, X } from 'lucide-react';

interface HeaderProps {
  darkMode: boolean;
  onToggleTheme: () => void;
  onOpenInquiry: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  darkMode,
  onToggleTheme,
  onOpenInquiry,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 bg-white/90 dark:bg-neutral-950/90 backdrop-blur-md border-b border-neutral-200 dark:border-neutral-800 transition-colors">
      {/* Strict 3-Zone Top Bar Contract */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-8">
        {/* Zone 1: Brand Wordmark (Single text element) */}
        <a
          href="#"
          className="text-lg font-bold tracking-tight text-neutral-900 dark:text-neutral-100 hover:opacity-80 transition-opacity whitespace-nowrap shrink-0"
        >
          Anthonio
        </a>

        {/* Zone 2: 4-5 Concise single-line text nav links */}
        <nav className="hidden md:flex items-center gap-7 text-sm font-medium text-neutral-600 dark:text-neutral-400">
          <a
            href="#selected-work"
            className="hover:text-neutral-900 dark:hover:text-white transition-colors whitespace-nowrap shrink-0"
          >
            Selected Work
          </a>
          <a
            href="#case-studies"
            className="hover:text-neutral-900 dark:hover:text-white transition-colors whitespace-nowrap shrink-0"
          >
            Case Studies
          </a>
          <a
            href="#interactive-labs"
            className="hover:text-neutral-900 dark:hover:text-white transition-colors whitespace-nowrap shrink-0"
          >
            Interactive Lab
          </a>
          <a
            href="#design-systems"
            className="hover:text-neutral-900 dark:hover:text-white transition-colors whitespace-nowrap shrink-0"
          >
            Design Systems
          </a>
          <a
            href="#about-craft"
            className="hover:text-neutral-900 dark:hover:text-white transition-colors whitespace-nowrap shrink-0"
          >
            About & Craft
          </a>
        </nav>

        {/* Zone 3: 1 Primary Action + Theme Toggle */}
        <div className="flex items-center gap-3 shrink-0">
          {/* Theme switch */}
          <button
            type="button"
            onClick={onToggleTheme}
            aria-label="Toggle dark mode"
            className="p-2 rounded-lg text-neutral-500 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-white hover:bg-neutral-100 dark:hover:bg-neutral-900 transition-colors"
          >
            {darkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
          </button>

          {/* Primary Action Button */}
          <button
            type="button"
            onClick={onOpenInquiry}
            className="hidden sm:inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-white bg-neutral-900 dark:bg-white dark:text-neutral-950 rounded-lg hover:bg-neutral-800 dark:hover:bg-neutral-100 transition-colors whitespace-nowrap shrink-0 cursor-pointer shadow-xs"
          >
            <span>Book Design Review</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </button>

          {/* Mobile menu toggle */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-lg text-neutral-600 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-900"
            aria-label="Open navigation menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-950 px-4 py-4 space-y-3 animate-in slide-in-from-top-2 duration-150">
          <nav className="flex flex-col space-y-2 text-sm font-medium text-neutral-600 dark:text-neutral-300">
            <a
              href="#selected-work"
              onClick={() => setMobileMenuOpen(false)}
              className="py-1.5 hover:text-neutral-900 dark:hover:text-white"
            >
              Selected Work
            </a>
            <a
              href="#case-studies"
              onClick={() => setMobileMenuOpen(false)}
              className="py-1.5 hover:text-neutral-900 dark:hover:text-white"
            >
              Case Studies
            </a>
            <a
              href="#interactive-labs"
              onClick={() => setMobileMenuOpen(false)}
              className="py-1.5 hover:text-neutral-900 dark:hover:text-white"
            >
              Interactive Lab
            </a>
            <a
              href="#design-systems"
              onClick={() => setMobileMenuOpen(false)}
              className="py-1.5 hover:text-neutral-900 dark:hover:text-white"
            >
              Design Systems
            </a>
            <a
              href="#about-craft"
              onClick={() => setMobileMenuOpen(false)}
              className="py-1.5 hover:text-neutral-900 dark:hover:text-white"
            >
              About & Craft
            </a>
          </nav>
          <div className="pt-2 border-t border-neutral-100 dark:border-neutral-800">
            <button
              type="button"
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenInquiry();
              }}
              className="w-full py-2.5 px-4 text-xs font-semibold text-white bg-neutral-900 dark:bg-white dark:text-neutral-950 rounded-lg flex items-center justify-center gap-1.5"
            >
              <span>Book Design Review</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
