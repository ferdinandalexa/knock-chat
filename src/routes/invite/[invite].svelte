<script>
	import { page } from '$app/stores';
	import { goto } from '$app/navigation';

	import { addParticipant, getConversation } from '$services/chat';
	import { userLogged } from '$stores/session';

	import { onMount } from 'svelte';

	import { supabase } from '$lib/supabase';
	import { getUserInfo } from '$lib/getUserInfo';
	import { setUserInfo } from '$lib/setUserInfo';

	import Button from '$components/button.svelte';

	import '../../app.css';

	/** @typedef {import('@supabase/supabase-js').Session | null} Session*/
	/** @typedef {import('@twilio/conversations').Conversation} Conversation*/

	/** @type {Session}*/
	const session = supabase.auth.session();

	supabase.auth.onAuthStateChange(async (event, session) => {
		if (event === 'SIGNED_IN' && session != null) await getUserInfo(session);

		if (event === 'SIGNED_OUT') setUserInfo(null, false);
	});

	/** @type {Promise<Conversation>}*/
	let conversation;

	onMount(async () => {
		if (session != null) {
			await getUserInfo(session);
		}

		if ($userLogged != null) {
			conversation = getConversation($userLogged?.chatToken, $page.params.invite);
			console.log(conversation);
		} else {
			goto('/');
		}
	});

	const roomSID = $page.params.invite;

	async function handleJoin() {
		if ($userLogged != null) {
			const accessToken = $userLogged?.chatToken;
			const username = $userLogged?.name;
			try {
				await addParticipant(accessToken, roomSID, username);
			} catch (e) {}
		}
		goto('/');
	}
</script>

<div class="h-full w-full grid place-content-center">
	{#await conversation}
		<span class="text-neutral-200">Loading...</span>
	{:then conversationGetted}
		{#if conversationGetted && conversationGetted.attributes}
			<h1 class="text-center w-full mx-auto text-white font-semibold text-4xl mb-10">
				No te pierdas la conversación
			</h1>
			<div class="flex flex-col w-full items-center justify-center gap-2 mb-8">
				<img
					src="/pictures/{conversationGetted.attributes.cover}.png"
					alt="{conversationGetted.attributes.cover} room picture"
					class="h-28 w-28 rounded-full"
				/>
				<h2 class="text-white text-xl font-semibold text-center -mb-1">
					{conversationGetted.uniqueName}
				</h2>
				<p class="text-white text-sm text-center">
					por {conversationGetted.createdBy}
				</p>
			</div>
			<Button on:click={handleJoin} css="w-max mx-auto">Unirse a la conversación</Button>
		{/if}
	{/await}
</div>
