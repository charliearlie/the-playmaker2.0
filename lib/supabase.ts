import { createClient } from "@supabase/supabase-js";

const client = createClient(
  "https://ytkceyrhlsdssobdlszi.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inl0a2NleXJobHNkc3NvYmRsc3ppIiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODYyNjA1MTQsImV4cCI6MjAwMTgzNjUxNH0.Kp5oHBzDUpUV3rgdpHIadU5ry34SPeWGSVdfZDvjExQ"
);

export const channel = client.channel("the-pm");
