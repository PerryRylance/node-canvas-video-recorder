import express, { Express, Request, Response } from "express";
import cors from "cors";
import { Image } from "canvas";
import puppeteer, { Page } from 'puppeteer';
import pellicola from "pellicola";
import { exit, kill } from "process";
import { spawn } from "child_process";

const settings = {
	dimensions: [512, 512],
	duration: 10.0,
	filename: "output.mp4",
	fps: 30
};

async function main()
{
	const browser = await puppeteer.launch({ headless: false, defaultViewport: null });
	const pages = await browser.pages();

	const page: Page = pages[0];

	await page.goto('http://localhost:5173');

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