function Dispose() {

	disposeTables(loaded_objects[0] ); // [0] table
	disposeBuilding(loaded_objects[1] , loaded_objects[3]); // [1] building [3]moutain
	disposeDeathStar(loaded_objects[2]); //[2] death star
	disposeLeia(loaded_objects[3]); //Leia
	disposeJabba(loaded_objects[4]); //Jabba


}


function disposeTables(table_model ){

	let table;
	const y_table = 18;
	table_model.scale.set(0.45,0.45,0.45); // every table has the same dimensions (thx IKEA)


	table = table_model.clone();
	table.position.set(0 , y_table ,-450 );
	scene.add(table);


	table = table_model.clone();
	table.position.set( -210, y_table ,-450 );
	scene.add(table);

	table = table_model.clone();
	table.position.set( -420, y_table ,-450 );
	scene.add(table);

	table = table_model.clone();
	table.position.set(-630 , y_table , -450 );
	scene.add(table);

	table = table_model.clone();
	table.position.set(0 , y_table ,-750 );
	scene.add(table);

	table = table_model.clone();
	table.position.set(-210 , y_table  , -750);
	scene.add(table);

	table = table_model.clone();
	table.position.set(-420 , y_table , -750 );
	scene.add(table);

	table = table_model.clone();
	table.position.set(-630 , y_table , -750);
	scene.add(table);
}

function disposeBuilding(building , moutain ) {

	// building.add(moutain);

	building.scale.set(1,1,1);

	building.position.set(-300,0,-300);



	scene.add(building);


}
function disposeDeathStar(death){
	death.position.set(0,1000,0);
	scene.add(death);

}
function disposeLeia(leia){
	leia.position.set(-600, 0, -600);
	leia.scale.set(90, 90, 90);
	leia.rotation.z = 240;
	scene.add(leia);
}
function disposeJabba(jabba){
	jabba.position.set(-600,0,-600);
	jabba.scale.set(50,50,50);
	jabba.rotation.z = 210;
	scene.add(jabba);
}

