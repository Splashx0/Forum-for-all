import Logo from "../icons/logo.svg";
import Avatar from "../icons/avatar.svg";
import { Link } from "react-router-dom";
import { useLogout } from "../hooks/useLogout";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

function NavBar() {
  const { user } = useSelector((state) => state.userReducer);
  const { logout } = useLogout();
  const [avatar, setAvatar] = useState("");
  const handleLogout = () => {
    logout();
  };

  useEffect(() => {
    const fetchProfile = async () => {
      const response = await fetch(`https://it-forum.vercel.app/api/profile/${user?.username}`, {
        headers: {
          Authorization: `Bearer ${user?.token}`,
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();
      setAvatar(data?.user?.profileImg);
      console.log(data.user);
    };
    fetchProfile();
  }, [user]);

  return (
    <nav className="navbar">
      <div className="container">
        <Link to="/">
          <div className="navbar_logo">
            <img src={Logo} alt="logo" />
            <h1>IT Forum</h1>
          </div>
        </Link>
        <div>
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
      </div>
    </nav>
  );
}

export default NavBar;
