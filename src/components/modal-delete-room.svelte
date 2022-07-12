<script>
	import { createEventDispatcher } from 'svelte';
	import { fade } from 'svelte/transition';
	import { goto } from '$app/navigation';

	import { userLogged } from '$stores/session';
	import { activeConversation } from '$stores/chat';
	import { deleteChat } from '$services/chat';

	import Button from '$components/button.svelte';
	import IconDelete from '$icons/icon-info.svelte';

	const dispatch = createEventDispatcher();

	function handleClose() {
		dispatch('close', { id: null });
	}

	function handleDelete() {
		if ($activeConversation != null && $userLogged != null) {
			deleteChat($userLogged?.chatToken, $activeConversation.sid).then(() => {
				goto('/');
			});
		}
	}
</script>

<div
	transition:fade={{ duration: 100 }}
	class="fixed top-0 left-0 grid h-full place-items-center w-full z-30 backdrop-brightness-50 p-4"
>
	<div class="bg-neutral-700 p-6 rounded-md w-full max-w-md">
		<header class="mb-2 flex flex-row gap-2 text-neutral-200 items-center">
			<IconDelete width={20} height={20} />
			<h3 class="font-semibold text-xl mb-[1px]">Eliminar sala</h3>
		</header>
		<div class="px-1 text-neutral-200">
			<p>Si eliminas la sala ya no podras recuperarla.</p>
			<p>¿Aún así quieres continuar?</p>
		</div>
		<footer class="flex flex-row gap-2 mt-4">
			<Button on:click={handleDelete} css="flex-1 bg-red-600 hover:bg-red-700 active:bg-red-800">
				Eliminar sala
			</Button>
			<Button on:click={handleClose} css="flex-1" secondary>Regresar</Button>
		</footer>
	</div>
</div>
