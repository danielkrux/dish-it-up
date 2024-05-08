import { SortOptionValue } from "../recipe/recipe.service";

export type HomeSearchParams = {
  q?: string;
  c?: string;
  s?: SortOptionValue;
  recipe?: string | undefined;
};
