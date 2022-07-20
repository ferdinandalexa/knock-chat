<script>
	import { page } from '$app/stores';

	import Button from '$components/button.svelte';

	import IconCopy from '$icons/icon-copy.svelte';
	import IconCheck from '$icons/icon-check.svelte';

	/**@type {string | undefined}*/
	export let sid;

	/**@type {HTMLTextAreaElement}*/
	let textarea;

	let isCopied = false;

	let inviteLink = `${$page.url.origin}/invite/${sid}`;
	const shortLink = `/invite/${sid}`;

	function handleCopy() {
		textarea.select();
		isCopied = document.execCommand('copy');
	}
</script>

<section class="mt-4 pt-4">
	<h4 class="text-neutral-400 font-semibold mb-1">O envía un enlace de invitación</h4>
	<div
		on:click
		class="p-1 pl-1 text-neutral-400 text-sm rounded-md bg-neutral-800/50 grid gap-2 grid-cols-[1px_1fr_max-content] items-center"
	>
		<textarea bind:this={textarea} class="opacity-0">{inviteLink}</textarea>
		<p class="text-ellipsis overflow-hidden h-4 mb-1">{shortLink}</p>
		<Button
			on:click={handleCopy}
			css={isCopied ? 'bg-green-600 hover:bg-green-700 active:bg-green-800' : ''}
		>
			{#if isCopied}
				<IconCheck width={22} height={22} /> Copiado
			{:else}
				<IconCopy /> Copiar
			{/if}
		</Button>
	</div>
</section>
