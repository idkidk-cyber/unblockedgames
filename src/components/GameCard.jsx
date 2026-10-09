import React from 'react';
import { Play, Heart, Code2 } from 'lucide-react';

export const GameCard = ({
  game,
  onPlay,
  isFavorite,
  onToggleFavorite,
}) => {
  // Deterministic icon/vector graphic depending on the game
  const renderGameIcon = () => {
    switch (game.id) {
      case 'retro-snake':
        return (
          <div className="w-full h-full bg-[#020617] flex items-center justify-center relative overflow-hidden group-hover:scale-105 transition-transform duration-300">
            <div className="absolute inset-0 bg-gradient-to-tr from-sky-950/40 to-transparent" />
            <div className="w-16 h-16 border-2 border-sky-500/30 rounded-lg p-2 flex flex-col justify-between">
              <div className="flex gap-1">
                <div className="w-2 h-2 rounded-xs bg-sky-400" />
                <div className="w-2 h-2 rounded-xs bg-sky-500" />
                <div className="w-2 h-2 rounded-xs bg-sky-600" />
              </div>
              <div className="flex justify-end">
                <div className="w-2.5 h-2.5 rounded-full bg-rose-500 animate-pulse" />
              </div>
            </div>
          </div>
        );
      case '2048-classic':
        return (
          <div className="w-full h-full bg-[#1e293b] flex items-center justify-center relative group-hover:scale-105 transition-transform duration-300">
            <div className="grid grid-cols-2 gap-1.5 p-3 bg-slate-900 rounded-lg border border-slate-700">
              <div className="w-6 h-6 bg-amber-500 rounded flex items-center justify-center text-[10px] font-black text-white">8</div>
              <div className="w-6 h-6 bg-orange-600 rounded flex items-center justify-center text-[10px] font-black text-white">16</div>
              <div className="w-6 h-6 bg-red-600 rounded flex items-center justify-center text-[10px] font-black text-white">64</div>
              <div className="w-6 h-6 bg-amber-400 rounded flex items-center justify-center text-[9px] font-black text-black">2048</div>
            </div>
          </div>
        );
      case 'flappy-arcade':
        return (
          <div className="w-full h-full bg-gradient-to-b from-sky-600 to-sky-400 flex items-center justify-center relative group-hover:scale-105 transition-transform duration-300">
            <div className="w-7 h-7 rounded-full bg-yellow-400 border-2 border-yellow-600 relative flex items-center justify-center shadow-md">
              <div className="w-1.5 h-1.5 rounded-full bg-black ml-1.5 -mt-1" />
              <div className="absolute -right-2 top-2 w-3 h-2 bg-orange-500 rounded-xs" />
            </div>
          </div>
        );
      case 'space-defenders':
        return (
          <div className="w-full h-full bg-black flex items-center justify-center relative group-hover:scale-105 transition-transform duration-300">
            <div className="space-y-2 text-center">
              <div className="text-emerald-400 font-mono text-xl tracking-widest font-black">👾 👾</div>
              <div className="text-sky-400 font-mono text-sm tracking-widest">▲</div>
            </div>
          </div>
        );
      case 'breakout-arcade':
        return (
          <div className="w-full h-full bg-[#020617] flex flex-col items-center justify-center gap-2 relative group-hover:scale-105 transition-transform duration-300">
            <div className="flex gap-1">
              <div className="w-4 h-2 bg-rose-500 rounded-xs" />
              <div className="w-4 h-2 bg-amber-500 rounded-xs" />
              <div className="w-4 h-2 bg-emerald-500 rounded-xs" />
              <div className="w-4 h-2 bg-sky-500 rounded-xs" />
            </div>
            <div className="w-2 h-2 rounded-full bg-white shadow-sm" />
            <div className="w-12 h-2 bg-sky-400 rounded-xs" />
          </div>
        );
      case 'dino-runner':
        return (
          <div className="w-full h-full bg-[#0a0f1d] flex items-center justify-center relative group-hover:scale-105 transition-transform duration-300">
            <div className="flex items-end gap-3 pb-2 border-b-2 border-slate-700 w-3/4 justify-center">
              <div className="w-5 h-7 bg-emerald-500 rounded-xs flex items-start justify-end p-0.5">
                <div className="w-1 h-1 bg-black" />
              </div>
              <div className="w-2 h-5 bg-emerald-600 rounded-xs" />
            </div>
          </div>
        );
      case 'pong-duel':
        return (
          <div className="w-full h-full bg-[#050811] flex items-center justify-between px-6 relative group-hover:scale-105 transition-transform duration-300">
            <div className="w-1.5 h-8 bg-sky-400 rounded-xs" />
            <div className="w-2 h-2 rounded-full bg-white animate-ping" />
            <div className="w-1.5 h-8 bg-rose-500 rounded-xs" />
          </div>
        );
      case 'minesweeper-classic':
        return (
          <div className="w-full h-full bg-[#0f172a] flex items-center justify-center relative group-hover:scale-105 transition-transform duration-300">
            <div className="grid grid-cols-3 gap-0.5 bg-slate-950 p-1.5 rounded border border-slate-700">
              <div className="w-5 h-5 bg-slate-800 flex items-center justify-center text-[10px] text-sky-400 font-bold">1</div>
              <div className="w-5 h-5 bg-slate-800 flex items-center justify-center text-[10px] text-emerald-400 font-bold">2</div>
              <div className="w-5 h-5 bg-slate-800 flex items-center justify-center text-[10px] text-red-500 font-bold">🚩</div>
              <div className="w-5 h-5 bg-slate-700" />
              <div className="w-5 h-5 bg-slate-800 flex items-center justify-center text-[10px]">💣</div>
              <div className="w-5 h-5 bg-slate-700" />
            </div>
          </div>
        );
      case 'tetris-stacker':
        return (
          <div className="w-full h-full bg-[#020617] flex items-center justify-center relative group-hover:scale-105 transition-transform duration-300">
            <div className="grid grid-cols-3 gap-0.5">
              <div className="w-4 h-4 bg-purple-500 rounded-xs" />
              <div className="w-4 h-4 bg-purple-500 rounded-xs" />
              <div className="w-4 h-4 bg-purple-500 rounded-xs" />
              <div className="w-4 h-4" />
              <div className="w-4 h-4 bg-purple-500 rounded-xs" />
              <div className="w-4 h-4" />
            </div>
          </div>
        );
      case 'pac-maze':
        return (
          <div className="w-full h-full bg-black flex items-center justify-center relative group-hover:scale-105 transition-transform duration-300">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded-full bg-yellow-400 relative">
                <div className="absolute right-0 top-1 w-0 h-0 border-t-[6px] border-t-transparent border-b-[6px] border-b-transparent border-r-[10px] border-r-black" />
              </div>
              <div className="w-1.5 h-1.5 rounded-full bg-yellow-100" />
              <div className="w-1.5 h-1.5 rounded-full bg-yellow-100" />
              <div className="w-5 h-5 bg-rose-500 rounded-t-full" />
            </div>
          </div>
        );
      default:
        return (
          <div className="w-full h-full bg-slate-900 flex items-center justify-center">
            <Code2 className="w-8 h-8 text-sky-400" />
          </div>
        );
    }
  };

  return (
    <div
      onClick={() => onPlay(game)}
      className="group bg-[#0f172a] border border-[#1e293b] hover:border-slate-600 rounded-xl overflow-hidden flex flex-col transition-all duration-200 cursor-pointer shadow-md hover:shadow-xl relative"
    >
      {/* Thumbnail Banner */}
      <div className="h-36 w-full relative overflow-hidden bg-slate-950">
        {renderGameIcon()}

        {/* Favorite Button */}
        <button
          onClick={(e) => onToggleFavorite(game.id, e)}
          className="absolute top-2.5 right-2.5 p-1.5 rounded-lg bg-black/60 hover:bg-black/80 text-white backdrop-blur-xs transition-colors z-10"
          title={isFavorite ? 'Favorited' : 'Add to favorites'}
        >
          <Heart
            className={`w-4 h-4 transition-transform group-hover:scale-110 ${
              isFavorite ? 'fill-rose-500 text-rose-500' : 'text-slate-300 hover:text-white'
            }`}
          />
        </button>

        {/* Play Overlay On Hover */}
        <div className="absolute inset-0 bg-sky-950/60 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center backdrop-blur-[1px]">
          <div className="w-12 h-12 rounded-full bg-sky-400 text-slate-950 flex items-center justify-center shadow-lg transform translate-y-2 group-hover:translate-y-0 transition-transform">
            <Play className="w-5 h-5 fill-slate-950 ml-0.5" />
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-4 flex-1 flex flex-col justify-between">
        <div>
          {/* Zero-Pill Unboxed Metadata */}
          <div className="flex items-center gap-2 text-xs text-slate-400 mb-1.5">
            <span className="text-sky-400 font-medium">{game.category}</span>
            <span aria-hidden="true">·</span>
            <span className="font-mono tabular-nums">{game.plays.toLocaleString()} plays</span>
            {game.isCustom && (
              <>
                <span aria-hidden="true">·</span>
                <span className="text-amber-400 font-mono text-[10px]">Custom</span>
              </>
            )}
          </div>

          <h3 className="text-base font-bold text-white group-hover:text-sky-300 transition-colors tracking-tight line-clamp-1">
            {game.title}
          </h3>

          <p className="text-xs text-slate-400 mt-1 line-clamp-2 leading-relaxed">
            {game.description}
          </p>
        </div>

        {/* Footer controls preview */}
        <div className="mt-3 pt-3 border-t border-[#1e293b] flex items-center justify-between text-[11px] text-slate-500">
          <span className="truncate">{game.controls.split('·')[0]}</span>
          <span className="text-sky-400 group-hover:translate-x-0.5 transition-transform shrink-0 font-medium ml-2">
            Play →
          </span>
        </div>
      </div>
    </div>
  );
};
