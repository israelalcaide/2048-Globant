//AUX.JS
// to mergear one row to the left 2048 RULE!
function mergeLeft(row) {
  let a = row.filter(v => v !== 0);           
  for (let i = 0; i < a.length - 1; i++) {
    if (a[i] === a[i + 1]) {
      a[i] *= 2;                    
      a[i + 1] = 0;
      score += a[i]; 
    }
  }
  a = a.filter(v => v !== 0);
  while (a.length < SIZE)
    a.push(0);
  return a;
}


// function to flip grid rows and cols
function transpose(g) {
  const out = makeEmptyGrid();
  for (let r = 0; r < SIZE; r++)
    for (let c = 0; c < SIZE; c++)
      out[c][r] = g[r][c];
  return out;
}


// reverse every row (to move right or down)
function reverseRows(g) {
  return g.map(row => [...row].reverse());
}

// move tiles depending the direction we are going or we ar goint to to press
function move(dir) {
  const before = JSON.stringify(grid);

  if (dir === 'left') {
    for (let r = 0; r < SIZE; r++)
      grid[r] = mergeLeft(grid[r]);
  } else if (dir === 'right') {
    grid = reverseRows(grid);
    for (let r = 0; r < SIZE; r++)
      grid[r] = mergeLeft(grid[r]);
    grid = reverseRows(grid);
  } else if (dir === 'up') {
    grid = transpose(grid);
    for (let r = 0; r < SIZE; r++)
      grid[r] = mergeLeft(grid[r]);
    grid = transpose(grid);
  } else if (dir === 'down') {
    grid = transpose(grid);
    grid = reverseRows(grid);
    for (let r = 0; r < SIZE; r++)
      grid[r] = mergeLeft(grid[r]);
    grid = reverseRows(grid);
    grid = transpose(grid);
  }

  return JSON.stringify(grid) !== before;
}
