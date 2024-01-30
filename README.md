# Node Canvas Video Recorder
Drop in package for recording video from a canvas element.

## Installation
- `npm install @perry-rylance/node-canvas-video-recorder`.
- In your projects `package.json` add `"capture": "npx ts-node-esm ./node_modules/@perry-rylance/node-canvas-video-recorder/src/server.ts"`.
- In your projects `package.json`add a `capture` object, this needs to specify `url`, `output`, `width` and `height`.

## Usage
- You need a server serving up a page with your canvas on at the URL you previously specified in `package.json`'s `capture`.
- The page must have a `canvas` element.
- The page must add a method `render` to the `window`, which receives `playhead` (0.0 - 1.0).
- Your `render` function should manipulate the canvas.
- Run `npm run capture` to generate `output.mp4`

## Examples
You can see an example [here](https://github.com/PerryRylance/node-canvas-video-recorder-example).