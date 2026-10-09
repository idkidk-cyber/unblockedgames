import React, { useState } from 'react';
import { X, Plus, Gamepad2 } from 'lucide-react';

export const AddGameModal = ({
  isOpen,
  onClose,
  onAddGame,
}) => {
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('Arcade');
  const [iframeInput, setIframeInput] = useState('');
  const [description, setDescription] = useState('');
  const [controls, setControls] = useState('');
  const [tagsInput, setTagsInput] = useState('');
  const [error, setError] = useState(null);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim()) {
      setError('Please provide a game title.');
      return;
    }
    if (!iframeInput.trim()) {
      setError('Please provide an iframe URL or embed code.');
      return;
    }

    let src = iframeInput.trim();
    let code = iframeInput.trim();

    // Check if input is a full <iframe> tag or just a URL
    if (iframeInput.includes('<iframe')) {
      const match = iframeInput.match(/src=["']([^"']+)["']/);
      if (match && match[1]) {
        src = match[1];
      }
      code = iframeInput;
    } else {
      code = `<iframe src="${src}" width="100%" height="100%" frameborder="0" allowfullscreen sandbox="allow-scripts allow-same-origin allow-pointer-lock"></iframe>`;
    }

    const tags = tagsInput
      .split(',')
      .map((t) => t.trim())
      .filter(Boolean);

    const newGame = {
      id: 'custom-' + Date.now().toString(36),
      title: title.trim(),
      category,
      description: description.trim() || 'Custom game loaded via iframe.',
      iframeSrc: src,
      iframeCode: code,
      controls: controls.trim() || 'Click inside game area to play',
      tags: tags.length ? tags : [category, 'Web'],
      plays: 1,
      aspectRatio: '16/9',
      isCustom: true,
      accentColor: '#38bdf8'
    };

    onAddGame(newGame);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-xs">
      <div className="bg-[#0f172a] border border-[#1e293b] rounded-xl max-w-lg w-full p-6 text-slate-200 shadow-2xl">
        <div className="flex items-center justify-between pb-4 border-b border-[#1e293b]">
          <div className="flex items-center gap-2">
            <Gamepad2 className="w-5 h-5 text-sky-400" />
            <h2 className="text-lg font-bold text-white tracking-tight">Add Game to JSON Library</h2>
          </div>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-white p-1 rounded-md hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {error && (
          <div className="mt-4 p-3 bg-rose-950/60 border border-rose-800 text-rose-300 text-xs rounded-lg">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="mt-4 space-y-4">
          <div>
            <label className="block text-xs font-medium text-slate-300 mb-1">
              Game Title *
            </label>
            <input
              type="text"
              required
              placeholder="e.g. Slope Runner 3D"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full bg-[#090d16] border border-[#1e293b] rounded-lg px-3 py-2 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-sky-500"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1">
                Category
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full bg-[#090d16] border border-[#1e293b] rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-sky-500"
              >
                <option value="Arcade">Arcade</option>
                <option value="Puzzle">Puzzle</option>
                <option value="Action">Action</option>
                <option value="Retro">Retro</option>
                <option value="Sports">Sports</option>
                <option value="Strategy">Strategy</option>
                <option value="Other">Other</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1">
                Tags (comma separated)
              </label>
              <input
                type="text"
                placeholder="Arcade, Fast, 3D"
                value={tagsInput}
                onChange={(e) => setTagsInput(e.target.value)}
                className="w-full bg-[#090d16] border border-[#1e293b] rounded-lg px-3 py-2 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-sky-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-medium text-slate-300 mb-1">
              Iframe URL or &lt;iframe&gt; Embed Code *
            </label>
            <textarea
              required
              rows={3}
              placeholder='Paste iframe URL (e.g. /games/mygame.html or https://...) or full <iframe src="..."></iframe> embed code'
              value={iframeInput}
              onChange={(e) => setIframeInput(e.target.value)}
              className="w-full bg-[#090d16] border border-[#1e293b] rounded-lg p-3 text-xs font-mono text-white placeholder-slate-500 focus:outline-none focus:border-sky-500 resize-none"
            />
            <span className="text-[11px] text-slate-500 mt-1 block">
              Will be saved as an iframe object in games.json.
            </span>
          </div>

          <div>
            <label className="block text-xs font-medium text-slate-300 mb-1">
              Description
            </label>
            <input
              type="text"
              placeholder="Brief description of gameplay..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full bg-[#090d16] border border-[#1e293b] rounded-lg px-3 py-2 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-sky-500"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-slate-300 mb-1">
              Controls Guide
            </label>
            <input
              type="text"
              placeholder="e.g. Arrow keys to steer, Space to brake"
              value={controls}
              onChange={(e) => setControls(e.target.value)}
              className="w-full bg-[#090d16] border border-[#1e293b] rounded-lg px-3 py-2 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-sky-500"
            />
          </div>

          <div className="pt-3 border-t border-[#1e293b] flex items-center justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-xs font-medium text-slate-400 hover:text-white rounded-lg transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex items-center gap-1.5 px-4 py-2 text-xs font-bold text-slate-950 bg-sky-400 hover:bg-sky-300 rounded-lg transition-colors"
            >
              <Plus className="w-4 h-4" />
              Add to Library
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
