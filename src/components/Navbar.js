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
          <p>
            <Link to="/contact" onClick={() => setIsNavbar(false)}>
              Contact
            </Link>
          </p>
          <p>
            <Link to="/about" onClick={() => setIsNavbar(false)}>
              About
            </Link>
          </p>
          {user?.success ? (
            <>
              {user.role === "admin" && (
                <div className="write-article">
                  <Link to="create-article" onClick={() => setIsNavbar(false)}>
                    Write an article
                  </Link>

                  <span class="material-symbols-outlined">edit_square</span>
                </div>
              )}

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
            <div className="login_container">
              <Link to="/login" onClick={() => setIsNavbar(false)}>
                Login
              </Link>
              <Link to="/signup" onClick={() => setIsNavbar(false)}>
                Signup
              </Link>
            </div>
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
          <>
            <div
              style={{
                display: "flex",
                justifyContent: "start",
                alignItems: "center",

                columnGap: "10px",
              }}>
              {user?.success && <i class="fa-solid fa-circle-user"></i>}
              <span
                style={{ margin: "0px" }}
                className="material-symbols-outlined hamburger"
                onClick={() => {
                  setIsNavbar(true);
                }}>
                menu
              </span>
            </div>
          </>
        )}
        {isNavbar && <Links />}
      </div>
    </>
  );
}

export default Navbar;
