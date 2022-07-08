import extractUserInfo from '$lib/extractUserInfo';
import { getAccessToken } from '$services/user';
import { setUserInfo } from './setUserInfo';

/** @typedef {import('@supabase/supabase-js').Session} Session*/
/** @typedef {import('../types/User').User} User*/

/**@param {Session} session*/
export async function getUserInfo(session) {
	const userData = extractUserInfo(session?.user, session.access_token);

	if (userData != null) {
		const token = await getAccessToken({ token: userData.token });
		if (userData?.chatToken != null) userData.chatToken = token;

		setUserInfo(userData, true);
	}
}
