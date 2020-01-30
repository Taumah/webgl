import * as THREE from './Dependencies/three.module.js';

export function CreateLasers(){
	let light = new THREE.PointLight( 0xff0000, 1, 200 );
	light.position.set( 50, 150, 50 );

	return light;
}
