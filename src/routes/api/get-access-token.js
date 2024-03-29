import twilio from 'twilio';
import { supabase } from '$lib/supabase';

const TWILIO_ACCOUNT_SID = import.meta.env.VITE_PUBLIC_TWILIO_ACCOUNT_SID;
const TWILIO_API_KEY = import.meta.env.VITE_PUBLIC_TWILIO_API_KEY;
const TWILIO_API_KEY_SECRET = import.meta.env.VITE_PUBLIC_TWILIO_API_KEY_SECRET;
const TWILIO_SERVICE_SID = import.meta.env.VITE_PUBLIC_TWILIO_SERVICE_SID;

/**@typedef {import('@sveltejs/kit').RequestHandler} RequestHandler*/
/** @type {RequestHandler}*/
export async function GET({ request }) {
	const jwt = request.headers.get('jwt');

	if (jwt == null) return { status: 401 };

	const user = await supabase.auth.api.getUser(jwt);

	const identity = user.data?.user_metadata?.user_name || user.data?.user_metadata?.full_name;
	if (identity == null) return { status: 401 };

	const { AccessToken } = twilio.jwt;
	const { ChatGrant } = AccessToken;

	const accessToken = new AccessToken(TWILIO_ACCOUNT_SID, TWILIO_API_KEY, TWILIO_API_KEY_SECRET, {
		identity: identity
	});

	const conversationGrant = new ChatGrant({
		serviceSid: TWILIO_SERVICE_SID
	});

	accessToken.addGrant(conversationGrant);
	return {
		status: 200,
		body: {
			accessToken: accessToken.toJwt()
		}
	};
}
