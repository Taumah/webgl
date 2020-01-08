const CELLS_BY_ROW = 30, CELLS_BY_COL = 30;
const CELL_WIDTH = 40, CELL_HEIGHT = 40 , CELL_DEPTH = 40;


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

let x_camera = (CELLS_BY_COL * (CELL_WIDTH  + 20 ) ) / 2 ;
let y_camera = 2500 ; // should use trigonometric functions to have a better focus
let z_camera = (CELLS_BY_ROW * (CELL_HEIGHT + 20 ) ) / 2 ;
