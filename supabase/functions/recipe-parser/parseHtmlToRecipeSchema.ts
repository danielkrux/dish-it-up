import { clean } from "./stringUtils.ts";
import { parse } from "https://esm.sh/node-html-parser@6.1.5";
import { Recipe as RecipeSchema } from "https://esm.sh/v128/schema-dts@1.1.2/dist/schema.js";

function parseHtmlToRecipeSchema(
	html: string,
): Record<keyof RecipeSchema, any> {
	const root = parse(html);
	const jsonldItems = root.querySelectorAll(
		"script[type='application/ld+json']",
	);

	const recipeSchemaStr = jsonldItems.find((jsonld) => {
		return jsonld.innerHTML.search(new RegExp("recipeIngredient", "i")) !== -1;
	})?.innerHTML;

	if (!recipeSchemaStr) {
		throw new Error("Recipe schema not found");
	}

	const cleanSchema = clean(recipeSchemaStr);

	const schema = JSON.parse(cleanSchema);

	if (!schema["@type"] || schema["@type"] !== "Recipe") {
		// get recipe if jsonld has @graph
		if (schema["@graph"]) {
			const recipe = schema["@graph"].find(
				// deno-lint-ignore no-explicit-any
				(item: Record<string, any>) => item["@type"] === "Recipe",
			);
			if (recipe) {
				return recipe;
			}
		}

		throw new Error("Recipe schema not found");
	}

	return schema;
}

export default parseHtmlToRecipeSchema;
