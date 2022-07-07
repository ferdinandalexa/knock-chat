<script lang="ts">
	import { onMount, afterUpdate } from 'svelte';
	import { activeConversation } from '$stores/chat';

	import Message from './message.svelte';

	let main: HTMLElement;

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
		main.scroll({ top: main.scrollHeight, behavior: 'smooth' });
	});
</script>

<main bind:this={main} class="w-full h-full overflow-auto px-2 flex flex-col">
	{#each messages as message}
		<Message {message} />
	{:else}
		<div class="h-full text-white">No hay mensajes</div>
	{/each}
</main>
