import * as THREE from './three.module.js';

//Declaration des textures
const mur = new THREE.TextureLoader().load('./textures/mur.jpg');
const wall_text = new THREE.MeshBasicMaterial({map: mur});
const toit = new THREE.TextureLoader().load('./textures/toit.jpg');
const roof_text = new THREE.MeshBasicMaterial({map: toit});

var mesh, tour, mesh2, tour2;
let left_tower,right_tower;
let tower_group;
export function createTowers() {



	//Declaration taille des elements
	var geometry = new THREE.CylinderBufferGeometry(0, 120, 150, 50);
	var geometry2 = new THREE.CylinderBufferGeometry(0, 120, 150, 50);
	var geometry3 = new THREE.CylinderBufferGeometry(100, 100, 200, 100);
	var geometry4 = new THREE.CylinderBufferGeometry(100, 100, 200, 100);

	//Application texture sur elements
	mesh = new THREE.Mesh(geometry, roof_text);
	mesh2 = new THREE.Mesh(geometry2, roof_text);
	tour = new THREE.Mesh(geometry3, wall_text);
	tour2 = new THREE.Mesh(geometry4, wall_text);


	//Fond d'écran -Ciel -Sol


	// var geometry6 = new THREE.PlaneGeometry( 5000, 5000,1, 1 );
	// var material2 = new THREE.MeshBasicMaterial( { color: 0x0000ff } );
	// var floor2 = new THREE.Mesh( geometry6, material2 );
	// scene.add( floor2 );
	//
	// var geometry5 = new THREE.PlaneGeometry( 4000, 1100,1, 1 );
	// var material = new THREE.MeshBasicMaterial( { color: 0x00B200 } );
	// var floor = new THREE.Mesh( geometry5, material );
	// scene.add( floor );

	//Declaration des positions
	//toits
	mesh.position.y = +160;
	mesh2.position.y = +160;

	//decalage sur la gauche 1ere tour
	tour.position.x = -600;
	mesh.position.x = -600;


	//Avancement des tours
	tour.position.z = +100;
	mesh.position.z = +100;
	mesh2.position.z = +150;
	tour2.position.z = +150;

	//decalage sur la droite 2eme tour
	mesh2.position.x = +600;
	tour2.position.x = +600;

	//Creation des scènes

	left_tower = new THREE.Group();
	left_tower.add(mesh);
	left_tower.add(tour);

	right_tower = new THREE.Group();
	right_tower.add(mesh2);
	right_tower.add(tour2);

	tower_group = new THREE.Group();
	tower_group.add(left_tower);
	tower_group.add(right_tower);

	return tower_group;


}

