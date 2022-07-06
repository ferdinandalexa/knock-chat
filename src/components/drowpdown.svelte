<script>
	import { createPopper } from '@popperjs/core';

	import IconMore from '$icons/icon-more.svelte';

	let dropdownPopoverShow = false;

	/**@type {HTMLButtonElement}*/
	let btnDropdownRef;
	/**@type {HTMLDivElement}*/
	let popoverDropdownRef;

	const toggleDropdown = () => {
		if (dropdownPopoverShow) {
			dropdownPopoverShow = false;
		} else {
			dropdownPopoverShow = true;
			createPopper(btnDropdownRef, popoverDropdownRef, {
				placement: 'bottom-start'
			});
		}
	};
</script>

<div class="flex flex-wrap">
	<div class="relative inline-flex align-middle w-full">
		<button
			class="text-neutral-200 w-10 h-10 rounded-full transition-colors flex items-center justify-center bg-transparent"
			bind:this={btnDropdownRef}
			on:click={toggleDropdown}
		>
			<IconMore width={18} height={18} />
		</button>
		<div
			bind:this={popoverDropdownRef}
			class="bg-neutral-700 text-base z-10 text-left rounded shadow-lg min-w-48 w-max {dropdownPopoverShow
				? 'block'
				: 'hidden'}"
		>
			<slot />
		</div>
	</div>
</div>
