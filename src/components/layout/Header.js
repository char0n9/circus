import React, { useContext } from "react";
import { Link, useHistory } from "react-router-dom";
import AuthOptions from "../auth/AuthOptions";
import UserContext from "./../../context/UserContext";

export default function Header() {
  const { userData } = useContext(UserContext);
  const name = localStorage.getItem("user");
  const history = useHistory();
  const goHome = history.push("/");
  console.log(name);
  return <AuthOptions />;
}
