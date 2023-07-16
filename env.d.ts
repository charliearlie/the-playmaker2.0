declare namespace NodeJS {
  export interface ProcessEnv {
    FRONTEND_URL: string;
    COOKIE_PASSWORD: string;
    NEXT_PUBLIC_SUPABASE_DB_PASSWORD: string;
    NEXT_PUBLIC_SUPABASE_DB_URI: string;
    DATABASE_URL: string;
    NEXT_PUBLIC_SUPABASE_ANON_KEY: string;
    NEXT_PUBLIC_SUPABASE_URL: string;
  }
}
