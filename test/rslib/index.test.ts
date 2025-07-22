import fs from "node:fs";
import { dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { expect, test } from "@playwright/test";
import { build } from "@rslib/core";
import { pluginUnpluginVue } from "../../src";

const __dirname = dirname(fileURLToPath(import.meta.url));

test("ESM should build succeed", async ({ page }) => {
	await build({
		root: __dirname,
		lib: [
			{
				format: "esm",
				plugins: [pluginUnpluginVue()],
				output: {
					target: "web",
					externals: ["vue"],
				},
			},
		],
	});

	const distFiles = await fs.promises.readdir(`${__dirname}/dist`);
	expect(distFiles.sort()).toEqual(["index.css", "index.js"]);

	const jsContent = await fs.promises.readFile(
		`${__dirname}/dist/index.js`,
		"utf-8",
	);

	expect(jsContent.includes("Rsbuild with Vue")).toBeTruthy();

	const cssContent = await fs.promises.readFile(
		`${__dirname}/dist/index.css`,
		"utf-8",
	);
	expect(cssContent.includes(".content {")).toBeTruthy();
});
