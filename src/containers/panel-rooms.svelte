<script>
	import { createEventDispatcher, getContext } from 'svelte';
	import { fly } from 'svelte/transition';

	import { addParticipant } from '$services/chat';
	import { activeConversation, chatList } from '$stores/chat';

	import RoomSelect from '$components/room-select.svelte';
	import Button from '$components/button.svelte';
	import ButtonIcon from '$components/button-icon.svelte';
	import ModalDeleteRoom from '$components/modal-delete-room.svelte';

	import IconClose from '$icons/icon-close.svelte';
	import IconUsers from '$icons/icon-users.svelte';
	import { userLogged } from '$stores/session';

	/**@typedef {import('svelte').SvelteComponent} SvelteComponent*/

	/**@type {string}*/
	export let participant;

	/**@type {SvelteComponent | null}*/
	let currentModal = null;

	/**@type {Object.<string, any>}*/
	let modals = {
		'modal-delete': ModalDeleteRoom
	};

	const dispatch = createEventDispatcher();

	/** @typedef {import('@twilio/conversations').Conversation} Conversation*/

	/**@type {Conversation[]}*/
	let otherChats;

	/**@type {string}*/
	let messageError;

	/**@type {Array<{sid: string}> | []}*/
	let selectedRooms = [];

	function handleClick() {
		dispatch('close', { id: null });
	}

	/**@param {CustomEvent} event*/
	function handleModal(event) {
		currentModal = modals[event.detail.id];
	}

	if (!$chatList != null) {
		/**@ts-ignore*/
		otherChats = $chatList?.filter((room) => {
			return room.uniqueName !== $activeConversation?.uniqueName;
		});
	}

	/**@param {CustomEvent} event*/
	function handleSelect(event) {
		const sid = event.detail.sid;
		const isSelected = event.detail.isSelected;
		if (isSelected) {
			/**@ts-ignore*/
			selectedRooms = [...selectedRooms, { sid }];
		} else {
			const updatedList = selectedRooms.filter((room) => {
				return room.sid !== sid;
			});

			selectedRooms = updatedList;
		}
	}

	function handleAdd() {
		Promise.allSettled(
			selectedRooms.map((room) => {
				if ($userLogged) return addParticipant($userLogged?.chatToken, room.sid, participant);
			})
		).then((values) => {
			values.forEach((promise) => {
				if (promise.status === 'rejected') {
					console.log(promise);
					messageError = promise.reason.body.message;
				}
			});
			if (messageError == null) dispatch('close', { id: null });
		});
	}
</script>

<svelte:component this={currentModal} on:close={handleModal} />

<div transition:fly={{ x: 200 }} class="w-full h-full top-0 left-0 fixed z-20 bg-neutral-700 p-4">
	<div class="grid-room max-w-md mx-auto">
		<header class="w-full flex flex-row justify-between text-neutral-200 items-center">
			<div class="flex flex-row gap-2 items-center ">
				<IconUsers width={20} height={20} />
				<h2 class="font-semibold text-lg">Agregar a sala</h2>
			</div>
			<ButtonIcon on:click={handleClick} transparent>
				<IconClose width={20} height={20} />
			</ButtonIcon>
		</header>
		<div class="mt-4 flex flex-col gap-2">
			{#if otherChats.length > 0}
				{#each otherChats as { uniqueName, sid }}
					<RoomSelect on:select={handleSelect} name={uniqueName} {sid} />
				{/each}
			{:else}
				<p>No tienes más chats</p>
			{/if}
		</div>
		{#if messageError != null}
			<p class="w-full text-center text-red-400 mb-2">
				{messageError}
			</p>
		{/if}
		<Button disabled={selectedRooms.length === 0} on:click={handleAdd}>Agregar</Button>
	</div>
</div>

<style>
	.grid-room {
		display: grid;
		min-height: 100%;
		grid-template-rows: max-content 1fr max-content;
	}
</style>
