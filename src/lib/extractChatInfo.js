/** @typedef {import('@twilio/conversations').Conversation} Conversation*/
/**@typedef {import('../types/Chat').Chat} Chat*/

/** @param {Conversation} conversation*/
export default function extractChatInfo(conversation) {
	const { uniqueName, friendlyName, sid } = conversation;

	/** @type {Chat} */
	const chat = {
		uniqueName: uniqueName || friendlyName || sid,
		sid: sid
	};

	return chat;
}
