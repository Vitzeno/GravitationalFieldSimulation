import * as THREE from "three";
import { Renderable } from "../../primatives/renderable";
import { Trail } from "../../primatives/trail";

export class Planet extends Renderable {
  name: string;
  mass: number;
  radius: number;
  initialVelocity: THREE.Vector3 = new THREE.Vector3(0, 0, 0);
  currentVelocity: THREE.Vector3 = new THREE.Vector3(0, 0, 0);

  gravitationalConstant: number = 6.67408e-11;

  trail: Trail = new Trail();

  frameCount: number = 0;
  frameUpdate: number = 75;

  constructor(
    geometry: THREE.BufferGeometry,
    material: THREE.Material,
    mass: number,
    radius: number,
    name: string,
    position: THREE.Vector3 = new THREE.Vector3(0, 0, -10),
    initialVelocity: THREE.Vector3 = new THREE.Vector3(0, 0, 0)
  ) {
    super(geometry, material, position);
    this.mass = mass;
    this.radius = radius;
    this.name = name;
    this.initialVelocity = initialVelocity;
    this.currentVelocity = this.initialVelocity;
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
          (this.gravitationalConstant * this.mass * planet.mass) /
            Math.pow(distance, 2)
        );

        let acceleration: THREE.Vector3 = force.divideScalar(this.mass);
        this.currentVelocity.add(acceleration.multiplyScalar(deltaTime));
      }
    });
  };
}
