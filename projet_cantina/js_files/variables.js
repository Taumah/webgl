let	model_table= "./models/table_cantina/table_cantina.dae";
let	model_building= "./models/building_cantina/building_cantina.dae";
let	model_death= "./models/death-star.dae";
let	model_leia= "./models/slave-leia-from-star-wars/0.dae";
let	model_jabba= "./models/jabba-the-hutt-from-star-wars-battlefront/jabba.dae";
let	model_palpa= "./models/emperor-palpatine-from-star-wars-battlefront-2/0.dae";

let stats, clock;  // "plug-ins"
let camera, scene, renderer , controls_1st_p;; // essentials

let  landscape ;
let listener ; // receives music from the world (~=~ ears in real life)

let audioLoader;
let music_cantina;
let lasers;
let  floor ;
let controls;
let loadingManager;
let loader, loader1, loader2, loader3, loader4, loader5;

let ambientLight, directionalLight;

let star_sphere , death_star_mat , inside_DS_sphere ;
var mixer;
let gravel_floor;

let table, building, death_star, leia, jabba, palpa;
