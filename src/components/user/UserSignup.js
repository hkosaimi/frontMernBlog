import { useState, useContext } from "react";
import "./user.css";
import { AuthContext } from "../../context/AuthContext";
import Navbar from "../Navbar";
function UserSignup() {
  const context = useContext(AuthContext);
  const { dispatch } = context;

  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [success, setSuccess] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(null);

  async function handleSignup(e) {
    e.preventDefault();
    setIsLoading(true);

    const response = await fetch("https://api.icosmicdust.blog/api/users/signup", {
      method: "POST",
      body: JSON.stringify({ firstname, lastname, email, password }),
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
        <form onSubmit={handleSignup}>
          <h1>SIGNUP</h1>
          <div style={{ display: "flex", columnGap: "10px" }}>
            <input
              type="text"
              value={firstname}
              onChange={(e) => setFirstname(e.target.value)}
              placeholder="First name"
            />
            <input
              type="text"
              value={lastname}
              onChange={(e) => setLastname(e.target.value)}
              placeholder="Last name"
            />
          </div>
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
          <button disabled={isLoading}>Sign up</button>

          {error && <div className="error">{error}</div>}
          {success && <div className="success">{success}</div>}
        </form>
      </div>
    </>
  );
}

export default UserSignup;
