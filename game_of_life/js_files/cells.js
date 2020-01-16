import * as THREE from "./three.module.js"

export function createCell(){ // could add pos_X / Y args to instantly put it on the grid
    let bloc_shape = new THREE.BoxBufferGeometry(CELL_WIDTH , CELL_HEIGHT , CELL_DEPTH);
    // let bloc_texture = new THREE.MeshPhongMaterial({color: 0x00ff00});
	let bloc_texture = new THREE.MeshBasicMaterial({color: 0x00ff00});

    let cell = new THREE.Mesh(bloc_shape, bloc_texture);

    cell.castShadow = true;
    cell.receiveShadow = true;
    return cell;
}


export function disposeCells(scene, cell){
    let cell_duplicate;
    let is_visible;


    for (let i = 1 ; i < CELLS_BY_ROW - 1 ; i++  ){
        for (let j = 1 ; j < CELLS_BY_COL - 1 ; j++){
            cell_duplicate = cell.clone();

            cell_duplicate.position.x = i * (CELL_WIDTH + 20);
            cell_duplicate.position.z = j * (CELL_DEPTH + 20);

            is_visible = Math.floor( Math.random()*4 );  //  1/x  chance of being visible (1 generation)

            cell_duplicate.visible = !is_visible; //  NOT instruction. if =0 -> visible ; hidden otherwise

            cellID_array[i][j] = cell_duplicate.id; // saves more memory than inserting whole object
            grid[i][j] = !is_visible;

            scene.add(cell_duplicate);

        }
    }
}
