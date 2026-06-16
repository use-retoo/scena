import { fileURLToPath, URL } from 'node:url';

import { svelte } from '@sveltejs/vite-plugin-svelte';
import { svelteTesting } from '@testing-library/svelte/vite';
import { defineConfig } from 'vitest/config';

const alias = {
	'@': fileURLToPath(new URL('./src', import.meta.url))
};

export default defineConfig({
	test: {
		projects: [
			{
				plugins: [svelte()],
				resolve: { alias },
				test: {
					name: 'unit',
					include: ['src/**/*.test.ts'],
					exclude: ['src/**/ui/**/*.test.ts'],
					setupFiles: ['./test.setup.globals.ts']
				}
			},
			{
				plugins: [svelte(), svelteTesting()],
				resolve: { alias },
				test: {
					name: 'ui',
					include: ['src/**/ui/**/*.test.ts'],
					setupFiles: ['./test.setup.globals.ts', './test.setup.ts'],
					environment: 'jsdom'
				}
			}
		]
	}
});
