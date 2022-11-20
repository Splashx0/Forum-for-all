import { useDispatch } from "react-redux";
import { logoutUser } from "../redux/actions/userActions";

export const useLogout = () => {
  const dispatch = useDispatch();
  const logout = () => {
    //remove user from storga
    localStorage.removeItem("user");
    //dispatch logout action
    dispatch(logoutUser());
  };
  return { logout };
};
