
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://nmnvrlbshstwnrikgbqe.supabase.co'
const supabaseKey = process.env.SUPABASE_KEY

if (!supabaseKey) {
	throw new Error(
		'Missing SUPABASE_KEY. Add it to your environment before using the Supabase Client'
	)
}

const supabase = createClient(supabaseUrl, supabaseKey || '')

export {
	supabase
}
