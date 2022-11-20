import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { setMessages } from "../redux/actions/messageActions";

const RecentActivities = () => {
  const { messages } = useSelector((state) => state.messageReducer);
  const dispatch = useDispatch();

  const fetchMessages = async () => {
    const response = await fetch(`/api/messages/`);
    const data = await response.json();
    dispatch(setMessages(data.messages));
  };

  useEffect(() => {
    fetchMessages();
  }, []);
  return (
    <div className="activities">
      <h2>RECENT ACTIVITIES</h2>
      {messages?.map((message) => (
        <div key={message._id} className="activities__box">
          <div className="activities__boxHeader roomListRoom__header">
            <Link
              to={`/profile/${message.user.username}`}
              className="roomListRoom__author"
            >
              <div>
                <img
                  src={`/uploads/${message.user.profileImg}`}
                  alt="user icon"
                />
              </div>
              <p>
                {message.user.username}
                <span>{message.createdAt}</span>
              </p>
            </Link>
          </div>
          <div className="activities__boxContent">
            <p>
              replied to post “
              <Link to={`/rooms/${message.room?._id}`}>
                {message.room?.name}
              </Link>
              ”
            </p>
            <div className="activities__boxRoomContent">{message.body}</div>
          </div>
        </div>
      ))}
    </div>
  );
};
export default RecentActivities;
