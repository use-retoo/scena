/**
 * Rollup configuration for bundling TypeScript declaration files (.d.ts)
 *
 * This configuration uses rollup-plugin-dts to bundle all TypeScript declaration files
 * from the application entry point into a single declaration file for distribution
 *
 * @see {@link https://www.npmjs.com/package/rollup-plugin-dts rollup-plugin-dts}
 */

import { nodeResolve } from '@rollup/plugin-node-resolve';
import dts from 'rollup-plugin-dts';

/**
 * @type {import('rollup').RollupOptions}
 */
export default {
	/**
	 * Entry point for the TypeScript declarations
	 */
	input: './src/main.ts',

	external: (id, _importer, isResolved) => isResolved && id.endsWith('.svelte'),

	/**
	 * Output configuration for the bundled declaration file
	 */
	output: [
		{
			/** Output file path for the bundled declarations */
			file: 'dist/index.d.ts',
			/** Module format (ES modules) */
			format: 'es'
		}
	],

	/**
	 * Rollup plugins
	 */
	plugins: [
		/**
		 * Resolve node-style modules to allow Rollup to find .ts and .d.ts files
		 */
		nodeResolve({
			extensions: ['.ts', '.d.ts']
		}),

		/**
		 * Bundle TypeScript declaration files using the app-specific tsconfig
		 */
		dts({
			tsconfig: './tsconfig.app.json'
		})
	]
};
