<script>
	import { supabase } from '$lib/supabase';
	import extractUserInfo from '$lib/extractUserInfo';

	import { userLogged, isLoggedIn } from '$stores/session';

	import Feed from '$containers/feed.svelte';
	import Login from '$containers/login.svelte';

	import '../app.css';

	/** @typedef {import('@supabase/supabase-js').Session | null} Session*/
	/** @type {Session}*/
	const session = supabase.auth.session();

	if (session != null) {
		$userLogged = extractUserInfo(session.user, session.access_token);
		if ($userLogged != null) $isLoggedIn = true;
	}

	supabase.auth.onAuthStateChange((event, session) => {
		if (event === 'SIGNED_IN' && session != null) {
			$userLogged = extractUserInfo(session?.user, session.access_token);
			$isLoggedIn = true;
		}

		if (event === 'SIGNED_OUT') {
			$userLogged = null;
			$isLoggedIn = false;
		}
	});
</script>

{#if !$userLogged}
	<Login />
{:else}
	<Feed />
{/if}
