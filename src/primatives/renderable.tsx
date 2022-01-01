import * as THREE from "three";

export interface RenderableParams {
  geometry: THREE.BufferGeometry;
  material: THREE.Material;
  position: THREE.Vector3;
}
export class Renderable {
  threeObject: THREE.Object3D;
  geometry: THREE.BufferGeometry;
  material: THREE.Material;

  constructor({ geometry, material, position }: RenderableParams) {
    this.geometry = geometry;
    this.material = material;
    this.threeObject = new THREE.Mesh(this.geometry, this.material);
    this.threeObject.position.copy(position);
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
