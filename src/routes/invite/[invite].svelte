<script>
	import { page } from '$app/stores';
	import { goto } from '$app/navigation';

	import { addParticipant } from '$services/chat';
	import { userLogged } from '$stores/session';

	import { onMount } from 'svelte';

	import { supabase } from '$lib/supabase';
	import { getUserInfo } from '$lib/getUserInfo';
	import { setUserInfo } from '$lib/setUserInfo';

	import Button from '$components/button.svelte';

	import '../../app.css';

	/** @typedef {import('@supabase/supabase-js').Session | null} Session*/

	/** @type {Session}*/
	const session = supabase.auth.session();

	supabase.auth.onAuthStateChange(async (event, session) => {
		if (event === 'SIGNED_IN' && session != null) await getUserInfo(session);

		if (event === 'SIGNED_OUT') setUserInfo(null, false);
	});

	onMount(async () => {
		if (session != null) await getUserInfo(session);
	});

	const roomSID = $page.params.invite;

	async function handleJoin() {
		if ($userLogged != null) {
			const accessToken = $userLogged?.chatToken;
			const username = $userLogged?.name;
			await addParticipant(accessToken, roomSID, username);
			goto('/');
		}
	}
</script>

<div class="h-full w-full grid place-items-center">
	<p class="text-white">{roomSID}</p>
	<Button on:click={handleJoin}>Unirse a la conversación</Button>
</div>
