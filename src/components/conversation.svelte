<script lang="ts">
	import { onMount, afterUpdate } from 'svelte';
	import { activeConversation } from '../stores/chat';

	import Message from './message.svelte';

	let div: HTMLDivElement;

	/** @type {Array<{ body: string; author: string; dateCreated: string}>}*/
	let messages = [];

	onMount(async () => {
		/**@type {import('@twilio/conversations').Paginator}*/
		const paginator = await $activeConversation.getMessages();
		console.log(paginator.items);
		messages = paginator.items;

		/** @param {Array<{ body: string; author: string; dateCreated: string}>} message*/
		$activeConversation.on('messageAdded', (message) => {
			messages = [...messages, message];
		});
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
