import { writable } from 'svelte/store';

/** @type {import('svelte/store').Writable<Array<import('@twilio/conversations').Conversation> | null>} */
export const chatList = writable(null);

/** @type {import('svelte/store').Writable<import('@twilio/conversations').Conversation>} */
export const activeConversation = writable();
