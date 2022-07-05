<script>
	import { getChatList } from '../services/chat';
	import { userLogged } from '../stores/session';

	/**@type {Promise<any> | Array<import('@twilio/conversations').Conversation>}*/
	let response = [];

	let access_token;

	if ($userLogged != null) {
		access_token = $userLogged?.chatToken;
		response = getChatList(access_token).then((items) => {
			return items || [];
		});
	}
</script>

{#await response}
	<p class="text-white">Waiting rooms...</p>
{:then chat}
	{#each chat as { channelState, participants, sid }}
		<div
			class="flex flex-col gap-1 mb-4 p-4 pt-2 transition-colors hover:bg-neutral-800 rounded-md"
		>
			<h2 class="text-white font-semibold text-lg m-0">{channelState.uniqueName}</h2>
			<span class="text-white font-semibold text-xs">{participants.size} participantes</span>
		</div>
	{/each}
{:catch error}
	<p class="text-white">{error}</p>
	<!-- {console.log(error)} -->
{/await}
