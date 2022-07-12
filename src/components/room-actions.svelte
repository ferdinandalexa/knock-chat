<script>
	import { goto } from '$app/navigation';

	import { activeConversation } from '$stores/chat';
	import { userLogged } from '$stores/session';
	import { deleteChat } from '$services/chat';

	import Dropdown from '$components/drowpdown.svelte';
	import DropdownItem from '$components/dropdown-item.svelte';
	import InfoPanel from '$containers/info-group.svelte';
	import ModalDeleteRoom from './modal-delete-room.svelte';

	import IconLogout from '$icons/icon-logout.svelte';
	import IconInfo from '$icons/icon-info.svelte';
	import IconDelete from '$icons/icon-delete.svelte';

	/**@typedef {import('svelte').SvelteComponent} SvelteComponent*/

	/**@type {SvelteComponent | null}*/
	let currentPanel = null;

	/**@type {Object.<string, any>}*/
	let panels = {
		'info-panel': InfoPanel,
		'modal-delete': ModalDeleteRoom
	};

	/**@param {CustomEvent} event*/
	function handlePanel(event) {
		currentPanel = panels[event.detail.id];
	}
</script>

<Dropdown>
	<DropdownItem on:click={handlePanel} id="info-panel">
		<IconInfo width={16} height={16} />Información del grupo
	</DropdownItem>
	<DropdownItem on:click={handlePanel} id="info-panel">
		<IconLogout width={16} height={16} />Abandonar grupo
	</DropdownItem>
	<DropdownItem on:click={handlePanel} id="modal-delete">
		<IconDelete width={16} height={16} />Eliminar
	</DropdownItem>
</Dropdown>

<svelte:component this={currentPanel} on:close={handlePanel} />
