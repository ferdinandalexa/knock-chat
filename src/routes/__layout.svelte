<script>
	import { goto } from '$app/navigation';
	import { browser } from '$app/env';

	import { supabase } from '$lib/supabase';
	import extractUserInfo from '$lib/extractUserInfo';
	import { userLogged, isLoggedIn } from '../stores/session';

	/** @type {import('@supabase/supabase-js').Session | null}*/
	const session = supabase.auth.session();

	if (session != null) {
		$userLogged = extractUserInfo(session.user, session.access_token);
		if ($userLogged != null) $isLoggedIn = true;
	}

	supabase.auth.onAuthStateChange((event, session) => {
		if (event === 'SIGNED_IN' && session != null) {
			$userLogged = extractUserInfo(session?.user, session.access_token);
			$isLoggedIn = true;
			goto('/home');
		}

		if (event === 'SIGNED_OUT') {
			$userLogged = null;
			$isLoggedIn = false;
			goto('/');
		}
	});

	if (browser) {
		if ($isLoggedIn) {
			goto('/home');
		} else {
			goto('/');
		}
	}
</script>

<slot />
