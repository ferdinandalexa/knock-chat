<script>
	import { createEventDispatcher, getContext } from 'svelte';
	import { fly } from 'svelte/transition';

	import { activeConversation } from '$stores/chat';

	import Invite from '$components/invite.svelte';
	import Button from '$components/button.svelte';
	import ButtonIcon from '$components/button-icon.svelte';
	import Picture from '$components/picture.svelte';
	import ParticipantsList from '$components/participants-list.svelte';
	import ModalDeleteRoom from '$components/modal-delete-room.svelte';
	import PanelPictures from '$containers/panel-pictures.svelte';

	import IconClose from '$icons/icon-close.svelte';
	import IconInfo from '$icons/icon-info.svelte';

	let { isAdmin } = getContext('admin');

	/**@typedef {import('svelte').SvelteComponent} SvelteComponent*/

	/**@type {SvelteComponent | null}*/
	let currentModal = null;

	/**@type {Object.<string, any>}*/
	let modals = {
		'modal-delete': ModalDeleteRoom,
		'select-picture': PanelPictures
	};

	const dispatch = createEventDispatcher();

	/**@type {string}*/
	let cover;

	if ($activeConversation?.attributes != null)
		cover = $activeConversation?.attributes.cover ?? 'default';

	function handleClick() {
		dispatch('close', { id: null });
	}

	/**@param {CustomEvent} event*/
	function handleModal(event) {
		currentModal = modals[event.detail.id];

		const changePicture = event.detail.changePicture;

		if (changePicture) {
			console.log('changePicture');
			const newPicture = event.detail.newPicture;
			cover = newPicture;
		}
	}
</script>

<svelte:component this={currentModal} on:close={handleModal} />

<div transition:fly={{ x: 200 }} class="w-full h-full top-0 left-0 fixed z-20 bg-neutral-700 p-4">
	<div class="grid-room w-full mx-auto max-w-md">
		<header class="w-full flex flex-row justify-between text-neutral-200 items-center">
			<div class="flex flex-row gap-2 items-center ">
				<IconInfo width={20} height={20} />
				<h2 class="font-semibold text-lg">Información de la sala</h2>
			</div>
			<ButtonIcon on:click={handleClick} transparent>
				<IconClose width={20} height={20} />
			</ButtonIcon>
		</header>

		<section class="w-full">
			<div class="flex flex-col items-center justify-center my-8 gap-2 rounded-full">
				<Picture on:click={handleModal} uniqueName={$activeConversation?.uniqueName} {cover} />
				<h2 class="text-2xl font-semibold text-white">{$activeConversation?.uniqueName}</h2>
			</div>
			<div class="divide-y divide-solid divide-neutral-500">
				<ParticipantsList />
				<Invite sid={$activeConversation?.sid} />
			</div>
		</section>

		{#if isAdmin}
			<footer class="w-full left-0 p-4">
				<Button on:click={handleModal} secondary css="w-full" id="modal-delete"
					>Eliminar chat</Button
				>
			</footer>
		{/if}
	</div>
</div>

<style>
	.grid-room {
		display: grid;
		min-height: 100%;
		grid-template-rows: max-content 1fr max-content;
	}
</style>
