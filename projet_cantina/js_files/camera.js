import * as THREE from './Dependencies/three.module.js';
import { PointerLockControls } from './Dependencies/PointerLockControls.js';

let prevTime = performance.now();
let velocity = new THREE.Vector3();
let direction = new THREE.Vector3();
// let vertex = new THREE.Vector3();

export function createCamera() {

	camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 1, 4000 );
	camera.position.y = human_size;


	PointerLock = new PointerLockControls( camera );

	let blocker = document.getElementById( 'blocker' );
	let instructions = document.getElementById( 'instructions' );

	instructions.addEventListener( 'click', function () {

		PointerLock.lock();

	}, false );

	PointerLock.addEventListener( 'lock', function () {

		instructions.style.display = 'none';
		blocker.style.display = 'none';

	} );

	PointerLock.addEventListener( 'unlock', function () {

		blocker.style.display = 'block';
		instructions.style.display = '';

	} );

	let onKeyDown = function ( event ) {

		switch ( event.keyCode ) {

			case 38: // up
			case 87: // w
				moveForward = true;
				break;

			case 37: // left
			case 65: // a
				moveLeft = true;
				break;

			case 40: // down
			case 83: // s
				moveBackward = true;
				break;

			case 39: // right
			case 68: // d
				moveRight = true;
				break;

			case 32: // space
				if ( canJump === true ) velocity.y += 350;
				canJump = false;
				break;

		}

	};

	let onKeyUp = function ( event ) {

		switch ( event.keyCode ) {

			case 38: // up
			case 87: // w
				moveForward = false;
				break;

			case 37: // left
			case 65: // a
				moveLeft = false;
				break;

			case 40: // down
			case 83: // s
				moveBackward = false;
				break;

			case 39: // right
			case 68: // d
				moveRight = false;
				break;

		}

	};

	document.addEventListener( 'keydown', onKeyDown, false );
	document.addEventListener( 'keyup', onKeyUp, false );

	raycaster = new THREE.Raycaster( new THREE.Vector3(), new THREE.Vector3( 0, - 1, 0 ), 0, 10 );

	// vertex displacement

}

export function updateCamPos() {
	raycaster.ray.origin.copy( PointerLock.getObject().position );
	raycaster.ray.origin.y -= human_size;

	var intersections = raycaster.intersectObjects( objects );

	var onObject = intersections.length > 0;

	var time = performance.now();
	var delta = ( time - prevTime ) / 1000;

	velocity.x -= velocity.x  * delta;
	velocity.z -= velocity.z  * delta;

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

	PointerLock.moveRight( - velocity.x * delta );
	PointerLock.moveForward( - velocity.z * delta );

	PointerLock.getObject().position.y += ( velocity.y * delta ); // new behavior

	if ( PointerLock.getObject().position.y < human_size ) {

		velocity.y = 0;
		PointerLock.getObject().position.y = human_size;

		canJump = true;

	}

	prevTime = time;

}
