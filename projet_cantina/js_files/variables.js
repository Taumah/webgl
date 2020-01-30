let object_path = "./models/";
let objects_locations = [ //paths to imported objects
	"table_cantina/table_cantina.dae",
	"building_cantina/building_cantina.dae",
	"death-star.dae"
	// "saxophonist/saxophonist.dae"
];

let loaded_objects= [];

let stats, clock;  // "plug-ins"
let camera, scene, renderer; // essentials

let lasers;

let  floor ;
let controls;

let loadingManager , loader;

let ambientLight, directionalLight;

let star_sphere , death_star_mat;
