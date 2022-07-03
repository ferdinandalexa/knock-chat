<script>
  /** @property {function} click*/
  export let click = () => console.log('Hello, Peter!'); 

</script>

<button class="text-white bg-blue-600 px-6 py-2 rounded-full" on:click={click}>
  <slot>Button</slot>
</button>