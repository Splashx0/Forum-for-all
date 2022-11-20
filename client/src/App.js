import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import NavBar from "./components/NavBar";
import Profile from "./pages/Profile";
import Room from "./pages/Room";
import CreateRoom from "./pages/CreateRoom";
import Addtopic from "./components/Addtopic";
import EditProfile from "./pages/EditProfile";
import { Routes, Route, Navigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { loginUser } from "./redux/actions/userActions";

function App() {
  const { user } = useSelector((state) => state.userReducer);
  const dispatch = useDispatch();
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user) {
      dispatch(loginUser(user));
    }
  }, []);
  return (
    <div className="main">
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/rooms/:id" element={<Room />} />
        <Route
          path="/login"
          element={!user ? <Login /> : <Navigate to="/" />}
        />
        <Route
          path="/register"
          element={!user ? <Register /> : <Navigate to="/" />}
        />
        <Route path="/profile/:id" element={<Profile />} />
        <Route path="/profile/:id/edit" element={<EditProfile />} />

        <Route
          path="/create"
          element={user ? <CreateRoom /> : <Navigate to="/" />}
        />
        <Route path="/addtopic" element={<Addtopic />} />
      </Routes>
    </div>
  );
}

export default App;
