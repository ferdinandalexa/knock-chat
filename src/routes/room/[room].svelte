<script>
	import { goto } from '$app/navigation';
	import { browser } from '$app/env';

	import { activeConversation } from '$stores/chat';
	import { userLogged } from '$stores/session';
	import { deleteChat } from '$services/chat';

	import ButtonIcon from '$components/button-icon.svelte';
	import Dropdown from '$components/drowpdown.svelte';
	import DropdownItem from '$components/dropdown-item.svelte';
	import Conversation from '$components/conversation.svelte';
	import ConversationInput from '$components/conversation-input.svelte';

	import IconChevRonLeft from '$components/icons/icon-chevron-left.svelte';
	import IconLogout from '$components/icons/icon-logout.svelte';
	import IconInfo from '$components/icons/icon-info.svelte';
	import IconDelete from '$components/icons/icon-delete.svelte';

	function handleClick() {
		goto('/');
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
		<Dropdown>
			<DropdownItem><IconInfo width={16} height={16} />Información del grupo</DropdownItem>
			<DropdownItem><IconLogout width={16} height={16} />Abandonar grupo</DropdownItem>
			<DropdownItem click={handleDelete}>
				<IconDelete width={16} height={16} />Eliminar
			</DropdownItem>
		</Dropdown>
	</header>
	<div class="">
		<Conversation />
		<ConversationInput />
	</div>
{/if}
