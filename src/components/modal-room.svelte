<script>
	import { isOpenModal } from '../stores/modal';
	import Button from './button.svelte';
</script>

{#if $isOpenModal}
	<div class="fixed grid h-full place-items-center w-full z-10 backdrop-brightness-50 p-4">
		<div class="bg-neutral-700 p-6 rounded-md w-full max-w-md">
			<form>
				<div class="flex flex-col gap-2">
					<label for="chat-name" class="text-base font-regular text-neutral-300">
						Nombre del grupo
					</label>
					<input
						type="text"
						name="chat-name"
						id="chat-name"
						placeholder="knock knock"
						class="bg-white appearance-none border-2 border-blue-200 rounded-md mb-2 w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-blue-400"
						required
					/>
					<div class="flex flex-row gap-2 w-full items-center justify-center">
						<Button css="flex-1">Crear grupo</Button>
						<Button
							click={() => {
								isOpenModal.set(false);
							}}
							css="flex-1"
							secondary>Regresar</Button
						>
					</div>
				</div>
			</form>
		</div>
	</div>
{/if}
