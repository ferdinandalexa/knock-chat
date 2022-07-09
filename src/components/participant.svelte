<script>
	import { userLogged } from '$stores/session';
	import { activeConversation } from '$stores/chat';

	import Dropdown from '$components/drowpdown.svelte';
	import DropdownItem from '$components/dropdown-item.svelte';

	/**@type {string | null}*/
	export let identity;

	/**@type {boolean}*/
	export let isUserLogged = false;
	if ($userLogged) isUserLogged = $userLogged.name === identity;
	/**@type {string}*/
	export let sid;

	/**@param {string} userSID*/
	async function handleRemoveUser(userSID) {
		if ($activeConversation != null) {
			await $activeConversation.removeParticipant(userSID);
		}
	}
</script>

<div class="flex flex-row justify-between items-center min-h-[3rem]">
	<div class="flex flex-row gap-1 items-center mb-1">
		<span class="text-white text-base ">{identity}</span>
		<span class="text-neutral-400 text-sm mt-[2px]">{isUserLogged ? '( You )' : ''}</span>
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
