/** @param {import('@supabase/supabase-js').User} userData*/
export default function extractUserInfo(userData){
  const {
    user_name,
  } = userData?.identities[0].identity_data

  return { user_name }
}