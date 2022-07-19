<script>
	import { goto } from '$app/navigation';

	import { signOut } from '$lib/OAuth';
	import { userLogged } from '$stores/session';

	import RoomList from '$components/room-list.svelte';
	import ButtonIcon from '$components/button-icon.svelte';
	import IconLogout from '$components/icons/icon-logout.svelte';
	import IconPlus from '$components/icons/icon-plus.svelte';
	import ModalRoom from '$components/modal-add-room.svelte';

	import '../app.css';

	/**@typedef {import('svelte').SvelteComponent} SvelteComponent*/

	/**@type {SvelteComponent | null}*/
	let currentModal = null;

	/**@type {Object.<string, any>}*/
	let panels = {
		'modal-add': ModalRoom
	};

	/**@param {CustomEvent} event*/
	function handleModal(event) {
		currentModal = panels[event.detail.id];
	}

	function handleSignOut() {
		signOut();
		goto('/');
	}
</script>

<svelte:component this={currentModal} on:close={handleModal} />

<div class="flex flex-col gap-3 max-w-md mx-auto p-4 h-full relative">
	<header class="flex flex-row gap-3 items-center justify-between">
		<div class="flex flex-row gap-3 items-center">
			<img
				class="rounded-full w-8"
				src={$userLogged?.avatar}
				alt="{$userLogged?.name} profile picture"
				referrerpolicy="no-referrer"
			/>
			<span class="text-white text-lg">
				{$userLogged?.name}
			</span>
		</div>
		<ButtonIcon on:click={handleSignOut} transparent>
			<IconLogout width={20} height={20} />
		</ButtonIcon>
	</header>

	<div>
		<RoomList />
	</div>
	<ButtonIcon on:click={handleModal} id="modal-add" css="absolute bottom-6 right-6">
		<IconPlus />
	</ButtonIcon>
</div>
