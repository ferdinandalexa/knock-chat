<script>
	import autosize from 'autosize';
	import { onMount } from 'svelte';

	import { activeConversation } from '../stores/chat';

	import IconSend from '../components/icons/icon-send.svelte';

	/**@type {string}*/
	let message;

	/**@type {HTMLTextAreaElement}*/
	let textarea;

	function handleSubmit() {
		$activeConversation.sendMessage(message);
		console.log(`Mensaje "${message}" enviado`);
		message = '';
	}

	onMount(() => {
		autosize(textarea);
	});
</script>

<form on:submit|preventDefault={handleSubmit} class="p-4 w-full absolute bottom-0">
	<div class="flex flex-row gap-2 items-end">
		<textarea
			bind:value={message}
			bind:this={textarea}
			type="text"
			placeholder="knock knock"
			class="bg-white appearance-none border-2 border-blue-200 h-4 resize-none max-h-[10ch] rounded-md w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-blue-400 flex-1"
			required
		/>
		<button
			class="text-neutral-200 w-10 h-10 rounded-full transition-colors flex items-center justify-center bg-blue-600 hover:bg-blue-700 active:bg-blue-800"
		>
			<IconSend width={20} height={20} />
		</button>
	</div>
</form>
