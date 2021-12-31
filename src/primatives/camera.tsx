import * as THREE from "three";

export class Camera {
  threeCamera: THREE.PerspectiveCamera;
  moveSpeed: number = 1000;
  mouseSensitivity: number = 10;
  // if true forward movement follows camera orientation
  freeCam: boolean = true;

  forward: boolean = false;
  backward: boolean = false;
  right: boolean = false;
  left: boolean = false;

  mouseRotateX: number = 0;
  mouseRotateY: number = 0;

  constructor(
    fov: number,
    aspect: number,
    near: number,
    far: number,
    freeCam: boolean = true,
    position: THREE.Vector3 = new THREE.Vector3(0, 0, 0)
  ) {
    this.threeCamera = new THREE.PerspectiveCamera(fov, aspect, near, far);
    this.threeCamera.position.copy(position);
    this.freeCam = freeCam;

    window.addEventListener("keydown", this.handleKeyDown, false);
    window.addEventListener("keyup", this.handleKeyUp, false);
    window.addEventListener("mousemove", this.handleMouseMove, false);
  }

  /**
   * Updates object parameters, typically called every frame.
   * Delta time used to compensate for inconsistent frame rates.
   * @param {number} deltaTime - Time since last frame in seconds.
   */
  update = (deltaTime: number) => {
    //camera rotation based on mouse movement
    this.threeCamera.rotateOnWorldAxis(
      new THREE.Vector3(0, 1, 0),
      THREE.MathUtils.degToRad(50 * this.mouseRotateX * deltaTime)
    );
    this.threeCamera.rotateX(this.mouseRotateY * deltaTime);

    //camera movement based on keyboard input
    if (this.freeCam) {
      let direction = new THREE.Vector3(0, 0, 0);
      this.threeCamera.getWorldDirection(direction);

      if (this.forward)
        this.threeCamera.position.add(
          direction.multiplyScalar(this.moveSpeed * deltaTime)
        );
    } else {
      if (this.forward)
        this.threeCamera.position.z -= deltaTime * this.moveSpeed;
    }
    if (this.backward)
      this.threeCamera.position.z += deltaTime * this.moveSpeed;
    if (this.right) this.threeCamera.position.x += deltaTime * this.moveSpeed;
    if (this.left) this.threeCamera.position.x -= deltaTime * this.moveSpeed;

    // reset otherwise rotation will continue
    this.mouseRotateX = 0;
    this.mouseRotateY = 0;
  };

  private handleMouseMove = (event: MouseEvent) => {
    //console.log(this.mouseRotateX, this.mouseRotateY);
    this.mouseRotateX =
      (event.movementX * Math.PI * -this.mouseSensitivity) / 180;
    this.mouseRotateY =
      (event.movementY * Math.PI * -this.mouseSensitivity) / 180;
  };

  private handleKeyDown = (event: KeyboardEvent) => {
    switch (event.key) {
      case "w":
        this.forward = true;
        break;
      case "s":
        this.backward = true;
        break;
      case "d":
        this.right = true;
        break;
      case "a":
        this.left = true;
        break;
      default:
        break;
    }
  };

  private handleKeyUp = (event: KeyboardEvent) => {
    switch (event.key) {
      case "w":
        this.forward = false;
        break;
      case "s":
        this.backward = false;
        break;
      case "d":
        this.right = false;
        break;
      case "a":
        this.left = false;
        break;
      default:
        break;
    }
  };
}
