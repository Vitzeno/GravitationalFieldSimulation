import { FC, useEffect } from "react";
import * as THREE from "three";
import { Camera } from "./primatives/camera";
import { OrbitCamera } from "./primatives/orbit-camera";
import { SolarSystemScene } from "./scenes/solar-system/solar-system-scene";
import { EffectComposer } from "three/examples/jsm/postprocessing/EffectComposer";
import { RenderPass } from "three/examples/jsm/postprocessing/RenderPass";
import { ObjectPicker } from "./primatives/object-picker";
import { OutlinePass } from "three/examples/jsm/postprocessing/OutlinePass";

let camera: Camera;
let scene: SolarSystemScene;
let renderer: THREE.WebGLRenderer;

let renderPass: RenderPass;
let outlinePass: OutlinePass;
let composer: EffectComposer;

let picker: ObjectPicker;

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
  document.title = `FPS: ${Math.round(1 / deltaTime)}`;

  camera.targetObject(picker.findIntersectedObject()?.threeObject.position);

  picker.update(outlinePass, deltaTime);
  scene.update(deltaTime);
  camera.update(deltaTime);

  composer.render(deltaTime);
};

const resizeWindow = () => {
  camera.threeCamera.aspect = window.innerWidth / window.innerHeight;
  camera.threeCamera.updateProjectionMatrix();

  renderer.setSize(window.innerWidth, window.innerHeight);
};

const init = () => {
  scene = new SolarSystemScene({
    enableGridX: false,
    enableGridY: false,
    enableGridZ: true,
  });
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
  picker = new ObjectPicker({
    camera: camera.threeCamera,
    scene: scene.threeScene,
    interactables: scene.planets,
  });

  document.body.appendChild(renderer.domElement);
  window.addEventListener("resize", resizeWindow, false);

  renderPass = new RenderPass(scene.threeScene, camera.threeCamera);
  outlinePass = new OutlinePass(
    new THREE.Vector2(window.innerWidth, window.innerHeight),
    scene.threeScene,
    camera.threeCamera
  );
  outlinePass.edgeStrength = 250;

  composer = new EffectComposer(renderer);
  composer.addPass(renderPass);
  composer.addPass(outlinePass);

  renderLoop();
};

export const RenderScene: FC = () => {
  useEffect(() => {
    init();
  });

  return <></>;
};
