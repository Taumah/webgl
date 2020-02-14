import * as THREE from './Dependencies/three.module.js';

export function CreateLasers(){
	let origin_light = new THREE.PointLight( 0xff0040, 10, 60 );
	let sphere = new THREE.SphereBufferGeometry( 5, 16, 8 );
	sphere.castShadow = true;

	for(let i = 0 ; i < 5 ; i++){
		lasers.push(origin_light.clone());
		lasers[i].add( new THREE.Mesh( sphere, new THREE.MeshPhongMaterial( { color: 0xff0040 } ) ) );

		lasers[i].position.set(1450 - i*2*125 , 60 , ( (Math.random() * (500-1)) + 400 - 1) * - 1 );

		lasers[i].goLaser = function (delta){
			this.position.z += delta*190;
		};
		lasers[i].forward = 1;

		scene.add( lasers[i] );
	}


	// return laser;
}


