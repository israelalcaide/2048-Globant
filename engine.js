/**************************************engine.js********************************************/


const SIZE = 4;

let grid; 
let playing = false;
let score = 0;
let moves = 0;

const scoreElement = document.getElementById('score');
const movesElement = document.getElementById('moves');

// main grid to fill array of 0! A tab
function emptySizeArray() {
	return Array.from({ length: SIZE }, () => Array(SIZE).fill(0));
}

// create empty grid full of zeros
function getEmptyCells(grid) {
	const cells = [];

	for (let row = 0; row < SIZE; row++) {
		for (let col = 0; col < SIZE; col++) {
			if (grid[row][col] === 0)
				cells.push({ row: row, col: col });
		}
	}
	return cells;
}

// create a new N randon in the grid
function addRandomTile(grid, pFour) {

	if (pFour === undefined)
		pFour = 0.10;

	const emptyCells = getEmptyCells(grid);

	if (emptyCells.length === 0) {
		return false;
	}

	const randomIndex = Math.floor(Math.random() * emptyCells.length);
	const chosenCell = emptyCells[randomIndex];
	const row = chosenCell.row;
	const col = chosenCell.col;

	let newValue;
	if (Math.random() < pFour) {
		newValue = 4;
	} else {
		newValue = 2; 
	}

	grid[row][col] = newValue;

	return true;
}

function updateDisplay() {

	if (scoreElement)
		scoreElement.textContent = score;
	if (movesElement)
		movesElement.textContent = moves;
}

