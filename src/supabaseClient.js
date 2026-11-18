import 'react-native-url-polyfill/auto';
import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = 'https://vzbzlcfwvphbzgyaezco.supabase.co';
const SUPABASE_ANON_KEY = 'sb_publishable_5S3F77nsNM3JKQmUUobNvg_yGD1oc6q';

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);