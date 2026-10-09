import React from 'react';
import { Gamepad2, ShieldAlert } from 'lucide-react';

export const Header = ({
  activeTab,
  onTabChange,
  onOpenJsonManager,
  onOpenAddGame,
  onOpenCloakSettings,
  onTriggerPanic,
}) => {
  return (
    <header className="sticky top-0 z-40 bg-[#0b0f19]/95 backdrop-blur-md border-b border-[#1e293b]">
      {/* Strict 3-Zone Top Bar Contract */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-8">
        {/* Zone 1: Brand Wordmark (single text element) */}
        <a
          href="#"
          onClick={(e) => {
            e.preventDefault();
            onTabChange('all');
          }}
          className="flex items-center gap-2.5 text-lg font-extrabold tracking-tight text-white whitespace-nowrap shrink-0 hover:text-sky-400 transition-colors"
        >
          <div className="w-8 h-8 rounded-lg bg-sky-500/10 border border-sky-500/30 flex items-center justify-center text-sky-400">
            <Gamepad2 className="w-4 h-4" />
          </div>
          <span>NOVA ARCADE</span>
        </a>

        {/* Zone 2: 4-5 clean single-line text nav links */}
        <nav className="hidden md:flex items-center gap-7 text-sm font-medium text-slate-300">
          <button
            onClick={() => onTabChange('all')}
            className={`whitespace-nowrap shrink-0 transition-colors ${
              activeTab === 'all'
                ? 'text-sky-400 font-semibold'
                : 'hover:text-white'
            }`}
          >
            All Games
          </button>
          <button
            onClick={() => onTabChange('arcade')}
            className={`whitespace-nowrap shrink-0 transition-colors ${
              activeTab === 'arcade'
                ? 'text-sky-400 font-semibold'
                : 'hover:text-white'
            }`}
          >
            Arcade
          </button>
          <button
            onClick={() => onTabChange('puzzle')}
            className={`whitespace-nowrap shrink-0 transition-colors ${
              activeTab === 'puzzle'
                ? 'text-sky-400 font-semibold'
                : 'hover:text-white'
            }`}
          >
            Puzzle
          </button>
          <button
            onClick={() => onTabChange('favorites')}
            className={`whitespace-nowrap shrink-0 transition-colors ${
              activeTab === 'favorites'
                ? 'text-sky-400 font-semibold'
                : 'hover:text-white'
            }`}
          >
            Favorites
          </button>
          <button
            onClick={onOpenJsonManager}
            className="whitespace-nowrap shrink-0 hover:text-white text-slate-400 font-mono text-xs transition-colors"
          >
            games.json
          </button>
          <button
            onClick={onOpenCloakSettings}
            className="whitespace-nowrap shrink-0 hover:text-white text-slate-400 text-xs transition-colors"
          >
            Tab Cloak
          </button>
        </nav>

        {/* Zone 3: 1 Primary Action (Emergency Panic Cloak) */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={onTriggerPanic}
            title="Instant Stealth Screen (or press Esc key)"
            className="flex items-center gap-2 px-3.5 py-2 text-xs font-bold text-white bg-rose-600 hover:bg-rose-500 rounded-lg shadow-sm transition-all whitespace-nowrap shrink-0 cursor-pointer active:scale-95"
          >
            <ShieldAlert className="w-3.5 h-3.5" />
            <span>Panic (Esc)</span>
          </button>
        </div>
      </div>
    </header>
  );
};
