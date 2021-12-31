import * as THREE from "three";

/**
 * Renders a trails, points are added dynamically to the trail.
 */
export class Trail {
  trailObject: THREE.InstancedMesh;
  geometry: THREE.BufferGeometry;
  material: THREE.Material;

  positions: THREE.Vector3[];
  counter: number;
  trailLength: number;

  constructor(trailLength: number = 250) {
    this.trailLength = trailLength;
    this.counter = 0;
    this.positions = new Array<THREE.Vector3>(this.trailLength);
    this.positions.fill(new THREE.Vector3(0, 0, 0));

    this.material = new THREE.MeshBasicMaterial({
      color: 0xcccccc,
      //wireframe: true,
    });
    this.geometry = new THREE.SphereGeometry(7, 5, 5);

    this.trailObject = new THREE.InstancedMesh(
      this.geometry,
      this.material,
      this.trailLength
    );

    this.trailObject.instanceMatrix.needsUpdate = true;
  }

  /**
   * Updates object parameters, typically called called every frame.
   * Delta time used to compensate for inconsistent frame rates.
   * @param {number} deltaTime - Time since last frame in seconds.
   */
  update = (deltaTime: number) => {
    //console.log(this.points);
  };

  /**
   * Since the trail is a line of type BufferGeometry whose size cannot be changed,
   * we instead have a fixed length trail where old points are removed and new points are added.
   * @param point
   */
  addPoint = (point: THREE.Vector3) => {
    let mappedIndex = this.counter++;
    let dummy = new THREE.Object3D();
    dummy.position.copy(point);
    dummy.updateMatrix();
    this.trailObject.setMatrixAt(mappedIndex, dummy.matrix);
    this.counter %= this.trailLength;
    this.trailObject.instanceMatrix.needsUpdate = true;
    //console.log(mappedIndex);
  };
}
