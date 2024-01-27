import { createCanvas } from "canvas";
import * as THREE from 'three';

import CanvasVideoRecorder from "../src/CanvasVideoRecoder";

const fs = require("fs");

const filename = "output.mp4";

const width = 512;
const height = 512;

const setup = () => {

	const canvas = createCanvas(width, height);
	const context = canvas.getContext("2d");

	return {canvas, context};

}

test("creates a file", async () => {

	const { canvas, context } = setup();

	context.fillStyle = "green";
	context.fillRect(0, 0, width, height);

	const recorder = new CanvasVideoRecorder(canvas);

	await recorder.record(() => {}, 10.0, filename);

	expect( fs.existsSync(filename) ).toBe(true);

	fs.unlinkSync(filename);

});

test("renders three scene", async() => {

	const { canvas } = setup();

	const scene = new THREE.Scene();
	const camera = new THREE.PerspectiveCamera( 75, width / height, 0.1, 1000 );

	const renderer = new THREE.WebGLRenderer({ canvas });

	renderer.setSize(width, height);

	const geometry = new THREE.BoxGeometry( 1, 1, 1 );
	const material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
	const cube = new THREE.Mesh( geometry, material );

	scene.add( cube );

	camera.position.z = 5;

	const recorder = new CanvasVideoRecorder(canvas);

	await recorder.record(({playhead}) => {

		cube.rotation.y = playhead * Math.PI * 2;
		renderer.render(scene, camera);

	}, 
		10.0, 
		filename
	);

	expect( fs.existsSync(filename) ).toBe(true);

	fs.unlinkSync(filename);

});