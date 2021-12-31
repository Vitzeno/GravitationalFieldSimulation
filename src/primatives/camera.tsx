import * as THREE from "three";

export class Camera {
  threeCamera: THREE.PerspectiveCamera;

  constructor(
    fov: number,
    aspect: number,
    near: number,
    far: number,
    position: THREE.Vector3 = new THREE.Vector3(0, 0, 0)
  ) {
    this.threeCamera = new THREE.PerspectiveCamera(fov, aspect, near, far);
    this.threeCamera.position.copy(position);
  }

  /**
   * Updates object parameters, typically called every frame.
   * Delta time used to compensate for inconsistent frame rates.
   * @param {number} deltaTime - Time since last frame in seconds.
   */
  update = (deltaTime: number) => {};
}
