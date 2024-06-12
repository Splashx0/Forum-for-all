import React from "react";
import RecentActivities from "../components/RecentActivities";
import RoomList from "../components/RoomList";
import Topics from "../components/Topics";

const Home = () => {
  return (
    <div className="container mt-4 row parent ">
        <Topics />
        <RoomList />
        <RecentActivities />
    </div>
  );
};

export default Home;
