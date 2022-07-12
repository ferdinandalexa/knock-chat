<script>
	// import { createEventDispatcher } from 'svelte';

	import Participant from '$components/participant.svelte';
	import Button from '$components/button.svelte';
	import IconAddUser from '$icons/icon-add-user.svelte';
	import ModalAddParticipant from '$components/modal-add-participant.svelte';

	/**@typedef {import('@twilio/conversations').Participant} Participant*/
	/**@typedef {import('svelte').SvelteComponent} SvelteComponent*/

	/**@type {Array<Participant>}*/
	export let participants = [];

	/**@type {SvelteComponent | null}*/
	let currentModal = null;

	/**@type {Object.<string, any>}*/
	let modals = {
		'modal-add-participant': ModalAddParticipant
	};

	// const dispatch = createEventDispatcher();

	/**@param {CustomEvent} event*/
	function handleModal(event) {
		currentModal = modals[event.detail.id];
	}
</script>

<svelte:component this={currentModal} on:close={handleModal} />

<section class="">
	<h3 class="text-lg font-semibold text-neutral-400">Participantes:</h3>
	<div class="divide-y divide-solid divide-neutral-500 pl-2">
		{#each participants as { identity, sid }}
			<Participant {identity} {sid} />
		{/each}
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
