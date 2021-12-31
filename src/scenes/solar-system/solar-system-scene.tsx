import * as THREE from "three";
import { Scene } from "../../primatives/scene";
import { Planet } from "../../scenes/solar-system/planet";

export class SolarSystemScene extends Scene {
  objects: Planet[] = [
    //Earth
    new Planet(
      new THREE.SphereGeometry(63.71, 32, 32),
      new THREE.MeshBasicMaterial({
        color: 0x00ff00,
        wireframe: true,
      }),
      1000000000000000,
      63.71,
      "Earth",
      new THREE.Vector3(0, 0, -500),
      new THREE.Vector3(0, 0, 0)
    ),
    //Moon
    new Planet(
      new THREE.SphereGeometry(17.37, 32, 32),
      new THREE.MeshBasicMaterial({
        color: 0x0000ff,
        wireframe: true,
      }),
      5000,
      17.37,
      "Moon",
      new THREE.Vector3(600, 0, -500),
      new THREE.Vector3(0, 0, -0.5)
    ),
  ];

  constructor() {
    super([]);
    this.objects.forEach((object) => {
      this.threeScene.add(object.threeObject);
    });
  }

  /**
   * Updates object parameters, typically called called every frame.
   * Delta time used to compensate for inconsistent frame rates.
   * @param {number} deltaTime - Time since last frame in seconds.
   */
  update = (deltaTime: number) => {
    this.objects.forEach((object) => {
      object.updateVelocity(this.objects, deltaTime);
    });
  };
}
