import { readFileSync } from 'node:fs';
import { fileURLToPath, URL } from 'node:url';

import { svelte } from '@sveltejs/vite-plugin-svelte';
import { defineConfig } from 'vite';

const { version, name } = JSON.parse(readFileSync('./package.json', 'utf-8'));

export default defineConfig({
	define: {
		__VERSION__: JSON.stringify(version),
		__NAME__: JSON.stringify(name)
	},

	plugins: [svelte()],

	root: './playground',

	resolve: {
		alias: {
			'@': fileURLToPath(new URL('./src', import.meta.url))
		}
	},

	server: {
		port: 3000,
		open: true,
		watch: {
			usePolling: true
		}
	}
});
