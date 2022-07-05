import { Client } from '@twilio/conversations';

/** @param {{ room: string, accessToken: string}} conversation*/
export const createOrJoinConversation = async ({ room, accessToken }) => {
	const client = new Client(accessToken);
	return new Promise(() => {
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
						console.log(e);
					}
				}

				conversation?.join();
			}
		});
	});
};
