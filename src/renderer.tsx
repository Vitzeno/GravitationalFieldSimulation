import { FC, useEffect } from "react";
import * as THREE from "three";
import { Camera } from "./primatives/camera";
import { SolarSystemScene } from "./scenes/solar-system/solar-system-scene";

interface Props {
  name: string;
}

let camera: Camera;
let scene: SolarSystemScene;
let renderer: THREE.WebGLRenderer;

let clock = new THREE.Clock();
let deltaTime = 0;

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
  camera = new Camera(90, window.innerWidth / window.innerHeight, 0.1, 50000);
  scene = new SolarSystemScene();
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
