<script>
	import { goto } from '$app/navigation';

	import { signOut } from '$lib/OAuth';
	import { userLogged } from '$stores/session';
	import { isOpenModal } from '$stores/modal';
	import { getAccessToken } from '$services/user';

	import RoomList from '$components/room-list.svelte';
	import ButtonIcon from '$components/button-icon.svelte';
	import IconLogout from '$components/icons/icon-logout.svelte';
	import IconPlus from '$components/icons/icon-plus.svelte';
	import ModalRoom from '$components/modal-room.svelte';

	import '../app.css';
	/**@type {Promise<string | undefined>}*/
	let response;

	if ($userLogged != null) {
		response = getAccessToken({ token: $userLogged.token }).then((token) => {
			if ($userLogged?.chatToken != null) {
				$userLogged.chatToken = token;
				return new Promise((resolve) => resolve('Get access token succesfully'));
			}
		});
	}

	function handleSignOut() {
		signOut();
		goto('/');
	}
</script>

<ModalRoom />
<div class="flex flex-col gap-3 max-w-md mx-auto p-4 h-full relative">
	<header class="flex flex-row gap-3 items-center justify-between">
		<div class="flex flex-row gap-3 items-center">
			<img class="rounded-full w-8" src={$userLogged?.avatar} alt="" />
			<span class="text-white text-lg">
				{$userLogged?.name}
			</span>
		</div>
		<ButtonIcon click={handleSignOut} transparent>
			<IconLogout width={20} height={20} />
		</ButtonIcon>
	</header>

	{#await response}
		<p class="text-white">Conectando...</p>
	{:then response}
		<div>
			<RoomList />
		</div>
		<ButtonIcon
			click={() => {
				$isOpenModal = true;
			}}
			css="absolute bottom-6 right-6"
		>
			<IconPlus />
		</ButtonIcon>
	{/await}
</div>
