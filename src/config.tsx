import * as THREE from "three";
import { Planet } from "./scenes/solar-system/planet";

export interface PlanetUploadProps {
  name: string;
  mass: number;
  radius: number;
  colour: string | number;
  position: { x: number; y: number; z: number };
  initialVelocity: { x: number; y: number; z: number };
}

export let customPlanetConfig: PlanetUploadProps[] = [];

export const defaultPlanetConfig: PlanetUploadProps[] = [
  {
    name: "Sun",
    mass: 1.25e16,
    radius: 796.34,
    colour: 0xfff00,
    position: { x: 0, y: 0, z: -500 },
    initialVelocity: { x: 0, y: 0, z: 0 },
  },
  {
    name: "Earth",
    mass: 1.0e15,
    radius: 63.71,
    colour: 0x0000ff,
    position: { x: 5000, y: 0, z: -500 },
    initialVelocity: { x: 0, y: 0, z: -0.75 },
  },
  {
    name: "Moon",
    mass: 1.0e3,
    radius: 17.37,
    colour: 0xcccccc,
    position: { x: 5384, y: 0, z: -500 },
    initialVelocity: { x: 0, y: -1, z: -0.75 },
  },
  {
    name: "Mars",
    mass: 1.0e15,
    radius: 63.71,
    colour: 0xcc0000,
    position: { x: -5000, y: 0, z: -500 },
    initialVelocity: { x: 0, y: 0, z: 0.75 },
  },
  {
    name: "Deimos",
    mass: 1.0e3,
    radius: 17.37,
    colour: 0xcccccc,
    position: { x: -5384, y: 0, z: -500 },
    initialVelocity: { x: 0, y: 1, z: 0.75 },
  },
];

export const importPlanetConfig = (
  planetProps: PlanetUploadProps[],
  scene: THREE.Scene
): Planet[] => {
  let planets: Planet[] = [];

  console.log(planetProps);
  planetProps.forEach((currPlanet) => {
    let newPlanet = new Planet({
      name: currPlanet.name,
      mass: currPlanet.mass,
      radius: currPlanet.radius,
      colour: new THREE.Color(currPlanet.colour),
      position: new THREE.Vector3(
        currPlanet.position.x,
        currPlanet.position.y,
        currPlanet.position.z
      ),
      initialVelocity: new THREE.Vector3(
        currPlanet.initialVelocity.x,
        currPlanet.initialVelocity.y,
        currPlanet.initialVelocity.z
      ),
      scene,
    });

    planets.push(newPlanet);
  });

  return planets;
};
