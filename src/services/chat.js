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
				} catch (e) {
					try {
						conversation = await client.getConversationByUniqueName(room);
						console.log(conversation);
					} catch (e) {
						reject(e);
					}
				}

				resolve(conversation);
				conversation?.join();
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
