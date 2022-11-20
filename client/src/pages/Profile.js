import React, { useEffect, useState } from "react";
import DeleteIcon from "../icons/deleteIcon.svg";
import Avatar from "../icons/avatar.svg";
import { useParams, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { deleteRoom } from "../redux/actions/roomActions";

const Profile = () => {
  const { user } = useSelector((state) => state.userReducer);
  const { rooms } = useSelector((state) => state.roomReducer);
  const dispatch = useDispatch();

  const connectedUser = user?.username;
  const { id } = useParams();
  const [Profile, setProfile] = useState([]);
  const [Rooms, setRooms] = useState([]);

  useEffect(() => {
    const fetchProfile = async () => {
      const response = await fetch(`/api/profile/${id}`);
      const data = await response.json();
      setProfile(data.user);
      setRooms(data.user.rooms);
    };
    fetchProfile();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [rooms]);
  const handleDelete = async (id) => {
    const response = await fetch(`/api/rooms/${id}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${user?.token}` },
    });
    if (response.ok) {
      dispatch(deleteRoom(id));
    }
  };

  return (
    <div>
      <div className="container mt-4 row">
        <div className="col-2 "></div>
        <div className="col-8">
          <main className="profile-page layout layout--3">
            <div className="container">
              <div className="roomList">
                <div className="profile">
                  <div className="profile__avatar">
                    <div className="avatar">
                      <img
                        src={
                          Profile.profileImg
                            ? `/uploads/${Profile?.profileImg}`
                            : Avatar
                        }
                        alt="user"
                      />
                    </div>
                  </div>
                  <div className="profile__info">
                    <h3>{Profile?.username}</h3>
                    <p>@{Profile?.username}</p>
                    {connectedUser === id ? (
                      <Link
                        to={`/profile/${Profile?.username}/edit`}
                        className="btn btn--main btn--pill"
                      >
                        Edit profile
                      </Link>
                    ) : (
                      <div></div>
                    )}
                  </div>
                  <div className="profile__about">
                    <h3>Bio</h3>
                    <p>{Profile.bio}</p>
                  </div>
                </div>
              </div>
            </div>
            {Rooms?.map((room) => (
              <div key={room._id} className="roomListRoom ">
                <div className="roomListRoom__header">
                  <a href="/profile/" className="roomListRoom__author">
                    <div>
                      <img src={`/uploads/${Profile?.profileImg}`} alt="user" />
                    </div>
                    <span>@{Profile.username}</span>
                  </a>
                  <span>{room.createdAt}</span>
                </div>
                <div className="roomListRoom__content">
                  <a href={`/rooms/${room._id}`}>{room.name}</a>
                </div>
                <div className="roomListRoom__meta">
                  <p className="roomListRoom__topic">{room.topic.name}</p>
                  {user && connectedUser === id ? (
                    <button
                      onClick={() => handleDelete(room._id)}
                      className="roomListRoom__joined"
                    >
                      <img src={DeleteIcon} alt="usersJoinIcon" />
                    </button>
                  ) : null}
                </div>
              </div>
            ))}
          </main>
        </div>
        <div className="col-2"></div>
      </div>
    </div>
  );
};

export default Profile;
