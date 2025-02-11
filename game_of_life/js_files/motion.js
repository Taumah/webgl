import * as THREE from "./three.module.js";
import {createFloor} from "./floor.js";
import {createCell , disposeCells} from "./cells.js";
import {createSpotLight, createLightTarget} from "./spotlight.js";
import { OrbitControls } from './OrbitControls.js';
import { ColladaLoader } from  './ColladaLoader.js';




let stats = new Stats();
stats.showPanel( 0 ); // 0: fps, 1: ms, 2: mb, 3+: custom
document.body.appendChild( stats.dom );

let elf;

let camera, controls, scene, renderer;
let  floor ;
let topLight , light , lightTarget;
let cell_model ;
let running = false ; //launching automatically new nextGen
let clock;

init();
animate();

function init() {
    //~~~~~~~~~~~~~~~ INSTALLATION PREALABLE  ~~~~~~~~~~~~~~~~~~~~~~~~~
    scene = new THREE.Scene();
    floor = createFloor();

    scene.add(floor);

    cell_model = createCell();
    cell_model.position.set(0 , 200 , 0);
    disposeCells(scene, cell_model);


    topLight = createSpotLight();
    topLight.angle = 1.0;
    scene.add(topLight);
    lightTarget = createLightTarget();
    scene.add(lightTarget);
    topLight.target = lightTarget;

    light = new THREE.AmbientLight(0x121212 , 0.1);
    scene.add(light);

    clock = new THREE.Clock();
    //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

	let loadingManager = new THREE.LoadingManager( scene.add ( elf ) );
	let loader = new ColladaLoader(loadingManager);
	loader.load("../objects/elf.dae" , function(collada_obj){
		elf = collada_obj.scene;
	});


	//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    renderer = new THREE.WebGLRenderer( { antialias: true } );
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap; // default THREE.PCFShadowMap
	renderer.outputEncoding = THREE.sRGBEncoding;

    renderer.setPixelRatio( window.devicePixelRatio );
    renderer.setSize( window.innerWidth, window.innerHeight );

    camera = new THREE.PerspectiveCamera( 50, window.innerWidth / window.innerHeight, 1, 8000 );
    controls = new OrbitControls( camera, renderer.domElement );

    controls.enable = true;
    controls.enableKeys = true;

    camera.position.set( x_camera, y_camera, z_camera );
    camera.lookAt(x_camera/2,-500,z_camera/2);

    controls.update();



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

    controls.update();
	render()
    // topLight.update();
    renderer.render( scene, camera );

}

function render(){
	let delta = clock.getDelta();

	if(elf !== undefined){
		elf.rotation.z += delta * 0.5;
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
                ID_nextGen = setInterval(nextGen , 300);

                running = !running; //revert actual state
            }
            else{
                clearInterval(ID_nextGen);
                running = 0;
            }
            break;
        case "KeyR":
            if(running){
                clearInterval(ID_nextGen);
                running = 0;
            }
            else{
                clearGrid();
                disposeCells(scene , cell_model);

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

            // Cell is lonely -> dies
            if ((grid[row][col] === true) && (cells_around < 2)) {
                future_grid[row][col] = false;
            }

            //over population -> Cell dies
            else if ((grid[row][col] === true) && (cells_around > 3)) {
                future_grid[row][col] = false;
            }

            // many cells around -> cell created
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
function clearGrid(){
    let current_cell;
    for (let i= 1 ; i < CELLS_BY_ROW - 1 ; i++){
        for (let j = 1 ; j < CELLS_BY_COL - 1 ; j++){
            current_cell = scene.getObjectById(cellID_array[i][j])
            current_cell.visible = false;

        }
    }
}
