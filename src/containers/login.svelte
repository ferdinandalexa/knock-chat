<script>
	import GithubAuth from '$components/github-auth.svelte';
	import GoogleAuth from '$components/google-auth.svelte';
	import Logo from '$icons/logo.svelte';
</script>

<section class="max-w-md mx-auto p-4 grid-room place-items-center">
	<div class="w-full">
		<div class="my-8">
			<figure class="w-60 mx-auto mb-2">
				<Logo css="ml-3" />
			</figure>
		</div>
		<div class="flex flex-col gap-3">
			<GithubAuth />
			<GoogleAuth />
		</div>
	</div>
	<footer class="mb-4">
		<h2 class="text-neutral-400 text-sm text-center mt-4 mb-1 font-bold">Disclaimer</h2>
		<p class="text-neutral-400 text-xs text-center">
			La app no cuenta con cifrado de punto a punto.
		</p>
		<p class="text-neutral-400 text-xs text-center">
			No compartas información importante o sensible.
		</p>
	</footer>
</section>

<style>
	.grid-room {
		display: grid;
		min-height: 100%;
		grid-template-rows: 1fr max-content;
	}
</style>
