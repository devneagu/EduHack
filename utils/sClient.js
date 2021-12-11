import { createClient } from '@supabase/supabase-js'

const sUrl = process.env.NEXT_PUBLIC_URL
const sAnonKey = process.env.NEXT_PUBLIC_ANON_KEY

export const base = createClient(sUrl, sAnonKey)
