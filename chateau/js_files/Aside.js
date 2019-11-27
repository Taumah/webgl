import * as THREE from './three.module.js';
//Declaration des textures
const mur = new THREE.TextureLoader().load('./textures/mur.jpg');
const wall_text = new THREE.MeshBasicMaterial({map: mur});

const toit = new THREE.TextureLoader().load('./textures/toit.jpg');
const roof_text = new THREE.MeshBasicMaterial({map: toit,side:THREE.DoubleSide});



function createRoofAside(){
	let depth = 400 , height = 130 , width = 175;

	let roofAside = new THREE.Geometry();
	let building_roofAside = new THREE.Mesh(roofAside, roof_text);

	for(let i= 0 ; i<2 ; i++){
		roofAside.vertices.push(
			new THREE.Vector3( 0,  0, i*depth ), // point 1 face i
			new THREE.Vector3(  width, 0, i*depth ), // point 2 face i...
			new THREE.Vector3(width/2, height, i*depth )
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
	roofAside.faces.push( new THREE.Face3( 0, 1, 2 ));

	roofAside.faces.push( new THREE.Face3( 3, 4, 5 ));   // base & top
	roofAside.faces.push( new THREE.Face3( 5, 4, 1 ) );   // side faces

	roofAside.faces.push( new THREE.Face3( 1, 5, 2 ) );
	roofAside.faces.push( new THREE.Face3( 0, 1, 3 ) );   // side faces

	roofAside.faces.push( new THREE.Face3( 1, 3, 4 ) );
	roofAside.faces.push( new THREE.Face3( 0, 2, 5 ) );   // side faces

	roofAside.faces.push( new THREE.Face3( 0, 3, 5 ) );

	// we have 3   200*100px  quadrilaterals
	building_roofAside.position.set(0,0,0);


	return building_roofAside;
}

function createBuildingAside() {

	let buildingAside = new THREE.BoxBufferGeometry( 400, 200, 175 );
	buildingAside = new THREE.Mesh( buildingAside, wall_text ); //same variable to save space .
	buildingAside.position.set(0,0,0);
	buildingAside.rotation.y = 1.57;

return buildingAside;


}


export function createAside(array, offset) {
	let buildingAside = createBuildingAside();
	let roofAside = createRoofAside();

	roofAside.position.set(-87,100,150);
	buildingAside.position.set(0, 0, 350);

	let bat_groupleft = new THREE.Group();
	bat_groupleft.add(buildingAside);
	bat_groupleft.add(roofAside);

	let rightside = bat_groupleft.clone();
	let bat_groupright = new THREE.Group();
	bat_groupright.add(rightside);


	bat_groupleft.position.z = -550;
	bat_groupleft.position.x = -350;
	bat_groupleft.position.y = 0;

	bat_groupleft.rotation.y = 0;


	bat_groupright.position.z = -570;
	bat_groupright.position.x = 350;
	bat_groupright.position.y = 0;

	bat_groupright.rotation.y = 0.2;

	let bat_groupsides = new THREE.Group();
	bat_groupsides.add(bat_groupright);
	bat_groupsides.add(bat_groupleft);

	return bat_groupsides;

}







//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

