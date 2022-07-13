import { participantsChat } from '$stores/chat';

/** @typedef {import('@twilio/conversations').Participant} Participant */

/**@type {Object.<string, string>}*/
const CHANNEL_ROLES = {
	RLd99d2b0613b543d5ae0c3811f0732332: 'admin',
	RL7fa444ed98a646ca9f945286a6077f93: 'user'
};

/**@param {Participant[]} participants*/
export function setParticipants(participants) {
	const participantsFormatted = participants.map((participant) => {
		const typeRole = CHANNEL_ROLES[participant.roleSid];
		return {
			participant,
			typeRole
		};
	});

	participantsChat.set(participantsFormatted);
}
