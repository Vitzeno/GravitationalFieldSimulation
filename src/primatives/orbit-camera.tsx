import * as THREE from "three";
import { Camera } from "./camera";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

/**
 * Orbit camera allows for rotating around a given target.
 */
export class OrbitCamera extends Camera {
  domElement?: HTMLElement | undefined;
  controls: OrbitControls;
  target: THREE.Vector3;

  zoomSpeed: number = 2;
  rotateSpeed: number = 2;
  panSpeed: number = 2;

  constructor(
    fov: number,
    aspect: number,
    near: number,
    far: number,
    domElement?: HTMLElement | undefined,
    target: THREE.Vector3 = new THREE.Vector3(0, 0, -500),
    position: THREE.Vector3 = new THREE.Vector3(0, 500, 0)
  ) {
    super(fov, aspect, near, far, position);
    this.domElement = domElement;
    this.target = target;

    this.controls = new OrbitControls(this.threeCamera, this.domElement);
    // orbit camera requires a target
    this.controls.target.copy(target);

    this.controls.zoomSpeed = this.zoomSpeed;
    this.controls.rotateSpeed = this.rotateSpeed;
    this.controls.panSpeed = this.panSpeed;

    this.controls.update();
  }

  /**
   * Updates object parameters, typically called every frame.
   * Delta time used to compensate for inconsistent frame rates.
   * @param {number} deltaTime - Time since last frame in seconds.
   */
  update = (deltaTime: number) => {
    this.controls.update();
  };
}
