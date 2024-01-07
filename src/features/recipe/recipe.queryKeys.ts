const recipeKeys = {
  all: ["recipes"] as const,
  list: (filters?: string) => [...recipeKeys.all, { filters }] as const,
  detail: (id?: number) => [...recipeKeys.all, id] as const,
  lastMade: () => [...recipeKeys.all, "last-made"] as const,
};

export default recipeKeys;
