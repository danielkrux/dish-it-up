import { parse } from "https://esm.sh/node-html-parser@6.1.5";
import { Recipe as RecipeSchema } from "https://esm.sh/v128/schema-dts@1.1.2/dist/schema.js";
import { clean } from "./stringUtils.ts";

function parseHtmlToRecipeSchema(
  html: string
  // biome-ignore lint/suspicious/noExplicitAny: <explanation>
): Record<keyof RecipeSchema, any> {
  const root = parse(html);
  const jsonldItems = root.querySelectorAll(
    "script[type='application/ld+json']"
  );

  const recipeSchemaStr = jsonldItems.find((jsonld) => {
    return jsonld.innerHTML.search(new RegExp("recipeIngredient", "i")) !== -1;
  })?.innerHTML;

  if (!recipeSchemaStr) {
    throw new Error("Recipe JSON-LD not found in the HTML");
  }

  const cleanSchema = clean(recipeSchemaStr);

  let schema = JSON.parse(cleanSchema);

  if (Array.isArray(schema)) {
    schema = schema[0];
  }

  if (schema.recipeIngredient) {
    return schema;
  }

  if (!schema["@type"] || schema["@type"] !== "Recipe") {
    // get recipe if jsonld has @graph
    if (schema["@graph"]) {
      const recipe = schema["@graph"].find(
        // biome-ignore lint/suspicious/noExplicitAny: <explanation>
        (item: Record<string, any>) => item["@type"] === "Recipe"
      );
      if (recipe) {
        return recipe;
      }
    } else {
      throw new Error("Could not find recipe in JSON-LD");
    }
  }

  return schema;
}

export default parseHtmlToRecipeSchema;
