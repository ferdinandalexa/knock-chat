<script>
	import Participant from './participant.svelte';

	import Button from '$components/button.svelte';
	import IconAddUser from '$icons/icon-add-user.svelte';
	import { activeConversation } from '$stores/chat';

	/**@typedef {import('@twilio/conversations').Participant} Participant*/
	/**@type {Array<Participant>}*/
	export let participants = [];

	/**@type {Promise<any>}*/
	let userAddedStatus;

	/**@param {string} userIdentity*/
	async function handleAddUser(userIdentity) {
		if ($activeConversation != null) {
			await $activeConversation.add('mariaando');
		}
	}
</script>

<section class="">
	<h3 class="text-lg font-semibold text-neutral-400">Participantes:</h3>
	<div class="divide-y divide-solid divide-neutral-500 pl-2">
		{#each participants as { identity, sid }}
			<Participant {identity} {sid} />
		{/each}
	</div>
	<Button secondary css="border-none pl-2 text-neutral-400" on:click={handleAddUser}>
		<IconAddUser />Agregar participante
	</Button>
</section>
