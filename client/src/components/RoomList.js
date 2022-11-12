import React, { useEffect } from "react";
import AddRoom from "../icons/addRoom.svg";
import DeleteIcon from "../icons/deleteIcon.svg";
import { useAuthContext } from "../hooks/useAuthContext";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { RoomContext } from "../context/RoomContext";
const RoomList = () => {
  const { rooms, dispatch } = useContext(RoomContext);
  const { user } = useAuthContext();
  const connectedUser = user?.username;
  useEffect(() => {
    const fetchRooms = async () => {
      const response = await fetch("/api/rooms");
      const data = await response.json();
      dispatch({ type: "GET_ROOMS", payload: data.rooms });
    };
    fetchRooms();
  }, []);

  const handleDelete = async (id) => {
    const response = await fetch(`/api/rooms/${id}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${user.token}` },
    });
    if (response.ok) {
      dispatch({ type: "DELETE_ROOMS", payload: id });
    }
  };

  return (
    <div className="roomList">
      <div className="roomList__header">
        <div>
          <h2>Study Rooms</h2>
          <p>{rooms?.length} Rooms available</p>
        </div>
        {user ? (
          <Link className="btn btn--main" to="/create">
            <img src={AddRoom} alt="add room" />
            Create Room
          </Link>
        ) : null}
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
