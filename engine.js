//engine.js
// grid size (4x4 board)
const SIZE = 4;
let grid; 
let playing = false;
let score = 0;
let moves = 0;
const scoreElement = document.getElementById('score');
const movesElement = document.getElementById('moves');


// main grid + game state
function makeEmptyGrid() {
  return Array.from({ length: SIZE }, () => Array(SIZE).fill(0));
}


// create empty grid full of zeros
function getEmptyCells(g) {
  const cells = [];
  for (let r = 0; r < SIZE; r++)
    for (let c = 0; c < SIZE; c++)
      if (g[r][c] === 0) cells.push({ r, c });
  return cells;
}

// get all empty cells positions from the grid
function addRandomTile(g, pFour = 0.10) {
  const empty = getEmptyCells(g);
  if (!empty.length)
    return false;
  const { r, c } = empty[Math.floor(Math.random() * empty.length)];
  g[r][c] = Math.random() < pFour ? 4 : 2;
  return true;
}

function updateHUD() {
  if (scoreElement)
    scoreElement.textContent = score;
  if (movesElement)
    movesElement.textContent = moves;
}

