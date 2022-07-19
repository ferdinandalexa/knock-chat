<script>
	import { createEventDispatcher } from 'svelte';

	/**@type {Array<{cover: string}>}*/
	export let pictures = [];

	export let current = 'default';

	/**@type {string}*/
	export let pictureSelected = pictures.find(({ cover }) => cover === current)?.cover || current;

	const dispatch = createEventDispatcher();

	function handleSelect() {
		dispatch('select');
	}
</script>

{#each pictures as { cover }}
	<label
		class="h-max w-max p-4  {pictureSelected === cover &&
			'bg-blue-500 bg-opacity-50'} transition-colors rounded-md pb-2"
	>
		<input
			class="hidden"
			type="radio"
			bind:group={pictureSelected}
			on:click={handleSelect}
			value={cover}
		/>
		<figure class="text-center text-neutral-200 capitalize">
			<img src="/pictures/{cover}.png" alt="{cover} picture" class="rounded-full w-24 h-24" />
			<figcaption class="mt-2">{cover}</figcaption>
		</figure>
	</label>
{/each}
