const CELLS_BY_ROW = 8, CELLS_BY_COL = 8;

let cellID_array = new Array(CELLS_BY_ROW);
let grid = new Array(CELLS_BY_ROW);
let future_grid = new Array(CELLS_BY_ROW);

// x arrays of y values  (2D array)
for (let i = 0; i < CELLS_BY_ROW; i++) {  // creating a 2D array of the grid size
    cellID_array[i] = new Array(CELLS_BY_COL);
    grid[i] = new Array(CELLS_BY_COL);
    future_grid[i] = new Array(CELLS_BY_COL);
}

for (let i = 0; i < CELLS_BY_ROW; i++) {
    for (let j = 0; j < CELLS_BY_COL; j++) {
        grid[i][j] = 0; //initialising
        future_grid[i][j] = 0;
    }
}

