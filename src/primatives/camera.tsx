import * as THREE from "three";

export interface CameraParams {
  fov: number;
  aspect: number;
  near: number;
  far: number;
  position: THREE.Vector3;
}

export class Camera {
  threeCamera: THREE.PerspectiveCamera;

  constructor({ fov, aspect, near, far, position }: CameraParams) {
    this.threeCamera = new THREE.PerspectiveCamera(fov, aspect, near, far);
    this.threeCamera.position.copy(position);
  }

  targetObject = (target?: THREE.Vector3) => {};

  /**
   * Updates object parameters, typically called every frame.
   * Delta time used to compensate for inconsistent frame rates.
   * @param {number} deltaTime - Time since last frame in seconds.
   */
  update = (deltaTime: number) => {};
}
