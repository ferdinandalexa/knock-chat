<script>
	import { createEventDispatcher } from 'svelte';

	/**@type {string | null}*/
	export let id = null;

	/** @type {boolean}*/
	export let transparent = false;

	/** @type {string}*/
	export let css = '';

	const dispatch = createEventDispatcher();

	function handleClick() {
		dispatch('click', { id });
	}

	const bgColor = 'bg-blue-600 hover:bg-blue-700 active:bg-blue-800';
	const bgTransparent = 'bg-transparent hover:text-neutral-400 active:text-neutral-600';
</script>

<button
	class="text-neutral-200 w-10 h-10 rounded-full transition-colors flex items-center justify-center
  {transparent ? bgTransparent : bgColor} {css}"
	on:click={handleClick}
>
	<slot />
</button>
