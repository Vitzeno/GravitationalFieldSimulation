import * as THREE from "three";
import { gravitationalConstant } from "../../config";
import { Renderable, RenderableParams } from "../../primatives/renderable";
import { Trail } from "../../primatives/trail";

export interface PlanetParams
  extends Omit<RenderableParams, "geometry" | "material"> {
  mass: number;
  radius: number;
  colour: THREE.Color;
  position: THREE.Vector3;
  initialVelocity: THREE.Vector3;
}

export class Planet extends Renderable {
  mass: number;
  radius: number;
  colour: THREE.Color;

  initialVelocity: THREE.Vector3 = new THREE.Vector3(0, 0, 0);
  currentVelocity: THREE.Vector3 = new THREE.Vector3(0, 0, 0);

  trail: Trail;

  frameCount: number = 0;
  frameUpdate: number = 75;

  constructor({
    position,
    name,
    mass,
    radius,
    colour,
    initialVelocity,
    scene,
  }: PlanetParams) {
    super({
      geometry: new THREE.SphereGeometry(radius, 32, 32),
      material: new THREE.MeshBasicMaterial({ color: colour, wireframe: true }),
      scene,
      name,
    });
    this.mass = mass;
    this.radius = radius;
    this.colour = colour;

    this.threeObject.position.copy(position);
    this.initialVelocity = initialVelocity;
    this.currentVelocity = this.initialVelocity;

    this.trail = new Trail({ trailLength: 100, colour: this.colour });
  }

  /**
   * Updates object parameters, typically called called every frame.
   * Delta time used to compensate for inconsistent frame rates.
   * @param {number} deltaTime - Time since last frame in seconds.
   */
  update = (deltaTime: number) => {
    this.frameCount++;
    this.threeObject.rotateY(deltaTime * 0.1);
    this.threeObject.position.add(this.currentVelocity);

    // call update every value of frameUpdate
    if (this.frameCount === this.frameUpdate)
      this.trail.addPoint(this.threeObject.position);

    this.frameCount %= this.frameUpdate;
  };

  updateVelocity = (planets: Planet[], deltaTime: number) => {
    //console.log("update planet velocity");
    planets.forEach((planet) => {
      if (planet !== this) {
        let distance = this.threeObject.position.distanceTo(
          planet.threeObject.position
        );
        //multiply by -1 otherwise the planets will be moving away from each other
        let forceDir: THREE.Vector3 = this.threeObject.position
          .clone()
          .sub(planet.threeObject.position)
          .normalize()
          .multiplyScalar(-1);
        let force: THREE.Vector3 = forceDir.multiplyScalar(
          (gravitationalConstant * this.mass * planet.mass) /
            Math.pow(distance, 2)
        );

        let acceleration: THREE.Vector3 = force.divideScalar(this.mass);
        this.currentVelocity.add(acceleration.multiplyScalar(deltaTime));
      }
    });
  };

  turnOnTrails = () => {
    this.threeParentScene.add(this.trail.trailObject);
  };

  turnOffTrails = () => {
    this.threeParentScene.remove(this.trail.trailObject);
  };
}
