import React from "react";
import RecentActivities from "../components/RecentActivities";
import RoomList from "../components/RoomList";
import Topics from "../components/Topics";
const Home = () => {
  return (
    <div className="container mt-4 row">
      <div className="col-2 ">
        <Topics />
      </div>
      <div className="col-8">
        <RoomList />
      </div>
      <div className="col-2">
        <RecentActivities />
      </div>
    </div>
  );
};

export default Home;
