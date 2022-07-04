/**
 * @param {import('@supabase/supabase-js').User | null} userData
 * @param {string} accessToken
 * */
export default function extractUserInfo(userData, accessToken) {
	if (userData == null || userData?.identities == undefined) {
		return null;
	}

	const { provider, identity_data } = userData.identities[0];

	/** @type {import('../types/User').User | null} */
	let user = null;

	if (provider === 'google') {
		user = {
			name: identity_data?.name,
			avatar: identity_data?.avatar_url,
			token: accessToken,
			chat_token: ''
		};
	}

	if (provider === 'github') {
		user = {
			name: identity_data?.user_name,
			avatar: identity_data?.avatar_url,
			token: accessToken,
			chat_token: ''
		};
	}

	return user;
}
