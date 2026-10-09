/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useMemo } from 'react';
import { DEFAULT_GAMES } from './data/defaultGames.js';
import { Header } from './components/Header.jsx';
import { GameCard } from './components/GameCard.jsx';
import { GamePlayerModal } from './components/GamePlayerModal.jsx';
import { JsonManagerModal } from './components/JsonManagerModal.jsx';
import { AddGameModal } from './components/AddGameModal.jsx';
import { TabCloakModal } from './components/TabCloakModal.jsx';
import { PanicCloakOverlay } from './components/PanicCloakOverlay.jsx';
import {
  Search,
  Plus,
  FileCode2,
  Dice5,
  Shield,
  Layers,
  Heart,
  Gamepad2,
} from 'lucide-react';

const STORAGE_GAMES_KEY = 'nova_arcade_games_v1';
const STORAGE_FAVORITES_KEY = 'nova_arcade_favorites_v1';
const STORAGE_CLOAK_PRESET_KEY = 'nova_arcade_cloak_preset_v1';
const STORAGE_CUSTOM_TITLE_KEY = 'nova_arcade_custom_title_v1';

export default function App() {
  // Games state
  const [games, setGames] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_GAMES_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      }
    } catch (e) {
      console.warn('Failed to parse saved games:', e);
    }
    return DEFAULT_GAMES;
  });

  // Favorites state
  const [favorites, setFavorites] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_FAVORITES_KEY);
      if (saved) return JSON.parse(saved);
    } catch (e) {}
    return ['retro-snake', '2048-classic', 'flappy-arcade'];
  });

  // Active playing game
  const [activeGame, setActiveGame] = useState(null);

  // Modals state
  const [isJsonModalOpen, setIsJsonModalOpen] = useState(false);
  const [isAddGameOpen, setIsAddGameOpen] = useState(false);
  const [isCloakModalOpen, setIsCloakModalOpen] = useState(false);
  const [isPanicActive, setIsPanicActive] = useState(false);

  // Tab cloaking
  const [cloakPreset, setCloakPreset] = useState(() => {
    return localStorage.getItem(STORAGE_CLOAK_PRESET_KEY) || 'none';
  });
  const [customTitle, setCustomTitle] = useState(() => {
    return localStorage.getItem(STORAGE_CUSTOM_TITLE_KEY) || '';
  });

  // Search & Filter
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [activeNavTab, setActiveNavTab] = useState('all');

  // Synchronize Tab Cloak with document.title and favicon
  useEffect(() => {
    const titles = {
      none: customTitle || 'Nova Arcade - Unblocked Games Hub',
      classroom: 'Classes · Google Classroom',
      docs: 'AP European History - Unit 4 Study Guide',
      drive: 'My Drive - Google Drive',
      canvas: 'Dashboard · Canvas Network',
      wikipedia: 'Photosynthesis - Wikipedia',
    };

    const favicons = {
      none: '/favicon.ico',
      classroom: 'https://ssl.gstatic.com/classroom/favicon.png',
      docs: 'https://ssl.gstatic.com/docs/documents/images/kix-favicon7.ico',
      drive: 'https://ssl.gstatic.com/images/branding/product/1x/drive_2020q4_32dp.png',
      canvas: 'https://du11hjcvx0uqb.cloudfront.net/dist/images/favicon-e10d657a73.ico',
      wikipedia: 'https://en.wikipedia.org/static/favicon/wikipedia.ico',
    };

    document.title = titles[cloakPreset] || 'Nova Arcade - Unblocked Games Hub';

    let link = document.querySelector("link[rel~='icon']");
    if (!link) {
      link = document.createElement('link');
      link.rel = 'icon';
      document.getElementsByTagName('head')[0].appendChild(link);
    }
    link.href = favicons[cloakPreset] || '/favicon.ico';
  }, [cloakPreset, customTitle]);

  // Global Panic Key Listener (Esc triggers panic disguise screen)
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        // Toggle panic
        setIsPanicActive((prev) => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Sync favorites to localStorage
  useEffect(() => {
    localStorage.setItem(STORAGE_FAVORITES_KEY, JSON.stringify(favorites));
  }, [favorites]);

  // Sync games to localStorage
  const handleSaveGames = (updatedGames) => {
    setGames(updatedGames);
    localStorage.setItem(STORAGE_GAMES_KEY, JSON.stringify(updatedGames));
  };

  const handleResetDefaults = () => {
    setGames(DEFAULT_GAMES);
    localStorage.setItem(STORAGE_GAMES_KEY, JSON.stringify(DEFAULT_GAMES));
  };

  const handleAddGame = (newGame) => {
    const updated = [newGame, ...games];
    handleSaveGames(updated);
    setActiveGame(newGame);
  };

  const handleToggleFavorite = (id, e) => {
    if (e) e.stopPropagation();
    setFavorites((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const handlePlayGame = (game) => {
    // Increment local play count
    const updated = games.map((g) =>
      g.id === game.id ? { ...g, plays: g.plays + 1 } : g
    );
    setGames(updated);
    localStorage.setItem(STORAGE_GAMES_KEY, JSON.stringify(updated));
    setActiveGame(game);
  };

  const handleRandomGame = () => {
    if (games.length === 0) return;
    const randomIdx = Math.floor(Math.random() * games.length);
    handlePlayGame(games[randomIdx]);
  };

  // Filtered games
  const filteredGames = useMemo(() => {
    return games.filter((game) => {
      // Nav tab filter
      if (activeNavTab === 'favorites') {
        if (!favorites.includes(game.id)) return false;
      } else if (activeNavTab === 'arcade') {
        if (game.category.toLowerCase() !== 'arcade') return false;
      } else if (activeNavTab === 'puzzle') {
        if (game.category.toLowerCase() !== 'puzzle') return false;
      } else if (activeNavTab === 'action') {
        if (game.category.toLowerCase() !== 'action') return false;
      }

      // Secondary category filter
      if (selectedCategory !== 'All' && game.category !== selectedCategory) {
        return false;
      }

      // Search query filter
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchTitle = game.title.toLowerCase().includes(q);
        const matchDesc = game.description.toLowerCase().includes(q);
        const matchCategory = game.category.toLowerCase().includes(q);
        const matchTags = game.tags.some((t) => t.toLowerCase().includes(q));
        if (!matchTitle && !matchDesc && !matchCategory && !matchTags) return false;
      }

      return true;
    });
  }, [games, activeNavTab, selectedCategory, searchQuery, favorites]);

  const featuredGame = useMemo(() => {
    return games.find((g) => g.id === 'retro-snake') || games[0];
  }, [games]);

  return (
    <div className="min-h-screen bg-[#070a12] text-slate-100 flex flex-col font-sans selection:bg-sky-500 selection:text-white">
      {/* Panic Cloak Overlay */}
      <PanicCloakOverlay
        isOpen={isPanicActive}
        onClose={() => setIsPanicActive(false)}
        preset={cloakPreset === 'none' ? 'docs' : cloakPreset}
        onPresetChange={(p) => {
          setCloakPreset(p);
          localStorage.setItem(STORAGE_CLOAK_PRESET_KEY, p);
        }}
      />

      {/* Top Bar Contract Header */}
      <Header
        activeTab={activeNavTab}
        onTabChange={(tab) => {
          setActiveNavTab(tab);
          if (tab === 'all') setSelectedCategory('All');
        }}
        onOpenJsonManager={() => setIsJsonModalOpen(true)}
        onOpenAddGame={() => setIsAddGameOpen(true)}
        onOpenCloakSettings={() => setIsCloakModalOpen(true)}
        onTriggerPanic={() => setIsPanicActive(true)}
      />

      {/* Main Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 py-8 space-y-8">
        {/* Hero Section */}
        {activeNavTab === 'all' && !searchQuery && (
          <section className="bg-gradient-to-b from-[#0f172a] to-[#090d16] border border-[#1e293b] rounded-2xl p-6 sm:p-10 relative overflow-hidden shadow-xl">
            <div className="relative z-10 max-w-2xl space-y-4">
              <div className="flex items-center gap-2 text-xs font-mono text-sky-400">
                <span>SANDBOXED IFRAME ENGINE</span>
                <span aria-hidden="true">·</span>
                <span>STORED IN GAMES.JSON</span>
              </div>

              <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-white leading-tight" style={{ textWrap: 'balance' }}>
                Unblocked Arcade Powered by JSON Iframes
              </h1>

              <p className="text-sm sm:text-base text-slate-400 leading-relaxed">
                Play classic arcade, puzzle, and retro web games embedded inside responsive iframes. Every title is stored directly in a portable JSON database with hotkey stealth panic cloaking.
              </p>

              <div className="pt-2 flex flex-wrap items-center gap-3">
                <button
                  onClick={() => featuredGame && handlePlayGame(featuredGame)}
                  className="flex items-center gap-2 px-5 py-2.5 bg-sky-500 hover:bg-sky-400 text-slate-950 font-bold text-sm rounded-lg shadow-md transition-all active:scale-95 cursor-pointer"
                >
                  <Gamepad2 className="w-4 h-4" />
                  <span>Play {featuredGame?.title || 'Game'}</span>
                </button>

                <button
                  onClick={handleRandomGame}
                  className="flex items-center gap-2 px-4 py-2.5 bg-[#1e293b] hover:bg-slate-700 text-slate-200 font-semibold text-sm rounded-lg border border-slate-700 transition-colors cursor-pointer"
                >
                  <Dice5 className="w-4 h-4 text-sky-400" />
                  <span>Random Game</span>
                </button>

                <button
                  onClick={() => setIsJsonModalOpen(true)}
                  className="flex items-center gap-2 px-4 py-2.5 bg-transparent hover:bg-slate-800/60 text-slate-400 hover:text-white font-mono text-xs rounded-lg transition-colors cursor-pointer"
                >
                  <FileCode2 className="w-4 h-4" />
                  <span>View games.json</span>
                </button>
              </div>
            </div>

            {/* Subtle Hero KPI Strip */}
            <div className="mt-8 pt-6 border-t border-[#1e293b] grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs">
              <div>
                <div className="text-slate-400">Database Size</div>
                <div className="text-base font-bold text-white font-mono tabular-nums">{games.length} Games</div>
              </div>
              <div>
                <div className="text-slate-400">Embed Architecture</div>
                <div className="text-base font-bold text-sky-400 font-mono">HTML5 Iframe</div>
              </div>
              <div>
                <div className="text-slate-400">Stealth Switch</div>
                <div className="text-base font-bold text-emerald-400 font-mono">Esc Hotkey</div>
              </div>
              <div>
                <div className="text-slate-400">Delivery Model</div>
                <div className="text-base font-bold text-white font-mono">No External CDN</div>
              </div>
            </div>
          </section>
        )}

        {/* Workspace Toolbar: Search, Category Buttons, Add Game & Actions */}
        <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 pb-2">
          {/* Search Box */}
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
            <input
              type="text"
              placeholder="Search by game title, controls, or tags..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-[#0f172a] border border-[#1e293b] rounded-lg pl-10 pr-4 py-2 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-sky-500 transition-colors"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-white"
              >
                Clear
              </button>
            )}
          </div>

          {/* Action buttons (Add Game, JSON, Cloak) */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1 md:pb-0">
            <button
              onClick={() => setIsAddGameOpen(true)}
              className="flex items-center gap-1.5 px-3.5 py-2 bg-sky-500/10 hover:bg-sky-500/20 text-sky-400 border border-sky-500/30 text-xs font-bold rounded-lg transition-colors whitespace-nowrap shrink-0 cursor-pointer"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Add Custom Game</span>
            </button>

            <button
              onClick={() => setIsJsonModalOpen(true)}
              className="flex items-center gap-1.5 px-3 py-2 bg-[#0f172a] hover:bg-slate-800 border border-[#1e293b] text-xs text-slate-300 font-mono rounded-lg transition-colors whitespace-nowrap shrink-0 cursor-pointer"
              title="Inspect or edit games.json"
            >
              <FileCode2 className="w-3.5 h-3.5 text-sky-400" />
              <span>games.json</span>
            </button>

            <button
              onClick={() => setIsCloakModalOpen(true)}
              className="flex items-center gap-1.5 px-3 py-2 bg-[#0f172a] hover:bg-slate-800 border border-[#1e293b] text-xs text-slate-300 rounded-lg transition-colors whitespace-nowrap shrink-0 cursor-pointer"
              title="Configure tab disguise"
            >
              <Shield className="w-3.5 h-3.5 text-slate-400" />
              <span>Cloak Settings</span>
            </button>
          </div>
        </div>

        {/* Functional Segmented Category Tabs (Buttons, not static pills) */}
        <div className="flex items-center gap-1 overflow-x-auto pb-2 border-b border-[#1e293b]">
          {['All', 'Arcade', 'Puzzle', 'Action', 'Retro', 'Sports'].map((cat) => {
            const isSelected = selectedCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => {
                  setSelectedCategory(cat);
                  setActiveNavTab('all');
                }}
                className={`px-3.5 py-1.5 text-xs font-semibold rounded-md transition-colors whitespace-nowrap cursor-pointer ${
                  isSelected
                    ? 'bg-slate-800 text-sky-400 border border-slate-700'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900/60'
                }`}
              >
                {cat}
              </button>
            );
          })}

          <button
            onClick={() => {
              setActiveNavTab('favorites');
              setSelectedCategory('All');
            }}
            className={`flex items-center gap-1 px-3.5 py-1.5 text-xs font-semibold rounded-md transition-colors whitespace-nowrap ml-2 cursor-pointer ${
              activeNavTab === 'favorites'
                ? 'bg-rose-950/60 text-rose-300 border border-rose-800'
                : 'text-slate-400 hover:text-rose-400 hover:bg-slate-900/60'
            }`}
          >
            <Heart className="w-3.5 h-3.5 fill-rose-500/40 text-rose-500" />
            <span>Favorites ({favorites.length})</span>
          </button>
        </div>

        {/* Section Title & Game Count */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <h2 className="text-lg font-bold text-white tracking-tight">
              {activeNavTab === 'favorites'
                ? 'Favorite Games'
                : selectedCategory === 'All'
                ? 'All Arcade Games'
                : `${selectedCategory} Games`}
            </h2>
            <span className="text-xs text-slate-500 font-mono tabular-nums">
              ({filteredGames.length} available)
            </span>
          </div>

          {searchQuery && (
            <span className="text-xs text-slate-400">
              Filtering by: &ldquo;{searchQuery}&rdquo;
            </span>
          )}
        </div>

        {/* Games Grid */}
        {filteredGames.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
            {filteredGames.map((game) => (
              <GameCard
                key={game.id}
                game={game}
                onPlay={handlePlayGame}
                isFavorite={favorites.includes(game.id)}
                onToggleFavorite={handleToggleFavorite}
              />
            ))}
          </div>
        ) : (
          /* Empty State */
          <div className="bg-[#0f172a] border border-[#1e293b] rounded-xl p-12 text-center space-y-4">
            <div className="w-12 h-12 rounded-full bg-slate-800 text-slate-400 flex items-center justify-center mx-auto">
              <Layers className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white">No games match your criteria</h3>
              <p className="text-xs text-slate-400 mt-1 max-w-sm mx-auto">
                Try searching for a different keyword or add your own custom iframe game to the library.
              </p>
            </div>
            <div className="flex items-center justify-center gap-3 pt-2">
              <button
                onClick={() => {
                  setSearchQuery('');
                  setSelectedCategory('All');
                  setActiveNavTab('all');
                }}
                className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-white rounded-lg transition-colors cursor-pointer"
              >
                Reset Filters
              </button>
              <button
                onClick={() => setIsAddGameOpen(true)}
                className="px-4 py-2 bg-sky-500 hover:bg-sky-400 text-xs font-bold text-slate-950 rounded-lg transition-colors cursor-pointer"
              >
                Add Game to JSON
              </button>
            </div>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="border-t border-[#1e293b] bg-[#090d16] py-8 text-xs text-slate-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <span className="font-bold text-slate-300">Nova Arcade</span>
            <span aria-hidden="true">·</span>
            <span>JSON Iframe Game Hub</span>
            <span aria-hidden="true">·</span>
            <span>No AI Features</span>
          </div>

          <div className="flex items-center gap-4 text-[11px]">
            <span>Press <kbd className="px-1.5 py-0.5 bg-slate-800 border border-slate-700 rounded text-slate-300 font-mono">Esc</kbd> for Stealth Panic</span>
            <button
              onClick={() => setIsJsonModalOpen(true)}
              className="hover:text-slate-300 underline underline-offset-2"
            >
              Export JSON
            </button>
            <button
              onClick={() => setIsCloakModalOpen(true)}
              className="hover:text-slate-300 underline underline-offset-2"
            >
              Tab Cloaking
            </button>
          </div>
        </div>
      </footer>

      {/* Game Player Modal */}
      <GamePlayerModal
        game={activeGame}
        onClose={() => setActiveGame(null)}
        isFavorite={activeGame ? favorites.includes(activeGame.id) : false}
        onToggleFavorite={handleToggleFavorite}
      />

      {/* JSON Manager Modal */}
      <JsonManagerModal
        isOpen={isJsonModalOpen}
        onClose={() => setIsJsonModalOpen(false)}
        games={games}
        onSaveGames={handleSaveGames}
        onResetDefaults={handleResetDefaults}
      />

      {/* Add Game Modal */}
      <AddGameModal
        isOpen={isAddGameOpen}
        onClose={() => setIsAddGameOpen(false)}
        onAddGame={handleAddGame}
      />

      {/* Tab Cloak Modal */}
      <TabCloakModal
        isOpen={isCloakModalOpen}
        onClose={() => setIsCloakModalOpen(false)}
        activePreset={cloakPreset}
        onSelectPreset={(p, custom) => {
          setCloakPreset(p);
          localStorage.setItem(STORAGE_CLOAK_PRESET_KEY, p);
          if (custom) {
            setCustomTitle(custom);
            localStorage.setItem(STORAGE_CUSTOM_TITLE_KEY, custom);
          }
        }}
        customTitle={customTitle}
        setCustomTitle={setCustomTitle}
      />
    </div>
  );
}
