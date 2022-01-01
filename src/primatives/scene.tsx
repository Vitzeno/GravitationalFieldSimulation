import * as THREE from "three";

export class Scene {
  threeScene: THREE.Scene;

  constructor() {
    this.threeScene = new THREE.Scene();
  }

  /**
   * Updates object parameters, typically called called every frame.
   * Delta time used to compensate for inconsistent frame rates.
   * @param {number} deltaTime - Time since last frame in seconds.
   */
  update = (deltaTime: number) => {
    //console.log("update scene");
  };
}
