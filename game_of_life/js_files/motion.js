import * as THREE from "../../game_of_life/js_files/three.module.js";
import {createFloor} from "../../game_of_life/js_files/floor.js";
import {createCell , CELL_WIDTH , CELL_HEIGHT , CELL_DEPTH} from "../../game_of_life/js_files/cells.js";
// import {random,round} from Math;


const CELLS_BY_ROW = 10 , CELLS_BY_COL = 10;

let camera, scene, renderer;
let  floor;
let cell_obj ;

init();
animate();

function init() {
    camera = new THREE.PerspectiveCamera( 50, window.innerWidth / window.innerHeight, 1, 4000 );
    camera.position.z = 0;
    camera.position.y = 2000;
    camera.position.x = 0;


    camera.lookAt(0,0,0);
    //~~~~~~~~~~~~~~~ INSTALLATION CLASSIQUE  ~~~~~~~~~~~~~~~~~~~~~~~~~
    scene = new THREE.Scene();

    //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

    floor = createFloor();

    scene.add(floor);

    cell_obj = createCell();
    cell_obj.position.x = 0;
    cell_obj.position.y = 40;
    cell_obj.position.z = 0;

    disposeCells(scene, cell_obj);


    //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    renderer = new THREE.WebGLRenderer( { antialias: true } );
    renderer.setPixelRatio( window.devicePixelRatio );
    renderer.setSize( window.innerWidth, window.innerHeight );
    document.body.appendChild( renderer.domElement );
    window.addEventListener( 'resize', onWindowResize, false );

    //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
}
function onWindowResize() {

    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();

    renderer.setSize( window.innerWidth, window.innerHeight );

}

function animate() {
    requestAnimationFrame( animate );

    // scene.rotation.y += 0.008;

    renderer.render( scene, camera );

}

function disposeCells(scene, cell){
    let cell_duplicate;
    let is_visible;
    let cellID_array = new Array(CELLS_BY_ROW);

    for(let i = 0 ; i < CELLS_BY_ROW ; i++){  // creating a 2D array of the grid size
        cellID_array[i] = new Array(CELLS_BY_COL);
    }


    for (let i = 0 ; i < CELLS_BY_ROW ; i++  ){
        for (let j = 0 ; j < CELLS_BY_COL ; j++){
            cell_duplicate = cell.clone();

            cellID_array[i][j] = cell_duplicate.id; // saves more memory than inserting whole object

            cell_duplicate.position.x = i * (CELL_WIDTH + 20);
            cell_duplicate.position.z = j * (CELL_DEPTH + 20);

            is_visible = Math.floor( Math.random()*5 );  //  1/3  chance of being visible (1 generation)

            cell_duplicate.visible = !is_visible; //  NOT instruction. if =0 -> visible ; hidden otherwise

            console.log("visibility :" + is_visible);
            console.log("id object : " + cellID_array[i][j]);

            scene.add(cell_duplicate);

        }
    }
}