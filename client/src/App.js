import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import NavBar from "./components/NavBar";
import { Routes, Route, Navigate } from "react-router-dom";
import Profile from "./pages/Profile";
import Room from "./pages/Room";
import CreateRoom from "./pages/CreateRoom";
import Addtopic from "./components/Addtopic";
import { useAuthContext } from "./hooks/useAuthContext";
import EditProfile from "./pages/EditProfile";

function App() {
  const { user } = useAuthContext();
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
