import { FC, useEffect } from "react";
import * as THREE from "three";
import { Camera } from "./primatives/camera";
import { OrbitCamera } from "./primatives/orbit-camera";
import { SolarSystemScene } from "./scenes/solar-system/solar-system-scene";
import { EffectComposer } from "three/examples/jsm/postprocessing/EffectComposer";
import { RenderPass } from "three/examples/jsm/postprocessing/RenderPass";

interface Props {
  name: string;
}

let camera: Camera;
let scene: SolarSystemScene;
let renderer: THREE.WebGLRenderer;
let composer: EffectComposer;

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

  composer.render(deltaTime);
  //renderer.render(scene.threeScene, camera.threeCamera);
};

const resizeWindow = () => {
  camera.threeCamera.aspect = window.innerWidth / window.innerHeight;
  camera.threeCamera.updateProjectionMatrix();

  renderer.setSize(window.innerWidth, window.innerHeight);
};

const init = () => {
  scene = new SolarSystemScene();
  renderer = setupRenderer();
  camera = new OrbitCamera({
    fov: 90,
    aspect: window.innerWidth / window.innerHeight,
    near: 0.1,
    far: 10000000,
    position: new THREE.Vector3(-700, 2000, 900),
    target: new THREE.Vector3(0, 0, -500),
    domElement: renderer.domElement,
  });

  document.body.appendChild(renderer.domElement);
  window.addEventListener("resize", resizeWindow, false);

  let renderPass = new RenderPass(scene.threeScene, camera.threeCamera);
  composer = new EffectComposer(renderer);
  composer.addPass(renderPass);

  renderLoop();
};

export const RenderScene: FC<Props> = ({ name }) => {
  useEffect(() => {
    init();
  });

  return <></>;
};
