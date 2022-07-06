// /**
//  * @param {{
//  * uniqueName: string,
//  * participants: Array<import('@twilio/conversations').Participant>,
//  * sid: string}} conversation
//  * */
/**
 * @param {import('@twilio/conversations').Conversation} conversation
 * */
export default function extractChatInfo(conversation) {
	const { uniqueName, sid } = conversation;

	/** @type {import('../types/Chat').Chat} */
	const chat = {
		uniqueName: uniqueName,
		sid: sid
	};

	return chat;
}
