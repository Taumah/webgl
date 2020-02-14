import * as THREE from './Dependencies/three.module.js';
import Stats from './Dependencies/stats.module.js';
import { ColladaLoader } from './Dependencies/ColladaLoader.js';
import {OrbitControls} from "./Dependencies/OrbitControls.js";
import { FBXLoader } from './Dependencies/FBXLoader.js';

import {createFloor , createTrail} from "./floor.js";
import {createLandscape} from "./landscape.js";
import {CreateLasers} from "./lasers.js";
import {createCamera , updateCamPos} from "./camera.js";

let container = document.getElementById( 'container' );




export function init() {
	window.addEventListener("click" , function () {
		console.log(camera.position);
	})
	createRenderer(); //essential object

	createCamera(); // 1st person control

	scene = new THREE.Scene();
	scene.add( PointerLock.getObject() );

	clock = new THREE.Clock();

	listener = new THREE.AudioListener;
	camera.add(listener);


	music_cantina = new THREE.PositionalAudio( listener );

	audioLoader = new THREE.AudioLoader();
		audioLoader.load( 'sound/Cantina2.mp3', function ( buffer ) {
		music_cantina.setBuffer( buffer );
		music_cantina.setLoop( true );
		music_cantina.setRefDistance( 0.2 );
		music_cantina.play();
	} );

	loadingManager = new THREE.LoadingManager();
	disposeCollada(loadingManager, ColladaLoader);

	// create an object for the sound to play from
	inside_DS_sphere = new THREE.SphereGeometry( 20, 32, 16 );
	death_star_mat = new THREE.MeshPhongMaterial( { color: 0xff2200 } );
	star_sphere = new THREE.Mesh( inside_DS_sphere , death_star_mat );
	star_sphere.position.set(-100,-50,-500);
	scene.add( star_sphere );

	// finally add the sound to the mesh
	star_sphere.add( music_cantina );

	scene.fog = new THREE.FogExp2(0x8f8483, 0.0006);

	floor = createFloor();
	scene.add(floor);

	gravel_floor  = createTrail();
	scene.add(gravel_floor);

	landscape = createLandscape();
	scene.add(landscape);
	CreateLasers();

	let loader = new FBXLoader();
	loader.load( 'models/Pointing2.fbx', function ( object ) {

		object.position.set(1600,0,-650);
		object.rotation.y = Math.PI/2;

		object.scale.set(0.7,0.7,0.7);

		mixer = new THREE.AnimationMixer( object );

		let action = mixer.clipAction( object.animations[ 0 ] );
		action.play();
		object.traverse( function ( child ) {

			if ( child.isMesh ) {

				child.castShadow = true;
				child.receiveShadow = true;

			}
		});

		scene.add( object );

	} );

	// loading and adding shadow to every imported object

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
	if ( PointerLock.isLocked === true ) {
		updateCamPos()
	}
	let delta = clock.getDelta();
	if ( mixer ) mixer.update( delta );
	stats.update();
	render(delta);
}

function render(delta) {

	stats.update(delta);

	renderer.render( scene, camera );

	lasers.forEach(function (element) {
		if(element.position.z <= -900){
			element.forward = 1;
		}
		else if(element.position.z >= -300){
			element.forward = -1;
		}

		element.goLaser(element.forward * delta);

	});

}

function createRenderer() {

	renderer = new THREE.WebGLRenderer();
	renderer.setPixelRatio( window.devicePixelRatio );
	renderer.setSize( window.innerWidth, window.innerHeight );
	container.appendChild( renderer.domElement );

}
