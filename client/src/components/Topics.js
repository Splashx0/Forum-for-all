import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setRooms } from "../redux/actions/roomActions";
import { setTopics } from "../redux/actions/topicActions";
const Topics = () => {
  const { topics } = useSelector((state) => state.topicReducer);
  const { rooms } = useSelector((state) => state.roomReducer);
  const dispatch = useDispatch();
  const [allRooms, setAllRooms] = useState([]);
  useEffect(() => {
    const fetchTopics = async () => {
      const response = await fetch("https://it-forum.vercel.app/api/topics");
      const data = await response.json();
      dispatch(setTopics(data.topics));
    };
    fetchTopics();
  }, []);

  useEffect(() => {
    const fetchRooms = async () => {
      const response = await fetch("https://it-forum.vercel.app/api/rooms");
      const data = await response.json();
      setAllRooms(data.rooms);
    };
    fetchRooms();
  }, []);
  const handleTopics = (e) => {
    const value = e.target.value;
    if (value === "All") {
      dispatch(setRooms(allRooms));
    } else {
      const FiltredRoomsByTopic = allRooms.filter(
        (room) => room.topic.name === value
      );
      dispatch(setRooms(FiltredRoomsByTopic));
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
