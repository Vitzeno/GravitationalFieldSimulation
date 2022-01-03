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

## Custom Scenes

Customs scenarios can be loaded into the simulator by defining a list of celestial bodies in a JSON file. The key attributes for the simulation are the object mass, radius, position and initial velocity. Below is an example of how this data should be defined.

```
[
  {
    "name": "Mars",
    "mass": 1000000000000000,
    "radius": 63.71,
    "colour": 13369344,
    "position": { "x": -5000, "y": 0, "z": -500 },
    "initialVelocity": { "x": 0, "y": 0, "z": 0.75 }
  },
  {
    "name": "Deimos",
    "mass": 1000,
    "radius": 17.37,
    "colour": 13421772,
    "position": { "x": -5384, "y": 0, "z": -500 },
    "initialVelocity": { "x": 0, "y": 1, "z": 0.75 }
  },
  {
    "name": "Phobos",
    "mass": 1.0e3,
    "radius": 17.37,
    "colour": 13421772,
    "position": { "x": -4616, "y": 0, "z": -500 },
    "initialVelocity": { "x": 0, "y": 1, "z": 0.75 }
  }
]
```

## Optimisations

### Instancing

To reduce the number of draw calls objects which share the same geometry but with different scale, position or rotation are batched together and sent to the GPU in a single instance. This is very useful for objects like the trails which need to render a large number of the same geometry but in different positions.

### LOD Management

For larger celestial bodies number Levels of Detail (LOD) are defined and swapped between based on distance from camera. This allows objects to appear rich in detail when close to the camera and swapped out for lower detail when further away.
