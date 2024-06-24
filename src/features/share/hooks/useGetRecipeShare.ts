import { useQuery } from "@tanstack/react-query";
import Toast from "react-native-toast-message";
import { getRecipeShare } from "../share.service";

function useGetRecipeShare(id: number) {
  const { data, isLoading, isError } = useQuery(
    ["share", id],
    () => getRecipeShare(id),
    {
      enabled: !!id,
    }
  );

  if (isError) {
    console.error("Error getting recipe share", isError);
    Toast.show({
      type: "error",
      text1: "Error",
      text2: "This link is expired, ask the owner to share it again.",
    });
  }

  return { data, isLoading, isError };
}

export default useGetRecipeShare;
