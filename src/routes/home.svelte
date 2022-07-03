<script>
  import { goto } from "$app/navigation"

  import { signOut } from "$lib/OAuth";
  import { authUser } from "../stores/session"
  
  import Button from "../components/button.svelte"

  import '../app.css';

  function handleSignOut(){
    signOut();
    goto('/')
  }
</script>


{#if $authUser}
  <div class="flex flex-col gap-3 max-w-md mx-auto pt-4">
    <h1 class="text-white text-lg">
      {$authUser?.identities[0].identity_data.name}
    </h1>

    <Button click={handleSignOut}>Cerrar sesión</Button>
  </div>
{/if}