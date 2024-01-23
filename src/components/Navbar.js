import "../navbar.css";
import { useState, useContext } from "react";

import { Link } from "react-router-dom";
import UserLogout from "./user/UserLogout.js";
import { AuthContext } from "../context/AuthContext.js";

function Navbar() {
  const context = useContext(AuthContext);
  const { user } = context;
  const [key, setKey] = useState(false);
  const { Logout } = UserLogout();
  const Links = () => {
    return (
      <>
        <div className="links">
          <p>
            <Link to="/">Home</Link>
          </p>
          <p>Contact</p>
          <p>About</p>
          {user?.success ? (
            <>
              <div className="newarticle">
                <Link to="create-article">Write an article</Link>
                <span class="material-symbols-outlined">edit_square</span>
              </div>
              <div
                className="logout_container"
                onClick={() => {
                  Logout();
                }}>
                <span>Logout</span>
                <span class="material-symbols-outlined">logout</span>
              </div>
            </>
          ) : (
            <>
              <Link to="/login">Login</Link>
              <Link to="/signup">Signup</Link>
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
        {key ? (
          <span
            className="material-symbols-outlined close"
            onClick={() => {
              setKey(false);
            }}>
            close
          </span>
        ) : (
          <span
            className="material-symbols-outlined "
            onClick={() => {
              setKey(true);
            }}>
            menu
          </span>
        )}
        {key && <Links />}
      </div>
    </>
  );
}

export default Navbar;
