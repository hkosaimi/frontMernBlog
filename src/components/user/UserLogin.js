import { useContext, useState } from "react";
import "./user.css";
import { AuthContext } from "../../context/AuthContext";
import Navbar from "../Navbar";
import { FaSpinner } from "react-icons/fa";
import CircularProgress from "@mui/material/CircularProgress";
function UserLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [success, setSuccess] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const context = useContext(AuthContext);
  const { dispatch } = context;

  async function handleLogin(e) {
    e.preventDefault();
    setIsLoading(true);
    const response = await fetch("https://mernback-875f.onrender.com/api/users/login", {
      method: "POST",
      body: JSON.stringify({ email, password }),
      headers: {
        "content-type": "application/json",
      },
    });

    const json = await response.json();
    if (!response.ok) {
      setIsLoading(false);
      setError(json.error);
      setSuccess(null);
    }
    if (response.ok) {
      //save user to local storage
      localStorage.setItem("user", JSON.stringify(json));
      //update auth context
      dispatch({ type: "LOGIN", payload: json });
      setIsLoading(false);
      setError(null);
      setSuccess(json.success);
    }
  }

  return (
    <>
      <Navbar />

      <div className="form_container">
        <form onSubmit={handleLogin}>
          <h1>LOGIN</h1>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
          />

          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
          />
          <button className="bg-[#cac8c8] w-[100px] text-black py-2 px-3 rounded-lg text-[20px]  text-center align-middle text-thin">
            {isLoading ? <CircularProgress /> : "Login"}
          </button>

          {error && <div className="error">{error}</div>}
          {success && <div className="success">{success}</div>}
        </form>
      </div>
    </>
  );
}

export default UserLogin;
