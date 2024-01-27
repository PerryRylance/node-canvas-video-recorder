= Node Canvas Video Recorder =

Wrapper for [Pellicola]([https://github.com/delucis/pellicola).

Includes a test which passes when doing simple rendering.

This is part of a wider experiment to generate video with [THREE.js](https://github.com/mrdoob/three.js). __This does not work and it's unlikely that it ever will__. THREE uses many methods that are only available in the browser. Also, [`node-canvas`](https://github.com/Automattic/node-canvas) doesn't implement functions which THREE requires.

Readers looking to achieve this will need to wait for me to drop a library that helps do that, or, have a look into using something like [Puppeteer](https://pptr.dev/) to do the rendering in the browser and then pass the result back into Node and Pellicola.