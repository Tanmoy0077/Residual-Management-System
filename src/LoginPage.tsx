// Login.tsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login } from './AuthService';
import "./css/Login.css";

const LoginPage: React.FC = () => {
  const [user_id, setUserID] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState('');

  const navigate = useNavigate();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      const redirectPage = await login(user_id, password);
      navigate(`/${redirectPage}`);
    } catch (err) {
      setError('Login failed. Please check your credentials.');
    }
  };

  return (
    <div className="box">
      <form className="form" onSubmit={handleSubmit}>
        <p className="form-title">Sign in to your account</p>
        <div className="input-container">
          <input
            type="text"
            placeholder="Enter username"
            id="user_id"
            value={user_id}
            onChange={(e) => setUserID(e.target.value)}
            required
          />
          <span></span>
        </div>
        <div className="input-container">
          <input
            type="password"
            placeholder="Enter password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="submit">
          Sign in
        </button>
        <p className="signup-link">
          No account?
          <a href="/signup">Sign up</a>
        </p>
      </form>
      {error && <div className="error">{error}</div>}
    </div>
  );
};

export default LoginPage;
