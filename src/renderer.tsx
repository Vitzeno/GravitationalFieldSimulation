import { FC, useEffect } from "react";
import * as THREE from "three";
import { Camera } from "./camera";
import { Renderable } from "./renderable";
import { Scene } from "./scene";

interface Props {
  name: string;
}

let camera: Camera;
let scene: Scene;
let renderer: THREE.WebGLRenderer;

let clock = new THREE.Clock();
let deltaTime = 0;

let cube = new Renderable(
  new THREE.BoxGeometry(),
  new THREE.MeshBasicMaterial({
    color: 0x00ff00,
    wireframe: true,
  })
);

let sphere = new Renderable(
  new THREE.SphereGeometry(),
  new THREE.MeshBasicMaterial({
    color: 0x00ff00,
    wireframe: true,
  }),
  new THREE.Vector3(5, 0, -10)
);

const setupRenderer = () => {
  let renderer: THREE.WebGLRenderer;
  renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setSize(window.innerWidth, window.innerHeight);

  return renderer;
};

/**
 * Render loop called every frame, updates the scene and renders it.
 */
const renderLoop = () => {
  requestAnimationFrame(renderLoop);
  deltaTime = clock.getDelta();
  //Probably a better way to do this
  document.title = `FPS: ${1 / deltaTime}`;

  scene.update(deltaTime);
  scene.objects.forEach((object) => object.update(deltaTime));
  camera.update(deltaTime);

  renderer.render(scene.threeScene, camera.threeCamera);
};

const resizeWindow = () => {
  camera.threeCamera.aspect = window.innerWidth / window.innerHeight;
  camera.threeCamera.updateProjectionMatrix();

  renderer.setSize(window.innerWidth, window.innerHeight);
};

const init = () => {
  camera = new Camera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
  scene = new Scene([cube, sphere]);
  renderer = setupRenderer();

  document.body.appendChild(renderer.domElement);
  window.addEventListener("resize", resizeWindow, false);

  renderLoop();
};

export const RenderScene: FC<Props> = ({ name }) => {
  useEffect(() => {
    init();
  });

  return <></>;
};
