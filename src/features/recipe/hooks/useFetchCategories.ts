import { useQuery } from "@tanstack/react-query";
import { CATEGORIES_QUERY_KEY } from "~/features/app/app.constants";
import { getCategories } from "../recipe.service";

function useFetchCategories() {
  const { data, isLoading, isError } = useQuery(
    [CATEGORIES_QUERY_KEY],
    getCategories
  );

  return { data, isLoading, isError };
}

export default useFetchCategories;
