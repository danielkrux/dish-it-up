import { useContext } from "react";
import { AuthContext } from "../AuthContext";

const useAuth = () => {
  const authContext = useContext(AuthContext);

  if (!authContext) {
    throw new Error("useAuth has to be used within <AuthContext.Provider>");
  }

  return authContext;
};

export default useAuth;
