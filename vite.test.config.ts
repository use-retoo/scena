import { readFileSync } from 'node:fs';
import { fileURLToPath, URL } from 'node:url';

import { svelte } from '@sveltejs/vite-plugin-svelte';
import { svelteTesting } from '@testing-library/svelte/vite';
import { defineConfig } from 'vitest/config';

const { version, name } = JSON.parse(readFileSync('./package.json', 'utf-8'));

const alias = {
	'@': fileURLToPath(new URL('./src', import.meta.url))
};

const define = {
	__VERSION__: JSON.stringify(version),
	__NAME__: JSON.stringify(name)
};

export default defineConfig({
	test: {
		projects: [
			{
				plugins: [svelte()],
				resolve: { alias },
				define,
				test: {
					name: 'unit',
					include: ['src/**/*.test.ts'],
					exclude: ['src/**/ui/**/*.test.ts']
				}
			},
			{
				plugins: [svelte(), svelteTesting()],
				resolve: { alias },
				define,
				test: {
					name: 'ui',
					include: ['src/**/ui/**/*.test.ts'],
					setupFiles: ['./test.setup.ts'],
					environment: 'jsdom'
				}
			}
		]
	}
});
