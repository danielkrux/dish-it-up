import { useQuery } from "@tanstack/react-query";
import { getCategories } from "../recipe.service";

function useFetchCategories() {
  const { data, isLoading, isError } = useQuery(["categories"], () =>
    getCategories()
  );

  return { data, isLoading, isError };
}

export default useFetchCategories;
