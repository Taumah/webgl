function Dispose() {

	disposeTables(loaded_objects[0] ); // [0] table
	disposeBuilding(loaded_objects[1] ); // [1] building
	disposeDeathStar(loaded_objects[2]); //[2] death star


}


function disposeTables(table_model ){

	let table;
	const y_table = 15;
	table_model.scale.set(0.4,0.4,0.4); // every table has the same dimensions (thx IKEA)


	table = table_model.clone();
	table.position.set(0 , y_table ,100 );
	scene.add(table);


	table = table_model.clone();
	table.position.set( 150, y_table ,300 );
	scene.add(table);

	table = table_model.clone();
	table.position.set( 70, y_table ,500 );
	scene.add(table);

	table = table_model.clone();
	table.position.set(20 , y_table ,700 );
	scene.add(table);

	table = table_model.clone();
	table.position.set(140+300 , y_table ,100 );
	scene.add(table);

	table = table_model.clone();
	table.position.set(100+300 , y_table ,300 );
	scene.add(table);

	table = table_model.clone();
	table.position.set(40+300 , y_table ,500 );
	scene.add(table);

	table = table_model.clone();
	table.position.set(90+300 , y_table ,700 );
	scene.add(table);
}
function disposeBuilding(building ) {
	building.scale.set(1,1,1);

	building.position.set(-300,0,-300);
	scene.add(building);
}
function disposeDeathStar(death){
	death.position.set(0,1000,0);
	scene.add(death);
	
}