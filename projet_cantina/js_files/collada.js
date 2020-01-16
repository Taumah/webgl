import * as THREE from './three.module.js';
import Stats from './stats.module.js';
import { ColladaLoader } from './ColladaLoader.js';
import {OrbitControls} from "./OrbitControls.js";

			var container, stats, clock;
			var camera, scene, renderer, table_cantina, building_cantina;
			let controls;
			init();
			animate();

			function init() {

				container = document.getElementById( 'container' );
				camera = new THREE.PerspectiveCamera( 45, window.innerWidth / window.innerHeight, 0.1, 2000 );
				camera.position.set( 8, 10, 8 );
				camera.lookAt( 0, 3, 0 );

				scene = new THREE.Scene();

				clock = new THREE.Clock();

				// loading manager

				var loadingManager = new THREE.LoadingManager( function () {

					scene.add(table_cantina);
					scene.add (building_cantina);

				} );

				// collada

				var table_cantina = new ColladaLoader( loadingManager );
				table_cantina.load( './models/table_cantina/table_cantina.dae', function ( collada ) {

					table_cantina = collada.scene;

				} );

				var building_cantina = new ColladaLoader( loadingManager );
				building_cantina.load( './models/building_cantina/building_cantina.dae', function ( collada ) {

					building_cantina = collada.scene;

				} );


				//

				var ambientLight = new THREE.AmbientLight( 0xcccccc, 0.4 );
				scene.add( ambientLight );

				var directionalLight = new THREE.DirectionalLight( 0xffffff, 0.8 );
				directionalLight.position.set( 1, 1, 0 ).normalize();
				scene.add( directionalLight );

				//

				renderer = new THREE.WebGLRenderer();
				renderer.setPixelRatio( window.devicePixelRatio );
				renderer.setSize( window.innerWidth, window.innerHeight );
				container.appendChild( renderer.domElement );

				//
				controls = new OrbitControls( camera, renderer.domElement );

				controls.enable = true;
				controls.enableKeys = true;

				controls.update();
				//

				stats = new Stats();
				container.appendChild( stats.dom );

				//

				window.addEventListener( 'resize', onWindowResize, false );

			}

			function onWindowResize() {

				camera.aspect = window.innerWidth / window.innerHeight;
				camera.updateProjectionMatrix();

				renderer.setSize( window.innerWidth, window.innerHeight );

			}

			function animate() {

				requestAnimationFrame( animate );
				controls.update();

				render();
				stats.update();

			}

			function render() {

				var delta = clock.getDelta();

				if ( table_cantina !== undefined ) {

					table_cantina.rotation.z += delta * 0.5;

				}

				if ( building_cantina !== undefined ) {

					building_cantina.rotation.z += delta * 0.5;

				}

				renderer.render( scene, camera );

			}
