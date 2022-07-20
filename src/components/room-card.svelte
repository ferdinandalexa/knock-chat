<script>
	import { goto } from '$app/navigation';

	import { activeConversation } from '$stores/chat';

	/** @type {string | null}*/
	export let uniqueName = '';
	/** @type {string | null}*/
	export let sid = '';

	/** @type {string | null}*/
	export let cover = '';

	/** @typedef {import('@twilio/conversations').Conversation} Conversation*/
	/** @type {Conversation}*/
	export let room;

	function handleClick() {
		$activeConversation = room;
		goto(`/room/${sid}`);
	}
</script>

<a
	href={`/room/${sid}`}
	on:click|preventDefault={handleClick}
	class="flex flex-row p-2 py-3 transition-colors hover:bg-neutral-800 items-center gap-2 rounded-md"
>
	<img src="/pictures/{cover}.png" alt="" class="w-7 h-7 rounded-full" />
	<h2 class="text-white font-semibold text-lg m-0">{uniqueName}</h2>
</a>
