<script>
	import { goto } from '$app/navigation';

	import { activeConversation } from '$stores/chat';
	import { userLogged } from '$stores/session';
	import { deleteChat } from '$services/chat';

	import Button from '$components/button.svelte';
</script>

<Button>Unirse a la conversación</Button>
