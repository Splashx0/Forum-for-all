import React, { useEffect } from "react";
import AddRoom from "../icons/addRoom.svg";
import DeleteIcon from "../icons/deleteIcon.svg";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { deleteRoom, setRooms } from "../redux/actions/roomActions";
import { deleteMessages } from "../redux/actions/messageActions";
import { updateTopics } from "../redux/actions/topicActions";

const RoomList = () => {
  const { user } = useSelector((state) => state.userReducer);
  const { rooms } = useSelector((state) => state.roomReducer);
  const dispatch = useDispatch();

  const connectedUser = user?.username;
  useEffect(() => {
    const fetchRooms = async () => {
      const response = await fetch("/api/rooms");
      const data = await response.json();
      dispatch(setRooms(data.rooms));
    };
    fetchRooms();
  }, [dispatch]);

  const handleDelete = async (id) => {
    const response = await fetch(`/api/rooms/${id}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${user.token}` },
    });
    if (response.ok) {
      dispatch(deleteRoom(id));
      dispatch(deleteMessages(id));
      dispatch(updateTopics(id));
    }
  };

  return (
    <div className="roomList">
      <div className="roomList__header">
        <div className="num">
          <h2>Study Rooms</h2>
          <p>{rooms?.length} Rooms available</p>
        </div>
        <div>
          {user ? (
            <Link className="btn btn--main" to="/create">
              <img src={AddRoom} alt="add room" />
              Create
            </Link>
          ) : null}
        </div>
      </div>
      {rooms?.map((room) => {
        return (
          <div key={room._id} className="roomListRoom">
            <div className="roomListRoom__header">
              <Link
                to={`/profile/${room.host.username}`}
                className="roomListRoom__author"
              >
                <div>
                  <img src={`/uploads/${room.host.profileImg}`} alt="user" />
                </div>
                <span>@{room.host.username}</span>
              </Link>
              <span>{room.createdAt}</span>
            </div>
            <div className="roomListRoom__content">
              <Link to={`/rooms/${room._id}`}>{room.name}</Link>
            </div>
            <div className="roomListRoom__meta">
              <p className="roomListRoom__topic">{room.topic.name}</p>
              {user && connectedUser === room.host.username ? (
                <button
                  className="roomListRoom__joined"
                  onClick={() => {
                    handleDelete(room._id);
                  }}
                >
                  <img src={DeleteIcon} alt="usersJoinIcon" />
                </button>
              ) : null}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default RoomList;
