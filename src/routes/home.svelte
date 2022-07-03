<script>
  import { goto } from "$app/navigation"

  import { signOut } from "$lib/OAuth";
  import { userLogged } from "../stores/session"
  
  import Button from "../components/button.svelte"

  import '../app.css';

  function handleSignOut(){
    signOut();
    goto('/')
  }
</script>


{#if $userLogged}
  <div class="flex flex-col gap-3 max-w-md mx-auto pt-4">
    <div class="flex flex-row gap-3 items-center">
      <img class="rounded-full w-8" src={$userLogged?.avatar} alt="">
      <span class="text-white text-lg">
        {$userLogged?.name}
      </span>
    </div>
    <Button click={handleSignOut}>Cerrar sesión</Button>
  </div>
{/if}