// @ts-check
import { defineConfig, fontProviders } from "astro/config";
import preact from "@astrojs/preact";
import tailwindcss from "@tailwindcss/vite";

// https://astro.build/config
export default defineConfig({
	fonts: [
		make_font_provider("Atkinson Hyperlegible"),
		make_font_provider("Hanken Grotesk"),
	],

	integrations: [preact()],

	vite: {
		plugins: [tailwindcss()],
	},
});

function make_font_provider(/** @type {string} */ font_name) {
	const repl_spaces = (
		/** @type {string} */ string,
		/** @type {string} */ replacement = "-",
	) => string.replace(/\s+/g, replacement);

	/** @type {[{ src: [string, ...string[]], weight: string }]} */
	const variants = [
		{
			weight: "100 900",
			src: [
				`./src/assets/fonts/${repl_spaces(font_name, "")}.variable.subset.woff2`,
			],
		},
	];

	return {
		provider: fontProviders.local(),
		name: font_name,
		cssVariable: `--font-${repl_spaces(font_name.toLowerCase())}`,
		options: { variants },
	};
}
