import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/Addons.js';
export class Planet extends THREE.Mesh
{
    constructor(scene, terrain)
    {
        super();
        this.scene=scene;
        this.terrain=terrain;
        this.model=null;
        this.loaderModel();
    }

loaderModel()
{
    const loader = new GLTFLoader();
    loader.load('Meshes/BluePlanet.glb', (gltf)=>
    {
        this.model = gltf.scene;
        this.model.position.set(30, 10, -10); // Start position (adjust height as needed)
        this.model.rotation.y = Math.PI*2.5 ; // Rotate as needed
        this.model.scale.set(2, 2, 2); // Adjust scale as needed
        this.scene.add(this.model);
    });
}
update()
{
    if(this.model)
    {

        this.rotation.y+=0.01;
        

    }
    

}

}