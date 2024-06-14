import React, { useEffect, useState } from "react";
import BackIcon from "../icons/backIcon.svg";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { createRoom } from "../redux/actions/roomActions";
const CreateRoom = () => {
  const navigate = useNavigate();
  const { user } = useSelector((state) => state?.userReducer);
  const  t  = useSelector((state) => state?.topicReducer?.topics);

  console.log(t)
  const dispatch = useDispatch();
  const [topics, setTopics] = useState();
  const [error, setError] = useState(null);
  const [succeed, setSucceed] = useState(null);

  const [RoomData, setRoomData] = useState({
    topic: "",
    name: "",
    description: "",
  });
  useEffect(() => {
    const fetchTopics = async () => {
      const response = await fetch("https://it-forum.vercel.app/api/topics", {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user?.token}`,
        },
      });
      const data = await response.json();
      setTopics(data.topics);
    };
    fetchTopics();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    const response = await fetch("https://it-forum.vercel.app/api/rooms", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${user.token}`,
      },
      body: JSON.stringify(RoomData),
    });
    const data = await response.json();
    if (!response.ok) {
      setError(data.error);
    }
    if (response.ok) {
      dispatch(createRoom(data.room));
      setSucceed("Room created");
      setTimeout(() => {
        navigate("/");
      }, 1500);
    }
  };
  const handleChange = (e) => {
    let name = e.target.name;
    let value = e.target.value;
    setRoomData({ ...RoomData, [name]: value });
  };
  console.log(RoomData);
  return (
    <div className="container">
      <div className="layout__box">
        <div className="layout__boxHeader_room">
          <div onClick={() => navigate(-1)}>
            <img src={BackIcon} alt="go back" />
          </div>
          <h3>Create / Update Study Room</h3>
        </div>
        <div className="layout__body_room">
          <form method="post" className="form" onSubmit={handleSubmit}>
            <div className="form__group">
              <label>Choose a Topic</label>
              <input
                type="text"
                name="topic"
                list="topic-list"
                onChange={handleChange}
              />
              <datalist id="topic-list">
                {topics?.map((topic) => (
                  <select key={topic._id} id="room-topic">
                    <option value={`${topic.name}`}>{topic.name}</option>
                  </select>
                ))}
              </datalist>
            </div>
            <div className="form__group">
              <label htmlFor="name">Room Name</label>
              <input
                type="text"
                name="name"
                id="name"
                onChange={handleChange}
              />
            </div>

            <div className="form__group">
              <label htmlFor="room">Room Description</label>
              <textarea
                name="description"
                cols="10"
                rows="3"
                onChange={handleChange}
                id="room"
              ></textarea>
            </div>
            <div className="form__action">
              {error && <div className="error">{error}</div>}
              {succeed && <div className="succeed">{succeed}</div>}
              <button className="btn btn--dark" type="reset">
                Cancel
              </button>
              <button className="btn btn--main" type="submit">
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateRoom;
