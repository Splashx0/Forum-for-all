import React, { useState } from "react";
import LoginIcon from "../icons/loginIcon.svg";
import { Link } from "react-router-dom";
import { useLogin } from "../hooks/useLogin";

const Login = () => {
  const { login, error } = useLogin();
  const [userData, setUserData] = useState({ email: "", password: "" });

  const handleSubmit = async (e) => {
    e.preventDefault();
    await login(userData.email, userData.password);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserData((prevData) => ({ ...prevData, [name]: value }));
  };

  return (
    <div className="layout__box">
      <div className="layout__boxHeader">
        <h3>Login</h3>
      </div>
      <div className="layout__body">
        <h2 className="auth__tagline">Find your study partner</h2>

        <form className="form" onSubmit={handleSubmit}>
          <div className="form__group">
            <label htmlFor="email">Email</label>
            <input
              id="email"
              name="email"
              type="email"
              value={userData.email}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="form__group">
            <label htmlFor="password">Password</label>
            <input
              id="password"
              name="password"
              type="password"
              value={userData.password}
              onChange={handleInputChange}
              required
            />
          </div>

          <button className="btn btn--main" type="submit">
            <img src={LoginIcon} alt="login icon" className="icon" />
            Login
          </button>
          {error && <div className="error">{error}</div>}
        </form>

        <div className="auth__action">
          <p>Haven't signed up yet?</p>
          <Link to="/register" className="btn btn--link">
            Sign Up
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
