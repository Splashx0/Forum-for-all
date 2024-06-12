import  { useState } from "react";
import LoginIcon from "../icons/loginIcon.svg";

const Addtopic = () => {
  const [TopicName, setTopicName] = useState({ name: "" });

  const handleSubmit = (e) => {
    e.preventDefault();
    e.target.reset();
  };

  const saveTopic = (e) => {
    setTopicName({ name: e.target.value });
  };

  const Add = () => {
    fetch("/addtopic", {
      method: "POST",
      body: JSON.stringify(TopicName),
      headers: {
        "Content-type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => console.log(data.message))
      .catch((error) => console.log(error));
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
            <label for="Topic">Topic</label>
            <input id="Topic" name="topic" type="text" onChange={saveTopic} />
          </div>
          <button className="btn btn--main" onClick={Add} type="submit">
            <img src={LoginIcon} alt="login icon" />
            Add
          </button>
        </form>
      </div>
    </div>
  );
};

export default Addtopic;
