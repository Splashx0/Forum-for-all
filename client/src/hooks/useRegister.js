import { useAuthContext } from "./useAuthContext";
import { useState } from "react";

export const useRegister = () => {
  const [error, setError] = useState(null);
  const { dispatch } = useAuthContext();
  const registerUser = async (username, email, password) => {
    const response = await fetch("/api/user/register", {
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
      dispatch({ type: "LOGIN", payload: json });
    }
  };

  return { registerUser, error };
};
