import { writable } from "svelte/store";

/** @type {import('svelte/store').Writable<import('../types/User').User | null>} */
export const userLogged = writable(null);

/** @type {import('svelte/store').Writable<boolean>} */
export const isLoggedIn = writable(false);