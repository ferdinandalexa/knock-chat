<script>
	import GithubAuth from '$components/github-auth.svelte';
	import GoogleAuth from '$components/google-auth.svelte';
</script>

<div class="flex flex-col gap-3 max-w-md mx-auto p-4">
	<GithubAuth />
	<GoogleAuth />
</div>
