import * as THREE from "three";
import { Scene } from "../../primatives/scene";
import { Planet } from "../../scenes/solar-system/planet";

export interface SolarSystemSceneParams {
  enableGridX: boolean;
  enableGridY: boolean;
  enableGridZ: boolean;
}
export class SolarSystemScene extends Scene {
  gridSize = 1.0e5;
  gridDivisions = 1.0e1;

  gridX = new THREE.GridHelper(this.gridSize, this.gridDivisions);
  gridY = new THREE.GridHelper(this.gridSize, this.gridDivisions);
  gridZ = new THREE.GridHelper(this.gridSize, this.gridDivisions);

  planets: Planet[] = [
    //Sun
    new Planet({
      name: "Sun",
      mass: 1.0e16,
      radius: 696.34,
      colour: new THREE.Color(0x00ff00),
      position: new THREE.Vector3(0, 0, -500),
      initialVelocity: new THREE.Vector3(0, 0, 0),
      scene: this.threeScene,
    }),
    //Earth
    new Planet({
      name: "Earth",
      mass: 1.0e15,
      radius: 63.71,
      colour: new THREE.Color(0x0000ff),
      position: new THREE.Vector3(5000, 0, -500),
      initialVelocity: new THREE.Vector3(0, 0, -0.5),
      scene: this.threeScene,
    }),
    //Moon
    new Planet({
      name: "Moon",
      mass: 1.0e3,
      radius: 17.37,
      colour: new THREE.Color(0xcccccc),
      position: new THREE.Vector3(5384, 0, -500),
      initialVelocity: new THREE.Vector3(0, 0, -1.5),
      scene: this.threeScene,
    }),
  ];

  constructor({
    enableGridX,
    enableGridY,
    enableGridZ,
  }: SolarSystemSceneParams) {
    super();
    // setup grid
    if (enableGridX) {
      this.gridX.rotateZ(Math.PI / 2);
      this.threeScene.add(this.gridX);
    }

    if (enableGridY) {
      this.gridY.rotateX(Math.PI / 2);
      this.threeScene.add(this.gridY);
    }

    if (enableGridZ) {
      this.threeScene.add(this.gridZ);
    }

    // turn on trails for visualisation of movement
    this.planets.forEach((planet) => {
      planet.turnOnTrails();
    });
  }

  /**
   * Updates object parameters, typically called called every frame.
   * Delta time used to compensate for inconsistent frame rates.
   * @param {number} deltaTime - Time since last frame in seconds.
   */
  update = (deltaTime: number) => {
    this.planets.forEach((object) => {
      object.updateVelocity(this.planets, deltaTime);
    });
  };
}
