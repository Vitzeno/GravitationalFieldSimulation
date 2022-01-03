import * as THREE from "three";
import {
  customPlanetConfig,
  defaultPlanetConfig,
  importPlanetConfig,
} from "../../config";
import { Scene } from "../../primatives/scene";
import { Planet } from "./planet";

export interface SolarSystemSceneParams {
  enableGridX: boolean;
  enableGridY: boolean;
  enableGridZ: boolean;
  useCustomConfig: boolean;
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

  planets: Planet[];

  constructor({
    enableGridX,
    enableGridY,
    enableGridZ,
    useCustomConfig,
  }: SolarSystemSceneParams) {
    super();

    if (useCustomConfig) {
      //console.log(customPlanetConfig);
      //console.log(defaultPlanetConfig);
      this.planets = importPlanetConfig(customPlanetConfig, this.threeScene);
    } else
      this.planets = importPlanetConfig(defaultPlanetConfig, this.threeScene);

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
