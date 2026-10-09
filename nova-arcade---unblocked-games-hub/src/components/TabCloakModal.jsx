import React, { useState } from 'react';
import { X, Shield, Check } from 'lucide-react';

export const TabCloakModal = ({
  isOpen,
  onClose,
  activePreset,
  onSelectPreset,
  customTitle,
  setCustomTitle,
}) => {
  const [inputTitle, setInputTitle] = useState(customTitle || '');

  if (!isOpen) return null;

  const presets = [
    {
      id: 'none',
      name: 'Default (No Cloak)',
      title: 'Nova Arcade - Unblocked Games Hub',
      subtitle: 'Original gamer theme and branding'
    },
    {
      id: 'classroom',
      name: 'Google Classroom',
      title: 'Classes · Google Classroom',
      subtitle: 'Disguises tab as your school classroom portal'
    },
    {
      id: 'docs',
      name: 'Google Docs',
      title: 'AP European History - Unit 4 Study Guide',
      subtitle: 'Disguises tab as an active homework essay'
    },
    {
      id: 'drive',
      name: 'Google Drive',
      title: 'My Drive - Google Drive',
      subtitle: 'Disguises tab as your Google Drive folder'
    },
    {
      id: 'canvas',
      name: 'Canvas LMS',
      title: 'Dashboard · Canvas Network',
      subtitle: 'Disguises tab as your school Canvas dashboard'
    },
    {
      id: 'wikipedia',
      name: 'Wikipedia Article',
      title: 'Photosynthesis - Wikipedia',
      subtitle: 'Disguises tab as a scientific research article'
    }
  ];

  const handleApplyCustom = (e) => {
    e.preventDefault();
    if (inputTitle.trim()) {
      setCustomTitle(inputTitle.trim());
      onSelectPreset('none', inputTitle.trim());
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-xs">
      <div className="bg-[#0f172a] border border-[#1e293b] rounded-xl max-w-lg w-full p-6 text-slate-200 shadow-2xl relative">
        <div className="flex items-center justify-between pb-4 border-b border-[#1e293b]">
          <div className="flex items-center gap-2.5">
            <Shield className="w-5 h-5 text-sky-400" />
            <h2 className="text-lg font-bold text-white tracking-tight">Tab Cloaking & Stealth</h2>
          </div>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-white p-1 rounded-md hover:bg-slate-800 transition-colors"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <p className="text-xs text-slate-400 mt-3 leading-relaxed">
          Tab cloaking alters the title and favicon shown on your browser tab so teachers, parents, or observers cannot see you are playing games.
        </p>

        <div className="mt-4 space-y-2">
          {presets.map((p) => {
            const isSelected = activePreset === p.id;
            return (
              <button
                key={p.id}
                onClick={() => onSelectPreset(p.id)}
                className={`w-full text-left p-3 rounded-lg border transition-all flex items-center justify-between ${
                  isSelected
                    ? 'border-sky-500 bg-sky-950/40 text-white'
                    : 'border-[#1e293b] bg-[#090d16] hover:border-slate-600 text-slate-300'
                }`}
              >
                <div>
                  <div className="text-sm font-semibold flex items-center gap-2">
                    {p.name}
                    {isSelected && <span className="text-[10px] bg-sky-500/20 text-sky-400 px-2 py-0.5 rounded font-mono">ACTIVE</span>}
                  </div>
                  <div className="text-xs text-slate-400 font-mono mt-0.5">{p.title}</div>
                  <div className="text-[11px] text-slate-500 mt-0.5">{p.subtitle}</div>
                </div>
                {isSelected && <Check className="w-5 h-5 text-sky-400 shrink-0" />}
              </button>
            );
          })}
        </div>

        {/* Custom Tab Title Input */}
        <form onSubmit={handleApplyCustom} className="mt-4 pt-4 border-t border-[#1e293b]">
          <label className="block text-xs font-medium text-slate-300 mb-1">
            Custom Tab Title
          </label>
          <div className="flex gap-2">
            <input
              type="text"
              placeholder="e.g. Student Portal - Biology 101"
              value={inputTitle}
              onChange={(e) => setInputTitle(e.target.value)}
              className="flex-1 bg-[#090d16] border border-[#1e293b] rounded-lg px-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-sky-500"
            />
            <button
              type="submit"
              className="bg-slate-800 hover:bg-slate-700 text-white text-xs px-3 py-2 rounded-lg font-medium border border-slate-700"
            >
              Apply
            </button>
          </div>
        </form>

        <div className="mt-5 pt-3 border-t border-[#1e293b] flex items-center justify-between">
          <div className="text-[11px] text-slate-400">
            Emergency panic button: Press <kbd className="px-1.5 py-0.5 bg-slate-800 border border-slate-700 rounded font-mono text-white text-[10px]">Esc</kbd> anytime
          </div>
          <button
            onClick={onClose}
            className="bg-sky-500 hover:bg-sky-400 text-slate-950 font-bold text-xs px-4 py-2 rounded-lg transition-colors"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
};
