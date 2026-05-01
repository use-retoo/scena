/**
 * Rollup configuration for bundling SCSS styles into CSS files
 *
 * This configuration uses rollup-plugin-scss to compile the application's SCSS entry point
 * into distributable CSS assets. It produces two outputs:
 * - a regular (non-minified) CSS file
 * - a minified (compressed) CSS file
 *
 * Post-processing is handled via PostCSS with Autoprefixer to automatically add vendor prefixes
 * based on the configured browser support.
 *
 * @see {@link [https://www.npmjs.com/package/rollup-plugin-scss](https://www.npmjs.com/package/rollup-plugin-scss) rollup-plugin-scss}
 * @see {@link [https://www.npmjs.com/package/postcss](https://www.npmjs.com/package/postcss) postcss}
 * @see {@link [https://www.npmjs.com/package/autoprefixer](https://www.npmjs.com/package/autoprefixer) autoprefixer}
 */

import autoprefixer from 'autoprefixer';
import postcss from 'postcss';
import scss from 'rollup-plugin-scss';

/**
 * Output library name (used as a base filename for generated CSS assets)
 */
const OUTPUT_NAME = 'scena';

/**
 * Output directory for built files
 */
const OUTPUT_DIR = './dist';

/**
 * Shared SCSS plugin options used by all builds
 */
const SCSS_OPTIONS = {
	/**
	 * Suppress specific deprecation warnings emitted by Sass tooling
	 */
	silenceDeprecations: ['legacy-js-api'],

	processor: () => postcss([autoprefixer()])
};

/**
 * Common logging hooks for rollup-plugin-scss
 *
 * These handlers can be customized to integrate with a project's logger
 * or to silence/redirect plugin output.
 */
const SCSS_LOGS = {
	/**
	 * Called for informational plugin logs
	 */
	onLog: function () {},

	/**
	 * Called for plugin warnings
	 */
	onWarn: function () {}
};

/**
 * @type {import('rollup').RollupOptions}
 */
export default [
	{
		/**
		 * Entry point for SCSS compilation
		 */
		input: './src/shared/styles/index.scss',

		/**
		 * Output configuration for the non-minified CSS build
		 */
		output: [
			{
				/** Output file path for the compiled CSS */
				file: `${OUTPUT_DIR}/${OUTPUT_NAME}.css`
			}
		],

		/**
		 * Rollup plugins
		 */
		plugins: [
			/**
			 * Compile SCSS to CSS and emit a source map for easier debugging
			 */
			scss({
				...SCSS_OPTIONS,

				/** Emitted CSS filename */
				fileName: `${OUTPUT_NAME}.css`,

				/** Generate source maps for the resulting CSS */
				sourceMap: true
			})
		],

		/**
		 * Logging hooks (shared)
		 */
		...SCSS_LOGS
	},

	{
		input: './src/shared/styles/index.scss',

		/**
		 * Output configuration for the minified CSS build
		 */
		output: [
			{
				/** Output file path for the minified CSS */
				file: `${OUTPUT_DIR}/${OUTPUT_NAME}.min.css`
			}
		],

		/**
		 * Rollup plugins
		 */
		plugins: [
			/**
			 * Compile SCSS to CSS and emit a compressed (minified) result
			 */
			scss({
				...SCSS_OPTIONS,

				/** Emitted CSS filename */
				fileName: `${OUTPUT_NAME}.min.css`,

				/** Minify the output CSS */
				outputStyle: 'compressed'
			})
		],

		/**
		 * Logging hooks (shared)
		 */
		...SCSS_LOGS
	}
];
