import React, { useState } from "react";
import LoginIcon from "../icons/loginIcon.svg";
import { useLogin } from "../hooks/useLogin";

const Login = () => {
  const { login, error } = useLogin();
  const [UserData, setUserData] = useState({
    email: "",
    password: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    await login(UserData.email, UserData.password);
  };

  const saveData = (e) => {
    let name = e.target.name;
    let value = e.target.value;
    setUserData({ ...UserData, [name]: value });
  };

  return (
    <div className="layout__box">
      <div className="layout__boxHeader">
        <h3>Login</h3>
      </div>
      <div className="layout__body">
        <h2 className="auth__tagline">Find your study partner</h2>

        <form className="form" method="post" onSubmit={handleSubmit}>
          <div className=" form__group">
            <label for="email">Email</label>
            <input id="email" name="email" type="text" onChange={saveData} />
          </div>
          <div className="form__group">
            <label for="password">Password</label>
            <input
              id="password"
              name="password"
              type="password"
              onChange={saveData}
            />
          </div>

          <button className="btn btn--main" onClick={Login} type="submit">
            <img src={LoginIcon} alt="login icon" />
            Login
          </button>
          {error && <div className="error">{error}</div>}
        </form>

        <div className="auth__action">
          <p>Haven't signed up yet?</p>
          <a href="/register" className="btn btn--link">
            Sign Up
          </a>
        </div>
      </div>
    </div>
  );
};

export default Login;
