<script>
	import { goto } from '$app/navigation';

	import { activeConversation } from '../stores/chat';

	/** @type {string | null}*/
	export let uniqueName = '';
	/** @type {string | null}*/
	export let sid = '';

	/** @type {any}*/
	export let room;

	function handleClick() {
		$activeConversation = room;
		goto(`/room/${sid}`);
	}
</script>

<a
	href={`/room/${sid}`}
	on:click|preventDefault={handleClick}
	class="flex flex-col p-4 pt-2 transition-colors hover:bg-neutral-800 rounded-md"
>
	<h2 class="text-white font-semibold text-lg m-0">{uniqueName}</h2>
</a>
