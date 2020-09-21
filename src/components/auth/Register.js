import { useHistory } from "react-router-dom";
import React, { useState, useContext } from "react";
import AuthOptions from "./AuthOptions";
import UserContext from "./../../context/UserContext";
import axios from "axios";

export default function Register() {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [passwordCheck, setPasswordCheck] = useState();
  const [displayName, setDisplayName] = useState();
  const { setUserData } = useContext(UserContext);
  const [error, setError] = useState("");
  const history = useHistory();
  const submit = async (e) => {
    e.preventDefault();

    try {
      const newUser = { email, password, passwordCheck, displayName };
      await axios.post("http://localhost:5000/users/register", newUser);
      const loginResponse = await axios.post(
        "http://localhost:5000/users/login",
        { email, password }
      );
      setUserData({
        token: loginResponse.data.token,
        user: loginResponse.data.user,
      });
      localStorage.setItem("auth-token", loginResponse.data.token);
      history.push("/");
    } catch (err) {
      err.response.data.msg && setError(err.response.data.msg);
    }
  };
  return (
    <div>
      <h2>Register </h2>
      <form onSubmit={submit}>
        <label htmlFor="register-email">Email</label>
        <input
          id="register-mail"
          type="email"
          onChange={(e) => setEmail(e.target.value)}
        ></input>
        <label htmlFor="register-password">Password</label>
        <input
          type="password"
          id="register-password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <input
          type="password"
          placeholder="Verify Password"
          onChange={(e) => setPasswordCheck(e.target.value)}
        />
        <label htmlFor="register-display-name">Display Name </label>
        <input
          type="text"
          id="register-display-name"
          onChange={(e) => setDisplayName(e.target.value)}
        />
        <input type="submit" value="Register" />
      </form>
    </div>
  );
}
