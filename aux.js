//AUX.JS
// to mergear one row to the left 2048 RULE!
function mergeLeft(row) {

	let filteredRow = row.filter(value => value !== 0);

	for (let index = 0; index < filteredRow.length - 1; index++) {
		if (filteredRow[index] === filteredRow[index + 1]) {
			filteredRow[index] *= 2;
			filteredRow[index + 1] = 0;
			score += filteredRow[index];
		}
	}
	filteredRow = filteredRow.filter(value => value !== 0);
	while (filteredRow.length < SIZE) {
		filteredRow.push(0);
	}
	return filteredRow;
}

// function to flip grid rows and cols
function transpose(grid) {

	const transposed = emptySizeArray();
	for (let row = 0; row < SIZE; row++) {
		for (let col = 0; col < SIZE; col++) {
			transposed[col][row] = grid[row][col];
		}
	}
	return transposed;
}

// reverse every row (to move right or down)
function reverseRows(grid) {
	
	return grid.map(row => [...row].reverse());
}

// move tiles depending the direction we are going or we ar goint to to press
function move(direction) {

	const previousState = JSON.stringify(grid);
	if (direction === 'left') {
		for (let row = 0; row < SIZE; row++) {
			grid[row] = mergeLeft(grid[row]);
		}
	} else if (direction === 'right') {
		grid = reverseRows(grid);
		for (let row = 0; row < SIZE; row++) {
			grid[row] = mergeLeft(grid[row]);
		}
		grid = reverseRows(grid);
	} else if (direction === 'up') {
		grid = transpose(grid);
		for (let row = 0; row < SIZE; row++) {
			grid[row] = mergeLeft(grid[row]);
		}
		grid = transpose(grid);
	} else if (direction === 'down') {
		grid = transpose(grid); 
		grid = reverseRows(grid);
		for (let row = 0; row < SIZE; row++) {
			grid[row] = mergeLeft(grid[row]);
		}
		grid = reverseRows(grid);
		grid = transpose(grid);
	}
	return JSON.stringify(grid) !== previousState;
}
