<script>
	import { createEventDispatcher } from 'svelte';

	export let name = '';
	export let sid = '';

	let isSelected = false;

	const dispatch = createEventDispatcher();

	function handleSelect() {
		dispatch('select', { sid, isSelected: !isSelected });
	}
</script>

<label
	class="flex flex-row items-center justify-start h-max gap-3 p-4 {isSelected
		? 'bg-blue-500 hover:bg-blue-500 hover:bg-opacity-50 bg-opacity-30'
		: 'hover:bg-neutral-600'} transition-colors rounded-md"
>
	<input
		class="form-check-input appearance-none h-4 w-4 border border-neutral-500 rounded-full bg-neutral-600 checked:bg-blue-400 checked:border-blue-400 checked:bg-opacity-50 focus:outline-none transition duration-200 mt-[2px] cursor-pointer"
		type="checkbox"
		bind:checked={isSelected}
		on:click={handleSelect}
	/>
	<p class="text-neutral-300 font-semibold">{name}</p>
</label>
