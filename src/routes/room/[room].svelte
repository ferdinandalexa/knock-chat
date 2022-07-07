<script>
	import { goto } from '$app/navigation';
	import { browser } from '$app/env';

	import { activeConversation } from '$stores/chat';
	import { userLogged } from '$stores/session';
	import { deleteChat } from '$services/chat';

	import InfoGroup from '$containers/info-group.svelte';
	import ButtonIcon from '$components/button-icon.svelte';
	import Conversation from '$components/conversation.svelte';
	import ConversationInput from '$components/conversation-input.svelte';
	import RoomActions from '$components/room-actions.svelte';

	import IconChevRonLeft from '$icons/icon-chevron-left.svelte';

	/**@type {boolean}*/
	let showInfoGroup = false;

	function handleClick() {
		goto('/');
	}

	function handleInfoPanel() {
		showInfoGroup = !showInfoGroup;
	}

	function handleDelete() {
		if ($activeConversation != null && $userLogged != null) {
			deleteChat($userLogged?.chatToken, $activeConversation.sid).then(() => {
				$activeConversation = null;
				goto('/');
			});
		}
	}

	if (browser) {
		if (!$activeConversation) goto('/');
	}
</script>

{#if $activeConversation}
	<header class="flex flex-row justify-between items-center p-2	py-4">
		<div class="flex flex-row items-center">
			<ButtonIcon transparent click={handleClick}><IconChevRonLeft /></ButtonIcon>
			<h1 class="text-white text-lg font-semibold mb-[1px]">{$activeConversation.uniqueName}</h1>
		</div>
		<RoomActions {handleDelete} {handleInfoPanel} />
	</header>
	<div class="">
		<Conversation />
		<ConversationInput />
	</div>
	{#if showInfoGroup}
		<InfoGroup click={handleInfoPanel} />
	{/if}
{/if}
