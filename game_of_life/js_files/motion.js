import * as THREE from "./three.module.js";
import {createFloor} from "./floor.js";
import {createCell , CELL_WIDTH , CELL_HEIGHT , CELL_DEPTH} from "./cells.js";
import {createSpotLight} from "./spotlight.js";


let stats = new Stats();
stats.showPanel( 1 ); // 0: fps, 1: ms, 2: mb, 3+: custom
document.body.appendChild( stats.dom );


const CELLS_BY_ROW = 15 , CELLS_BY_COL = 15;

// const unused_lines = 2 ; // avoid invalid array indexes by creating 2 "dead" lines

let cellID_array = new Array(CELLS_BY_ROW);
let grid = new Array(CELLS_BY_ROW) ;
let future_grid = new Array(CELLS_BY_ROW) ;

for(let i = 0 ; i < CELLS_BY_ROW ; i++){  // creating a 2D array of the grid size
    cellID_array[i] = new Array(CELLS_BY_COL);
    grid[i] = new Array(CELLS_BY_COL);
    future_grid[i] = new Array(CELLS_BY_COL);
}

for(let i = 0 ; i < CELLS_BY_ROW ; i++){
    for(let j = 0 ; j < CELLS_BY_COL ; j++){
        grid[i][j] = 0; //initialising
        future_grid[i][j] = 0;
    }
}




let camera, controls, scene, renderer;
let  floor , spotLight;
let cell_model ;
let running = false ; //launching automatically new nextGen

init();
animate();

function init() {
    camera = new THREE.PerspectiveCamera( 50, window.innerWidth / window.innerHeight, 1, 4000 );
    camera.position.z = 250;
    camera.position.y = 1800;
    camera.position.x = 250;

    camera.lookAt(250,0,250);


    //~~~~~~~~~~~~~~~ INSTALLATION CLASSIQUE  ~~~~~~~~~~~~~~~~~~~~~~~~~
    scene = new THREE.Scene();

    //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

    floor = createFloor();

    scene.add(floor);

    cell_model = createCell();
    cell_model.position.set(0 , 40 , 0);
    disposeCells(scene, cell_model);


    spotLight = createSpotLight();
    scene.add(spotLight);

    //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    renderer = new THREE.WebGLRenderer( { antialias: true } );
    renderer.setPixelRatio( window.devicePixelRatio );
    renderer.setSize( window.innerWidth, window.innerHeight );

    // controls = new THREE.OrbitControls( camera, renderer.domElement );
    // controls.update();

    document.body.appendChild( renderer.domElement );
    window.addEventListener( 'resize', onWindowResize, false );

    window.addEventListener('keydown' , keydown_handler);


    //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
}
function onWindowResize() {

    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();

    renderer.setSize( window.innerWidth, window.innerHeight );

}

function animate() {
    stats.begin();
    stats.end();
    requestAnimationFrame( animate );

    renderer.render( scene, camera );

}

function disposeCells(scene, cell){
    let cell_duplicate;
    let is_visible;


    for (let i = 1 ; i < CELLS_BY_ROW - 1 ; i++  ){
        for (let j = 1 ; j < CELLS_BY_COL - 1 ; j++){
            cell_duplicate = cell.clone();

            cell_duplicate.position.x = i * (CELL_WIDTH + 20);
            cell_duplicate.position.z = j * (CELL_DEPTH + 20);

            is_visible = Math.floor( Math.random()*5 );  //  1/x  chance of being visible (1 generation)

            cell_duplicate.visible = !is_visible; //  NOT instruction. if =0 -> visible ; hidden otherwise

            cellID_array[i][j] = cell_duplicate.id; // saves more memory than inserting whole object
            grid[i][j] = !is_visible;

            scene.add(cell_duplicate);

        }
    }
}

let  ID_nextGen;
function keydown_handler(e){

    switch (e.code) {
        case "Space":

            if(running){
                clearInterval(ID_nextGen);
                running = 0;
            }
            else
                nextGen();


            break;
        case "KeyP":
            if(!running){
                ID_nextGen = setInterval(nextGen , 1300);

                running = !running; //revert actual state
            }

            else{

                clearInterval(ID_nextGen);
                running = 0;
            }
            break;

        default:
            console.log("no event assigned");

    }
}
function nextGen(){
    //classic implementation of game of life

    // Loop through every cell
    for (let row = 1; row < CELLS_BY_ROW - 1; row++){
        for (let col = 1; col < CELLS_BY_COL - 1 ; col++){

            // finding no Of Neighbours that are alive
            let  cells_around = 0;
            for (let i = -1; i <= 1; i++){
                for (let j = -1; j <= 1; j++)
                    {
                        cells_around += grid[row + i][col + j];
                    }
            }

            cells_around -= grid[row][col]; //ignore the cell itself
            // 3 rules of the game

            // Cell is lonely and dies
            if ((grid[row][col] === true) && (cells_around < 2)) {
                future_grid[row][col] = false;
            }

            // Cell dies due to over population
            else if ((grid[row][col] === true) && (cells_around > 3)) {
                future_grid[row][col] = false;
            }

            // A new cell is born
            else if ((grid[row][col] === false) && (cells_around === 3)){
                future_grid[row][col] = true;
            }


            // Remains the same
            else{
                future_grid[row][col] = grid[row][col];
            }
        }
    }
    grid = future_grid;
    updateGrid();

}


function updateGrid(){
    let current_cell;
    for (let i= 1 ; i < CELLS_BY_ROW - 1 ; i++){
        for (let j = 1 ; j < CELLS_BY_COL - 1 ; j++){
            current_cell = scene.getObjectById(cellID_array[i][j])
            current_cell.visible = future_grid[i][j];

        }
    }
}