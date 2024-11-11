import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/Addons.js';


export class rocketPart extends THREE.Mesh
{
    constructor(scene,terrain,mesh, x,y,z)
    {
        super();
        this.scene=scene;
        this.terrain=terrain;
        this.model=null;
        this.loaderModel(mesh,x,y,z);
        //collision box
        this.boundingBox = new THREE.Box3();
       
    }

loaderModel(mesh,x,y,z)
{
    const loader = new GLTFLoader();
    loader.load(mesh, (gltf)=>
    {
        this.model = gltf.scene;
        this.model.position.set(x,y,z); // Start position (adjust height as needed)
        this.model.rotation.y = Math.PI*2.5 ; // Rotate as needed
        this.model.scale.set(1, 1, 1); // Adjust scale as needed
        this.scene.add(this.model);
        this.boundingBox.setFromObject(this.model);
    });
}
updateBoundingBox() {
    if (this.model) {
        this.boundingBox.setFromObject(this.model);
    }
}


}