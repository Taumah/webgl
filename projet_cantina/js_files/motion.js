import * as THREE from './Dependencies/three.module.js';
import Stats from './Dependencies/stats.module.js';
import { ColladaLoader } from './Dependencies/ColladaLoader.js';
import {OrbitControls} from "./Dependencies/OrbitControls.js";

import {createFloor} from "./floor.js";
import {createLandscape} from "./landscape.js";

let container = document.getElementById( 'container' );


export function init() {
	createRenderer(); //essential object

	createCamera(); // orbit control and camera are set

	scene = new THREE.Scene();

	clock = new THREE.Clock();

	loadingManager = new THREE.LoadingManager();

	loadingManager.onLoad = function () {

		Dispose();//places every loaded object on map
		// (unfortunately already added with loading manager)


	};

	loader = new ColladaLoader( loadingManager );

	floor = createFloor();
	scene.add(floor);

	landscape = createLandscape();
	scene.add(landscape);

	for(let i = 0 ; i < objects_locations.length ; i++) {
		loader.load(object_path + objects_locations[i] , function(obj){

			loaded_objects.push(obj.scene);

			if(obj['animations'].length !== 0){
				console.log("some work has to be done !");
			}

		}) ;

	} // loading and adding shadow to every imported object
	putShadow();// need to find where to put this

	ambientLight = new THREE.AmbientLight( 0xcccccc, 0.4 );
	scene.add( ambientLight );

	directionalLight = new THREE.DirectionalLight( 0xffffff, 0.8 );
	directionalLight.position.set( 1, 1, 0 ).normalize();
	scene.add( directionalLight );

	//

	stats = new Stats();
	container.appendChild( stats.dom );

	//

	window.addEventListener( 'resize', onWindowResize, false );

}

function onWindowResize() {

	camera.aspect = window.innerWidth / window.innerHeight;
	camera.updateProjectionMatrix();

	renderer.setSize( window.innerWidth, window.innerHeight );

}

export function animate() {

	requestAnimationFrame( animate );
	controls.update();

	render();
	stats.update();

}

function render() {

	// var delta = clock.getDelta();
	renderer.render( scene, camera );

}

function createCamera() {

	camera = new THREE.PerspectiveCamera( 60, window.innerWidth / window.innerHeight, 0.1, 4000 );
	camera.position.set( 750, 60, -240 );
	camera.lookAt( 1000, 50, -300 );

	controls = new OrbitControls( camera, renderer.domElement );

	controls.enable = true;
	controls.enableKeys = true;

	controls.update();

}

function createRenderer() {

	renderer = new THREE.WebGLRenderer();
	renderer.setPixelRatio( window.devicePixelRatio );
	renderer.setSize( window.innerWidth, window.innerHeight );
	container.appendChild( renderer.domElement );

}

function putShadow() {

	loaded_objects.forEach(element => element.traverse(function (node) {
		if (node instanceof THREE.Mesh) {
			node.castShadow = true;
			node.receiveShadow = true;
		}
	}));
}



