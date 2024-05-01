# Geometric Algebra 2D Graphics Monorepo

## Overview

A modern JavaScript (TypeScript) suite of packages for rendering 2D graphics using Scalable Vector Graphics (SVG) in the browser.

![](./images/ramp.png)

[Live Demo of Block on a Ramp in STEMCstudio](https://www.stemcstudio.com/gists/38aa01dfe4eca3a22d3f972d17c17df2)

## Features and Benefits

* Cartesian (y increasing upwards), SVG (y increasing downwards), and other Coordinate Systems.
* Fine-Grained Reactivity for efficient updating.
* Dynamic diagram updating using reactive position, attitude, and scale properties to link shapes and text together.
* Geometric Algebra enabled multivectors for position and attitude.
* Accurate (automatically generated) type definitions and API documentation.
* ESM, System, CommonJS, and UMD distribution formats.
* Modular package organization so that you only have to download what you need.

## Status

[![version](https://img.shields.io/npm/v/g2o.svg)](https://www.npmjs.com/package/g2o) 

[![npm downloads](https://img.shields.io/npm/dm/g2o.svg)](https://npm-stat.com/charts.html?package=g2o&from=2024-03-27)

[![GitHub license](https://img.shields.io/badge/license-MIT-blue.svg)](./LICENSE)

[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](./CONTRIBUTING.md)

## Tutorials and Examples

A book is in the works.

In the meantime, a search of `g2o` in the STEMCarXiv (STEMCstudio archive) at [STEMCstudio](https://www.stemcstudio.com) should produce many working examples.

## Packages and API Documentation

### [g2o](https://geometryzen.github.io/g2o-mono)

The core library that renders SVG. Required.

### [g2o-reactive](https://geometryzen.github.io/g2o-mono/reactive)

The reactive signals library. Required.

### [g2o-canvas](https://geometryzen.github.io/g2o-mono/canvas)

The HTML Canvas rendering library. Optional. Facilitates the generation of png images.

[Live Demo of CanvasView in STEMCstudio](https://www.stemcstudio.com/gists/beb5ee1690bf44e9429cbeeb7cd7d5a6)

Hint: Launch the Program from the toolbar then right-click the output to obtain an image.

### [g2o-euclid](https://geometryzen.github.io/g2o-mono/euclid)

Provides functions for computing circle and line intersections. Optional.

![](./images/euclid.png)

[Live Demo of Euclid's Elements Construction in STEMCstudio](https://www.stemcstudio.com/gists/28890bad7794270d959330e2eba82cc7)

### [g2o-gradient](https://geometryzen.github.io/g2o-mono/gradient)

Provides Linear and Radial Gradiens. Optional.

![](./images/gradient.png)

[Live Demo of Linear and Radial Gradients in STEMCstudio](https://www.stemcstudio.com/gists/e82033ebe82bc5fd991a33a820cb7f83)

### [g2o-graphics](https://geometryzen.github.io/g2o-mono/graphics)

Provides RegularPolygon, RoundedRectangle, and Star shapes. Optional.

![](./images/graphics.png)

[Live Demo of Graphics shapes in STEMCstudio](https://www.stemcstudio.com/gists/8f873d1ef37536795b40883aa2e77c01)

### [g2o-grid](https://geometryzen.github.io/g2o-mono/grid)

Provides a coordinate grid. Optional.

![](./images/grid.png)

[Live Demo of Grid in STEMCstudio](https://www.stemcstudio.com/gists/7106f94b7639ce77bbcf2fcc88b217db)

### [g2o-player](https://geometryzen.github.io/g2o-mono/player)

Provides a Player for controlling animation frame start, and pause. Optional.

[Live Demo of Player in STEMCstudio](https://www.stemcstudio.com/gists/a88d400bc9176836bb4ff7f88340428a)
