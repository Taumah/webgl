import * as THREE from './three.module.js';


export function createSpotLight() {
    // let light = new THREE.DirectionalLight( 0xffffff, 1, 100 );
    // light.position.x = 150;
	// light.position.y = 100;
	// light.position.z = 100;
	//
    // light.castShadow = true;
	//
    // light.shadow.mapSize.width = 2048;  // default
    // light.shadow.mapSize.height = 1024; // default
    // light.shadow.camera.near = 0.5;    // default
    // light.shadow.camera.far = 1000;     // default
	//
    // light.shadow.camera.left = 0;
    // light.shadow.camera.right = 200;
    // light.shadow.camera.top = 100;
    // light.shadow.camera.bottom = 0;
	//
    // light.shadow.angle = 1;

	let light = new THREE.SpotLight(0xffffff , 0.8);

	light.position.set(100,350,-100);

	light.angle = 0.5 ;
	light.penumbra = 0.05;
	light.decay = 2;
	light.distance = 1000;

	light.castShadow = true;

	light.shadow.mapSize.width = 1024;
	light.shadow.mapSize.height = 1024;
	light.shadow.camera.near = 150;
	light.shadow.camera.far = Math.sqrt( (CELLS_BY_COL * CELL_WIDTH )**2 + (CELLS_BY_ROW * CELL_HEIGHT)**2 ) + 100 ;  // diagonale de la grille



    let helper = new THREE.CameraHelper( light.shadow.camera );
    light.add( helper );

    return light;
}

export function createLightTarget() {
    let box_center = new THREE.Object3D();
    box_center.position.set(CELLS_BY_ROW * CELL_WIDTH / 2 , 0 , CELLS_BY_COL * CELL_HEIGHT / 2);

    return box_center;
}
