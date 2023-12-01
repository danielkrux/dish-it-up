import { useQuery } from "@tanstack/react-query";
import { fetchGroceryList } from "../groceryList.service";

function useFetchGroceryList() {
	const groceryListQuery = useQuery(["groceryList"], fetchGroceryList);

	return groceryListQuery;
}

export default useFetchGroceryList;
