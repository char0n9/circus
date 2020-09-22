import React, { useEffect, useContext } from "react";
import { useHistory } from "react-router-dom";
import UserContext from "./../../context/UserContext";
import { Container, Col, Row, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import "./Pages.css";

export default function Home() {
  const { userData } = useContext(UserContext);
  const history = useHistory();
  const register = () => history.push("/register");
  const login = () => history.push("/login");

  // useEffect(() => {
  //   if (!userData.user) history.push("/login");
  // });

  return (
    <Container fluid className="darken splash">
      <Row className="center-stuff">
        <h1 className="splash-text"> Wild Circus...</h1>
        <Button
          onClick={register}
          variant="dark"
          size="lg"
          className="signup-btn"
        >
          Sign Up
        </Button>
        <Button
          onClick={login}
          variant="danger"
          size="lg"
          className="login-btn"
        >
          Login
        </Button>
      </Row>
    </Container>
  );
}
