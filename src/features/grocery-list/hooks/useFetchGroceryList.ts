import { useQuery } from "@tanstack/react-query";
import { GROCERY_LIST_QUERY_KEY } from "~/features/app/app.constants";
import { fetchGroceryList } from "../groceryList.service";

function useFetchGroceryList() {
  const groceryListQuery = useQuery([GROCERY_LIST_QUERY_KEY], fetchGroceryList);

  return groceryListQuery;
}

export default useFetchGroceryList;
