import useDeleteGroceryItems from "./useDeleteGroceryList";
import useFetchGroceryList from "./useFetchGroceryList";

function useGroceryListMenu() {
  const groceries = useFetchGroceryList();
  const deleteMutation = useDeleteGroceryItems();

  function handleDelete(onlyCompleted = false) {
    const allIds = groceries.data?.map((g) => g.id);
    const completedIds = groceries.data
      ?.filter((g) => g.completed)
      .map((g) => g.id);

    if (!allIds || !completedIds) return;

    deleteMutation.mutate(onlyCompleted ? completedIds : allIds);
  }

  return { handleDelete };
}

export default useGroceryListMenu;
