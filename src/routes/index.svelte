<script>
	import { onMount } from 'svelte';

	import { supabase } from '$lib/supabase';
	import { getUserInfo } from '$lib/getUserInfo';
	import { setUserInfo } from '$lib/setUserInfo';

	import { isLoggedIn } from '$stores/session';

	import Feed from '$containers/feed.svelte';
	import Login from '$containers/login.svelte';

	import '../app.css';

	/** @typedef {import('@supabase/supabase-js').Session | null} Session*/

	/** @type {boolean}*/
	let isLoading = true;

	/** @type {Session}*/
	const session = supabase.auth.session();

	supabase.auth.onAuthStateChange(async (event, session) => {
		if (event === 'SIGNED_IN' && session != null) await getUserInfo(session);

		if (event === 'SIGNED_OUT') setUserInfo(null, false);

		isLoading = false;
	});

	onMount(async () => {
		if (session != null) await getUserInfo(session);

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
