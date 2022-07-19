<script>
	import { createEventDispatcher } from 'svelte';
	import { fly } from 'svelte/transition';

	import { activeConversation } from '$stores/chat';

	import Button from '$components/button.svelte';
	import ButtonIcon from '$components/button-icon.svelte';
	import PictureSelect from '$components/picture-select.svelte';

	import IconClose from '$icons/icon-close.svelte';
	import IconImage from '$icons/icon-image.svelte';

	const dispatch = createEventDispatcher();

	/**@type {string}*/
	let pictureSelected;

	const pictures = [
		{ cover: 'default' },
		{ cover: 'policia' },
		{ cover: 'hechizerx' },
		{ cover: 'furro' },
		{ cover: 'cientificx' },
		{ cover: 'botones' }
	];

	/**@type {string}*/
	let cover;

	if ($activeConversation != null && $activeConversation.attributes != null) {
		/**@ts-ignore*/
		cover = $activeConversation.attributes.cover;
	}

	function handleClick() {
		dispatch('close', { id: null });
	}

	async function handleChangePicture() {
		await $activeConversation?.updateAttributes({ cover: pictureSelected });
		dispatch('close', { id: null, changePicture: true, newPicture: pictureSelected });
	}
</script>

<div transition:fly={{ x: 200 }} class="w-full h-full top-0 left-0 fixed z-30 bg-neutral-700 p-4">
	<div class="grid-room max-w-md mx-auto">
		<header class="w-full flex flex-row justify-between text-neutral-200 items-center">
			<div class="flex flex-row gap-2 items-center ">
				<IconImage width={20} height={20} />
				<h2 class="font-semibold text-lg">Seleccionar imagen</h2>
			</div>
			<ButtonIcon on:click={handleClick} transparent>
				<IconClose width={20} height={20} />
			</ButtonIcon>
		</header>
		<div
			role="radiogroup"
			class="mt-4 flex flex-row w-full flex-wrap items-start justify-center gap-x-8"
		>
			<PictureSelect bind:pictureSelected {pictures} current={cover} />
		</div>
		<Button disabled={pictureSelected === cover} on:click={handleChangePicture}
			>Cambiar imagen</Button
		>
	</div>
</div>

<style>
	.grid-room {
		display: grid;
		min-height: 100%;
		grid-template-rows: max-content 1fr max-content;
	}
</style>
