import * as THREE from './Dependencies/three.module.js';

export function createLandscape(){

    let materialArray = [];
    let texture_negX = new THREE.TextureLoader().load( './landscape/GalaxyTex_PositiveX.png');
    let texture_negY = new THREE.TextureLoader().load( './landscape/GalaxyTex_PositiveX.png');
    let texture_negZ = new THREE.TextureLoader().load( './landscape/GalaxyTex_PositiveX.png');
    let texture_posX = new THREE.TextureLoader().load( './landscape/GalaxyTex_PositiveX.png');
    let texture_posY = new THREE.TextureLoader().load( './landscape/GalaxyTex_PositiveX.png');
    let texture_posZ = new THREE.TextureLoader().load( './landscape/GalaxyTex_PositiveX.png');
      
    materialArray.push(new THREE.MeshBasicMaterial( { map: texture_negX }));
    materialArray.push(new THREE.MeshBasicMaterial( { map: texture_negY }));
    materialArray.push(new THREE.MeshBasicMaterial( { map: texture_negZ }));
    materialArray.push(new THREE.MeshBasicMaterial( { map: texture_posX }));
    materialArray.push(new THREE.MeshBasicMaterial( { map: texture_posY }));
    materialArray.push(new THREE.MeshBasicMaterial( { map: texture_posZ }));
       
    for (let i = 0; i < 6; i++)
      materialArray[i].side = THREE.BackSide;
       
    let skyboxGeo = new THREE.SphereGeometry( 4000, 20, 20);
    let landscape = new THREE.Mesh( skyboxGeo, materialArray );

    return landscape;
    
}