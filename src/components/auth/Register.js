import { useHistory } from "react-router-dom";
import React, { useState, useContext } from "react";
import AuthOptions from "./AuthOptions";
import UserContext from "./../../context/UserContext";
import axios from "axios";
import {
  Col,
  Container,
  Row,
  Form,
  Button,
  InputGroup,
  FormControl,
} from "react-bootstrap";
import "./Auth.css";

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
      localStorage.setItem("user", loginResponse.data.user.displayName);

      history.push("/");
    } catch (err) {
      err.response.data.msg && setError(err.response.data.msg);
    }
  };
  return (
    <div>
      <h2 className="reg-text">Register </h2>
      <form onSubmit={submit} className="form-style">
        <label htmlFor="register-email"></label>

        <input
          className="input-medium"
          id="register-mail"
          type="email"
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
        ></input>
        <label htmlFor="register-password"></label>
        <input
          type="password"
          id="register-password"
          onChange={(e) => setPassword(e.target.value)}
          className="input-medium"
          placeholder="Password"
        />
        <input
          type="password"
          placeholder="Verify Password"
          onChange={(e) => setPasswordCheck(e.target.value)}
          className="input-medium"
        />
        <label htmlFor="register-display-name"> </label>
        <input
          type="text"
          id="register-display-name"
          onChange={(e) => setDisplayName(e.target.value)}
          className="input-medium"
          placeholder="Display Name"
        />
        <Button
          variant="danger"
          type="submit"
          value="Register"
          className="submit-btn"
        >
          {" "}
          Register{" "}
        </Button>
      </form>{" "}
    </div>
  );
}
