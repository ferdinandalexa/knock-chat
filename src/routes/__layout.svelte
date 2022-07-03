<script>
  import { goto } from "$app/navigation"
  import { browser } from '$app/env'

  import { supabase } from "$lib/supabase"
  import { authUser, isLoggedIn } from "../stores/session"

  $authUser = supabase.auth.user()
  if($authUser != null) $isLoggedIn = true

  supabase.auth.onAuthStateChange((event, session)=>{
    if(event === 'SIGNED_IN' && session != null){
      authUser.set(session?.user)
      isLoggedIn.set(true)
    }
      
    if(event === 'SIGNED_OUT'){
      authUser.set(null)
      isLoggedIn.set(false)
    }

    if(browser){
      if($isLoggedIn) { goto('/home') }
      else { goto('/') }
    }
  })
</script>

<slot />