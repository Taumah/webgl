import * as THREE from './three.module.js';
import {DoubleSide} from "./three.module.js";

//Declaration des textures
const mur = new THREE.TextureLoader().load('./textures/mur.jpg');
const wall_text = new THREE.MeshBasicMaterial({map: mur});

const toit = new THREE.TextureLoader().load('./textures/toit.jpg');
const roof_text = new THREE.MeshBasicMaterial({map: toit,side:DoubleSide});


function createRoofLeftSide(){
	let depth = 500 , height = 130 , width = 200;

	let roofleft = new THREE.Geometry();

	for(let i= 0 ; i<2 ; i++){
		roofleft.vertices.push(
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


	roofleft.faces.push( new THREE.Face3( 0, 1, 2 ));
	roofleft.faces.push( new THREE.Face3( 3, 4, 5 ));   // base & top

	roofleft.faces.push( new THREE.Face3( 5, 4, 1 ) );   // side faces
	roofleft.faces.push( new THREE.Face3( 1, 5, 2 ) );

	roofleft.faces.push( new THREE.Face3( 0, 1, 3 ) );   // side faces
	roofleft.faces.push( new THREE.Face3( 1, 3, 4 ) );

	roofleft.faces.push( new THREE.Face3( 0, 2, 5 ) );   // side faces
	roofleft.faces.push( new THREE.Face3( 0, 3, 5 ) );

	// we have 3   200*100px  quadrilaterals

	let building_roofleft = new THREE.Mesh(roofleft, roof_text);

	building_roofleft.rotation.y = 0;
	building_roofleft.position.set(-100,100,100);



	return building_roofleft;
}

function createBuildingLeftSide() {

	let buildingleft = new THREE.BoxBufferGeometry( 500, 200, 200 );
	buildingleft = new THREE.Mesh( buildingleft, wall_text ); //same variable to save space .
	buildingleft.position.set(0,0,350);
	buildingleft.rotation.y = 1.57;

return buildingleft;


}


export function leftSide() {
	let buildingleft = createBuildingLeftSide();
	let roofleft = createRoofLeftSide();

	let bat_groupleft = new THREE.Group();
	bat_groupleft.add(buildingleft);
	bat_groupleft.add(roofleft);

	bat_groupleft.position.z -= 600;
	bat_groupleft.position.x -= 330;
	return bat_groupleft;

}





//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

