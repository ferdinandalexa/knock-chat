<script>
	/** @property {function} click*/
	export let click = () => console.log('Hello, Peter!');
	/**@type {string}*/
	export let css = '';
	/**@type {boolean}*/
	export let secondary = false;
</script>

<button
	class="flex flex-row gap-2 justify-center items-center px-6 py-2 rounded-md transition-colors border-2 {css} {secondary
		? 'bg-transparent border-blue-400 hover:blue-500 active:border-blue-600 text-blue-300'
		: 'text-white bg-blue-600  hover:bg-blue-700 active:bg-blue-800 border-transparent'}"
	on:click={click}
>
	<slot>Button</slot>
</button>
