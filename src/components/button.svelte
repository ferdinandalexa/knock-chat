<script>
	import { createEventDispatcher } from 'svelte';

	/**@type {string | null}*/
	export let id = null;

	/**@type {string}*/
	export let css = '';

	/**@type {boolean}*/
	export let secondary = false;

	const dispatch = createEventDispatcher();

	function handleClick() {
		dispatch('click', { id });
	}
</script>

<button
	class="flex flex-row gap-2 justify-center items-center px-6 py-2 rounded-md transition-colors border-2 {css} {secondary
		? 'bg-transparent border-neutral-400 hover:border-neutral-500 active:border-neutral-600 text-neutral-300 hover:text-neutral-400 text:border-neutral-500'
		: 'text-white bg-blue-600  hover:bg-blue-700 active:bg-blue-800 border-transparent'}"
	on:click|preventDefault={handleClick}
>
	<slot>Button</slot>
</button>
