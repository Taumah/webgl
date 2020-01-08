import * as THREE from "./three.module.js"

export const CELL_WIDTH = 40, CELL_HEIGHT = 40 , CELL_DEPTH = 40;

export function createCell(){ // could add pos_X / Y args to instantly put it on the grid
    let bloc_shape = new THREE.BoxBufferGeometry(CELL_WIDTH , CELL_HEIGHT , CELL_DEPTH);
    let bloc_texture = new THREE.MeshBasicMaterial({color: 0x00ff00});

    let cell = new THREE.Mesh(bloc_shape, bloc_texture);

    cell.castShadow = true;
    return cell;
}