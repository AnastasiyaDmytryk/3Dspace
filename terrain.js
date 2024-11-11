import * as THREE from 'three';
export class Terrain extends THREE.Mesh
{
    constructor(z,y)
    {
        
     
        const geometry = new THREE.SphereGeometry( 15, 32, 16 ); 
        const texture = new THREE.TextureLoader().load('Textures/4k_makemake_fictional.jpg');

        const material= new THREE.MeshStandardMaterial({map: texture });
        super(geometry,material);
        this.position.z = 20;
        this.position.y = -13;
        this.speed = 0.02;
        this.keys = {w:false, a:false, s:false,d:false};
        this.keyListeners();
        
    }
    keyListeners()
{
    window.addEventListener('keydown', (event)=>
    {
        console.log(event.key);
        if (event.key === 'w') this.keys.w = true;
        if (event.key === 'a') this.keys.a = true;
        if (event.key === 's') this.keys.s = true;
        if (event.key === 'd') this.keys.d = true;
    });
    window.addEventListener('keyup', (event)=>
    {
        if (event.key === 'w') this.keys.w = false;
        if (event.key === 'a') this.keys.a = false;
        if (event.key === 's') this.keys.s = false;
        if (event.key === 'd') this.keys.d = false;
    });

}
move() {
  
    if (this.keys.w) 
    {
        this.rotation.x += this.speed;
    } // Move forward
    if (this.keys.s) this.rotation.x -= this.speed; // Move backward
    if (this.keys.a) this.rotation.z -= this.speed; // Move left
    if (this.keys.d) this.rotation.z += this.speed; // Move right
    
    // Boundary checks to keep the player within the terrain
    //const halfWidth = this.terrain.width / 2;
    //const halfHeight = this.terrain.height / 2;
   // this.model.position.x = Math.max(-halfWidth, Math.min(halfWidth, this.model.position.x));
    //this.model.position.z = Math.max(-halfHeight, Math.min(halfHeight, this.model.position.z));
}
update()
{
    this.move();
}

    

}