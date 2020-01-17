import * as THREE from './Dependencies/three.module.js';
import Stats from './Dependencies/stats.module.js';
import {createFloor} from "./floor.js";
import { ColladaLoader } from './Dependencies/ColladaLoader.js';
import {OrbitControls} from "./Dependencies/OrbitControls.js";

let container, stats, clock;
let camera, scene, renderer, table_cantina, building_cantina;

let  floor ;
let controls;
init();
animate();

function init() {

	container = document.getElementById( 'container' );
	camera = new THREE.PerspectiveCamera( 60, window.innerWidth / window.innerHeight, 0.1, 4000 );
	camera.position.set( 750, 60, -240 );
	camera.lookAt( 1000, 50, -300 );

	scene = new THREE.Scene();

	clock = new THREE.Clock();

	// loading manager

	var loadingManager = new THREE.LoadingManager( function () {



		let table2 = table_cantina.clone();

		table2.scale.set(0.3,0.3,0.3);
		table2.position.set( -200, 36*table2.scale.y , -200);

		scene.add(table2);
		let table3 = table_cantina.clone();

		table3.scale.set(0.5,0.5,0.5);
		table3.position.set( -130, 36*table3.scale.y  , -80);

		scene.add(table3);
		// scene.add(table_cantina);

		building_cantina.scale.set(1, 1, 1);
		building_cantina.position.set(100,-1,40); //put it further
		scene.add (building_cantina);

	/*	saxophonist.scale.set( 1, 1, 1);
		scene.add(saxophonist);  */

	} );

	// collada

	var table_cantina = new ColladaLoader( loadingManager );
	table_cantina.load( './models/table_cantina/table_cantina.dae', function ( collada ) {

		table_cantina = collada.scene;
		table_cantina.scale.set(0.05,0.05,0.05);

	} );

	var building_cantina = new ColladaLoader( loadingManager );
	building_cantina.load( './models/building_cantina/building_cantina.dae', function ( collada ) {

		building_cantina = collada.scene;

	} );

/*	var saxophonist = new ColladaLoader(loadingManager);
	saxophonist.load('./models/saxophonist/saxophonist.dae', function (collada) {

		saxophonist = collada.scene;
	}); */

	//Floor

    scene = new THREE.Scene();
    floor = createFloor();

    scene.add(floor);
	//

	var ambientLight = new THREE.AmbientLight( 0xcccccc, 0.4 );
	scene.add( ambientLight );

	var directionalLight = new THREE.DirectionalLight( 0xffffff, 0.8 );
	directionalLight.position.set( 1, 1, 0 ).normalize();
	scene.add( directionalLight );

	//

	renderer = new THREE.WebGLRenderer();
	renderer.setPixelRatio( window.devicePixelRatio );
	renderer.setSize( window.innerWidth, window.innerHeight );
	container.appendChild( renderer.domElement );

	//
	controls = new OrbitControls( camera, renderer.domElement );

	controls.enable = true;
	controls.enableKeys = true;

	controls.update();
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

function animate() {

	requestAnimationFrame( animate );
	controls.update();

	render();
	stats.update();

}

function render() {

	var delta = clock.getDelta();

	if ( table_cantina !== undefined ) {

		table_cantina.rotation.z += delta * 0.5;

	}

	if ( building_cantina !== undefined ) {

		building_cantina.rotation.z += delta * 0.5;

	}

	renderer.render( scene, camera );

}
