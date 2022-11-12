import { useAuthContext } from "./useAuthContext";

export const useLogout = () => {
  const { dispatch } = useAuthContext();
  const logout = () => {
    //remove user from storga
    localStorage.removeItem("user");
    //dispatch logout acition
    dispatch({ type: "LOGOUT" });
  };
  return { logout };
};
