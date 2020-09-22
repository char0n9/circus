import React, { useState, useContext } from "react";
import { useHistory } from "react-router-dom";
import UserContext from "../../context/UserContext";
import Axios from "axios";
import ErrorNotice from "../misc/ErrorNotice";
import "./Auth.css";
import { Button } from "react-bootstrap";
export default function Login() {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [error, setError] = useState();

  const { setUserData } = useContext(UserContext);
  const history = useHistory();

  const submit = async (e) => {
    e.preventDefault();
    try {
      const loginUser = { email, password };
      const loginRes = await Axios.post(
        "http://localhost:5000/users/login",
        loginUser
      );
      setUserData({
        token: loginRes.data.token,
        user: loginRes.data.user,
      });
      localStorage.setItem("auth-token", loginRes.data.token);
      localStorage.setItem("user", loginRes.data.user.displayName);
      history.push("/events");
    } catch (err) {
      err.response.data.msg && setError(err.response.data.msg);
    }
  };
  return (
    <div className="page">
      <h2 className="reg-text">Log In </h2>
      {error && (
        <ErrorNotice message={error} clearError={() => setError(undefined)} />
      )}
      <form className="form-style" onSubmit={submit}>
        <label htmlFor="login-email"></label>
        <input
          placeholder="email"
          className="input-medium"
          id="login-email"
          type="email"
          onChange={(e) => setEmail(e.target.value)}
        />

        <label htmlFor="login-password"></label>
        <input
          placeholder="password"
          className="input-medium"
          id="login-password"
          type="password"
          onChange={(e) => setPassword(e.target.value)}
        />

        <Button
          variant="danger"
          type="submit"
          value="login"
          className="submit-btn"
        >
          Log In{" "}
        </Button>
      </form>
    </div>
  );
}
