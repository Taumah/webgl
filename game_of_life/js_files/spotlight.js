import * as THREE from './three.module.js';
import {CELL_DEPTH, CELL_HEIGHT, CELL_WIDTH} from "./cells.js";


export function createDirLight() {
    let light = new THREE.DirectionalLight( 0xffffff, 1, 100 );
    light.position.set( 150, 100, 100 ); 			//default; light shining from top

    light.castShadow = true;

    light.shadow.mapSize.width = 2048;  // default
    light.shadow.mapSize.height = 1024; // default
    light.shadow.camera.near = 0.5;    // default
    light.shadow.camera.far = 1000;     // default

    light.shadow.camera.left = 0;
    light.shadow.camera.right = 200;
    light.shadow.camera.top = 100;
    light.shadow.camera.bottom = 0;

    let helper = new THREE.CameraHelper( light.shadow.camera );
    light.add( helper );

    return light;
}

export function createLightTarget() {
    let box_center = new THREE.Object3D();
    box_center.position.set(CELLS_BY_ROW * CELL_WIDTH / 2 , 0 , CELLS_BY_COL * CELL_HEIGHT / 2);

    return box_center;
}
