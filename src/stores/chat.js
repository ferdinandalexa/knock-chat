import { writable } from 'svelte/store';

/** @type {import('svelte/store').Writable<Array<import('../types/Chat').Chat> | null>} */
export const chatList = writable(null);
