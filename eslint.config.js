import { fileURLToPath } from 'node:url';

import { includeIgnoreFile } from '@eslint/compat';
import js from '@eslint/js';
import { defineConfig } from 'eslint/config';
import prettier from 'eslint-config-prettier';
import importPlugin from 'eslint-plugin-import';
import svelte from 'eslint-plugin-svelte';
import globals from 'globals';
import { configs, parser } from 'typescript-eslint';

import svelteConfig from './svelte.config.js';

const gitignorePath = fileURLToPath(new URL('./.gitignore', import.meta.url));

export default defineConfig(
	includeIgnoreFile(gitignorePath),
	js.configs.recommended,
	...configs.recommended,
	...svelte.configs.recommended,

	importPlugin.flatConfigs.recommended,
	importPlugin.flatConfigs.typescript,

	prettier,
	...svelte.configs.prettier,
	{
		languageOptions: { globals: { ...globals.browser, ...globals.node } },

		settings: {
			'import/resolver': {
				typescript: {
					project: ['./tsconfig.app.json']
				},
				node: true
			},
			'import/ignore': ['svelte', '@sveltejs/.*']
		},

		rules: {
			'no-undef': 'off',

			'import/order': [
				'error',
				{
					'newlines-between': 'always',
					groups: ['builtin', 'external', 'internal', 'parent', 'sibling', 'index'],
					alphabetize: {
						order: 'asc',
						caseInsensitive: true
					}
				}
			]
		}
	},
	{
		files: ['**/*.svelte', '**/*.svelte.ts', '**/*.svelte.js'],
		languageOptions: {
			parserOptions: {
				projectService: true,
				extraFileExtensions: ['.svelte'],
				svelteConfig,
				parser
			}
		}
	}
);
