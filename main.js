import * as THREE from 'three';

import { Terrain } from '/Users/nastya/Documents/Capstone/terrain.js';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { Player } from './player';
import { Rocket } from './rocket';
import { Planet } from './planet';
import { rocketPart } from './Mini World_files/rocketParts';


const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize( window.innerWidth, window.innerHeight );
renderer.setAnimationLoop( animate );
document.body.appendChild( renderer.domElement );


const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );



new THREE.CubeTextureLoader()
.load(
    [
        'px.jpg',
        'nx.jpg',
        'py.jpg',
        'ny.jpg',
        'pz.jpg',
        'nz.jpg'
    ],
    (cubeTexture)=>
    {
        
        scene.background=cubeTexture;
        renderer.render( scene, camera );
 
    }
);

//The world
const terrain = new Terrain();
scene.add(terrain);

//Light 
const sun = new THREE.DirectionalLight(0xffffff, 1.5);
sun.position.set(-30,30,-5);
sun.castShadow=true;
scene.add(sun);
sun.shadow.mapSize.width=2048;
sun.shadow.mapSize.height=2048;

const ambient = new THREE.AmbientLight();
ambient.intensity=0.5;
scene.add(ambient);

//add player
const player = new Player(scene,terrain);
// add rocket 
const rocket = new Rocket(scene,terrain);



//add planet 
const planet = new Planet(scene,terrain);
//add broken parts
const rocketParts = [
 new rocketPart(terrain,terrain,'Meshes/rocketColoredP5glb.glb',0,10,2),
 new rocketPart(terrain,terrain,'Meshes/rocketColoredP1.glb',-5,-5,2),
 new rocketPart(terrain,terrain,'Meshes/rocketColoredP2.glb',10,4,-5),
 new rocketPart(terrain,terrain,'Meshes/rocketColoredP6glb.glb',3,3,7),
 new rocketPart(terrain,terrain,'Meshes/rocketColoredP7glb.glb',-6,2,-6)];
//camera position, change ater to follow player
window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});
camera.position.z = 35;

//instantiating a loader for the models



function animate() 
{

    
   
    terrain.update();
    planet.update();
    player.onCollisionEnter(rocketParts);
	renderer.render( scene, camera );

}
