<script>
	import { signIn } from '$lib/OAuth';
	import IconGoogle from '$icons/icon-google.svelte';

	async function handleSignIn() {
		const host = window.location.origin;
		await signIn('google', `${host}/`);
	}
</script>

<button
	class="py-2 px-6 bg-neutral-100 text-neutral-600 rounded-full hover:bg-neutral-200 active:bg-neutral-100 transition-colors font-semibold w-full h-max flex flex-items items-center justify-center gap-2"
	on:click={handleSignIn}
>
	<IconGoogle />
	Iniciar sesión con Google
</button>
