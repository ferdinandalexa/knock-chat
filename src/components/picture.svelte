<script>
	import { createEventDispatcher } from 'svelte';

	const dispatch = createEventDispatcher();

	/**@type {string | null}*/
	export let uniqueName = 'Room';

	/**@type {string}*/
	export let cover = 'default';

	function handleClick() {
		dispatch('click', { id: 'select-picture' });
	}
</script>

<img src="/pictures/{cover}.png" alt="{uniqueName} picture" />
<button on:click={handleClick} class="text-xs text-neutral-500">Tap to change picture</button>
