import React from "react";
import RecentActivities from "../components/RecentActivities";
import RoomList from "../components/RoomList";
import Topics from "../components/Topics";

const Home = () => {
  return (
    <div className="container mt-4 row parent ">
      <div>
        <Topics />
      </div>
      <div>
        <RoomList />
      </div>
      <div>
        <RecentActivities />
      </div>
    </div>
  );
};

export default Home;
