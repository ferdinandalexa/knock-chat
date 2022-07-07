<script>
	/**@type {VoidFunction}*/
	export let handleDelete;

	/**@type {VoidFunction}*/
	export let handleInfoPanel;

	import Dropdown from '$components/drowpdown.svelte';
	import DropdownItem from '$components/dropdown-item.svelte';

	import IconLogout from '$icons/icon-logout.svelte';
	import IconInfo from '$icons/icon-info.svelte';
	import IconDelete from '$icons/icon-delete.svelte';
</script>

<Dropdown>
	<DropdownItem click={handleInfoPanel}>
		<IconInfo width={16} height={16} />Información del grupo
	</DropdownItem>
	<DropdownItem><IconLogout width={16} height={16} />Abandonar grupo</DropdownItem>
	<DropdownItem click={handleDelete}>
		<IconDelete width={16} height={16} />Eliminar
	</DropdownItem>
</Dropdown>
