import * as THREE from './Dependencies/three.module.js';
import Stats from './Dependencies/stats.module.js';
import { ColladaLoader } from './Dependencies/ColladaLoader.js';
import {OrbitControls} from "./Dependencies/OrbitControls.js";
import { FBXLoader } from './Dependencies/FBXLoader.js';

import {createFloor , createTrail} from "./floor.js";
import {createLandscape} from "./landscape.js";
import {CreateLasers} from "./lasers.js";
import {createCamera } from "./camera.js";

let container = document.getElementById( 'container' );
let prevTime = performance.now();
let velocity = new THREE.Vector3();
let direction = new THREE.Vector3();
let vertex = new THREE.Vector3();


export function init() {
	createRenderer(); //essential object

	createCamera(); // 1st person control

	scene = new THREE.Scene();
	scene.add( controls.getObject() );

	clock = new THREE.Clock();

	listener = new THREE.AudioListener;
	camera.add(listener);

	//createHumanCamera();

	music_cantina = new THREE.PositionalAudio( listener );

	audioLoader = new THREE.AudioLoader();
		audioLoader.load( 'sound/Cantina2.mp3', function ( buffer ) {
		music_cantina.setBuffer( buffer );
		music_cantina.setLoop( true );
		music_cantina.setRefDistance( 0.5 );
		music_cantina.play();
	} );

	loadingManager = new THREE.LoadingManager();

	loadingManager.onLoad = function () {

		Dispose();//places every loaded object on map
		// (unfortunately already added with loading manager)


	};

	//Fbx loader
	let mixer;
	fbx_loader = new FBXLoader();
	fbx_loader.load( 'models/red-canyon-landscape/source/mountain.fbx', function ( object ) {

					mixer = new THREE.AnimationMixer( object );

					let action = mixer.clipAction( object.animations[ 0 ] );
					action.play();
					object.traverse( function ( child ) {

						if ( child.isMesh ) {

							child.castShadow = true;
							child.receiveShadow = true;

						}
					});


					object.scale.set(1,1,1);
					console.log("hehe" + object);
					scene.add( object );

				} );

	// create an object for the sound to play from
	inside_DS_sphere = new THREE.SphereGeometry( 20, 32, 16 );
	death_star_mat = new THREE.MeshPhongMaterial( { color: 0xff2200 } );
	star_sphere = new THREE.Mesh( inside_DS_sphere , death_star_mat );
	star_sphere.position.set(0,1000,0);
	scene.add( star_sphere );

	// finally add the sound to the mesh
	star_sphere.add( music_cantina );

	scene.fog = new THREE.FogExp2(0x8f8483, 0.0006);

	fbx_loader = new ColladaLoader( loadingManager );

	floor = createFloor();
	scene.add(floor);

	gravel_floor  = createTrail();
	scene.add(gravel_floor);

	landscape = createLandscape();
	scene.add(landscape);
	lasers = CreateLasers();
	scene.add(lasers);

	for(let i = 0 ; i < objects_locations.length ; i++) {
		fbx_loader.load(object_path + objects_locations[i] , function(obj){


			loaded_objects.push(obj.scene);


			if(obj['animations'].length !== 0){
				console.log("some work has to be done !");
			}


		}) ;
	}


	// loading and adding shadow to every imported object
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

	if ( controls.isLocked === true ) {

		raycaster.ray.origin.copy( controls.getObject().position );
		raycaster.ray.origin.y -= 10;

		var intersections = raycaster.intersectObjects( objects );

		var onObject = intersections.length > 0;

		var time = performance.now();
		var delta = ( time - prevTime ) / 1000;

		velocity.x -= velocity.x * 10.0 * delta;
		velocity.z -= velocity.z * 10.0 * delta;

		velocity.y -= 9.8 * 100.0 * delta; // 100.0 = mass

		direction.z = Number( moveForward ) - Number( moveBackward );
		direction.x = Number( moveRight ) - Number( moveLeft );
		direction.normalize(); // this ensures consistent movements in all directions

		if ( moveForward || moveBackward ) velocity.z -= direction.z * 400.0 * delta;
		if ( moveLeft || moveRight ) velocity.x -= direction.x * 400.0 * delta;

		if ( onObject === true ) {

			velocity.y = Math.max( 0, velocity.y );
			canJump = true;

		}

		controls.moveRight( - velocity.x * delta );
		controls.moveForward( - velocity.z * delta );

		controls.getObject().position.y += ( velocity.y * delta ); // new behavior

		if ( controls.getObject().position.y < 10 ) {

			velocity.y = 0;
			controls.getObject().position.y = 10;

			canJump = true;

		}

		prevTime = time;

	}

	render();
}

function render() {

	let delta = clock.getDelta();

	stats.update(delta);
	lasers.update();
	// camControls.update(delta);

	// controls.update( clock.getDelta() );
	renderer.render( scene, camera );
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



