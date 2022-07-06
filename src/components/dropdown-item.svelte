<script>
	/** @property {function}*/
	export let click = () => console.log('Hello, Peter!');
</script>

<button
	on:click={click}
	class="text-sm p-3 pt-3 flex flex-row items-center justify-start font-normal gap-2 w-full whitespace-no-wrap bg-transparent text-white"
>
	<slot />
</button>
