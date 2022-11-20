import Logo from "../icons/logo.svg";
import Avatar from "../icons/avatar.svg";
//import Search from "./Search";
import { Link } from "react-router-dom";
import { useLogout } from "../hooks/useLogout";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Search from "./Search";

function NavBar() {
  const { user } = useSelector((state) => state.userReducer);
  const { logout } = useLogout();
  const [avatar, setAvatar] = useState("");
  const handleLogout = () => {
    logout();
  };

  useEffect(() => {
    const fetchProfile = async () => {
      const response = await fetch(`/api/profile/${user?.username}`, {
        headers: {
          Authorization: `Bearer ${user?.token}`,
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();
      setAvatar(data?.user?.profileImg);
    };
    fetchProfile();
  }, [user]);

  return (
    <nav className="navbar">
      <div className="container ">
        <Link to="/">
          <div className="navbar_logo">
            <img src={Logo} alt="logo" />
            <h1>StudyBuddy</h1>
          </div>
        </Link>
        <Search />
        {user ? (
          <div className="navbar_login">
            <div className="link">
              <Link to={`/profile/${user.username}/`}>
                <img
                  src={avatar ? `/uploads/${avatar}` : Avatar}
                  alt="avatar"
                />
              </Link>
              <p onClick={handleLogout}>Logout</p>
            </div>
          </div>
        ) : (
          <div className="navbar_login">
            <Link to="/login" className="link">
              <img src={Avatar} alt="avatar" />
              <p>Login</p>
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
}

export default NavBar;
