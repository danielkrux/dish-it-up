import { serve } from "https://deno.land/std@0.177.0/http/server.ts";
import parseHtmlToRecipeSchema from "./parseHtmlToRecipeSchema.ts";
import parseSchemaToRecipe from "./parseSchemaToRecipe.ts";

serve(async (req) => {
	const { searchParams } = new URL(req.url);
	const url = searchParams.get("url");

	if (!url) {
		return new Response("URL is required", {
			headers: { "Content-Type": "text/plain" },
			status: 400,
		});
	}

	try {
		const response = await fetch(url);

		console.log("fetching the url...");
		const html = await response.text();

		const schema = parseHtmlToRecipeSchema(html);
		const recipe = parseSchemaToRecipe(schema);

		return new Response(JSON.stringify(recipe), {
			headers: { "Content-Type": "application/json" },
		});
	} catch (error) {
		console.error(error);
		return new Response(error.message, {
			headers: { "Content-Type": "text/plain" },
			status: 400,
		});
	}
});

// To invoke:
// curl -i --location --request POST 'http://localhost:54321/functions/v1/' \
//   --header 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZS1kZW1vIiwicm9sZSI6ImFub24iLCJleHAiOjE5ODM4MTI5OTZ9.CRXP1A7WOeoJeXxjNni43kdQwgnWNReilDMblYTn_I0' \
//   --header 'Content-Type: application/json' \
//   --data '{"name":"Functions"}'
