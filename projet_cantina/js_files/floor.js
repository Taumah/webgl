import * as THREE from './Dependencies/three.module.js';

export function createFloor(){

     let sand = new THREE.TextureLoader().load('./textures/sand.jpg');
    sand.repeat.set(20,20);  // not desired effect
    let floor_geo = new THREE.PlaneGeometry( 6000,6000,1,1);

    let floor_text = new THREE.MeshBasicMaterial({map:sand , side:THREE.DoubleSide});

    let floor = new THREE.Mesh(floor_geo,floor_text);

    floor.rotation.x = 1.57;   // 90° rotation
    floor.position.set(1500,0,1500); // buildings' heights /2

    floor.receiveShadow = true;

    console.log(floor);

    return floor;
}
