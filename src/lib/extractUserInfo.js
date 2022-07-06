/** @typedef {import('@supabase/supabase-js').User | null} SupabaseUserData*/
/**@typedef {import('../types/User').User | null} User*/

/**
 * @param {SupabaseUserData} userData
 * @param {string} accessToken
 * */
export default function extractUserInfo(userData, accessToken) {
	if (userData == null || userData?.identities == undefined) {
		return null;
	}

	const { avatar_url, user_name, full_name } = userData.user_metadata;

	/** @type {User} */
	const user = {
		name: user_name || full_name,
		avatar: avatar_url,
		token: accessToken,
		chatToken: ''
	};

	return user;
}
