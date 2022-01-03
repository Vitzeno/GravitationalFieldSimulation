import * as THREE from "three";
import { Renderable } from "./renderable";
import { OutlinePass } from "three/examples/jsm/postprocessing/OutlinePass";

export interface MouseHandlerParams {
  camera: THREE.Camera;
  scene: THREE.Scene;
  interactables: Renderable[];
}

export class ObjectPicker {
  raycaster = new THREE.Raycaster();
  mouse = new THREE.Vector2();

  camera: THREE.Camera;
  scene: THREE.Scene;
  interactables: Renderable[];

  constructor({ camera, scene, interactables }: MouseHandlerParams) {
    this.camera = camera;
    this.scene = scene;
    this.interactables = interactables;
    window.addEventListener("mousemove", this.onMouseMove, false);
  }

  onMouseMove = (event: MouseEvent) => {
    this.mouse.x = (event.offsetX / window.innerWidth) * 2 - 1;
    this.mouse.y = -(event.offsetY / window.innerHeight) * 2 + 1;
  };

  findIntersectedObject = (): Renderable | undefined => {
    let intersectedObject: Renderable | undefined;
    // update the picking ray with the camera and mouse position
    this.raycaster.setFromCamera(this.mouse, this.camera);

    // calculate objects intersecting the picking ray
    const intersects = this.raycaster.intersectObjects(this.scene.children);
    for (let i = 0; i < intersects.length; i++) {
      intersectedObject = this.interactables.find(
        (intractable) => intractable.threeObject.id === intersects[i].object.id
      );

      return intersectedObject;
    }
  };

  /**
   * Updates object parameters, typically called every frame.
   * Delta time used to compensate for inconsistent frame rates.
   * @param {number} deltaTime - Time since last frame in seconds.
   */
  update = (outlinePass: OutlinePass, deltaTime: number) => {
    //console.log("mouse update");
    let pickedObject = this.findIntersectedObject();
    if (pickedObject) {
      outlinePass.selectedObjects = [pickedObject.threeObject];
    }
  };
}
