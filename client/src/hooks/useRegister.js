import { useState } from "react";
import { useDispatch } from "react-redux";
import { loginUser } from "../redux/actions/userActions";

export const useRegister = () => {
  const dispatch = useDispatch();
  const [error, setError] = useState(null);
  const registerUser = async (username, email, password) => {
    const response = await fetch("https://it-forum.vercel.app/api/user/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, email, password }),
    });
    const json = await response.json();
    if (!response.ok) {
      setError(json.error);
    }
    if (response.ok) {
      //save the user to local storage
      localStorage.setItem("user", JSON.stringify(json));
      //update the authContext state
      dispatch(loginUser(json));
    }
  };

  return { registerUser, error };
};
