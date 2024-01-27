import { Canvas } from "canvas";

const pellicola = require("pellicola");

interface IRenderCallbackArguments
{
	playhead: number;
}

interface IPellicolaArguments
{
	context: CanvasRenderingContext2D;
	width: number;
	height: number;
	playhead: number;
}

export default class CanvasVideoRecorder
{
	private canvas: Canvas;

	constructor(canvas: Canvas)
	{
		this.canvas = canvas;
	}

	record(render: (args: IRenderCallbackArguments) => void, duration: number, filename: string = "output.mp4", fps: number = 30): Promise<void>
	{
		if(isNaN(duration) || duration <= 0)
			throw new Error("Duration must be positive and non-zero");
	
		const settings = {
			dimensions: [this.canvas.width, this.canvas.height],
			duration,
			filename,
			fps
		};

		return new Promise((resolve, reject) => {

			pellicola(() => {
				return ({ context, width, height, playhead }) => {
					render({playhead});
					context.drawImage(this.canvas, 0, 0);
				}
			}, settings)
				  .then(resolve());

		});
	}
}