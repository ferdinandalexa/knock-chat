/**
 * @param {import('@supabase/supabase-js').User | null} userData
 * @param {string} accessToken
 * */
export default function extractUserInfo(userData, accessToken) {
	if (userData == null || userData?.identities == undefined) {
		return null;
	}

	const { avatar_url, user_name } = userData.user_metadata;

	/** @type {import('../types/User').User | null} */
	const user = {
		name: user_name,
		avatar: avatar_url,
		token: accessToken,
		chatToken: ''
	};

	return user;
}
