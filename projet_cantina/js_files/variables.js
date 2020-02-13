let object_path = "./models/";
let objects_locations = [ //paths to imported objects
	"table_cantina/table_cantina.dae",
	"building_cantina/building_cantina.dae",
	"death-star.dae",
	"slave-leia-from-star-wars/0.dae",
	"jabba-the-hutt-from-star-wars-battlefront/jabba.dae"
	
	// "saxophonist/saxophonist.dae"
];

let loaded_objects= [];

let stats, clock;  // "plug-ins"
let camera, scene, renderer , controls_1st_p;; // essentials

let  landscape ;
let listener ; // receives music from the world (~=~ ears in real life)

let audioLoader;
let music_cantina;
let lasers;
let  floor ;
let controls;
let loadingManager , loader;

let ambientLight, directionalLight;

let star_sphere , death_star_mat , inside_DS_sphere ;
var mixer;
let gravel_floor;
