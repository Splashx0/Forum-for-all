import { useState } from "react";
import { useDispatch } from "react-redux";
import { loginUser } from "../redux/actions/userActions";

export const useLogin = () => {
  const dispatch = useDispatch();
  const [error, setError] = useState(null);
  
  const login = async (email, password) => {
    const response = await fetch("/api/user/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });
    const json = await response.json();
    if (!response.ok) {
      setError(json.error);
    }
    if (response.ok) {
      //save the user to local storage
      localStorage.setItem("user", JSON.stringify(json));
      //update the global state
      dispatch(loginUser(json));
    }
  };

  return { login, error };
};
