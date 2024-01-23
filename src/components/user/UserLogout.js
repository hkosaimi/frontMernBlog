import { AuthContext } from "../../context/AuthContext";
import { useContext } from "react";

const UserLogout = () => {
  const { dispatch } = useContext(AuthContext);
  const Logout = () => {
    localStorage.removeItem("user");
    dispatch({ type: "LOGOUT" });
  };
  return { Logout };
};

export default UserLogout;
