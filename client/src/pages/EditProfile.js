import React, { useState } from "react";
import BackIcon from "../icons/backIcon.svg";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const EditProfile = () => {
  const { user } = useSelector((state) => state.userReducer);
  const { id } = useParams();
  const navigate = useNavigate();
  const [bio, setBio] = useState("");
  const [file, setFile] = useState();

  const onChangeFile = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("avatar", file ? file : file);
    formData.append("bio", bio ? bio : "write something");
    const response = await fetch(`/api/profile/${id}/edit`, {
      method: "POST",
      headers: { Authorization: `Bearer ${user.token}` },
      body: formData,
    });
  };
  return (
    <main className="update-account layout">
      <div className="container">
        <div className="layout__box">
          <div className="layout__boxHeader">
            <div className="layout__boxTitle d-flex  ">
              <div
                onClick={() => {
                  navigate(-1);
                }}
              >
                <img src={BackIcon} alt="go back" />
              </div>

              <h3 className="p-0 m-0">Edit your profile</h3>
            </div>
          </div>
          <div className="layout__body">
            <form className="form" onSubmit={handleSubmit}>
              <div className="form__group">
                <label htmlFor="profile_pic">Avatar</label>
                <input type="file" name="avatar" onChange={onChangeFile} />
              </div>
              <div className="form__group">
                <label htmlFor="room">Bio </label>
                <textarea
                  value={bio}
                  name="description"
                  cols="10"
                  rows="3"
                  id="room"
                  onChange={(e) => {
                    setBio(e.target.value);
                  }}
                ></textarea>
              </div>
              <div className="form__action">
                <button className="btn btn--main" type="submit">
                  Update
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </main>
  );
};

export default EditProfile;
