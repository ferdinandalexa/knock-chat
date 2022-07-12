<script>
	import { createEventDispatcher } from 'svelte';
	import { fly } from 'svelte/transition';

	import { activeConversation } from '$stores/chat';

	import Button from '$components/button.svelte';
	import ButtonIcon from '$components/button-icon.svelte';
	import ParticipantsList from '$components/participants-list.svelte';
	import ModalDeleteRoom from '$components/modal-delete-room.svelte';

	import IconClose from '$icons/icon-close.svelte';
	import IconInfo from '$icons/icon-info.svelte';

	/**@typedef {import('svelte').SvelteComponent} SvelteComponent*/

	/**@type {SvelteComponent | null}*/
	let currentModal = null;

	/**@type {Object.<string, any>}*/
	let modals = {
		'modal-delete': ModalDeleteRoom
	};

	const dispatch = createEventDispatcher();

	function handleClick() {
		dispatch('close', { id: null });
	}

	/**@param {CustomEvent} event*/
	function handleModal(event) {
		currentModal = modals[event.detail.id];
	}
</script>

<svelte:component this={currentModal} on:close={handleModal} />

<div transition:fly={{ x: 200 }} class="w-full h-full top-0 left-0 fixed z-20 bg-neutral-700 p-4">
	<div class="grid-room max-w-md mx-auto">
		<header class="w-full flex flex-row justify-between text-neutral-200 items-center">
			<div class="flex flex-row gap-2 items-center ">
				<IconInfo width={20} height={20} />
				<h2 class="font-semibold text-lg">{$activeConversation?.uniqueName}</h2>
			</div>
			<ButtonIcon on:click={handleClick} transparent>
				<IconClose width={20} height={20} />
			</ButtonIcon>
		</header>
		<ParticipantsList />
		<footer class="w-full left-0 p-4">
			<Button on:click={handleModal} secondary css="w-full" id="modal-delete">Eliminar chat</Button>
		</footer>
	</div>
</div>

<style>
	.grid-room {
		display: grid;
		min-height: 100%;
		grid-template-rows: max-content 1fr max-content;
	}
</style>
