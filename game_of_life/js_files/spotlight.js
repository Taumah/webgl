import * as THREE from './three.module.js';


export function createSpotLight() {

    let spotLight = new THREE.SpotLight(0xff0000);
    spotLight.position.set(100, 1000, 100);

    spotLight.castShadow = true;

    spotLight.shadow.mapSize.width = 1024;
    spotLight.shadow.mapSize.height = 1024;

    spotLight.shadow.camera.near = 10;
    spotLight.shadow.camera.far = 4000;
    spotLight.shadow.camera.fov = 50;

    spotLight.lookAt(0,0,0);

    return spotLight;
}