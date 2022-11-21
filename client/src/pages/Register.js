import React, { useState } from "react";
import LoginIcon from "../icons/loginIcon.svg";
import { useRegister } from "../hooks/useRegister";
import { Link } from "react-router-dom";

const Register = () => {
  const { error, registerUser } = useRegister();

  const [UserData, setUserData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    await registerUser(UserData.username, UserData.email, UserData.password);
  };

  const saveData = (e) => {
    let name = e.target.name;
    let value = e.target.value;
    setUserData({ ...UserData, [name]: value });
  };

  return (
    <div className="layout__box">
      <div className="layout__boxHeader">
        <h3>Register</h3>
      </div>
      <div className="layout__body">
        <h2 className="auth__tagline">Find your study partner</h2>
        <form className="form" onSubmit={handleSubmit}>
          <div className=" form__group">
            <label for="email">Email</label>
            <input id="email" name="email" type="email" onChange={saveData} />
          </div>
          <div className=" form__group">
            <label for="username">Username</label>
            <input
              id="username"
              name="username"
              type="text"
              onChange={saveData}
            />
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
          <button className="btn btn--main" type="submit">
            <img src={LoginIcon} alt="login icon" />
            Register
          </button>
          {error && <div className="error">{error}</div>}
        </form>
        <div className="auth__action">
          <p>Already Signed up ?</p>
          <Link to="/login" className="btn btn--link">
            Login{" "}
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Register;
