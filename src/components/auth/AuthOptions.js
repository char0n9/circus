import React, { useContext } from "react";
import { Link, useHistory } from "react-router-dom";
import UserContext from "../../context/UserContext";
import { Navbar, Spinner } from "react-bootstrap";

export default function AuthOptions() {
  const { userData, setUserData } = useContext(UserContext);

  const history = useHistory();
  const register = () => history.push("/register");
  const login = () => history.push("/login");
  const logout = () => {
    setUserData({
      token: undefined,
      user: undefined,
    });
    localStorage.setItem("auth-token", "");
    history.push("/");
  };

  return (
    <Navbar style={{ marginBottom: "0.3em" }}>
      <Navbar.Brand>
        <Link to="/">Wild Circus</Link>
      </Navbar.Brand>
      <Navbar.Toggle />
      <Navbar.Collapse className="justify-content-end">
        <Navbar.Text>
          Signed in as:{" "}
          <a onClick={logout}>
            {userData.user ? (
              userData.user.displayName
            ) : (
              <Spinner animation="border" />
            )}
          </a>
        </Navbar.Text>
      </Navbar.Collapse>
    </Navbar>
  );
}
