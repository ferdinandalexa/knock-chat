import { Client } from '@twilio/conversations';

/** @typedef {{ room: string, accessToken: string}} ConversationAccess*/
/** @param {ConversationAccess} conversation*/
export const createOrJoinConversation = async ({ room, accessToken }) => {
	const client = new Client(accessToken);
	return new Promise((resolve, reject) => {
		client.on('stateChanged', async (state) => {
			if (state === 'initialized') {
				let conversation;

				try {
					conversation = await client.createConversation({ uniqueName: room });
					await conversation.updateAttributes({
						cover: 'default'
					});
				} catch (e) {
					try {
						conversation = await client.getConversationByUniqueName(room);
					} catch (e) {
						reject(e);
					}
				}

				conversation?.join();
				resolve(conversation);
			}
		});
	});
};

/** @param {string} accessToken*/
export const getChatList = async (accessToken) => {
	const client = new Client(accessToken);
	const chatList = await client.getSubscribedConversations();
	return chatList.items;
};

/**
 * @param {string} accessToken
 * @param {string} sid
 */
export const deleteChat = async (accessToken, sid) => {
	const client = new Client(accessToken);
	const conversation = await client.getConversationBySid(sid);
	conversation.delete();
};

/**
 * @param {string} accessToken
 * @param {string} sid
 * @param {string} participantName
 */
export const addParticipant = async (accessToken, sid, participantName) => {
	const client = new Client(accessToken);
	const conversation = await client.getConversationBySid(sid);
	return conversation.add(participantName);
};

/**
 * @param {string} accessToken
 * @param {string} sid
 */
export const getConversation = async (accessToken, sid) => {
	const client = new Client(accessToken);
	const conversation = await client.getConversationBySid(sid);
	return conversation;
};
