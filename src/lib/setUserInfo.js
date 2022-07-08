import { userLogged, isLoggedIn } from '$stores/session';

/** @typedef {import('../types/User').User} User*/

/**
 * @param {User | null} userData
 * @param {boolean} loginState
 */
export function setUserInfo(userData, loginState) {
	userLogged.set(userData);
	isLoggedIn.set(loginState);
}
