// events.js
// main container for tiles (grid overlay)
const tilesElement = document.getElementById('tiles');

// Game Over overlay elements
const gameOverOverlay = document.getElementById('gameover');
const overlayNewGameBtn = document.getElementById('gameover-newgame');

// Variable para trackear fichas nuevas
let newTilePositions = [];


// draw all tiles on screen (sizes + positions)
function render() {

	tilesElement.innerHTML = '';

	const style = getComputedStyle(tilesElement);
	const cellGap = parseFloat(style.gap) || 0;
	const boardWidth = tilesElement.getBoundingClientRect().width;
	const cellSize = (boardWidth - cellGap * (SIZE - 1)) / SIZE;
	const stepDistance = cellSize + cellGap;

	for (let row = 0; row < SIZE; row++) {
		for (let col = 0; col < SIZE; col++) {
			const value = grid[row][col];
			if (value <= 0)
				continue;
			const tileElement = document.createElement('div');
			tileElement.className = `tile tile-${value}`;
			
			// Verificar si es una ficha nueva
			const isNewTile = newTilePositions.some(pos => pos.row === row && pos.col === col);
			if (isNewTile) {
				tileElement.classList.add('new-tile');
			}
			
			tileElement.textContent = value;
			tileElement.style.width = `${cellSize}px`;
			tileElement.style.height = `${cellSize}px`;
			tileElement.style.transform = `translate(${col * stepDistance}px, ${row * stepDistance}px)`;
			tilesElement.appendChild(tileElement);
		}
	}
	updateDisplay();
}

// start a fresh match (reset grid + score, spawn 2 tiles)
function newGame() {

	grid = emptySizeArray();
	score = 0;
	moves = 0;
	addRandomTile(grid);
	addRandomTile(grid);
	
	newTilePositions = [];
	for (let row = 0; row < SIZE; row++) {
		for (let col = 0; col < SIZE; col++) {
			if (grid[row][col] !== 0) {
				newTilePositions.push({row, col});
			}
		}
	}
	
	playing = true;
	render();
	
	setTimeout(() => {
		newTilePositions = [];
	}, 1500);
}

function showGameOver() {
	if (gameOverOverlay) {
		gameOverOverlay.classList.remove('hidden');
	}
}

function hideGameOver() {
	if (gameOverOverlay) {
		gameOverOverlay.classList.add('hidden');
	}
}

grid = emptySizeArray();
playing = false;
render();

// hook the "New Game" button & restart button
const btnNewGame = document.getElementById('newgame') || document.querySelector('.new-game');
const btnRestart = document.getElementById('restart') || document.querySelector('.restart');
/*const btnLevel = document.getElementById('level') || document.querySelector('.level');*/
if (btnNewGame) { 

	btnNewGame.addEventListener('click', newGame);
	btnRestart.addEventListener('click', newGame);
}

// Event listener para el botón del overlay
if (overlayNewGameBtn) {
	overlayNewGameBtn.addEventListener('click', () => {
		hideGameOver();
		newGame();
	});
}

// keyboard controls (arrows) → move, spawn, repaint
window.addEventListener('keydown', (e) => {

	if (!playing)
		return;

	let moved = false;

	if (e.key === 'ArrowLeft')
		moved = move('left');
	else if (e.key === 'ArrowRight')
		moved = move('right');
	else if (e.key === 'ArrowUp')
		moved = move('up');
	else if (e.key === 'ArrowDown')
		moved = move('down');
	
	if (moved) {
		moves++;
		render();

		setTimeout(() => {
			const previousGrid = grid.map(row => [...row]);
			
			addRandomTile(grid);

			newTilePositions = [];
			for (let row = 0; row < SIZE; row++) {
				for (let col = 0; col < SIZE; col++) {
					if (previousGrid[row][col] === 0 && grid[row][col] !== 0) {
						newTilePositions.push({row, col});
					}
				}
			}
			
			render();
			
			setTimeout(() => {
				newTilePositions = [];
			}, 1500);
			
			if (hasWon()) {
				playing = false;
				const titleElement = document.getElementById('gameover-title');
				const messageElement = document.getElementById('gameover-message');
				if (titleElement) titleElement.textContent = '¡You Win!';
				if (messageElement) messageElement.textContent = 'You reached 2048!';
				showGameOver();
			}
			else if (isGameOver()) {
				playing = false;
				const titleElement = document.getElementById('gameover-title');
				const messageElement = document.getElementById('gameover-message');
				if (titleElement) titleElement.textContent = '¡Game Over!';
				if (messageElement) messageElement.textContent = 'Try again...';
				showGameOver();
			}
		}, 150);
	}
});
