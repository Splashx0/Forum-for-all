import React, { useEffect, useState } from "react";
import SearchIcon from "../icons/searchIcon.svg";
import { useDispatch } from "react-redux";
import { setRooms } from "../redux/actions/roomActions";
const Search = () => {
  const dispatch = useDispatch();
  const [searchedTerm, setSearchedTerm] = useState("");
  const [roomsHere, setRoomsHere] = useState([]);

  useEffect(() => {
    const fetchRooms = async () => {
      const response = await fetch("/api/rooms");
      const data = await response.json();
      setRoomsHere(data.rooms);
    };
    fetchRooms();
  }, []);
  useEffect(() => {
    let searchRooms = [];
    if (!searchedTerm) {
      searchRooms = roomsHere;
    } else {
      searchRooms = roomsHere.filter(
        (room) =>
          room.topic.name.toLowerCase().includes(searchedTerm) ||
          room.name.toLowerCase().includes(searchedTerm) ||
          room.description.toLowerCase().includes(searchedTerm)
      );
    }
    dispatch(setRooms(searchRooms));
  }, [searchedTerm]);
  const handleChange = (e) => {
    setSearchedTerm(e.target.value);
  };
  console.log(searchedTerm);

  return (
    <form className="navbar_search" method="get" action="/">
      <label>
        <img src={SearchIcon} alt="search icon" />
        <input placeholder="Search for rooms..." onChange={handleChange} />
      </label>
    </form>
  );
};

export default Search;
