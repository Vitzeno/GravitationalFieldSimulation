import { FC, useEffect } from "react";
import * as THREE from "three";

interface Props {
  name: string;
}

let camera: THREE.PerspectiveCamera,
  scene: THREE.Scene,
  renderer: THREE.WebGLRenderer;
let geometry, material, mesh: THREE.Object3D;

const init = () => {
  camera = new THREE.PerspectiveCamera(
    70,
    window.innerWidth / window.innerHeight,
    0.01,
    10
  );
  camera.position.z = 1;

  scene = new THREE.Scene();
  geometry = new THREE.BoxGeometry(0.2, 0.2, 0.2);
  material = new THREE.MeshNormalMaterial();

  mesh = new THREE.Mesh(geometry, material);
  scene.add(mesh);

  renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setAnimationLoop(animation);

  document.body.appendChild(renderer.domElement);
};

const animation = (time: number) => {
  mesh.rotation.x = time / 2000;
  mesh.rotation.y = time / 1000;

  renderer.render(scene, camera);
};

export const CreateCanvas: FC<Props> = ({ name }: Props) => {
  useEffect(() => {
    init();
  });

  return (
    <body>
      <h1>{name}</h1>
    </body>
  );
};
