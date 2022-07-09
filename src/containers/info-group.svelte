<script>
	import { createEventDispatcher } from 'svelte';
	import { fly } from 'svelte/transition';

	import { activeConversation } from '$stores/chat';

	import Button from '$components/button.svelte';
	import ButtonIcon from '$components/button-icon.svelte';
	import ParticipantsList from '$components/participants-list.svelte';
	import IconClose from '$icons/icon-close.svelte';
	import IconInfo from '$icons/icon-info.svelte';

	const dispatch = createEventDispatcher();

	function handleClick() {
		dispatch('close', { id: null });
	}

	const participants = $activeConversation?.getParticipants();
</script>

<div transition:fly={{ x: 200 }} class="w-full h-full top-0 left-0 fixed z-20 bg-neutral-700 p-4">
	<header class="w-full flex flex-row justify-between text-neutral-200 items-center">
		<div class="flex flex-row gap-2 items-center ">
			<IconInfo width={20} height={20} />
			<h2 class="font-semibold text-lg">{$activeConversation?.uniqueName}</h2>
		</div>
		<ButtonIcon on:click={handleClick} transparent>
			<IconClose width={20} height={20} />
		</ButtonIcon>
	</header>
	{#await participants}
		Loading...
	{:then participants}
		<ParticipantsList {participants} />
	{/await}
	<footer class="absolute bottom-0 w-full left-0 p-4">
		<Button secondary css="w-full">Eliminar chat</Button>
	</footer>
</div>
