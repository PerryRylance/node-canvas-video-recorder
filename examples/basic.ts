const canvas = document.querySelector("canvas")!;

canvas.width = 512;
canvas.height = 512;

const context = canvas.getContext("2d")!;

// @ts-ignore
window.render = (playhead) => {

	const angle = playhead * 360;

	context.fillStyle = `hsl(${angle}, 100%, 50%)`;
	context.fillRect(0, 0, canvas.width, canvas.height);

}