/**
 * Vite configuration for building a Svelte library
 *
 * This configuration builds the library in multiple formats (ES, UMD, CJS)
 * with both minified and unminified versions for each format.
 *
 * @see {@link https://vite.dev/config/ Vite Configuration}
 */

import { readFileSync } from 'node:fs';
import { fileURLToPath, URL } from 'node:url';

import terser from '@rollup/plugin-terser';
import { svelte } from '@sveltejs/vite-plugin-svelte';
import { defineConfig } from 'vitest/config';

/** Library version from package.json */
const { version, name } = JSON.parse(readFileSync('./package.json', 'utf-8'));

/** Output library name */
const OUTPUT_NAME = 'scena';

/** Entry point file for the library */
const INPUT_FILE = './src/main.ts';

/** Output directory for built files */
const OUTPUT_DIR = './dist';

/**
 * Vite configuration
 * @see https://vite.dev/config/
 */
export default defineConfig({
	/**
	 * Compile-time constants
	 */
	define: {
		__VERSION__: JSON.stringify(version),
		__NAME__: JSON.stringify(name)
	},

	/**
	 * Vite plugins
	 */
	plugins: [svelte()],

	/**
	 * Module resolution configuration
	 */
	resolve: {
		/**
		 * Path aliases for imports
		 * '@' resolves to './src' directory
		 */
		alias: {
			'@': fileURLToPath(new URL('./src', import.meta.url))
		}
	},

	/**
	 * Build configuration for library mode
	 */
	test: {
		include: ['src/**/*.test.ts']
	},

	build: {
		/** Output directory */
		outDir: OUTPUT_DIR,

		/** Disable JS minification (handled per-output via terser) */
		minify: false,

		/**
		 * Library-specific build options
		 */
		lib: {
			/** Library entry point */
			entry: INPUT_FILE,

			/** Global variable name for UMD/IIFE builds */
			name: OUTPUT_NAME
		},

		/**
		 * Rollup-specific options for advanced output configuration
		 */
		rollupOptions: {
			/** Input entry file */
			input: INPUT_FILE,

			/**
			 * Multiple output configurations for different module formats
			 * Includes both minified and unminified versions
			 */
			output: [
				/**
				 * ES Module format (unminified)
				 */
				{
					format: 'es',
					name: OUTPUT_NAME,
					entryFileNames: `${OUTPUT_NAME}.es.js`
				},

				/**
				 * ES Module format (minified)
				 */
				{
					format: 'es',
					name: OUTPUT_NAME,
					entryFileNames: `${OUTPUT_NAME}.min.es.js`,
					plugins: [terser()]
				},

				/**
				 * UMD format (unminified) - Universal Module Definition
				 * Compatible with AMD, CommonJS, and global variable
				 */
				{
					format: 'umd',
					name: OUTPUT_NAME,
					entryFileNames: `${OUTPUT_NAME}.umd.js`
				},

				/**
				 * UMD format (minified)
				 */
				{
					format: 'umd',
					name: OUTPUT_NAME,
					entryFileNames: `${OUTPUT_NAME}.min.umd.js`,
					plugins: [terser()]
				},

				/**
				 * CommonJS format (unminified)
				 */
				{
					format: 'cjs',
					name: OUTPUT_NAME,
					entryFileNames: `${OUTPUT_NAME}.cjs.js`
				},

				/**
				 * CommonJS format (minified)
				 */
				{
					format: 'cjs',
					name: OUTPUT_NAME,
					entryFileNames: `${OUTPUT_NAME}.min.cjs.js`,
					plugins: [terser()]
				}
			]
		}
	}
});
