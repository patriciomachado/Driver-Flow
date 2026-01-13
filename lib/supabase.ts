
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://kniqdsfzrfuebwfayaft.supabase.co';
// Chave anon public atualizada conforme fornecido
const supabaseAnonKey = 'sb_publishable_gAgdL76kprbuNbzJz0zS_g_xNFTciMS'; 

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
