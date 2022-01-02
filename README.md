# Gravitational Field Simulation

This project uses WebGL to render a simulation of various celestial bodies. Interactions between bodies is dictated by Newton's Law of Gravitation and takes into account mass, radius and velocity. However collisions between objects are currently ignored.

![orbits](https://user-images.githubusercontent.com/23175651/147887909-60e1d1b3-1c5e-407e-8c3d-2e5ece8d4bb9.png)

## Law of Gravity


Any two bodies attract each other in direct proportion to their masses and inversely to the square of the distance between them. This is illustrated in the formula below where:

![fomula](https://user-images.githubusercontent.com/23175651/147840177-337c10d5-24dc-4b22-a258-bebad285e6bf.jpg)

- G is the gravitational constant
  - G = 6.67 x 10<sup>-11</sup>
- M<sub>1</sub> is the mass of one object
- M<sub>2</sub> is the mass of the other object
- r<sup>2</sup> is the radial distance between the centers of M<sub>1</sub> and M<sub>2</sub>

Implementation details can be found [here](https://github.com/Vitzeno/WebGL/blob/master/src/scenes/solar-system/planet.tsx#L53).
