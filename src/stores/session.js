import { writable } from "svelte/store";

/** @type {import('svelte/store').Writable<import('@supabase/supabase-js').User | null >} */
export const authUser = writable();

/** @type {import('svelte/store').Writable<boolean>} */
export const isLoggedIn = writable(false);