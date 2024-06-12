import React, { useEffect, useState } from "react";
import BackIcon from "../icons/backIcon.svg";
import { useParams, Link } from "react-router-dom";
import { GetParticipantsNumber } from "../components/GetParticipantsNumber";
import { useSelector, useDispatch } from "react-redux";
import { createMessage, setMessages } from "../redux/actions/messageActions";

const Room = () => {
  const { user } = useSelector((state) => state.userReducer);
  const { messages } = useSelector((state) => state.messageReducer);
  const dispatch = useDispatch();
  const { id } = useParams();
  const [Room, setRoom] = useState([]);
  const [Body, setBody] = useState("");
  useEffect(() => {
    const fetchRooms = async () => {
      const response = await fetch(`/api/rooms/${id}`);
      const data = await response.json();
      setRoom(data.room);
    };
    fetchRooms();
  }, []);

  useEffect(() => {
    const fetchMessages = async () => {
      const response = await fetch(`/api/messages/${id}`);
      const data = await response.json();
      dispatch(setMessages(data.messages));
    };
    fetchMessages();
  }, [messages.length]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    e.target.reset();
    const response = await fetch(`/api/messages/${id}`, {
      headers: {
        Authorization: `Bearer ${user.token}`,
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify({ body: Body }),
    });
    const data = await response.json();
    dispatch(createMessage(data.message));
  };
  const handleChange = async (e) => {
    setBody(e.target.value);
  };

  return (
    <div className="room_container">
      <div className="room">
        <div className="room__top">
          <div className="room__topLeft">
            <Link to="/">
              <img src={BackIcon} alt="back icon" />
            </Link>
            <h3>Study Room</h3>
          </div>
        </div>
        <div className="room__box ">
          <div className="room__header ">
            <div className="room__info">
              <h3>#{Room.name}</h3>
              <span>{Room.createdAt}</span>
            </div>
            <div className="room__hosted">
              <p>Hosted By</p>
              <a
                href={`/profile/${Room.host?.username}`}
                className="room__author"
              >
                <div className="avatar">
                  <img src={`/uploads/${Room?.host?.profileImg}`} alt="user" />
                </div>
                <span>@{Room.host?.username}</span>
              </a>
            </div>
            <div className="d-flex align-items-center justify-content-between ">
              <div className="">{Room.description}</div>
              <span className="room__topics">{Room.topic?.name}</span>
            </div>
          </div>
          <div className="room__conversation">
            <div className="threads ">
              {messages.map((message, key) => (
                <div className="thread" key={message._id}>
                  <div className="thread__top">
                    <div className="thread__author">
                      <Link
                        to={`/profile/${message.user?.username}`}
                        className="thread__authorInfo"
                      >
                        <div className="avatar ">
                          <img
                            src={`/uploads/${message?.user.profileImg}`}
                            alt="user"
                          />
                        </div>
                        <span>@{message.user.username}</span>
                      </Link>
                      <span>{message.createdAt}</span>
                    </div>
                  </div>
                  <div className="thread__details">{message.body}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="room__message">
          <form
            className="d-flex"
            action=""
            method="post"
            onSubmit={handleSubmit}
          >
            {user ? (
              <>
                <input
                  name="body"
                  placeholder="Write your message here..."
                  onChange={handleChange}
                />
                <button type="submit" className="btn btn--main btn--pill mx-2">
                  Add
                </button>
              </>
            ) : null}
          </form>
        </div>
      </div>
      <div className="participants">
        <h3 className="participants__top">
          Participants{" "}
          <span>{`(${GetParticipantsNumber(messages).length} joined)`}</span>
        </h3>
        <div className="participants__list ">
          {GetParticipantsNumber(messages)?.map((message, key) => (
            <a
              key={key}
              href={`/profile/${message.user?.username}`}
              className="participant"
            >
              <div className="avatar">
                <img src={`/uploads/${message.user?.profileImg}`} alt="user" />
              </div>
              <span>@{message.user.username}</span>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Room;
