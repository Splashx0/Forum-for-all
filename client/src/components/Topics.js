import React, { useEffect, useState } from "react";
import { useContext } from "react";
import { RoomContext } from "../context/RoomContext";
const Topics = () => {
  const { rooms, dispatch } = useContext(RoomContext);
  const [topics, setTopics] = useState([]);
  const [allRooms, setAllRooms] = useState([]);
  useEffect(() => {
    const fetchTopics = async () => {
      const response = await fetch("/api/topics");
      const topics = await response.json();
      setTopics(topics.topics);
    };
    fetchTopics();
  }, [rooms]);
  useEffect(() => {
    const fetchRooms = async () => {
      const response = await fetch("/api/rooms");
      const data = await response.json();
      setAllRooms(data.rooms);
    };
    fetchRooms();
  }, []);
  const handleTopics = (e) => {
    const value = e.target.value;
    if (value === "All") {
      dispatch({ type: "GET_ROOMS", payload: allRooms });
    } else {
      const FiltredRoomsByTopic = allRooms.filter(
        (room) => room.topic.name === value
      );
      dispatch({ type: "GET_ROOMS", payload: FiltredRoomsByTopic });
    }
  };

  const AllRoomsNumber = () => {
    let n = 0;
    topics.map((topic) => (n = n + topic.rooms.length));
    return n;
  };
  return (
    <div className="topics">
      <div className="topics__header">
        <h2>Browse Topics</h2>
      </div>
      <ul className="topics__list">
        <li>
          <button
            value="All"
            onClick={handleTopics}
            className="active bg-transparent border-0 "
          >
            All
            <span>{AllRoomsNumber()}</span>
          </button>
        </li>
        {topics &&
          topics?.map((topic) => (
            <li key={topic._id}>
              <button
                value={topic.name}
                className="bg-transparent border-0"
                onClick={handleTopics}
              >
                {topic.name}
                <span>{topic.rooms.length}</span>
              </button>
            </li>
          ))}
      </ul>
    </div>
  );
};
export default Topics;
