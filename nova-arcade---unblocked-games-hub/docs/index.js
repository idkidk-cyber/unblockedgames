/**
 * Nova Arcade - Unblocked Games Hub
 * Pure HTML/JS/CSS client-side engine
 */

const DEFAULT_GAMES_LIST = [
  {
    id: "retro-snake",
    title: "Retro Snake",
    category: "Arcade",
    description: "Navigate the serpent to consume apples, lengthen your tail, and avoid crashing into boundaries or yourself.",
    iframeSrc: "./games/retro-snake.html",
    iframeCode: '<iframe src="./games/retro-snake.html" width="100%" height="100%" frameborder="0" allowfullscreen sandbox="allow-scripts allow-same-origin allow-pointer-lock"></iframe>',
    controls: "Arrow Keys or WASD to turn · Space to pause",
    tags: ["Arcade", "Retro", "Classic"],
    plays: 1420,
    aspectRatio: "1/1",
    featured: true,
    accentColor: "#38bdf8"
  },
  {
    id: "2048-classic",
    title: "2048 Classic",
    category: "Puzzle",
    description: "Slide matching numbered tiles across the grid and combine them strategically to reach the coveted 2048 tile.",
    iframeSrc: "./games/2048.html",
    iframeCode: '<iframe src="./games/2048.html" width="100%" height="100%" frameborder="0" allowfullscreen sandbox="allow-scripts allow-same-origin allow-pointer-lock"></iframe>',
    controls: "Arrow Keys or WASD or Swipe to slide tiles",
    tags: ["Puzzle", "Numbers", "Strategy"],
    plays: 2890,
    aspectRatio: "1/1",
    featured: true,
    accentColor: "#f59e0b"
  },
  {
    id: "flappy-arcade",
    title: "Flappy Arcade",
    category: "Arcade",
    description: "Time each flap with precision to maneuver the bird between perilous green pipes and beat your highest score.",
    iframeSrc: "./games/flappy-bird.html",
    iframeCode: '<iframe src="./games/flappy-bird.html" width="100%" height="100%" frameborder="0" allowfullscreen sandbox="allow-scripts allow-same-origin allow-pointer-lock"></iframe>',
    controls: "Spacebar or Left Click / Tap to flap wings",
    tags: ["Arcade", "Action", "Skill"],
    plays: 3150,
    aspectRatio: "3/4",
    featured: true,
    accentColor: "#f59e0b"
  },
  {
    id: "space-defenders",
    title: "Space Invaders Retro",
    category: "Action",
    description: "Pilot your defense cannon and exterminate marching alien fleets before they breach Earth's planetary shield.",
    iframeSrc: "./games/space-invaders.html",
    iframeCode: '<iframe src="./games/space-invaders.html" width="100%" height="100%" frameborder="0" allowfullscreen sandbox="allow-scripts allow-same-origin allow-pointer-lock"></iframe>',
    controls: "A/D or Arrows: Move · Spacebar: Fire Cannon",
    tags: ["Action", "Retro", "Shooter"],
    plays: 1820,
    aspectRatio: "4/3",
    featured: true,
    accentColor: "#10b981"
  },
  {
    id: "breakout-arcade",
    title: "Breakout Brick Breaker",
    category: "Arcade",
    description: "Bounce the ball off your paddle at strategic angles to smash colorful rows of bricks across challenging levels.",
    iframeSrc: "./games/breakout.html",
    iframeCode: '<iframe src="./games/breakout.html" width="100%" height="100%" frameborder="0" allowfullscreen sandbox="allow-scripts allow-same-origin allow-pointer-lock"></iframe>',
    controls: "Mouse or Left/Right Arrows to steer paddle",
    tags: ["Arcade", "Physics", "Retro"],
    plays: 1540,
    aspectRatio: "4/3",
    featured: false,
    accentColor: "#0ea5e9"
  },
  {
    id: "dino-runner",
    title: "Dino Desert Runner",
    category: "Arcade",
    description: "Sprint through prehistoric deserts, leap over spiked cacti, and duck beneath airborne pterodactyls.",
    iframeSrc: "./games/dino-run.html",
    iframeCode: '<iframe src="./games/dino-run.html" width="100%" height="100%" frameborder="0" allowfullscreen sandbox="allow-scripts allow-same-origin allow-pointer-lock"></iframe>',
    controls: "Space / Up: Jump · Down: Duck under flyers",
    tags: ["Arcade", "Runner", "Endless"],
    plays: 2210,
    aspectRatio: "16/9",
    featured: true,
    accentColor: "#22c55e"
  },
  {
    id: "pong-duel",
    title: "Pong Classic Duel",
    category: "Sports",
    description: "The seminal 1972 table tennis duel. Play against the responsive computer paddle or go head-to-head with a friend.",
    iframeSrc: "./games/pong-duel.html",
    iframeCode: '<iframe src="./games/pong-duel.html" width="100%" height="100%" frameborder="0" allowfullscreen sandbox="allow-scripts allow-same-origin allow-pointer-lock"></iframe>',
    controls: "P1: W/S · P2: Up/Down Arrows · First to 7 wins",
    tags: ["Sports", "Retro", "2-Player"],
    plays: 980,
    aspectRatio: "4/3",
    featured: false,
    accentColor: "#ec4899"
  },
  {
    id: "minesweeper-classic",
    title: "Minesweeper Retro",
    category: "Puzzle",
    description: "Deduce hidden bomb locations with numbered tile clues. Flag hazards carefully to safely uncover the minefield.",
    iframeSrc: "./games/minesweeper.html",
    iframeCode: '<iframe src="./games/minesweeper.html" width="100%" height="100%" frameborder="0" allowfullscreen sandbox="allow-scripts allow-same-origin allow-pointer-lock"></iframe>',
    controls: "Left click to uncover · Right click to toggle flag",
    tags: ["Puzzle", "Logic", "Strategy"],
    plays: 1730,
    aspectRatio: "1/1",
    featured: false,
    accentColor: "#ef4444"
  },
  {
    id: "tetris-stacker",
    title: "Block Stacker Deluxe",
    category: "Puzzle",
    description: "Rotate and drop falling geometric tetrominoes, clear complete rows to score combos, and use hold strategic reserves.",
    iframeSrc: "./games/tetris.html",
    iframeCode: '<iframe src="./games/tetris.html" width="100%" height="100%" frameborder="0" allowfullscreen sandbox="allow-scripts allow-same-origin allow-pointer-lock"></iframe>',
    controls: "Arrows: Move/Rotate · Space: Hard drop · C: Hold",
    tags: ["Puzzle", "Retro", "Arcade"],
    plays: 3410,
    aspectRatio: "4/3",
    featured: true,
    accentColor: "#8b5cf6"
  },
  {
    id: "pac-maze",
    title: "Maze Muncher Arcade",
    category: "Arcade",
    description: "Navigate labyrinthine blue corridors, collect every dot, grab power pellets, and chase down the ghosts.",
    iframeSrc: "./games/pac-maze.html",
    iframeCode: '<iframe src="./games/pac-maze.html" width="100%" height="100%" frameborder="0" allowfullscreen sandbox="allow-scripts allow-same-origin allow-pointer-lock"></iframe>',
    controls: "Arrow Keys or WASD to navigate corners",
    tags: ["Arcade", "Retro", "Classic"],
    plays: 2680,
    aspectRatio: "1/1",
    featured: true,
    accentColor: "#facc15"
  }
];

// App State
let games = [];
let favorites = ['retro-snake', '2048-classic', 'flappy-arcade'];
let currentCategory = 'All';
let currentSearch = '';
let currentPlayingGame = null;
let currentCloakPreset = 'none';
let customTabTitle = '';

// Load initial games from storage or default
function initAppData() {
  try {
    const savedFavs = localStorage.getItem('nova_arcade_favorites_v1');
    if (savedFavs) favorites = JSON.parse(savedFavs);
  } catch(e) {}

  try {
    const savedCloak = localStorage.getItem('nova_arcade_cloak_preset_v1');
    if (savedCloak) currentCloakPreset = savedCloak;
    const savedTitle = localStorage.getItem('nova_arcade_custom_title_v1');
    if (savedTitle) customTabTitle = savedTitle;
  } catch(e) {}

  try {
    const savedGames = localStorage.getItem('nova_arcade_games_v1');
    if (savedGames) {
      const parsed = JSON.parse(savedGames);
      if (Array.isArray(parsed) && parsed.length > 0) {
        games = normalizeGameList(parsed);
        renderApp();
        applyCloak();
        return;
      }
    }
  } catch(e) {}

  // Fallback to defaults
  games = normalizeGameList(DEFAULT_GAMES_LIST);

  // Try fetching games.json if available
  fetch('./games.json')
    .then(r => r.json())
    .then(data => {
      if (Array.isArray(data) && data.length > 0) {
        games = normalizeGameList(data);
        renderApp();
      }
    })
    .catch(() => {})
    .finally(() => {
      renderApp();
      applyCloak();
    });
}

function normalizeGameList(list) {
  return list.map(g => {
    let src = g.iframeSrc;
    if (src && src.startsWith('/games/')) {
      src = '.' + src;
    }
    let code = g.iframeCode;
    if (code && code.includes('src="/games/')) {
      code = code.replace(/src="\/games\//g, 'src="./games/');
    }
    return { ...g, iframeSrc: src, iframeCode: code };
  });
}

function saveGames() {
  try {
    localStorage.setItem('nova_arcade_games_v1', JSON.stringify(games));
  } catch(e) {}
}

function saveFavorites() {
  try {
    localStorage.setItem('nova_arcade_favorites_v1', JSON.stringify(favorites));
  } catch(e) {}
}

// Render Games Grid
function renderGames() {
  const grid = document.getElementById('gamesGrid');
  const countEl = document.getElementById('gameCount');
  if (!grid) return;

  const filtered = games.filter(g => {
    // Category filter
    if (currentCategory === 'Favorites') {
      if (!favorites.includes(g.id)) return false;
    } else if (currentCategory !== 'All') {
      if (g.category.toLowerCase() !== currentCategory.toLowerCase()) return false;
    }

    // Search query
    if (currentSearch.trim()) {
      const q = currentSearch.toLowerCase();
      const matchTitle = g.title.toLowerCase().includes(q);
      const matchDesc = g.description.toLowerCase().includes(q);
      const matchTags = (g.tags || []).some(t => t.toLowerCase().includes(q));
      if (!matchTitle && !matchDesc && !matchTags) return false;
    }

    return true;
  });

  if (countEl) countEl.textContent = `(${filtered.length} available)`;

  if (filtered.length === 0) {
    grid.innerHTML = `
      <div style="grid-column: 1 / -1; background: #0f172a; border: 1px solid #1e293b; border-radius: 12px; padding: 48px; text-align: center;">
        <h3 style="font-size: 16px; font-weight: bold; color: white;">No games found</h3>
        <p style="font-size: 13px; color: #94a3b8; margin: 8px 0 16px;">Try adjusting your search query or add a custom game to the library.</p>
        <button onclick="resetFilters()" class="btn-primary" style="margin: 0 auto;">Reset Filters</button>
      </div>
    `;
    return;
  }

  grid.innerHTML = filtered.map(game => {
    const isFav = favorites.includes(game.id);
    return `
      <div class="game-card" onclick="openGamePlayer('${game.id}')">
        <div class="card-thumb">
          <div class="card-thumb-art">
            ${getGameArt(game)}
          </div>
          <button class="card-fav-btn ${isFav ? 'is-fav' : ''}" onclick="toggleFavorite('${game.id}', event)" title="Toggle Favorite">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="${isFav ? 'currentColor' : 'none'}" stroke="currentColor" stroke-width="2"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path></svg>
          </button>
          <div class="card-play-overlay">
            <div class="play-circle">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><polygon points="5 3 19 12 5 21 5 3"></polygon></svg>
            </div>
          </div>
        </div>
        <div class="card-body">
          <div>
            <div class="card-meta">
              <span class="card-cat">${game.category}</span>
              <span>·</span>
              <span>${(game.plays || 0).toLocaleString()} plays</span>
              ${game.isCustom ? '<span>·</span><span style="color:#f59e0b;font-size:10px;">Custom</span>' : ''}
            </div>
            <h3 class="card-title">${escapeHtml(game.title)}</h3>
            <p class="card-desc">${escapeHtml(game.description)}</p>
          </div>
          <div class="card-foot">
            <span>${escapeHtml((game.controls || '').split('·')[0])}</span>
            <span class="card-play-arrow">Play →</span>
          </div>
        </div>
      </div>
    `;
  }).join('');
}

function getGameArt(game) {
  switch (game.id) {
    case 'retro-snake':
      return `<div style="display:flex;gap:4px;"><div style="width:8px;height:8px;background:#38bdf8;border-radius:2px;"></div><div style="width:8px;height:8px;background:#0284c7;border-radius:2px;"></div><div style="width:8px;height:8px;background:#ef4444;border-radius:50%;"></div></div>`;
    case '2048-classic':
      return `<div style="display:grid;grid-template-columns:1fr 1fr;gap:4px;background:#1e293b;padding:8px;border-radius:6px;"><div style="width:24px;height:24px;background:#f59e0b;color:#fff;font-weight:900;font-size:10px;display:flex;align-items:center;justify-content:center;border-radius:3px;">8</div><div style="width:24px;height:24px;background:#ea580c;color:#fff;font-weight:900;font-size:10px;display:flex;align-items:center;justify-content:center;border-radius:3px;">16</div><div style="width:24px;height:24px;background:#dc2626;color:#fff;font-weight:900;font-size:10px;display:flex;align-items:center;justify-content:center;border-radius:3px;">64</div><div style="width:24px;height:24px;background:#eab308;color:#000;font-weight:900;font-size:8px;display:flex;align-items:center;justify-content:center;border-radius:3px;">2048</div></div>`;
    case 'flappy-arcade':
      return `<div style="width:28px;height:28px;background:#facc15;border-radius:50%;border:2px solid #ca8a04;position:relative;"><div style="position:absolute;top:6px;right:6px;width:6px;height:6px;background:#000;border-radius:50%;"></div><div style="position:absolute;top:10px;right:-4px;width:10px;height:8px;background:#ea580c;border-radius:2px;"></div></div>`;
    case 'space-defenders':
      return `<div style="color:#00ff66;font-family:monospace;font-size:18px;letter-spacing:4px;font-weight:bold;">👾 ▲ 👾</div>`;
    case 'breakout-arcade':
      return `<div style="display:flex;flex-direction:column;align-items:center;gap:6px;"><div style="display:flex;gap:3px;"><div style="width:14px;height:6px;background:#ef4444;border-radius:1px;"></div><div style="width:14px;height:6px;background:#eab308;border-radius:1px;"></div><div style="width:14px;height:6px;background:#38bdf8;border-radius:1px;"></div></div><div style="width:6px;height:6px;background:#fff;border-radius:50%;"></div><div style="width:36px;height:6px;background:#38bdf8;border-radius:2px;"></div></div>`;
    case 'dino-runner':
      return `<div style="display:flex;align-items:flex-end;gap:8px;border-bottom:2px solid #475569;padding-bottom:4px;"><div style="width:16px;height:22px;background:#22c55e;border-radius:2px;"></div><div style="width:8px;height:16px;background:#10b981;border-radius:2px;"></div></div>`;
    case 'pong-duel':
      return `<div style="display:flex;align-items:center;justify-content:space-between;width:80px;"><div style="width:4px;height:24px;background:#38bdf8;border-radius:2px;"></div><div style="width:6px;height:6px;background:#fff;border-radius:50%;"></div><div style="width:4px;height:24px;background:#f43f5e;border-radius:2px;"></div></div>`;
    case 'minesweeper-classic':
      return `<div style="display:grid;grid-template-columns:repeat(2,16px);gap:3px;background:#1e293b;padding:4px;border-radius:4px;"><div style="width:16px;height:16px;background:#334155;color:#38bdf8;font-size:10px;font-weight:bold;display:flex;align-items:center;justify-content:center;">1</div><div style="width:16px;height:16px;background:#334155;color:#ef4444;font-size:10px;font-weight:bold;display:flex;align-items:center;justify-content:center;">🚩</div></div>`;
    case 'tetris-stacker':
      return `<div style="display:grid;grid-template-columns:repeat(3,10px);gap:2px;"><div style="width:10px;height:10px;background:#a855f7;border-radius:2px;"></div><div style="width:10px;height:10px;background:#a855f7;border-radius:2px;"></div><div style="width:10px;height:10px;background:#a855f7;border-radius:2px;"></div><div></div><div style="width:10px;height:10px;background:#a855f7;border-radius:2px;"></div><div></div></div>`;
    case 'pac-maze':
      return `<div style="display:flex;align-items:center;gap:6px;"><div style="width:20px;height:20px;background:#facc15;border-radius:50%;"></div><div style="width:4px;height:4px;background:#fff;border-radius:50%;"></div><div style="width:4px;height:4px;background:#fff;border-radius:50%;"></div></div>`;
    default:
      return `<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#38bdf8" stroke-width="2"><rect x="2" y="6" width="20" height="12" rx="2"></rect><path d="M6 12h4M8 10v4M15 13h.01M18 11h.01"></path></svg>`;
  }
}

function escapeHtml(text) {
  if (!text) return '';
  return text.replace(/[&<>"']/g, function(m) {
    return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#039;' }[m];
  });
}

function toggleFavorite(id, e) {
  if (e) e.stopPropagation();
  if (favorites.includes(id)) {
    favorites = favorites.filter(f => f !== id);
  } else {
    favorites.push(id);
  }
  saveFavorites();
  renderGames();
  updateFavCount();
}

function updateFavCount() {
  const btn = document.getElementById('favTabCount');
  if (btn) btn.textContent = `Favorites (${favorites.length})`;
}

// Game Player Modal
function openGamePlayer(id) {
  const game = games.find(g => g.id === id);
  if (!game) return;
  currentPlayingGame = game;
  game.plays = (game.plays || 0) + 1;
  saveGames();

  const modal = document.getElementById('playerModal');
  const title = document.getElementById('playerTitle');
  const cat = document.getElementById('playerCat');
  const plays = document.getElementById('playerPlays');
  const controls = document.getElementById('playerControls');
  const desc = document.getElementById('playerDesc');
  const frame = document.getElementById('gameIframe');
  const favBtn = document.getElementById('playerFavBtn');

  if (title) title.textContent = game.title;
  if (cat) cat.textContent = game.category;
  if (plays) plays.textContent = `${(game.plays || 0).toLocaleString()} plays`;
  if (controls) controls.textContent = game.controls || '';
  if (desc) desc.textContent = game.description || '';
  if (frame) frame.src = game.iframeSrc;

  if (favBtn) {
    favBtn.innerHTML = favorites.includes(game.id)
      ? '<svg width="18" height="18" viewBox="0 0 24 24" fill="#f43f5e" stroke="#f43f5e" stroke-width="2"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path></svg>'
      : '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path></svg>';
  }

  if (modal) modal.classList.remove('hidden');
}

function closeGamePlayer() {
  const modal = document.getElementById('playerModal');
  const frame = document.getElementById('gameIframe');
  if (frame) frame.src = 'about:blank';
  if (modal) modal.classList.add('hidden');
  currentPlayingGame = null;
  renderGames();
}

function reloadGame() {
  const frame = document.getElementById('gameIframe');
  if (frame && currentPlayingGame) {
    const src = frame.src;
    frame.src = 'about:blank';
    setTimeout(() => { frame.src = src; }, 50);
  }
}

function toggleTheaterMode() {
  const box = document.getElementById('playerBox');
  if (box) box.classList.toggle('theater');
}

function toggleFullscreen() {
  const box = document.getElementById('playerBox');
  if (!box) return;
  if (!document.fullscreenElement) {
    box.requestFullscreen().catch(() => {});
  } else {
    document.exitFullscreen().catch(() => {});
  }
}

function openBlankTab() {
  if (!currentPlayingGame) return;
  const win = window.open('about:blank', '_blank');
  if (win) {
    const fullUrl = new URL(currentPlayingGame.iframeSrc, window.location.href).href;
    win.document.write(`
      <!DOCTYPE html>
      <html>
        <head>
          <title>Classes · Google Classroom</title>
          <style>body,html{margin:0;padding:0;height:100%;overflow:hidden;background:#000;}iframe{width:100%;height:100%;border:none;}</style>
        </head>
        <body>
          <iframe src="${fullUrl}" allowfullscreen></iframe>
        </body>
      </html>
    `);
    win.document.close();
  }
}

function copyEmbedCode() {
  if (!currentPlayingGame) return;
  const code = currentPlayingGame.iframeCode || `<iframe src="${currentPlayingGame.iframeSrc}" width="100%" height="100%" frameborder="0" allowfullscreen></iframe>`;
  navigator.clipboard.writeText(code);
  const btn = document.getElementById('copyEmbedBtn');
  if (btn) {
    const orig = btn.textContent;
    btn.textContent = 'Copied!';
    setTimeout(() => { btn.textContent = orig; }, 2000);
  }
}

// Random Game
function playRandomGame() {
  if (games.length === 0) return;
  const r = Math.floor(Math.random() * games.length);
  openGamePlayer(games[r].id);
}

// Filter Navigation
function setCategory(cat) {
  currentCategory = cat;
  document.querySelectorAll('.cat-btn').forEach(btn => {
    btn.classList.toggle('active', btn.getAttribute('data-cat') === cat);
  });
  renderGames();
}

function resetFilters() {
  currentCategory = 'All';
  currentSearch = '';
  const searchInput = document.getElementById('searchInput');
  if (searchInput) searchInput.value = '';
  setCategory('All');
}

// Add Game Modal
function openAddGameModal() {
  const m = document.getElementById('addGameModal');
  if (m) m.classList.remove('hidden');
}

function closeAddGameModal() {
  const m = document.getElementById('addGameModal');
  if (m) m.classList.add('hidden');
}

function handleAddGameSubmit(e) {
  e.preventDefault();
  const title = document.getElementById('newGameTitle').value.trim();
  const cat = document.getElementById('newGameCategory').value;
  const rawInput = document.getElementById('newGameSrc').value.trim();
  const desc = document.getElementById('newGameDesc').value.trim() || 'Custom game loaded via iframe.';
  const controls = document.getElementById('newGameControls').value.trim() || 'Click to play';
  const tagsStr = document.getElementById('newGameTags').value.trim();

  if (!title || !rawInput) return;

  let src = rawInput;
  let code = rawInput;
  if (rawInput.includes('<iframe')) {
    const m = rawInput.match(/src=["']([^"']+)["']/);
    if (m && m[1]) src = m[1];
  } else {
    code = `<iframe src="${src}" width="100%" height="100%" frameborder="0" allowfullscreen sandbox="allow-scripts allow-same-origin allow-pointer-lock"></iframe>`;
  }

  const newGame = {
    id: 'custom-' + Date.now().toString(36),
    title,
    category: cat,
    description: desc,
    iframeSrc: src,
    iframeCode: code,
    controls,
    tags: tagsStr ? tagsStr.split(',').map(t => t.trim()) : [cat],
    plays: 1,
    isCustom: true
  };

  games.unshift(newGame);
  saveGames();
  closeAddGameModal();
  renderGames();
  openGamePlayer(newGame.id);
}

// JSON Database Modal
function openJsonModal() {
  const m = document.getElementById('jsonModal');
  const editor = document.getElementById('jsonEditor');
  if (editor) editor.value = JSON.stringify(games, null, 2);
  if (m) m.classList.remove('hidden');
}

function closeJsonModal() {
  const m = document.getElementById('jsonModal');
  if (m) m.classList.add('hidden');
}

function copyJson() {
  const editor = document.getElementById('jsonEditor');
  if (!editor) return;
  navigator.clipboard.writeText(editor.value);
  const btn = document.getElementById('copyJsonBtn');
  if (btn) {
    btn.textContent = 'Copied!';
    setTimeout(() => { btn.textContent = 'Copy JSON'; }, 2000);
  }
}

function downloadJson() {
  const editor = document.getElementById('jsonEditor');
  if (!editor) return;
  const blob = new Blob([editor.value], { type: 'application/json' });
  const a = document.createElement('a');
  a.href = URL.createObjectURL(blob);
  a.download = 'games.json';
  a.click();
}

function saveJsonChanges() {
  const editor = document.getElementById('jsonEditor');
  if (!editor) return;
  try {
    const parsed = JSON.parse(editor.value);
    if (!Array.isArray(parsed)) throw new Error('Root must be an array of games');
    games = normalizeGameList(parsed);
    saveGames();
    closeJsonModal();
    renderGames();
    alert('games.json saved successfully!');
  } catch(err) {
    alert('Invalid JSON: ' + err.message);
  }
}

function resetDefaultGames() {
  if (confirm('Reset to default 10 arcade games? Custom games will be cleared.')) {
    games = normalizeGameList(DEFAULT_GAMES_LIST);
    saveGames();
    closeJsonModal();
    renderGames();
  }
}

// Tab Cloak & Panic
function openCloakModal() {
  const m = document.getElementById('cloakModal');
  if (m) m.classList.remove('hidden');
}

function closeCloakModal() {
  const m = document.getElementById('cloakModal');
  if (m) m.classList.add('hidden');
}

function setCloakPreset(preset, customTitle) {
  currentCloakPreset = preset;
  if (customTitle !== undefined) customTabTitle = customTitle;
  localStorage.setItem('nova_arcade_cloak_preset_v1', currentCloakPreset);
  localStorage.setItem('nova_arcade_custom_title_v1', customTabTitle);
  applyCloak();
  closeCloakModal();
}

function applyCloak() {
  const titles = {
    none: customTabTitle || 'Nova Arcade - Unblocked Games Hub',
    classroom: 'Classes · Google Classroom',
    docs: 'AP European History - Unit 4 Study Guide',
    drive: 'My Drive - Google Drive',
    canvas: 'Dashboard · Canvas Network',
    wikipedia: 'Photosynthesis - Wikipedia'
  };

  const favicons = {
    none: './favicon.svg',
    classroom: 'https://ssl.gstatic.com/classroom/favicon.png',
    docs: 'https://ssl.gstatic.com/docs/documents/images/kix-favicon7.ico',
    drive: 'https://ssl.gstatic.com/images/branding/product/1x/drive_2020q4_32dp.png',
    canvas: 'https://du11hjcvx0uqb.cloudfront.net/dist/images/favicon-e10d657a73.ico',
    wikipedia: 'https://en.wikipedia.org/static/favicon/wikipedia.ico'
  };

  document.title = titles[currentCloakPreset] || titles.none;

  let link = document.querySelector("link[rel~='icon']");
  if (!link) {
    link = document.createElement('link');
    link.rel = 'icon';
    document.getElementsByTagName('head')[0].appendChild(link);
  }
  link.href = favicons[currentCloakPreset] || './favicon.svg';
}

function triggerPanic() {
  const overlay = document.getElementById('panicOverlay');
  if (overlay) overlay.classList.remove('hidden');
}

function hidePanic() {
  const overlay = document.getElementById('panicOverlay');
  if (overlay) overlay.classList.add('hidden');
}

// Keyboard shortcuts (Escape for Panic switch)
window.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    const overlay = document.getElementById('panicOverlay');
    if (overlay && !overlay.classList.contains('hidden')) {
      hidePanic();
    } else {
      triggerPanic();
    }
  }
});

// App Initialization
function renderApp() {
  renderGames();
  updateFavCount();
  const dbCountEl = document.getElementById('dbCount');
  if (dbCountEl) dbCountEl.textContent = `${games.length} Games`;
}

// Expose handlers to window object for inline HTML onclick attributes
window.openGamePlayer = openGamePlayer;
window.closeGamePlayer = closeGamePlayer;
window.reloadGame = reloadGame;
window.toggleTheaterMode = toggleTheaterMode;
window.toggleFullscreen = toggleFullscreen;
window.openBlankTab = openBlankTab;
window.copyEmbedCode = copyEmbedCode;
window.playRandomGame = playRandomGame;
window.setCategory = setCategory;
window.resetFilters = resetFilters;
window.toggleFavorite = toggleFavorite;
window.openAddGameModal = openAddGameModal;
window.closeAddGameModal = closeAddGameModal;
window.openJsonModal = openJsonModal;
window.closeJsonModal = closeJsonModal;
window.copyJson = copyJson;
window.downloadJson = downloadJson;
window.saveJsonChanges = saveJsonChanges;
window.resetDefaultGames = resetDefaultGames;
window.openCloakModal = openCloakModal;
window.closeCloakModal = closeCloakModal;
window.setCloakPreset = setCloakPreset;
window.triggerPanic = triggerPanic;
window.hidePanic = hidePanic;

// Immediate startup check
if (document.readyState === 'loading') {
  window.addEventListener('DOMContentLoaded', initAppData);
} else {
  initAppData();
}

window.addEventListener('DOMContentLoaded', () => {
  const searchInput = document.getElementById('searchInput');
  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      currentSearch = e.target.value;
      renderGames();
    });
  }

  const addForm = document.getElementById('addGameForm');
  if (addForm) {
    addForm.addEventListener('submit', handleAddGameSubmit);
  }
});
