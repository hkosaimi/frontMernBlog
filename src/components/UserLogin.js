import { useEffect, useState } from "react";
import "../user.css";

function UserLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [success, setSuccess] = useState(null);
  const [error, setError] = useState(null);

  async function handleLogin(e) {
    e.preventDefault();
    const response = await fetch("/api/users/login", {
      method: "POST",
      body: JSON.stringify({ email, password }),
      headers: {
        "content-type": "application/json",
      },
    });
    if (!response.ok) {
      console.log("Failed to login", response.status);
    }

    const data = await response.json();
    if (data.success) {
      setSuccess(data.success);
      setError(null);
    }
    if (data.error) {
      setError(data.error);
      setSuccess(null);
    }
    console.log(data);
  }

  return (
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
        <button type="submit">Log in</button>
        {error ? <div className="error">{error}</div> : <div className="success">{success}</div>}
      </form>
    </div>
  );
}

export default UserLogin;
