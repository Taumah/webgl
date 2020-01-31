import * as THREE from './Dependencies/three.module.js';

export function CreateLasers(){
	let x = 50 , y =150 , z =50;
	let light = new THREE.PointLight( 0xff0000, 20, 200 );
	light.position.set( 0, 0 , 0 );


	let cylinder_shape = new THREE.CylinderGeometry( 10, 10, 20, 20 );
	let cylinder_mat = new THREE.MeshPhongMaterial( {color: 0x006600} );
	let laser = new THREE.Mesh( cylinder_shape, cylinder_mat );

	laser.add(light);

	laser.position.set(x,y,z);
	laser.opacity = 0.6;

	laser.castShadow , laser.receiveShadow= true , true ;
	laser.transparent = true;


	return laser;
}
