<script>
	import { onMount } from 'svelte';
	import autosize from 'autosize';

	import { activeConversation } from '$stores/chat';

	import IconSend from '$icons/icon-send.svelte';

	/**@type {string}*/
	let message;

	/**@type {HTMLTextAreaElement}*/
	let textarea;

	function sendMessage() {
		const validatedString = message.match(/.+/g);
		if ($activeConversation != null && validatedString) {
			$activeConversation.sendMessage(message);
			message = '';
			textarea.value = message;
		}
	}

	function handleSubmit() {
		sendMessage();
	}

	/**@param {KeyboardEvent} event*/
	function handleEnter(event) {
		if (event.key === 'Enter' && !event.shiftKey) {
			sendMessage();
			/**@ts-ignore*/
			autosize.update(textarea);
		}
	}

	onMount(() => {
		autosize(textarea);
	});
</script>

<form
	on:submit|preventDefault={handleSubmit}
	on:keyup={handleEnter}
	class="p-4 w-full bg-neutral-800"
>
	<div class="flex flex-row gap-2 items-end">
		<textarea
			bind:value={message}
			bind:this={textarea}
			type="text"
			placeholder="knock knock"
			rows="0"
			class="bg-neutral-600 placeholder-neutral-400 border-2 border-neutral-500 transition-colors h-4 resize-none max-h-[10ch] rounded-md w-full py-2 px-4 text-white leading-tight focus:outline-none focus:border-slate-400 flex-1"
			required
		/>
		<button
			class="text-neutral-200 w-10 h-10 rounded-full transition-colors flex items-center justify-center bg-blue-600 hover:bg-blue-700 active:bg-blue-800"
		>
			<IconSend width={20} height={20} />
		</button>
	</div>
</form>
