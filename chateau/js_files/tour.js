import * as THREE from './three.module.js';

var camera, scene, renderer;
var mesh, tour, mesh2, tour2;

init();
animate();

function init() {

	//Camera
	camera = new THREE.PerspectiveCamera( 70, window.innerWidth / window.innerHeight, 1, 1000 );
	camera.position.z = 1000;
	camera.position.y = 150;
	camera.position.x = 0;
	scene = new THREE.Scene();

	//Declaration des textures
	var mur = new THREE.TextureLoader().load('./textures/mur.jpg');
	var textmur = new THREE.MeshBasicMaterial({map: mur});
	var toit = new THREE.TextureLoader().load('./textures/toit.jpg');
	var texttoit = new THREE.MeshBasicMaterial({map: toit});

	//Declaration taille des elements
	var geometry = new THREE.CylinderBufferGeometry(0, 120, 150, 50);
	var geometry2 = new THREE.CylinderBufferGeometry(0, 120, 150, 50);
	var geometry3 = new THREE.CylinderBufferGeometry(100, 100, 200, 100);
	var geometry4 = new THREE.CylinderBufferGeometry(100, 100, 200, 100);

	//Application texture sur elements
	mesh = new THREE.Mesh(geometry, texttoit);
	mesh2 = new THREE.Mesh(geometry2, texttoit);
	tour = new THREE.Mesh(geometry3, textmur);
	tour2 = new THREE.Mesh(geometry4, textmur);


	//Fond d'écran -Ciel -Sol
	var geometry6 = new THREE.PlaneGeometry( 5000, 5000,1, 1 );
	var material2 = new THREE.MeshBasicMaterial( { color: 0x0000ff } );
	var floor2 = new THREE.Mesh( geometry6, material2 );
	scene.add( floor2 );

	var geometry5 = new THREE.PlaneGeometry( 4000, 1100,1, 1 );
	var material = new THREE.MeshBasicMaterial( { color: 0x00B200 } );
	var floor = new THREE.Mesh( geometry5, material );
	scene.add( floor );

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
	scene.add(mesh);
	scene.add(tour);
	scene.add(mesh2);
	scene.add(tour2);


	//Idk wtf that is
	renderer = new THREE.WebGLRenderer( { antialias: true } );
	renderer.setPixelRatio( window.devicePixelRatio );
	renderer.setSize( window.innerWidth, window.innerHeight );
	document.body.appendChild( renderer.domElement );
	window.addEventListener( 'resize', onWindowResize, false );

}

function onWindowResize() {

	camera.aspect = window.innerWidth / window.innerHeight;
	camera.updateProjectionMatrix();

	renderer.setSize( window.innerWidth, window.innerHeight );

}

function animate() {

	requestAnimationFrame( animate );
	renderer.render( scene, camera );

}
