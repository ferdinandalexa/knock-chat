<script>
	/**@type {string | null}*/
	export let id = null;

	import { createEventDispatcher } from 'svelte';

	const dispatch = createEventDispatcher();

	function handleClick() {
		dispatch('click', { id });
	}
</script>

<button
	on:click={handleClick}
	class="text-sm p-3 pt-3 flex flex-row items-center justify-start font-normal gap-2 w-full whitespace-no-wrap bg-transparent text-white"
>
	<slot />
</button>
