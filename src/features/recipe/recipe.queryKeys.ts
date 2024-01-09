const recipeKeys = {
  all: ["recipes"] as const,
  list: (filters?: string, order?: string) =>
    [...recipeKeys.all, { filters, order }] as const,
  detail: (id?: number) => [...recipeKeys.all, id] as const,
  lastMade: () => [...recipeKeys.all, "last-made"] as const,
};

export default recipeKeys;
