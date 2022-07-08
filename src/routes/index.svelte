<script>
	import { onMount } from 'svelte';

	import { supabase } from '$lib/supabase';
	import extractUserInfo from '$lib/extractUserInfo';

	import { userLogged, isLoggedIn } from '$stores/session';

	import Feed from '$containers/feed.svelte';
	import Login from '$containers/login.svelte';

	import '../app.css';

	/** @typedef {import('@supabase/supabase-js').Session | null} Session*/

	/** @type {boolean}*/
	let isLoading = true;

	/** @type {Session}*/
	const session = supabase.auth.session();

	supabase.auth.onAuthStateChange((event, session) => {
		if (event === 'SIGNED_IN' && session != null) {
			$userLogged = extractUserInfo(session?.user, session.access_token);
			$isLoggedIn = true;
		}

		if (event === 'SIGNED_OUT') {
			$userLogged = null;
			$isLoggedIn = false;
		}

		isLoading = false;
	});

	onMount(() => {
		if (session != null) {
			$userLogged = extractUserInfo(session.user, session.access_token);
			if ($userLogged != null) $isLoggedIn = true;
		}

		isLoading = false;
	});
</script>

{#if !isLoading}
	{#if !$isLoggedIn}
		<Login />
	{:else}
		<Feed />
	{/if}
{/if}
