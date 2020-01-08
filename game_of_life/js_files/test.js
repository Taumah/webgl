import * as THREE from './three.module.js';


var scene = new THREE.Scene();
var renderer = new THREE.WebGLRenderer();
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap; // default THREE.PCFShadowMap

//Create a DirectionalLight and turn on shadows for the light
var light = new THREE.DirectionalLight( 0xffffff, 1, 100 );
light.position.set( 0, 1, 0 ); 			//default; light shining from top
light.castShadow = true;            // default false
scene.add( light );

//Set up shadow properties for the light
light.shadow.mapSize.width = 512;  // default
light.shadow.mapSize.height = 512; // default
light.shadow.camera.near = 0.5;    // default
light.shadow.camera.far = 500;     // default

//Create a sphere that cast shadows (but does not receive them)
var sphereGeometry = new THREE.SphereBufferGeometry( 5, 32, 32 );
var sphereMaterial = new THREE.MeshStandardMaterial( { color: 0xff0000 } );
var sphere = new THREE.Mesh( sphereGeometry, sphereMaterial );
sphere.castShadow = true; //default is false
sphere.receiveShadow = false; //default
scene.add( sphere );

//Create a plane that receives shadows (but does not cast them)
var planeGeometry = new THREE.PlaneBufferGeometry( 20, 20, 32, 32 );
var planeMaterial = new THREE.MeshStandardMaterial( { color: 0x00ff00 } )
var plane = new THREE.Mesh( planeGeometry, planeMaterial );
plane.receiveShadow = true;
scene.add( plane );

//Create a helper for the shadow camera (optional)
// var helper = new THREE.CameraHelper( light.shadow.camera );
// scene.add( helper );

// renderer = new THREE.WebGLRenderer( { antialias: true } );
// renderer.setPixelRatio( window.devicePixelRatio );
// renderer.setSize( window.innerWidth, window.innerHeight );

// var camera = new THREE.PerspectiveCamera( 50, window.innerWidth / window.innerHeight, 1, 4500 );
// controls = new THREE.OrbitControls( camera, renderer.domElement );

// controls.enable = true;
// controls.enableKeys = true;

// camera.position.set( 0, 100, 60 );
// camera.lookAt(0,0,0);

//controls.update() must be called after any manual changes to the camera's transform
// controls.update();



// document.body.appendChild( renderer.domElement );
// window.addEventListener( 'resize', onWindowResize, false );
//
// animate();
// function onWindowResize() {
//
//     camera.aspect = window.innerWidth / window.innerHeight;
//     camera.updateProjectionMatrix();
//
//     renderer.setSize( window.innerWidth, window.innerHeight );
//
// }
//
// function animate() {
//
//     requestAnimationFrame( animate );
//
//     // controls.update();
//
//     renderer.render( scene, camera );
//
// }