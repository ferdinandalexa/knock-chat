<script>
	import { getChatList } from '$services/chat';
	import { userLogged } from '$stores/session';
	import { chatList } from '$stores/chat';

	import RoomCard from '$components/room-card.svelte';

	/**@typedef {import('../types/Chat').Chat} Chat*/
	/**@type {Promise<any> | Array<Chat>}*/
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
		<RoomCard
			uniqueName={room.uniqueName}
			sid={room.sid}
			cover={room.attributes.cover || 'default'}
			{room}
		/>
	{/each}
{:else}
	{#await response}
		<p class="text-white">Waiting rooms...</p>
	{:then rooms}
		{#each rooms as room}
			<RoomCard
				uniqueName={room.uniqueName}
				sid={room.sid}
				cover={room.attributes.cover || 'default'}
				{room}
			/>
		{/each}
	{:catch error}
		<p class="text-white">{error}</p>
	{/await}
{/if}
