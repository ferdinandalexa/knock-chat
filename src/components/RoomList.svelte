<script>
	import extractChatInfo from '$lib/extractChatInfo';

	import { getChatList } from '../services/chat';
	import { userLogged } from '../stores/session';
	import { chatList } from '../stores/chat';

	/**@type {Promise<any> | Array<import('../types/Chat').Chat>}*/
	let response = [];

	/** @type {string}*/
	let access_token;

	if ($userLogged != null) {
		access_token = $userLogged?.chatToken;
		response = getChatList(access_token).then((items) => {
			$chatList = items.map((conversation) => extractChatInfo(conversation));
			return $chatList || [];
		});
	}
</script>

{#if $chatList != null}
	{#each $chatList as { uniqueName, sid }}
		<div class="flex flex-col p-4 pt-2 transition-colors hover:bg-neutral-800 rounded-md">
			<h2 class="text-white font-semibold text-lg m-0">{uniqueName}</h2>
		</div>
	{/each}
{:else}
	{#await response}
		<p class="text-white">Waiting rooms...</p>
	{:then chat}
		{#each chat as { uniqueName, sid }}
			<div class="flex flex-col p-4 pt-2 transition-colors hover:bg-neutral-800 rounded-md">
				<h2 class="text-white font-semibold text-lg m-0">{uniqueName}</h2>
			</div>
		{/each}
	{:catch error}
		<p class="text-white">{error}</p>
	{/await}
{/if}
