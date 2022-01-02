import * as THREE from "three";

export interface RenderableParams {
  geometry: THREE.BufferGeometry;
  material: THREE.Material;
  name: string;
  scene: THREE.Scene;
}
export class Renderable {
  threeObject: THREE.Object3D;
  threeParentScene: THREE.Scene;

  geometry: THREE.BufferGeometry;
  material: THREE.Material;
  name: string;

  constructor({ geometry, material, scene, name }: RenderableParams) {
    this.geometry = geometry;
    this.material = material;
    this.name = name;
    this.threeParentScene = scene;
    this.threeObject = new THREE.Mesh(this.geometry, this.material);

    // every renderable now has a parent scene, it need to add itself to the scene
    this.threeParentScene.add(this.threeObject);
  }

  /**
   * Updates object parameters, typically called called every frame.
   * Delta time used to compensate for inconsistent frame rates.
   * @param {number} deltaTime - Time since last frame in seconds.
   */
  update = (deltaTime: number) => {
    this.threeObject.rotateX(deltaTime * 1);
    this.threeObject.rotateY(deltaTime * 1);
    this.threeObject.rotateZ(deltaTime * 1);
  };
}
