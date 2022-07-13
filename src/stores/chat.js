import { writable } from 'svelte/store';

/**
 * @typedef {import('@twilio/conversations').Conversation} Conversation
 * @typedef {import('@twilio/conversations').Participant} Participant
 * @typedef {import('svelte/store').Writable<Conversation | null>} StoreConversation
 * @typedef {import('svelte/store').Writable<Array<Conversation> | null>} StoreConversationArray
 * @typedef {import('svelte/store').Writable<Array<{participant: Participant; typeRole: string}> | null>} StoreParticipantArray
 */

/** @type {StoreConversationArray} */
export const chatList = writable(null);

/** @type {StoreConversation} */
export const activeConversation = writable(null);

/** @type {StoreParticipantArray} */
export const participantsChat = writable(null);
