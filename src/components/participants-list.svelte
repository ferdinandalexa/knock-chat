<script>
	import { activeConversation } from '$stores/chat';
	import { participantsChat } from '$stores/chat';

	import Participant from '$components/participant.svelte';
	import Button from '$components/button.svelte';
	import ModalAddParticipant from '$components/modal-add-participant.svelte';

	import IconAddUser from '$icons/icon-add-user.svelte';

	/**@typedef {import('@twilio/conversations').Participant} Participant*/
	/**@typedef {import('svelte').SvelteComponent} SvelteComponent*/

	/**@type {Promise<void | Participant[]> | undefined}*/
	let participants;

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

	participants = $activeConversation?.getParticipants().then((gettedParticipants) => {
		$participantsChat = gettedParticipants;
	});
</script>

<svelte:component this={currentModal} on:close={handleModal} />

<section class="">
	<h3 class="text-lg font-semibold text-neutral-400">Participantes:</h3>
	<div class="divide-y divide-solid divide-neutral-500 pl-2">
		{#if $participantsChat != null}
			{#each $participantsChat as { identity, sid, roleSid }}
				<Participant {identity} {sid} {roleSid} />
			{/each}
		{:else}
			{#await participants}
				Loading...
			{:then participants}
				{#if participants != undefined}
					{#each participants as { identity, sid, roleSid }}
						<Participant {identity} {sid} {roleSid} />
					{/each}
				{/if}
			{/await}
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
