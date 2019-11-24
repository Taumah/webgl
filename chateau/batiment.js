import * as THREE from '../build/three.module.js';
let camera, scene, renderer;

let stairs, building, roof;
let group_bat;
init();
animate();

function init() {

	camera = new THREE.PerspectiveCamera( 70, window.innerWidth / window.innerHeight, 1, 2000 );
	camera.position.z = 1000;
	camera.position.y = 150;
	camera.position.x = 0;
	//~~~~~~~~~~~~~~~ INSTALLATION CLASSIQUE  ~~~~~~~~~~~~~~~~~~~~~~~~~
	scene = new THREE.Scene();

	let texture = new THREE.TextureLoader().load( 'chateau.jpg' );
	let mur_pierre = new THREE.MeshBasicMaterial( { map: texture } );

	let texture2 = new THREE.TextureLoader().load( 'tuiles.png' );
	let roof_texture = new THREE.MeshBasicMaterial( { map: texture2 } );

	//mesh = new THREE.Mesh( geometry, mur_pierre );
	//scene.add( mesh );
	//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~é

	var geometry = new THREE.Geometry();

	geometry.vertices.push(
		new THREE.Vector3( -10,  10, 0 ),
		new THREE.Vector3( -10, -10, 0 ),
		new THREE.Vector3(  10, -10, 0 )
	);
	geometry.vertices.push(
		new THREE.Vector3( -10,  10, -10 ),
		new THREE.Vector3( -10, -10, -10 ),
		new THREE.Vector3(  10, -10, -10 )
	);
	geometry.faces.push( new THREE.Face3( 0, 1, 2 ) );
	geometry.faces.push( new THREE.Face3( 3, 4, 5 ))


	var triangleMesh = new THREE.Mesh(geometry, roof_texture);
	triangleMesh.position.set(1, 0.0, 0.0);

	scene.add(triangleMesh);
	//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

	building = new THREE.BoxBufferGeometry( 200, 100, 200 );
	building = new THREE.Mesh( building, mur_pierre ); //same variable to save space .
	building.position.z = - 200;

	//scene.add(stairs);

	group_bat = new THREE.Group();
	//group_bat.add( roof );
	group_bat.add( building );

	scene.add( group_bat );


	//scene.add(building);
	//scene.add(roof);


	//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
	renderer = new THREE.WebGLRenderer( { antialias: true } );
	renderer.setPixelRatio( window.devicePixelRatio );
	renderer.setSize( window.innerWidth, window.innerHeight );
	document.body.appendChild( renderer.domElement );
	window.addEventListener( 'resize', onWindowResize, false );

	//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
}
function onWindowResize() {

	camera.aspect = window.innerWidth / window.innerHeight;
	camera.updateProjectionMatrix();

	renderer.setSize( window.innerWidth, window.innerHeight );

}
function animate() {

	requestAnimationFrame( animate );

	//group_bat.rotation.x += 0.001;
	//group_bat.rotation.z += 0.1;
	//group_bat.rotation.y += 0.003;

	renderer.render( scene, camera );

}
