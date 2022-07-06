<script>
	import extractChatInfo from '$lib/extractChatInfo';

	import { getChatList } from '../services/chat';
	import { userLogged } from '../stores/session';
	import { chatList } from '../stores/chat';

	import RoomCard from './RoomCard.svelte';

	/**@type {Promise<any> | Array<import('../types/Chat').Chat>}*/
	let response = [];

	/** @type {string}*/
	let access_token;

	if ($userLogged != null) {
		access_token = $userLogged?.chatToken;
		response = getChatList(access_token).then((items) => {
			$chatList = items;
			return $chatList || [];
		});
	}
</script>

{#if $chatList != null}
	{#each $chatList as room}
		<RoomCard uniqueName={room.uniqueName} sid={room.sid} {room} />
	{/each}
{:else}
	{#await response}
		<p class="text-white">Waiting rooms...</p>
	{:then rooms}
		{#each rooms as room}
			<RoomCard uniqueName={room.uniqueName} sid={room.sid} {room} />
		{/each}
	{:catch error}
		<p class="text-white">{error}</p>
	{/await}
{/if}
