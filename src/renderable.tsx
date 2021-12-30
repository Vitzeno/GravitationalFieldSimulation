import * as THREE from "three";

export class Renderable {
  threeObject: THREE.Object3D;
  geometry: THREE.BufferGeometry;
  material: THREE.MeshBasicMaterial;

  constructor(
    geometry: THREE.BufferGeometry,
    material: THREE.MeshBasicMaterial,
    position: THREE.Vector3 = new THREE.Vector3(0, 0, -10)
  ) {
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
