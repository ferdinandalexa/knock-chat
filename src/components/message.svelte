<script lang="ts">
	import { userLogged } from '../stores/session';

	/**@typedef {{ body: string; author: string; dateCreated: string}} Message*/
	/** @type {[Array<Message>}*/
	export let message;
	const { body, author, dateCreated } = message;

	const dateFormated = new Date(dateCreated).toLocaleDateString('es', {
		year: 'numeric',
		month: '2-digit',
		day: 'numeric',
		hour: '2-digit',
		minute: '2-digit'
	});

	let userOrigin = author === $userLogged?.name;
	let local = 'bg-blue-300 text-right self-end';
	let remote = 'bg-amber-200 text-left self-start';
</script>

<div class={`m-2 w-max max-w-[75%] py-2 px-3 rounded-md ${userOrigin ? local : remote}`}>
	<p class="text-black m-0 p-0 ">{body}</p>
	<time datetime={dateFormated} class="text-black opacity-40 text-xs">{dateFormated}</time>
</div>
