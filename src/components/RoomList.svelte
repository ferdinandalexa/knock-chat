<script>
	/**@type {any}*/
	export let chatList = [];
</script>

{#each chatList as chat}
	<div class="flex flex-col gap-1 mb-4 p-4 pt-2 transition-colors hover:bg-neutral-800 rounded-md">
		<h2 class="text-white font-semibold text-lg m-0">{chat.channelState.uniqueName}</h2>
		<span class="text-white font-semibold text-xs"
			>{[...chat.participants].length} participantes</span
		>
	</div>
{/each}
