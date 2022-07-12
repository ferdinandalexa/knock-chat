<script>
	import { userLogged } from '$stores/session';
	import { activeConversation, participantsChat } from '$stores/chat';

	import Dropdown from '$components/drowpdown.svelte';
	import DropdownItem from '$components/dropdown-item.svelte';

	/**@type {string}*/
	export let sid;

	/**@type {string | null}*/
	export let identity;

	/**@type {string}*/
	export let roleSid = 'RL7fa444ed98a646ca9f945286a6077f93';

	/**@type {Object.<string, string>}*/
	const CHANNEL_ROLES = {
		RLd99d2b0613b543d5ae0c3811f0732332: 'admin',
		RL7fa444ed98a646ca9f945286a6077f93: 'user'
	};

	let role = CHANNEL_ROLES[roleSid];

	let isUserLogged = false;
	if ($userLogged) isUserLogged = $userLogged.name === identity;

	/**@param {string} userSID*/
	async function handleRemoveUser(userSID) {
		if ($activeConversation != null) {
			await $activeConversation.removeParticipant(userSID);
			if ($participantsChat != null) {
				const updatedParticipantList = $participantsChat.filter(({ sid }) => sid !== userSID);
				$participantsChat = updatedParticipantList;
			}
		}
	}
</script>

<div class="flex flex-row justify-between items-center min-h-[3rem]">
	<div class="flex flex-row gap-1 items-center mb-1">
		<span class="text-white text-base ">{identity}</span>
		<span class="text-neutral-400 text-sm mt-[2px]">{`(${role})`}</span>
	</div>

	{#if !isUserLogged}
		<Dropdown>
			<DropdownItem>Agregar a otras salas</DropdownItem>
			<DropdownItem
				on:click={() => {
					handleRemoveUser(sid);
				}}>Remover de la sala</DropdownItem
			>
			<DropdownItem>Hacer admnin</DropdownItem>
		</Dropdown>
	{/if}
</div>
