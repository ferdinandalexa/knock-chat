import path from 'path';

import adapter from '@sveltejs/adapter-auto';
import preprocess from 'svelte-preprocess';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	kit: {
		adapter: adapter(),
		vite: {
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
		}
	},
	preprocess: [
		preprocess({
			postcss: true
		})
	]
};

export default config;

/**
 * 
 "@components/*": ["src/components/*"],
 "@icons/*": ["src/components/icons/*"],
 "@containers/*": ["src/containers/*"],
 "@routes/*": ["src/routes/*"],
 "@stores/*": ["src/stores/*"],
 "@services/*": ["src/services/*"],
 
 $components: path.resolve("src/components)
 $icons: path.resolve("src/components/icons)
 $containers: path.resolve("src/containers)
 $routes: path.resolve("src/routes)
 $stores: path.resolve("src/stores)
 $services: path.resolve("src/services)
 */
