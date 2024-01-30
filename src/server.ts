import { Image } from "canvas";
import puppeteer, { Page } from 'puppeteer';
import pellicola from "pellicola";
import { exit } from "process";
import { readFileSync, existsSync } from "fs";

const projectPackageJsonFile = "./package.json";

if(!existsSync(projectPackageJsonFile))
	throw new Error("Couldn't find your projects package.json, did you install via npm?");

const data: Buffer = readFileSync(projectPackageJsonFile);
const capture: any = JSON.parse(data.toString()).capture;

if(!capture)
	throw new Error("Couldn't find 'capture' object in package.json");

for(const required of [
	"url",
	"output",
	"duration",
	"width",
	"height"
])
	if(!(required in capture))
		throw new Error("Required parameter 'url' not found in package.json capture object");

const settings = {
	dimensions: [capture.width, capture.height],
	duration: capture.duration,
	filename: capture.output,
	fps: 30
};

if("fps" in capture)
	settings.fps = capture.fps;

async function main()
{
	const browser = await puppeteer.launch({ headless: false, defaultViewport: null });
	const pages = await browser.pages();

	const page: Page = pages[0];

	await page.goto(capture.url);

	await page.evaluate(() => {
		// @ts-ignore
		window.isRunningCapture = true;
	});

	pellicola(() => {
		return ({ context, width, height, playhead }) => {

			return new Promise((resolve, reject) => {

				page
					.evaluate((playhead) => {
						// @ts-ignore
						window.render(playhead);
						return document.querySelector('canvas')!.toDataURL();
					}, playhead)
					.then((base64: string) => {

						const img = new Image();

						img.onload = function() {

							// @ts-ignore
							context.drawImage(img, 0, 0);

							resolve();

						};

						img.src = base64;

					})

			});

		}
	}, settings)
		.then(() => exit());
}

main();