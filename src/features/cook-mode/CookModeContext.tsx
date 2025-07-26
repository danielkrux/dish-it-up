import { createContext, useState } from "react";

const CookModeContext = createContext<{
  recipeSelectionIds: number[];
  setRecipeSelectionIds?: (ids: number[]) => void;
}>({
  recipeSelectionIds: [],
  setRecipeSelectionIds: () => {},
});

const CookModeProvider = ({ children }: { children: React.ReactNode }) => {
  const [recipeSelectionIds, setRecipeSelectionIds] = useState<number[]>([]);

  return (
    <CookModeContext.Provider
      value={{ recipeSelectionIds, setRecipeSelectionIds }}
    >
      {children}
    </CookModeContext.Provider>
  );
};

export default CookModeProvider;
