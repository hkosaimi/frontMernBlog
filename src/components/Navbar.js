import "../navbar.css";
import { useState, useContext } from "react";
import { Link } from "react-router-dom";
import UserLogout from "./user/UserLogout.js";
import { AuthContext } from "../context/AuthContext.js";

function Navbar() {
  const context = useContext(AuthContext);
  const { user } = context;
  const [isNavbar, setIsNavbar] = useState(false);
  const { Logout } = UserLogout();
  const Links = () => {
    return (
      <>
        <div className="links">
          <p>
            <Link to="/" onClick={() => setIsNavbar(false)}>
              Home
            </Link>
          </p>
          <p onClick={() => setIsNavbar(false)}>Contact</p>
          <p onClick={() => setIsNavbar(false)}>About</p>
          {user?.success ? (
            <>
              <div className="newarticle">
                <Link to="create-article" onClick={() => setIsNavbar(false)}>
                  Write an article
                </Link>
                <span class="material-symbols-outlined">edit_square</span>
              </div>
              <div
                className="logout_container"
                onClick={() => {
                  Logout();
                  setIsNavbar(false);
                }}>
                <span>Logout</span>
                <span class="material-symbols-outlined">logout</span>
              </div>
            </>
          ) : (
            <>
              <Link to="/login" onClick={() => setIsNavbar(false)}>
                Login
              </Link>
              <Link to="/signup" onClick={() => setIsNavbar(false)}>
                Signup
              </Link>
            </>
          )}
        </div>
      </>
    );
  };
  return (
    <>
      <div className="navbar">
        <div>My Blog</div>
        {isNavbar ? (
          <span
            className="material-symbols-outlined close"
            onClick={() => {
              setIsNavbar(false);
            }}>
            close
          </span>
        ) : (
          <span
            className="material-symbols-outlined "
            onClick={() => {
              setIsNavbar(true);
            }}>
            menu
          </span>
        )}
        {isNavbar && <Links />}
      </div>
    </>
  );
}

export default Navbar;
