function disposeCollada(loadingManager, ColladaLoader){
	
	loader = new ColladaLoader( loadingManager );
	loader.load(model_table, function(collada){
		table = collada.scene;
		disposeTables(table);
	})
	loader1 = new ColladaLoader( loadingManager );
	loader1.load(model_building, function(collada){
		building = collada.scene;
		disposeBuilding(building);
	})
	loader2 = new ColladaLoader( loadingManager );
	loader2.load(model_death, function(collada){
		death_star = collada.scene;
		disposeDeathStar(death_star);
	})
	loader3 = new ColladaLoader( loadingManager );
	loader3.load(model_leia, function(collada){
		leia = collada.scene;
		disposeLeia(leia);
	})
	loader4 = new ColladaLoader( loadingManager );
	loader4.load(model_jabba, function(collada){
		jabba = collada.scene;
		disposeJabba(jabba);
	})
	loader5 = new ColladaLoader( loadingManager );
	loader5.load(model_palpa, function(collada){
		palpa = collada.scene;
		disposePal(palpa);
	})
}



function disposeTables(table_model){

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
function disposeBuilding(building) {

	// building.add(moutain);

	building.scale.set(1,1,1);

	building.position.set(-300,0,-300);



	scene.add(building);


}
function disposeDeathStar(death){
	death.position.set(0,1000,0);
	scene.add(death);

}
function disposeJabba(leia){
	leia.position.set(-600, 0, -600);
	leia.scale.set(90, 90, 90);
	leia.rotation.z = 240;
	scene.add(leia);
}
function disposeLeia(jabba){
	jabba.position.set(-600,0,-600);
	jabba.scale.set(50,50,50);
	jabba.rotation.z = 210;
	scene.add(jabba);
} 
function disposePal(palpa){
	palpa.position.set(-380, 0, -830);
	palpa.scale.set(40,40,40);
	scene.add(palpa);
}
