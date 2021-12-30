import * as THREE from "three";
import { Renderable } from "./renderable";

export class Scene {
  threeScene: THREE.Scene;
  objects: Renderable[];

  constructor(objects: Renderable[]) {
    this.threeScene = new THREE.Scene();
    this.objects = objects;

    objects.forEach((object) => {
      this.threeScene.add(object.threeObject);
    });
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
