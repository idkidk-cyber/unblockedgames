import React, { useState, useRef } from 'react';
import {
  X,
  Maximize2,
  Minimize2,
  RotateCw,
  ExternalLink,
  Code,
  Heart,
  Gamepad2,
  Tv
} from 'lucide-react';

export const GamePlayerModal = ({
  game,
  onClose,
  isFavorite,
  onToggleFavorite,
}) => {
  const [iframeKey, setIframeKey] = useState(0);
  const [isTheater, setIsTheater] = useState(false);
  const [copiedEmbed, setCopiedEmbed] = useState(false);
  const containerRef = useRef(null);

  if (!game) return null;

  const handleReload = () => {
    setIframeKey((prev) => prev + 1);
  };

  const handleToggleFullscreen = () => {
    if (!containerRef.current) return;
    if (!document.fullscreenElement) {
      containerRef.current.requestFullscreen().catch(() => {});
    } else {
      document.exitFullscreen().catch(() => {});
    }
  };

  const handleCopyEmbed = () => {
    const code =
      game.iframeCode ||
      `<iframe src="${game.iframeSrc}" width="100%" height="100%" frameborder="0" allowfullscreen sandbox="allow-scripts allow-same-origin allow-pointer-lock"></iframe>`;
    navigator.clipboard.writeText(code);
    setCopiedEmbed(true);
    setTimeout(() => setCopiedEmbed(false), 2000);
  };

  const handleOpenBlank = () => {
    const win = window.open('about:blank', '_blank');
    if (win) {
      win.document.write(`
        <!DOCTYPE html>
        <html>
          <head>
            <title>Classes · Google Classroom</title>
            <style>
              body, html { margin:0; padding:0; height:100%; overflow:hidden; background:#000; }
              iframe { width:100%; height:100%; border:none; }
            </style>
          </head>
          <body>
            <iframe src="${window.location.origin}${game.iframeSrc}" allowfullscreen></iframe>
          </body>
        </html>
      `);
      win.document.close();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 md:p-4 bg-black/90 backdrop-blur-xs overflow-y-auto">
      <div
        ref={containerRef}
        className={`bg-[#0f172a] border border-[#1e293b] rounded-xl flex flex-col shadow-2xl transition-all duration-200 ${
          isTheater
            ? 'w-full max-w-[98vw] h-[96vh]'
            : 'w-full max-w-4xl max-h-[92vh]'
        }`}
      >
        {/* Top Player Action Bar */}
        <div className="flex items-center justify-between px-4 py-3 border-b border-[#1e293b] bg-[#0b0f19]">
          <div className="flex items-center gap-3 min-w-0">
            <div
              className="w-3 h-3 rounded-full shrink-0"
              style={{ backgroundColor: game.accentColor || '#38bdf8' }}
            />
            <div className="truncate">
              <h2 className="text-sm font-bold text-white truncate">{game.title}</h2>
              <div className="text-[11px] text-slate-400 flex items-center gap-2">
                <span>{game.category}</span>
                <span aria-hidden="true">·</span>
                <span className="font-mono tabular-nums">{game.plays.toLocaleString()} plays</span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-1.5 shrink-0">
            {/* Favorite toggle */}
            <button
              onClick={() => onToggleFavorite(game.id)}
              title={isFavorite ? 'Remove Favorite' : 'Save to Favorites'}
              className={`p-2 rounded-lg text-xs transition-colors flex items-center gap-1 ${
                isFavorite
                  ? 'text-rose-400 bg-rose-950/40 hover:bg-rose-900/60'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800'
              }`}
            >
              <Heart className={`w-4 h-4 ${isFavorite ? 'fill-rose-400' : ''}`} />
            </button>

            {/* Reload Iframe */}
            <button
              onClick={handleReload}
              title="Reload Game Frame"
              className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
            >
              <RotateCw className="w-4 h-4" />
            </button>

            {/* Theater Mode Toggle */}
            <button
              onClick={() => setIsTheater(!isTheater)}
              title={isTheater ? 'Default Size' : 'Theater Mode'}
              className={`p-2 rounded-lg transition-colors ${
                isTheater
                  ? 'text-sky-400 bg-sky-950/50'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800'
              }`}
            >
              <Tv className="w-4 h-4" />
            </button>

            {/* Fullscreen */}
            <button
              onClick={handleToggleFullscreen}
              title="Fullscreen Mode"
              className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
            >
              {document.fullscreenElement ? (
                <Minimize2 className="w-4 h-4" />
              ) : (
                <Maximize2 className="w-4 h-4" />
              )}
            </button>

            {/* Open in Blank Tab */}
            <button
              onClick={handleOpenBlank}
              title="Open in Stealth Blank Window"
              className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors hidden sm:inline-flex"
            >
              <ExternalLink className="w-4 h-4" />
            </button>

            {/* Copy Embed Code */}
            <button
              onClick={handleCopyEmbed}
              title="Copy Iframe Code"
              className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors hidden sm:inline-flex"
            >
              <Code className="w-4 h-4" />
            </button>

            <div className="w-[1px] h-5 bg-slate-700 mx-1" />

            {/* Close */}
            <button
              onClick={onClose}
              className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
              aria-label="Close game"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Embedded Iframe Viewport */}
        <div
          className={`relative bg-[#020617] w-full flex items-center justify-center overflow-hidden ${
            isTheater ? 'flex-1 min-h-[500px]' : 'h-[460px] md:h-[520px]'
          }`}
        >
          <iframe
            key={iframeKey}
            src={game.iframeSrc}
            title={game.title}
            className="w-full h-full border-0 select-none"
            sandbox="allow-scripts allow-same-origin allow-pointer-lock allow-forms"
            allow="fullscreen; autoplay; gamepad"
            loading="eager"
          />
        </div>

        {/* Game Details & Controls Bar */}
        <div className="p-4 bg-[#090d16] border-t border-[#1e293b] flex flex-col md:flex-row md:items-center justify-between gap-3 text-xs">
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-slate-300 font-medium">
              <Gamepad2 className="w-4 h-4 text-sky-400 shrink-0" />
              <span>Controls: {game.controls}</span>
            </div>
            <p className="text-slate-400 text-[11px] leading-relaxed max-w-xl">
              {game.description}
            </p>
          </div>

          <div className="flex items-center gap-2 self-start md:self-auto shrink-0">
            {copiedEmbed && (
              <span className="text-[11px] text-emerald-400 font-mono">
                &lt;iframe&gt; code copied!
              </span>
            )}
            <button
              onClick={handleCopyEmbed}
              className="px-3 py-1.5 bg-[#1e293b] hover:bg-slate-700 text-slate-300 rounded-md font-mono text-[11px] transition-colors"
            >
              Copy Embed
            </button>
            <button
              onClick={handleReload}
              className="px-3 py-1.5 bg-[#1e293b] hover:bg-slate-700 text-slate-300 rounded-md text-[11px] transition-colors"
            >
              Restart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
