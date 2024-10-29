## WARNING

g20 currently uses a proprietary version of the Lerna monorepo pending the acceptance of a Pull Request (PR).

This version is available at https://github.com/geometryzen/lerna

In order to develop g20, you MUST clone this repo then take the following actions.

Read the contributing guide in Lerna and set up volta, verdaccio, etc as if you were going to develop Lerna.

In the Lerna folder, in a Terminal (1)

```
npm run local-registry start
```

This starts a local package registry using verdaccio on port 4873.

We're going to install a modified Lerna package into this local registry.

Later, when building g20, we'll install Lerna from this local registry.

In the Lerna folder, in a second Terminal (2)

```
npm --registry=http://localhost:4873 run lerna-release 999.9.9 --local
```

This builds the modified Lerna and publishes it to the local registry.

In the g20 folder,

```
npm --registry=http://localhost:4873/ install
```

This installs dependencies in the node_modules folder.

You are now ready to build g20...

```
pnpm run build
```

In order to allow Jest testing in consuming libraries, it is necessary to make some "undesirable" changes to this package.json

1. Must remove "type": "module".
2. Must point the default export to the commonjs distribution.

## A Primer on Bezier Curves

The Path class makes use of Bezier curves.

https://pomax.github.io/bezierinfo/#circles_cubic

Generated from this repository.

https://github.com/Pomax/BezierInfo-2

Interesting...

https://github.com/Pomax/bezierjs
