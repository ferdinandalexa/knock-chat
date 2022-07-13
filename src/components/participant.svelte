<script>
	import { userLogged } from '$stores/session';
	import { activeConversation, participantsChat } from '$stores/chat';

	import Dropdown from '$components/drowpdown.svelte';
	import DropdownItem from '$components/dropdown-item.svelte';

	export let isAdmin = false;

	/**@type {string}*/
	export let sid;

	/**@type {string | null}*/
	export let identity;

	/**@type {string}*/
	export let typeRole = 'user';

	let isUserLogged = false;
	if ($userLogged) isUserLogged = $userLogged.name === identity;

	/**@param {string} userSID*/
	async function handleRemoveUser(userSID) {
		if ($activeConversation && $participantsChat) {
			await $activeConversation.removeParticipant(userSID);
			const updatedParticipantList = $participantsChat.filter(
				({ participant: { sid } }) => sid !== userSID
			);
			$participantsChat = updatedParticipantList;
		}
	}
</script>

<div class="flex flex-row justify-between items-center min-h-[3rem]">
	<div class="flex flex-row gap-1 items-center mb-1">
		<span class="text-white text-base ">{identity}</span>
		<span class="text-neutral-400 text-sm mt-[2px]">{`(${typeRole})`}</span>
	</div>

	{#if !isUserLogged}
		<Dropdown>
			<DropdownItem>Agregar a otras salas</DropdownItem>
			{#if isAdmin}
				<DropdownItem
					on:click={() => {
						handleRemoveUser(sid);
					}}>Remover de la sala</DropdownItem
				>
				<DropdownItem>Hacer admnin</DropdownItem>
			{/if}
		</Dropdown>
	{/if}
</div>
