let object_path = "./models/";
let objects_locations = [ //paths to imported objects
	"table_cantina/table_cantina.dae",
	"building_cantina/building_cantina.dae",
	"death-star.dae"
	// "saxophonist/saxophonist.dae"
];

let fbx_loader;
let loaded_objects= [];

let stats, clock;  // "plug-ins"
let camera, scene, renderer  , PointerLock; // essentials

let  landscape ;
let listener ; // receives music from the world (~=~ ears in real life)


let audioLoader;
let music_cantina;
let lasers;
let  floor ;

let loadingManager , loader;

let ambientLight, directionalLight;

let star_sphere , death_star_mat , inside_DS_sphere ;
let gravel_floor;


// let velocity , direction;

let human_size = 20;

let controls;
let objects = [];

let raycaster;

let moveForward = false;
let moveBackward = false;
let moveLeft = false;
let moveRight = false;
let canJump = false;
