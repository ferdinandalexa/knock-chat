<script>
	import { createEventDispatcher } from 'svelte';
	import { fade } from 'svelte/transition';
	import { goto } from '$app/navigation';

	import { activeConversation } from '$stores/chat';

	import Button from '$components/button.svelte';

	const dispatch = createEventDispatcher();

	function handleClose() {
		dispatch('close', { id: null });
	}

	function handleAddNewParticipant() {
		if ($activeConversation != null) {
			$activeConversation.leave();
			goto('/');
		}
	}
</script>

<div
	transition:fade={{ duration: 100 }}
	class="fixed top-0 left-0 grid h-full place-items-center w-full z-30 backdrop-brightness-50 p-4"
>
	<div class="bg-neutral-700 p-6 rounded-md w-full max-w-md ">
		<header class="mb-2 flex flex-row gap-2 text-neutral-200 items-center">
			<h3 class="font-semibold text-xl mb-[1px]">Abandonar sala</h3>
		</header>
		<p class="text-neutral-200 mb-4 px-1">
			Si abandonas la sala no podrás leer los mensajes. ¿Deseas continuar?
		</p>
		<footer class="flex flex-row gap-2">
			<Button on:click={handleAddNewParticipant} css="flex-1">Abandonar</Button>
			<Button on:click={handleClose} css="flex-1" secondary>Regresar</Button>
		</footer>
	</div>
</div>
