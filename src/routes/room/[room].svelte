<script>
	import { onMount, setContext } from 'svelte';
	import { goto } from '$app/navigation';

	import { setParticipants } from '$lib/setParticipants';
	import { activeConversation, participantsChat } from '$stores/chat';
	import { userLogged } from '$stores/session';

	import ButtonIcon from '$components/button-icon.svelte';
	import Conversation from '$components/conversation.svelte';
	import ConversationInput from '$components/conversation-input.svelte';
	import RoomActions from '$components/room-actions.svelte';

	import IconChevRonLeft from '$icons/icon-chevron-left.svelte';

	if ($userLogged != null) {
		const isAdmin = $activeConversation?.createdBy === $userLogged.name;
		setContext('admin', { isAdmin });
	}

	$activeConversation?.getParticipants().then((gettedParticipants) => {
		setParticipants(gettedParticipants);
	});

	function handleClick() {
		goto('/');
	}

	onMount(() => {
		if (!$activeConversation) goto('/');
	});
</script>

{#if $activeConversation}
	<div class="max-h-screen grid-room max-w-md mx-auto">
		<header class="flex flex-row justify-between items-center p-2	py-4">
			<div class="flex flex-row items-center">
				<ButtonIcon transparent on:click={handleClick}><IconChevRonLeft /></ButtonIcon>
				<h1 class="text-white text-lg font-semibold mb-[1px]">
					{$activeConversation.uniqueName}
				</h1>
			</div>
			<RoomActions />
		</header>
		<Conversation />
		<ConversationInput />
	</div>
{/if}

<style>
	.grid-room {
		display: grid;
		min-height: 100%;
		grid-template-rows: max-content 1fr max-content;
	}
</style>
