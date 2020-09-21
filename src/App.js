import React, { useState, useEffect } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Login from "./components/auth/Login";
import Home from "./components/pages/Home";
import Header from "./components/layout/Header";
import Register from "./components/auth/Register";
import UserContext from "./context/UserContext";
import axios from "axios";
function App() {
  const [userData, setUserData] = useState({
    token: undefined,
    user: undefined,
  });

  useEffect(() => {
    const checkLoggedIn = async () => {
      let token = localStorage.getItem("auth-token");
      if (token === null) {
        localStorage.setItem("auth-token", "");
        token = "";
      }
      const tokenResponse = await axios.post(
        "http://localhost:5000/users/tokenIsValid",
        null,
        {
          headers: {
            "x-auth-token": token,
          },
        }
      );
      if (tokenResponse.data) {
        const userResponse = await axios.get("http://localhost:5000/users/", {
          headers: {
            "x-auth-token": token,
          },
        });
        setUserData({ token, user: userResponse.data });
      }
    };
    checkLoggedIn();
  }, []);
  return (
    <>
      <BrowserRouter>
        <UserContext.Provider value={{ userData, setUserData }}>
          <Header />
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/register" component={Register} />
          </Switch>
        </UserContext.Provider>
      </BrowserRouter>
    </>
  );
}

export default App;
