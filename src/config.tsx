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
export const gravitationalConstant: number = 6.67408e-11;

export const defaultPlanetConfig: PlanetUploadProps[] = [
  {
    name: "Sun",
    mass: 1.989e16,
    radius: 796.34,
    colour: 0xfff00,
    position: { x: 0, y: 0, z: -500 },
    initialVelocity: { x: 0, y: 0, z: 0 },
  },
  {
    name: "Mercury",
    mass: 5.972e13,
    radius: 93.71,
    colour: 0xb8877b,
    position: { x: 3000, y: 0, z: -500 },
    initialVelocity: { x: 0, y: 1.35, z: 0 },
  },
  {
    name: "Venus",
    mass: 5.972e13,
    radius: 93.71,
    colour: 0x38761d,
    position: { x: 6000, y: 0, z: -500 },
    initialVelocity: { x: 0, y: 0, z: 0.95 },
  },
  {
    name: "Earth",
    mass: 5.972e13,
    radius: 93.71,
    colour: 0x0000ff,
    position: { x: 10000, y: 0, z: -500 },
    initialVelocity: { x: 0, y: 0, z: -0.73 },
  },
  {
    name: "Mars",
    mass: 5.972e13,
    radius: 93.71,
    colour: 0xcc0000,
    position: { x: -15000, y: 0, z: -500 },
    initialVelocity: { x: 0, y: 0, z: 0.59 },
  },
  // {
  //   name: "Jupiter",
  //   mass: 5.972e13,
  //   radius: 393.71,
  //   colour: 0xcc0000,
  //   position: { x: -25000, y: 0, z: -500 },
  //   initialVelocity: { x: 0, y: 0, z: -0.25 },
  // },
  // {
  //   name: "Saturn",
  //   mass: 5.972e13,
  //   radius: 193.71,
  //   colour: 0xb1bfc7,
  //   position: { x: 27500, y: 0, z: -500 },
  //   initialVelocity: { x: 0, y: 0, z: -0.24 },
  // },
  // {
  //   name: "Neptune",
  //   mass: 5.972e13,
  //   radius: 193.71,
  //   colour: 0x7ba1b8,
  //   position: { x: 32000, y: 0, z: -500 },
  //   initialVelocity: { x: 0, y: 0, z: -0.223 },
  // },
];

export const importPlanetConfig = (
  planetProps: PlanetUploadProps[],
  scene: THREE.Scene
): Planet[] => {
  let planets: Planet[] = [];
  console.log(calculateOrbitalVelocity(5.972e13, 32000000));
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

/**
 * Calculates velocity required for a satellite to orbit a planet.
 * A bit shitty due to compounding errors throughout the simulation, but it works for now.
 * @param massOfObjectToOrbit mass in KG
 * @param distanceBetweemObjects distance between center of mass of objects in M
 * @returns velocity in m/s required for orbit
 */
export const calculateOrbitalVelocity = (
  massOfObjectToOrbit: number,
  distanceBetweemObjects: number
): number => {
  return (
    2 *
    Math.sqrt(
      (gravitationalConstant * massOfObjectToOrbit) / distanceBetweemObjects
    )
  );
};
