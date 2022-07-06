<script lang="ts">
	import { onMount, afterUpdate } from 'svelte';
	import { activeConversation } from '../stores/chat';

	import Message from './message.svelte';

	let div: HTMLDivElement;

	/**@typedef {{ body: string; author: string; dateCreated: string}} Message*/
	/** @type {[Array<Message>}*/
	let messages = new Array();

	onMount(async () => {
		/**@type {import('@twilio/conversations').Paginator}*/
		if ($activeConversation != null) {
			const paginator = await $activeConversation.getMessages();
			messages = paginator.items;

			/** @param {Array<Message>} message*/
			$activeConversation.on('messageAdded', (message) => {
				messages = [...messages, message];
			});
		}
	});
	afterUpdate(() => {
		window.scrollTo(0, div.scrollHeight);
	});
</script>

<div bind:this={div} class="w-full px-2 flex flex-col">
	{#each messages as message}
		<Message {message} />
	{/each}
</div>
