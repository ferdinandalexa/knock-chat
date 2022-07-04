<script>
	/** @property {function}*/
	export let click = () => console.log('Hello, Peter!');

	/** @type {boolean}*/
	export let transparent = false;

	/** @type {string}*/
	export let css = '';

	const bgColor = 'bg-blue-600 hover:bg-blue-700 active:bg-blue-800';
	const bgTransparent = 'bg-transparent hover:text-neutral-400 active:text-neutral-600';
</script>

<button
	class="text-neutral-200 w-10 h-10 rounded-full transition-colors flex items-center justify-center
  {transparent ? bgTransparent : bgColor} {css}"
	on:click={click}
>
	<slot />
</button>
