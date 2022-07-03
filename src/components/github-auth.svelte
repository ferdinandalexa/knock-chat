<script>
  import { signIn } from "$lib/OAuth";

  async function handleSignIn(){
    await signIn('github', 'http://localhost:3000/home');
  }
</script>

<button 
  class="py-2 px-6 bg-zinc-700 text-white rounded-full hover:bg-zinc-600 active:bg-zinc-700 transition-colors font-semibold w-full h-max"
  on:click={handleSignIn}
>
  Iniciar sesión con GitHub
</button>