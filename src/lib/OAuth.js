import { supabase } from './supabase';

/** @typedef {import('@supabase/supabase-js').Provider} Provider*/

/** 
  @param {Provider} provider
  @param {string} redirectTo
*/
export const signIn = async (provider, redirectTo) => {
	const { error } = await supabase.auth.signIn(
		{
			provider
		},
		{
			redirectTo
		}
	);

	if (error) console.error(error);
};

export const signOut = async () => {
	const { error } = await supabase.auth.signOut();

	if (error) console.error(error);
};
