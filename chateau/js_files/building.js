import * as THREE from './three.module.js';

//Declaration des textures
const mur = new THREE.TextureLoader().load('./textures/mur.jpg');
const wall_text = new THREE.MeshBasicMaterial({map: mur});
const toit = new THREE.TextureLoader().load('./textures/toit.jpg');
const roof_text = new THREE.MeshBasicMaterial({map: toit});


function createRoof(){
	let depth = 500;
	let roof = new THREE.Geometry();
	for(let i= 0 ; i<2 ; i++){
		roof.vertices.push(
			new THREE.Vector3( 0,  0, i*depth ), // point 1 face i
			new THREE.Vector3( 100, 0, i*depth ), // point 2 face i...
			new THREE.Vector3(  50, 100, i*depth )
		);
	}
	//procedural equivalent :
	// roof.vertices.push(
	// 	new THREE.Vector3( 0,  0, 0 ), // point 1 face 1
	// 	new THREE.Vector3( 100, 0, 0 ), // point 2 face 1...
	// 	new THREE.Vector3(  50, 100, 0 )
	// );
	// roof.vertices.push(
	// 	new THREE.Vector3( 0,  0, 200 ), // point 1 face 2
	// 	new THREE.Vector3( 100, 0, 200 ), // point 2 face 2...
	// 	new THREE.Vector3(  50, 100, 200 )
	// );


	roof.faces.push( new THREE.Face3( 0, 1, 2 ) );
	roof.faces.push( new THREE.Face3( 3, 4, 5 ));   // base & top

	roof.faces.push( new THREE.Face3( 5, 4, 1 ) );   // side faces
	roof.faces.push( new THREE.Face3( 1, 5, 2 ) );

	roof.faces.push( new THREE.Face3( 0, 1, 3 ) );   // side faces
	roof.faces.push( new THREE.Face3( 1, 3, 4 ) );

	roof.faces.push( new THREE.Face3( 0, 2, 5 ) );   // side faces
	roof.faces.push( new THREE.Face3( 0, 3, 5 ) );

	// we have 3   200*100px  quadrilaterals

	let building_roof = new THREE.Mesh(roof, roof_text);

	building_roof.position.set(0,250,0);
	//building_roof.rotation.y = 1.57;

	return building_roof;
}

function createBuilding() {

	let building = new THREE.BoxBufferGeometry( 500, 250, 200 );
	building = new THREE.Mesh( building, wall_text ); //same variable to save space .
	building.position.set(0,0,-100);

return building;


}


export function backgroundBuilding() {
	let building = createBuilding();
	let roof = createRoof();

	let bat_group = new THREE.Group();
	bat_group.add(building);
	bat_group.add(roof);

	return bat_group;

}


//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

