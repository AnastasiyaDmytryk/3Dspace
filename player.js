import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/Addons.js';
export class Player extends THREE.Mesh
{
    constructor(scene, terrain)
    {
        super();
        this.scene=scene;
        this.terrain=terrain;
//collision box
       
        this.loaderModel();
        this.boundingBox= new THREE.Box3();
    }

onCollisionEnter(collider)
{
    if (!this.model) return; 

    this.boundingBox.setFromObject(this.model);
    collider.forEach((part,index)=>
    {
        part.updateBoundingBox();
        if (this.boundingBox.intersectsBox(part.boundingBox)) 
            {
                console.log("touched");
                this.scene.remove(part.model); // Remove rocket part from scene
                collider.splice(index, 1);  
            }
    });
}
loaderModel()
{
    const loader = new GLTFLoader();
    loader.load('Meshes/Person2.glb', (gltf)=>
    {
        this.model = gltf.scene;
        this.model.position.set(0, -1.5, 30); // Start position (adjust height as needed)
        this.model.rotation.y = Math.PI*2.5 ; // Rotate as needed
        this.model.scale.set(0.35, 0.35, 0.35); // Adjust scale as needed
        this.scene.add(this.model);
        this.boundingBox.setFromObject(this.model);
    });
}


}