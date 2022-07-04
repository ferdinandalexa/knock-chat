<script>
	import { goto } from '$app/navigation';

	import { signOut } from '$lib/OAuth';
	import { userLogged } from '../stores/session';
	import { getAccessToken } from '../services/user';

	import Button from '../components/button.svelte';
	import ButtonIcon from '../components/button-icon.svelte';
	import IconLogout from '../components/icons/icon-logout.svelte';

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
	<div class="flex flex-col gap-3 max-w-md mx-auto pt-4">
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
	</div>
{/if}
