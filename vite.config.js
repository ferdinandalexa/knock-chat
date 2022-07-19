import path from 'path';
import { sveltekit } from '@sveltejs/kit/vite';

/** @type {import('vite').UserConfig} */
const config = {
	server: {
		port: 3000
	},
	plugins: [sveltekit()],
	resolve: {
		alias: {
			$components: path.resolve('src/components'),
			$icons: path.resolve('src/components/icons'),
			$containers: path.resolve('src/containers'),
			$routes: path.resolve('src/routes'),
			$stores: path.resolve('src/stores'),
			$services: path.resolve('src/services')
		}
	}
};

export default config;
