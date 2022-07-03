<script>
  import { signIn } from "$lib/OAuth";
  
  async function handleSignIn(){
    await signIn('google', 'http://localhost:3000/home');
  }

</script>

<button 
  class="py-2 px-6 bg-neutral-100 text-neutral-600 rounded-full hover:bg-neutral-200 active:bg-neutral-100 transition-colors font-semibold w-full h-max"
  on:click={handleSignIn}
>
  Iniciar sesión con Google
</button>