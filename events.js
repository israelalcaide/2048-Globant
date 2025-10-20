// main container for tiles (grid overlay)
const tilesElement = document.getElementById('tiles');



// draw all tiles on screen (sizes + positions)
function render() {
  tilesElement.innerHTML = '';

    // read CSS gap and compute cell size + step
  const cs = getComputedStyle(tilesElement);
  const gap = parseFloat(cs.gap) || 0;
  const total = tilesElement.getBoundingClientRect().width;
  const cell = (total - gap * (SIZE - 1)) / SIZE;
  const step = cell + gap;


   // create a DOM tile for every non-zero value in the grid
  for (let r = 0; r < SIZE; r++) {
    for (let c = 0; c < SIZE; c++) {
      const v = grid[r][c];
      if (v <= 0) continue;

      const el = document.createElement('div');
      el.className = `tile tile-${v}`;
      el.textContent = v;
      el.style.width = `${cell}px`;
      el.style.height = `${cell}px`;
      el.style.transform = `translate(${c * step}px, ${r * step}px)`;
      tilesElement.appendChild(el);
    }
  }
}


// start a fresh match (reset grid + score, spawn 2 tiles)
function newGame() {
  grid = makeEmptyGrid();
  score = 0;
  addRandomTile(grid);
  addRandomTile(grid);
  playing = true;
  render();
}

grid = makeEmptyGrid();
playing = false;
render();

// hook the "New Game" button
const btn = document.getElementById('newgame') || document.querySelector('.new-game');
if (btn) btn.addEventListener('click', newGame);

// keyboard controls (arrows) → move, spawn, repaint
window.addEventListener('keydown', (e) => {
  if (!playing) return;

  let moved = false;
  if (e.key === 'ArrowLeft')  moved = move('left');
  else if (e.key === 'ArrowRight') moved = move('right');
  else if (e.key === 'ArrowUp') moved = move('up');
  else if (e.key === 'ArrowDown') moved = move('down');

  if (moved) {
    addRandomTile(grid);
    render();
  }
});
