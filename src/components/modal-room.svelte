<script>
	import { createEventDispatcher } from 'svelte';
	import { fade } from 'svelte/transition';

	import { createOrJoinConversation } from '$services/chat';
	import { userLogged } from '$stores/session';
	import { chatList } from '$stores/chat';

	import Button from '$components/button.svelte';

	/**@type {string}*/
	let roomName = '';

	const dispatch = createEventDispatcher();

	function handleClose() {
		dispatch('close', { id: null });
	}

	function handleCreateNewRoom() {
		if ($userLogged != null) {
			createOrJoinConversation({
				room: roomName,
				accessToken: $userLogged?.chatToken
			}).then((conversation) => {
				if ($chatList != null) {
					$chatList = [conversation, ...$chatList];
				}
				dispatch('close', { id: null });
			});
		}
	}
</script>

<div
	transition:fade={{ duration: 100 }}
	class="fixed top-0 left-0 grid h-full place-items-center w-full z-20 backdrop-brightness-50 p-4"
>
	<div class="bg-neutral-700 p-6 rounded-md w-full max-w-md">
		<form
			on:submit|preventDefault={() => {
				console.log('Submit hecho');
			}}
		>
			<div class="flex flex-col gap-2">
				<label for="chat-name" class="text-base font-regular text-neutral-300">
					Nombre del grupo
				</label>
				<input
					bind:value={roomName}
					type="text"
					name="chat-name"
					id="chat-name"
					placeholder="knock knock"
					class="bg-white appearance-none border-2 border-blue-200 rounded-md mb-2 w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-blue-400"
					required
				/>
				<div class="flex flex-row gap-2 w-full items-center justify-center">
					<Button on:click={handleCreateNewRoom} css="flex-1">Crear grupo</Button>
					<Button on:click={handleClose} css="flex-1" secondary>Regresar</Button>
				</div>
			</div>
		</form>
	</div>
</div>
