<script>
	import { createEventDispatcher } from 'svelte';
	import { fade } from 'svelte/transition';

	import { activeConversation, participantsChat } from '$stores/chat';

	import Button from '$components/button.svelte';

	/**@type {string}*/
	let newParticipantID = '';

	const dispatch = createEventDispatcher();

	function handleClose() {
		dispatch('close', { id: null });
	}

	function handleAddNewParticipant() {
		if ($activeConversation != null) {
			$activeConversation
				.add(newParticipantID)
				.then((participant) => {
					if ($participantsChat != null) {
						const newParticipant = { participant, typeRole: 'user' };
						//@ts-ignore
						$participantsChat = [...$participantsChat, newParticipant];
						dispatch('close', { id: null });
					}
				})
				.catch(() => {
					console.log('Usuario no valido');
				});
		}
	}
</script>

<div
	transition:fade={{ duration: 100 }}
	class="fixed top-0 left-0 grid h-full place-items-center w-full z-30 backdrop-brightness-50 p-4"
>
	<div class="bg-neutral-700 p-6 rounded-md w-full max-w-md">
		<form
			on:submit|preventDefault={() => {
				console.log('Submit hecho');
			}}
		>
			<div class="flex flex-col gap-2">
				<label for="participant-id" class="text-base font-regular text-neutral-300">
					ID del participante
				</label>
				<input
					bind:value={newParticipantID}
					type="text"
					name="participant-id"
					id="participant-id"
					placeholder="knock knock"
					class="bg-white appearance-none border-2 border-blue-200 rounded-md mb-2 w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-blue-400"
					required
				/>
				<div class="flex flex-row gap-2 w-full items-center justify-center">
					<Button on:click={handleAddNewParticipant} css="flex-1">Agregar</Button>
					<Button on:click={handleClose} css="flex-1" secondary>Regresar</Button>
				</div>
			</div>
		</form>
	</div>
</div>
