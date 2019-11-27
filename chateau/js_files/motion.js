import * as THREE from "./three.module.js";
import {backgroundBuilding} from "./building.js";
import {createTowers} from './tour.js';
import {createAside} from './Aside.js';

let camera, scene, renderer;
let main_basement , towers, aside;

init();
animate();

function init() {
    camera = new THREE.PerspectiveCamera( 50, window.innerWidth / window.innerHeight, 1, 4000 );
    camera.position.z = 1000;
    camera.position.y = 500;
    camera.position.x = 0;

    camera.lookAt(0,0,0);
    //~~~~~~~~~~~~~~~ INSTALLATION CLASSIQUE  ~~~~~~~~~~~~~~~~~~~~~~~~~
    scene = new THREE.Scene();

    //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

    main_basement = backgroundBuilding();
    towers = createTowers();
    aside = createAside();

    scene.add(towers);
    scene.add(main_basement);
    scene.add(aside);


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
