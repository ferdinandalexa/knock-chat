<script>
	import { goto } from '$app/navigation';

	import { signOut } from '$lib/OAuth';
	import { userLogged } from '../stores/session';
	import { isOpenModal } from '../stores/modal';
	import { getAccessToken } from '../services/user';

	import ButtonIcon from '../components/button-icon.svelte';
	import IconLogout from '../components/icons/icon-logout.svelte';
	import IconPlus from '../components/icons/icon-plus.svelte';
	import ModalRoom from '../components/modal-room.svelte';

	import '../app.css';
	import { onMount } from 'svelte';

	function handleSignOut() {
		signOut();
		goto('/');
	}

	onMount(async () => {
		if ($userLogged != null) {
			$userLogged.chat_token = await getAccessToken($userLogged);
		}
	});
</script>

{#if $userLogged}
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
		<ButtonIcon
			click={() => {
				$isOpenModal = true;
			}}
			css="absolute bottom-6 right-6"
		>
			<IconPlus />
		</ButtonIcon>
	</div>
{/if}
