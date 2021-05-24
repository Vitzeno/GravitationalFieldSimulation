import { FC, useEffect } from "react";
import * as THREE from "three";

interface Props {
  name: string;
}

let camera: THREE.PerspectiveCamera, scene: THREE.Scene;
let renderer: THREE.WebGLRenderer;
let geometry;
let material, cube: THREE.Object3D;
let shape: THREE.Object3D;

const setupCamera = () => {
  camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
  );

  camera.position.z = 10;
};

const setupRenderer = () => {
  let renderer: THREE.WebGLRenderer;
  renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setAnimationLoop(animation);

  return renderer;
};

const setupGeometry = () => {
  geometry = new THREE.BoxGeometry();
  material = new THREE.MeshBasicMaterial({ color: 0x00ff00, wireframe: true });
  cube = new THREE.Mesh(geometry, material);

  cube.translateX(5);
  scene.add(cube);
};

const setupShape = () => {
  geometry = new THREE.TetrahedronGeometry(1, 0);
  material = new THREE.MeshBasicMaterial({
    color: 0xffff00,
    wireframe: true,
  });
  shape = new THREE.Mesh(geometry, material);
  scene.add(shape);
};

const setupScene = () => {
  scene = new THREE.Scene();
  setupGeometry();
  setupShape();
};

const init = () => {
  setupCamera();
  setupScene();
  renderer = setupRenderer();
  document.body.appendChild(renderer.domElement);
};

const animation = (time: number) => {
  shape.rotation.x = time / 2000;
  shape.rotation.y = time / 1000;

  cube.rotation.x = time / 2000;
  cube.rotation.y = time / 1000;

  renderer.render(scene, camera);
};

export const CreateCanvas: FC<Props> = ({ name }) => {
  useEffect(() => {
    init();
  });

  return (
    <body>
      <h1>{name}</h1>
    </body>
  );
};
