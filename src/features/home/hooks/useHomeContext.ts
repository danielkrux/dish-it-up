import { useContext } from "react";
import { HomeContext } from "../HomeContext";

const useHomeContext = () => {
  const homeContext = useContext(HomeContext);

  if (!homeContext) {
    throw new Error(
      "useHomeContext has to be used within <HomeContext.Provider>"
    );
  }

  return homeContext;
};

export default useHomeContext;
