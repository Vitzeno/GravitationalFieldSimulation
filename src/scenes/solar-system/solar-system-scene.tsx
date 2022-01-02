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
  gridDivisions = 3.0e2;
  gridColour = new THREE.Color(0x666666);

  gridX = new THREE.GridHelper(
    this.gridSize,
    this.gridDivisions,
    this.gridColour,
    this.gridColour
  );
  gridY = new THREE.GridHelper(
    this.gridSize,
    this.gridDivisions,
    this.gridColour,
    this.gridColour
  );
  gridZ = new THREE.GridHelper(
    this.gridSize,
    this.gridDivisions,
    this.gridColour,
    this.gridColour
  );

  planets: Planet[] = [
    //Sun
    new Planet({
      name: "Sun",
      mass: 1.25e16,
      radius: 796.34,
      colour: new THREE.Color(0xfff00),
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
      initialVelocity: new THREE.Vector3(0, 0, -0.75),
      scene: this.threeScene,
    }),
    //Moon
    new Planet({
      name: "Moon",
      mass: 1.0e3,
      radius: 17.37,
      colour: new THREE.Color(0xcccccc),
      position: new THREE.Vector3(5384, 0, -500),
      initialVelocity: new THREE.Vector3(0, -1, -0.75),
      scene: this.threeScene,
    }),
    //Mars
    new Planet({
      name: "Mars",
      mass: 1.0e15,
      radius: 63.71,
      colour: new THREE.Color(0xcc0000),
      position: new THREE.Vector3(-5000, 0, -500),
      initialVelocity: new THREE.Vector3(0, 0, 0.75),
      scene: this.threeScene,
    }),
    //Deimos
    new Planet({
      name: "Deimos",
      mass: 1.0e3,
      radius: 17.37,
      colour: new THREE.Color(0xcccccc),
      position: new THREE.Vector3(-5384, 0, -500),
      initialVelocity: new THREE.Vector3(0, 1, 0.75),
      scene: this.threeScene,
    }),
    //Jupiter
    // new Planet({
    //   name: "Jupiter",
    //   mass: 2.0e15,
    //   radius: 342.81,
    //   colour: new THREE.Color(0xc27ba0),
    //   position: new THREE.Vector3(7000, 7000, -500),
    //   initialVelocity: new THREE.Vector3(0, -0.5, 0.5),
    //   scene: this.threeScene,
    // }),
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
    this.planets.forEach((planet) => {
      planet.updateVelocity(this.planets, deltaTime);
      planet.update(deltaTime);
    });
  };
}
