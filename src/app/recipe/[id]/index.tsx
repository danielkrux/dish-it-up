import { useLocalSearchParams, useRouter } from "expo-router";
import RecipeDetail from "~/features/recipe/components/RecipeDetail";

export default function RecipeDetailPage() {
	const { id } = useLocalSearchParams();
	const router = useRouter();

	function handleDelete() {
		router.push("/");
	}
	return <RecipeDetail id={Number(id)} onDelete={handleDelete} />;
}
