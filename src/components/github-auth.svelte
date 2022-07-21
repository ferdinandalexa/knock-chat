<script>
	import { page } from '$app/stores';

	import { signIn } from '$lib/OAuth';

	import IconGithub from '$icons/icon-github.svelte';

	async function handleSignIn() {
		const host = $page.url.origin;
		await signIn('github', `${host}/#`);
	}
</script>

<button
	class="py-2 px-6 bg-zinc-700 text-white rounded-full hover:bg-zinc-600 active:bg-zinc-700 transition-colors font-semibold w-full h-max flex flex-row items-center justify-center gap-2"
	on:click={handleSignIn}
>
	<IconGithub width={22} height={22} /> Iniciar sesión con GitHub
</button>
