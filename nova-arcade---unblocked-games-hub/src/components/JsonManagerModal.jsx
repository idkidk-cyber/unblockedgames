import React, { useState, useEffect } from 'react';
import { X, Copy, Download, Upload, RotateCcw, Check, AlertCircle } from 'lucide-react';

export const JsonManagerModal = ({
  isOpen,
  onClose,
  games,
  onSaveGames,
  onResetDefaults,
}) => {
  const [jsonString, setJsonString] = useState(() => JSON.stringify(games, null, 2));
  const [isCopied, setIsCopied] = useState(false);
  const [errorMsg, setErrorMsg] = useState(null);
  const [saveSuccess, setSaveSuccess] = useState(false);

  // Sync state when opened
  useEffect(() => {
    if (isOpen) {
      setJsonString(JSON.stringify(games, null, 2));
      setErrorMsg(null);
      setSaveSuccess(false);
    }
  }, [isOpen, games]);

  if (!isOpen) return null;

  const handleCopy = () => {
    navigator.clipboard.writeText(jsonString);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  const handleDownload = () => {
    const blob = new Blob([jsonString], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'games.json';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleFileUpload = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const content = event.target?.result;
        const parsed = JSON.parse(content);
        if (!Array.isArray(parsed)) {
          throw new Error('JSON root must be an array of games.');
        }
        setJsonString(JSON.stringify(parsed, null, 2));
        setErrorMsg(null);
      } catch (err) {
        setErrorMsg(err.message || 'Invalid JSON file format.');
      }
    };
    reader.readAsText(file);
  };

  const handleSave = () => {
    try {
      const parsed = JSON.parse(jsonString);
      if (!Array.isArray(parsed)) {
        throw new Error('Root JSON must be an array of game objects.');
      }
      // Simple validation
      for (const item of parsed) {
        if (!item.id || !item.title || !item.iframeSrc) {
          throw new Error(`Invalid game object: Missing id, title, or iframeSrc.`);
        }
      }
      onSaveGames(parsed);
      setErrorMsg(null);
      setSaveSuccess(true);
      setTimeout(() => setSaveSuccess(false), 2500);
    } catch (err) {
      setErrorMsg(err.message || 'Invalid JSON format.');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-xs">
      <div className="bg-[#0f172a] border border-[#1e293b] rounded-xl max-w-3xl w-full flex flex-col max-h-[90vh] shadow-2xl text-slate-200">
        {/* Header */}
        <div className="flex items-center justify-between p-5 border-b border-[#1e293b]">
          <div>
            <h2 className="text-lg font-bold text-white tracking-tight">games.json Library Database</h2>
            <p className="text-xs text-slate-400 mt-0.5">
              Each game is stored with its iframe source, embed code, and metadata in this JSON dataset ({games.length} games loaded).
            </p>
          </div>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-white p-1 rounded-md hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Toolbar */}
        <div className="flex flex-wrap items-center justify-between gap-3 px-5 py-3 bg-[#090d16] border-b border-[#1e293b]">
          <div className="flex items-center gap-2">
            <button
              onClick={handleCopy}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-[#1e293b] hover:bg-slate-700 text-xs text-slate-200 rounded-md font-medium transition-colors"
            >
              {isCopied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5 text-slate-400" />}
              {isCopied ? 'Copied!' : 'Copy JSON'}
            </button>
            <button
              onClick={handleDownload}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-[#1e293b] hover:bg-slate-700 text-xs text-slate-200 rounded-md font-medium transition-colors"
            >
              <Download className="w-3.5 h-3.5 text-slate-400" />
              Download games.json
            </button>
            <label className="flex items-center gap-1.5 px-3 py-1.5 bg-[#1e293b] hover:bg-slate-700 text-xs text-slate-200 rounded-md font-medium transition-colors cursor-pointer">
              <Upload className="w-3.5 h-3.5 text-slate-400" />
              Import File
              <input type="file" accept=".json" onChange={handleFileUpload} className="hidden" />
            </label>
          </div>

          <button
            onClick={() => {
              if (confirm('Reset to default built-in games list? Any custom additions will be cleared.')) {
                onResetDefaults();
                onClose();
              }
            }}
            className="flex items-center gap-1 text-xs text-rose-400 hover:text-rose-300 font-medium py-1 px-2 rounded hover:bg-rose-950/30 transition-colors"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            Reset Defaults
          </button>
        </div>

        {/* Code Editor Body */}
        <div className="flex-1 p-4 overflow-hidden flex flex-col min-h-[350px]">
          {errorMsg && (
            <div className="mb-3 p-3 bg-rose-950/60 border border-rose-800 text-rose-300 text-xs rounded-lg flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{errorMsg}</span>
            </div>
          )}

          {saveSuccess && (
            <div className="mb-3 p-3 bg-emerald-950/60 border border-emerald-800 text-emerald-300 text-xs rounded-lg flex items-center gap-2">
              <Check className="w-4 h-4 shrink-0" />
              <span>Successfully saved games.json! The library has been updated.</span>
            </div>
          )}

          <textarea
            value={jsonString}
            onChange={(e) => {
              setJsonString(e.target.value);
              setErrorMsg(null);
            }}
            spellCheck={false}
            className="flex-1 w-full bg-[#020617] border border-[#1e293b] rounded-lg p-3 font-mono text-xs text-emerald-400 leading-relaxed resize-none focus:outline-none focus:border-sky-500"
          />
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-[#1e293b] flex items-center justify-between bg-[#090d16]">
          <span className="text-xs text-slate-500">
            Edit directly above to add or modify any game iframe configuration.
          </span>
          <div className="flex items-center gap-2">
            <button
              onClick={onClose}
              className="px-4 py-2 text-xs font-medium text-slate-300 hover:text-white bg-slate-800 hover:bg-slate-700 rounded-lg transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={handleSave}
              className="px-5 py-2 text-xs font-bold text-slate-950 bg-sky-400 hover:bg-sky-300 rounded-lg transition-colors"
            >
              Save JSON Changes
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
