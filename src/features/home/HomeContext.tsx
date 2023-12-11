import { createContext, useState } from "react";

type HomeContext = {
	recipeId?: number;
	setRecipeId: (recipeId?: number) => void;
};

export const HomeContext = createContext<HomeContext>({
	recipeId: undefined,
	setRecipeId: () => {},
});

const HomeProvider = ({ children }: { children: React.ReactNode }) => {
	const [recipeId, setRecipeId] = useState<number | undefined>(undefined);

	return (
		<HomeContext.Provider value={{ recipeId, setRecipeId }}>
			{children}
		</HomeContext.Provider>
	);
};

export default HomeProvider;
