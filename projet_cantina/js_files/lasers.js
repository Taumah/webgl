import * as THREE from './Dependencies/three.module.js';

export function CreateLasers(){
	let x = 50 , y =150 , z =50;
	let light = new THREE.PointLight( 0xff0000, 20, 30 );
	let cylinder_shape = new THREE.CylinderGeometry( 10, 10, 20, 20 );
	light.position.set( x-10, y-10 , z-10 );

	let cylinder_mat = new THREE.MeshPhongMaterial( {color: 0xdddddd} );
	let cylinder = new THREE.Mesh( cylinder_shape, cylinder_mat );
	cylinder.position.set(x,y,z);

	cylinder.transparent = true;
	cylinder.opacity = 0.1;

	cylinder.add(light);
	return cylinder;
}
