
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  function handleLogin(event) {
    event.preventDefault();
    setError("");

    if (username.trim() === "admin" && password === "admin123") {
      sessionStorage.setItem("isLoggedIn", "true");
      navigate("/dashboard");
    } else {
      setError("Invalid username or password");
    }
  }

  return (
    <div className="login-page">
      <h1>
        ABSOLUTE <span>FITNESS</span>
      </h1>

      <div className="login-box">
        <h2>Welcome Back</h2>
        <p>Sign in to manage your gym</p>

        <form onSubmit={handleLogin}>
          <p>
            <label htmlFor="username">Username</label>
            <input
              id="username"
              type="text"
              placeholder="Enter your username"
              value={username}
              onChange={(event) => setUsername(event.target.value)}
              autoComplete="username"
              required
            />
          </p>

          <p>
            <label htmlFor="password">Password</label>
            <input
              id="password"
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              autoComplete="current-password"
              required
            />
          </p>

          {error && (
            <p className="error-message" role="alert">
              {error}
            </p>
          )}

          <button type="submit">Login to Dashboard</button>
        </form>
      </div>
    </div>
  );
}

export default Login;
