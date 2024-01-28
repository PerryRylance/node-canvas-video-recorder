import * as THREE from 'three';

const canvas = document.querySelector("canvas")!;

canvas.width = 512;
canvas.height = 512;

const renderer = new THREE.WebGLRenderer({canvas});
renderer.setSize( canvas.width, canvas.height );

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 75, canvas.width / canvas.height, 0.1, 1000 );

const light = new THREE.DirectionalLight(0xffffff, 1.0);

scene.add(light);

light.position.x = 3;
light.position.y = 10;
light.position.z = 5;

light.lookAt(0, 0, 0);

const geometry = new THREE.BoxGeometry( 1, 1, 1 );
const material = new THREE.MeshStandardMaterial( { color: 0x00ff00 } );
const cube = new THREE.Mesh( geometry, material );

scene.add( cube );

camera.position.y = 3;
camera.position.z = 5;

camera.lookAt(0, 0, 0);

// @ts-ignore
window.render = (playhead) => {

	cube.rotation.y = playhead * 2 * Math.PI;

	renderer.render( scene, camera );

}