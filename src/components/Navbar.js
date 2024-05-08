import { useState, useContext } from "react";
import { Link } from "react-router-dom";
import useLogout from "../hooks/useLogout.js";
import { AuthContext } from "../context/AuthContext.js";
import { FaUserAlt } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import { FaEdit } from "react-icons/fa";
function Navbar() {
  const context = useContext(AuthContext);
  const { user } = context;
  const [isOpened, setIsOpened] = useState(false);
  const { Logout } = useLogout();
  const [showUserMenu, setShowUserMenu] = useState(false);

  const handleUserMenu = () => {
    setShowUserMenu(!showUserMenu);
  };
  const loggedOutLinks = [
    {
      name: "home",
      path: "/",
    },
    {
      name: "contact",
      path: "/contact",
    },
    {
      name: "about",
      path: "/about",
    },
    {
      name: "login",
      path: "/login",
    },
  ];
  const loggedInLinks = [
    {
      name: "home",
      path: "/",
    },
    {
      name: "contact",
      path: "/contact",
    },
    {
      name: "about",
      path: "/about",
    },
    {
      name: <FaUserAlt onClick={handleUserMenu} className="text-[24px]" />,
    },
  ];

  /* const Links = () => {
    return (
      <>
        <div className="links">
          <Link to="/" onClick={() => setIsNavbar(false)}>
            Home
          </Link>

          <Link to="/contact" onClick={() => setIsNavbar(false)}>
            Contact
          </Link>

          <Link to="/about" onClick={() => setIsNavbar(false)}>
            About
          </Link>

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
  }; */
  return (
    <>
      <div className="flex py-[2rem] px-[3rem] justify-between font-[Poppins]">
        <Link to="/" style={{ color: "#fff", textDecoration: "none" }}>
          i cosmic dust
        </Link>
        <div className="hidden lg:flex gap-6 capitalize justify-center">
          {!user
            ? loggedOutLinks.map((link) => (
                <Link className="last:bg-teal-700 py-2 px-3  rounded-lg" to={link.path}>
                  {link.name}
                </Link>
              ))
            : loggedInLinks.map((link) => <Link to={link.path}>{link.name}</Link>)}
        </div>
        {isOpened && (
          <motion.div
            whileTap={{ scale: 0.9 }}
            whileHover={{ scale: 1.09 }}
            onClick={() => setIsOpened(!isOpened)}
            className="flex gap-1 flex-col  lg:hidden cursor-pointer">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1, rotate: 40, y: 3 }}
              className="w-7 bg-white h-1"></motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1, rotate: -40, y: -4 }}
              className="w-7 bg-white h-1"></motion.div>
          </motion.div>
        )}

        {!isOpened && (
          <motion.div
            whileTap={{ scale: 0.9 }}
            whileHover={{ scale: 1.09 }}
            onClick={() => setIsOpened(!isOpened)}
            className="flex gap-1 flex-col  lg:hidden cursor-pointer">
            <div className="w-7 bg-white h-1"></div>

            <div className="w-7 bg-white h-1"></div>
          </motion.div>
        )}
      </div>
      <AnimatePresence>
        {showUserMenu && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1, transition: { duration: 0.2 } }}
            exit={{ opacity: 0, y: -50 }}
            className="absolute top-[80px] px-9 py-7 rounded-lg right-[50px] text-black flex flex-col bg-white">
            <h1 className="mb-5 text-[20px]">Welcome back {user?.firstname}</h1>
            <div className="flex gap-3 justify-center mb-5">
              <Link className=" text-[24px] underline" to="create-article">
                Write an article
              </Link>
            </div>
            <div className="w-[100%] bg-gray-500 h-[1px] mb-3 mt-5"></div>
            <button
              className="bg-teal-500 p-2 rounded-lg text-white text-[20px] hover:bg-teal-700"
              onClick={() => {
                Logout();
                setShowUserMenu(false);
              }}>
              Logout
            </button>
          </motion.div>
        )}
      </AnimatePresence>
      <AnimatePresence>
        {isOpened && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, y: -50 }}
            className="flex flex-col text-[20px] lg:hidden gap-3 user-none justify-center  capitalize bg-white text-black font-[Poppins] absolute top-[70px] rounded-lg right-10 p-8">
            {!user
              ? loggedOutLinks.map((link) => (
                  <Link
                    className="last:bg-teal-700 last:text-white text-center py-2 px-3  rounded-lg"
                    to={link.path}>
                    {link.name}
                  </Link>
                ))
              : loggedInLinks.map((link) => <Link to={link.path}>{link.name}</Link>)}
          </motion.div>
        )}
      </AnimatePresence>

      {/* {isNavbar ? (
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
        {isNavbar && <Links />} */}
    </>
  );
}

export default Navbar;
