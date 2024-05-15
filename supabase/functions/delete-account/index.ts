import { createClient } from "https://esm.sh/@supabase/supabase-js@2.42.5";
import type { Database } from "../../database.types.ts";
import { corsHeaders } from "../_shared/cors.ts";

Deno.serve(async (req) => {
  const supabaseUrl = Deno.env.get("SUPABASE_URL");
  const supabaseServiceRoleKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");

  const supabaseClient = createClient<Database>(
    supabaseUrl ?? "",
    supabaseServiceRoleKey ?? ""
  );

  const { userId } = await req.json();

  const { error } = await supabaseClient.auth.admin.deleteUser(userId);

  if (error) {
    return new Response(error.message, {
      status: 400,
      headers: { ...corsHeaders, "Content-Type": "text/plain" },
    });
  }

  return new Response();
});

/* To invoke locally:

  1. Run `supabase start` (see: https://supabase.com/docs/reference/cli/supabase-start)
  2. Make an HTTP request:

  curl -i --location --request POST 'http://127.0.0.1:54321/functions/v1/delete-account' \
    --header 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZS1kZW1vIiwicm9sZSI6ImFub24iLCJleHAiOjE5ODM4MTI5OTZ9.CRXP1A7WOeoJeXxjNni43kdQwgnWNReilDMblYTn_I0' \
    --header 'Content-Type: application/json' \
    --data '{"name":"Functions"}'

*/
