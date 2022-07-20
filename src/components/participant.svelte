<script>
	import { getContext } from 'svelte';

	import { userLogged } from '$stores/session';
	import { activeConversation, participantsChat } from '$stores/chat';

	import PanelRooms from '$containers/panel-rooms.svelte';

	import Dropdown from '$components/drowpdown.svelte';
	import DropdownItem from '$components/dropdown-item.svelte';

	/**@typedef {import('svelte').SvelteComponent} SvelteComponent*/

	/**@type {string}*/
	export let sid;

	/**@type {string | null}*/
	export let identity;

	/**@type {string}*/
	export let typeRole = 'user';

	let isUserLogged = false;
	if ($userLogged) isUserLogged = $userLogged.name === identity;

	/**@type {SvelteComponent | null}*/
	let currentPanel = null;

	/**@type {Object.<string, any>}*/
	let panels = {
		'other-rooms': PanelRooms
	};

	/**@param {CustomEvent} event*/
	function handlePanel(event) {
		currentPanel = panels[event.detail.id];
	}

	let { isAdmin } = getContext('admin');

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

	<svelte:component this={currentPanel} on:close={handlePanel} participant={identity} />

	{#if !isUserLogged}
		<Dropdown>
			<DropdownItem on:click={handlePanel} id="other-rooms">Agregar a otras salas</DropdownItem>
			{#if isAdmin}
				<DropdownItem
					on:click={() => {
						handleRemoveUser(sid);
					}}>Remover de la sala</DropdownItem
				>
			{/if}
		</Dropdown>
	{/if}
</div>
