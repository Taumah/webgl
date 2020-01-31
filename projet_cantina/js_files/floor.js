import * as THREE from './Dependencies/three.module.js';

export function createFloor(){
     let sand = new THREE.TextureLoader().load('./textures/good_good_sand.jpg');

    sand.wrapS = THREE.RepeatWrapping;
    sand.wrapT = THREE.RepeatWrapping;
    sand.repeat.set(14,8);
    let floor_geo = new THREE.PlaneGeometry( 10000,10000,20,20);

    let floor_text = new THREE.MeshPhongMaterial({map:sand , side:THREE.DoubleSide});

    let floor = new THREE.Mesh(floor_geo,floor_text);

    floor.rotation.x = 1.57;   // 90° rotation
    floor.position.set(1500,0,1500); // buildings' heights /2

    floor.receiveShadow = true;
    return floor;
}

export function createTrail(){
	let gravel = new THREE.TextureLoader().load('./textures/black_gravel.jpg');

	gravel.wrapS = THREE.RepeatWrapping;
	gravel.wrapT = THREE.RepeatWrapping;
	gravel.repeat.set(10,10);

	let floor_geo = new THREE.PlaneGeometry( 1000,300,20,20);

	let floor_text = new THREE.MeshPhongMaterial({map:gravel , side:THREE.DoubleSide});

	gravel_floor = new THREE.Mesh(floor_geo,floor_text);

	gravel_floor.position.set(1000,1,-500);

	gravel_floor.receiveShadow = true;
	gravel_floor.rotation.x = Math.PI / 2;

	return gravel_floor;
}
