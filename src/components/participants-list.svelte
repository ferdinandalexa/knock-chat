<script>
	import { participantsChat } from '$stores/chat';

	import Participant from '$components/participant.svelte';
	import Button from '$components/button.svelte';
	import ModalAddParticipant from '$components/modal-add-participant.svelte';

	import IconAddUser from '$icons/icon-add-user.svelte';

	export let isAdmin = false;

	/**@typedef {import('svelte').SvelteComponent} SvelteComponent*/

	/**@type {SvelteComponent | null}*/
	let currentModal = null;

	/**@type {Object.<string, any>}*/
	let modals = {
		'modal-add-participant': ModalAddParticipant
	};

	/**@param {CustomEvent} event*/
	function handleModal(event) {
		currentModal = modals[event.detail.id];
	}
</script>

<svelte:component this={currentModal} on:close={handleModal} />

<section class="">
	<h3 class="text-lg font-semibold text-neutral-400">Participantes:</h3>
	<div class="divide-y divide-solid divide-neutral-500 pl-2">
		{#if $participantsChat != null}
			{#each $participantsChat as { participant: { identity, sid }, typeRole }}
				<Participant {identity} {sid} {typeRole} {isAdmin} />
			{/each}
		{/if}
	</div>
	<Button
		secondary
		css="border-none pl-2 text-neutral-400"
		on:click={handleModal}
		id="modal-add-participant"
	>
		<IconAddUser />Agregar participante
	</Button>
</section>
