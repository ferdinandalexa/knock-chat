<script>
	import { browser } from '$app/env';
	import { goto } from '$app/navigation';

	import { isLoggedIn } from '../stores/session';

	import GithubAuth from '../components/github-auth.svelte';
	import GoogleAuth from '../components/google-auth.svelte';

	import '../app.css';

	if (browser) {
		if ($isLoggedIn) {
			goto('/home');
		} else {
			goto('/');
		}
	}
</script>

<div class="flex flex-col gap-3 max-w-md mx-auto pt-4">
	<GithubAuth />
	<GoogleAuth />
</div>
