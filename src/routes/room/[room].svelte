<script>
	import { goto } from '$app/navigation';
	import { browser } from '$app/env';

	import { activeConversation } from '../../stores/chat';

	import ButtonIcon from '../../components/button-icon.svelte';
	import IconChevRonLeft from '../../components/icons/icon-chevron-left.svelte';
	import Conversation from '../../components/conversation.svelte';
	import ConversationInput from '../../components/conversation-input.svelte';

	function handleClick() {
		goto('/');
	}

	if (browser) {
		if (!$activeConversation) goto('/');
	}
</script>

{#if $activeConversation}
	<div class="flex flex-row gap-1 p-4 items-center">
		<ButtonIcon transparent click={handleClick}><IconChevRonLeft /></ButtonIcon>
		<h1 class="text-white text-lg font-semibold mb-[1px]">{$activeConversation.uniqueName}</h1>
	</div>
	<div class="">
		<Conversation />
		<ConversationInput />
	</div>
{/if}
