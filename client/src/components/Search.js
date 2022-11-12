import React, { useEffect, useState } from "react";
import SearchIcon from "../icons/searchIcon.svg";
import { useContext } from "react";
import { RoomContext } from "../context/RoomContext";
const Search = () => {
  const { dispatch } = useContext(RoomContext);
  const [searchedTerm, setSearchedTerm] = useState("");
  const [rooms, setRooms] = useState([]);

  useEffect(() => {
    const fetchRooms = async () => {
      const response = await fetch("/api/rooms");
      const data = await response.json();
      setRooms(data.rooms);
    };
    fetchRooms();
  }, []);
  useEffect(() => {
    let searchRooms = [];
    if (!searchedTerm) {
      searchRooms = rooms;
    } else {
      searchRooms = rooms.filter(
        (room) =>
          room.topic.name.toLowerCase().includes(searchedTerm) ||
          room.name.toLowerCase().includes(searchedTerm) ||
          room.description.toLowerCase().includes(searchedTerm)
      );
    }
    dispatch({ type: "GET_ROOMS", payload: searchRooms });
  }, [searchedTerm]);
  const handleChange = (e) => {
    setSearchedTerm(e.target.value);
  };

  return (
    <form className="navbar_search" method="get" action="/">
      <label>
        <img src={SearchIcon} alt="search icon" />
        <input
          value={searchedTerm}
          placeholder="Search for rooms..."
          onChange={handleChange}
        />
      </label>
    </form>
  );
};

export default Search;
