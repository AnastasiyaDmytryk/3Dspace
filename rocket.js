import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/Addons.js';
export class Rocket extends THREE.Mesh
{
    constructor(scene, terrain)
    {
        super();
        this.scene=scene;
        this.terrain=terrain;
        
        this.loaderModel();
    }

loaderModel()
{
    const loader = new GLTFLoader();
    loader.load('Meshes/rocket copy.glb', (gltf)=>
    {
        this.model = gltf.scene;
        this.model.position.set(-35, 10, -10); // Start position (adjust height as needed)
        this.model.rotation.y = Math.PI ; // Rotate as needed
        this.model.scale.set(1, 1, 1); // Adjust scale as needed
        this.scene.add(this.model);
    });
}


}