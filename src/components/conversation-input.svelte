<script>
	import { activeConversation } from '../stores/chat';

	import IconSend from '../components/icons/icon-send.svelte';

	/**@type {string}*/
	let message;

	function handleSubmit() {
		$activeConversation.sendMessage(message);
		console.log(`Mensaje "${message}" enviado`);
		message = '';
	}
</script>

<form on:submit|preventDefault={handleSubmit} class="p-4 relative w-full">
	<div class="flex flex-row gap-2">
		<input
			bind:value={message}
			type="text"
			placeholder="knock knock"
			class="bg-white appearance-none border-2 border-blue-200 rounded-md mb-2 w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-blue-400 flex-1"
			required
		/>
		<button
			class="text-neutral-200 w-10 h-10 rounded-full transition-colors flex items-center justify-center bg-blue-600 hover:bg-blue-700 active:bg-blue-800"
		>
			<IconSend width={20} height={20} />
		</button>
	</div>
</form>
