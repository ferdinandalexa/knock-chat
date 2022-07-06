import { writable } from 'svelte/store';

/**
 * @typedef {import('@twilio/conversations').Conversation} Conversation
 * @typedef {import('svelte/store').Writable<Conversation | null>} StoreConversation
 * @typedef {import('svelte/store').Writable<Array<Conversation> | null>} StoreConversationArray
 */

/** @type {StoreConversationArray} */
export const chatList = writable(null);

/** @type {StoreConversation} */
export const activeConversation = writable(null);
