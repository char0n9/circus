import React, { useState, useContext } from "react";
import { useHistory } from "react-router-dom";
import UserContext from "../../context/UserContext";
import Axios from "axios";
import ErrorNotice from "../misc/ErrorNotice";
import "./Pages.css";
import { Button } from "react-bootstrap";
export default function NewEvent() {
  const [venue, setVenue] = useState();
  const [title, setTitle] = useState();
  const [date, setDate] = useState();
  const [error, setError] = useState();

  const { userData, setUserData } = useContext(UserContext);
  const history = useHistory();
  const token = userData.token;

  const submit = async (e) => {
    e.preventDefault();
    try {
      const newEvent = { venue, title, date };
      const loginRes = await Axios.post(
        "http://localhost:5000/events/new/",
        newEvent,
        { headers: { "x-auth-token": token } }
      );
      history.push("/events");
    } catch (err) {
      err.response.data.msg && setError(err.response.data.msg);
    }
  };
  return (
    <div className="page">
      <h2 className="reg-text">Create an Event </h2>
      {error && (
        <ErrorNotice message={error} clearError={() => setError(undefined)} />
      )}
      <form className="form-style" onSubmit={submit}>
        <label htmlFor="venue"></label>
        <input
          placeholder="Venue"
          className="input-medium"
          id="venue-field"
          type="text"
          onChange={(e) => setVenue(e.target.value)}
        />

        <label htmlFor="title"></label>
        <input
          placeholder="title"
          className="input-medium"
          id="input-field"
          type="text"
          onChange={(e) => setTitle(e.target.value)}
        />
        <label htmlFor="date"></label>
        <input
          placeholder="date"
          className="input-medium"
          id="input-field"
          type="text"
          onChange={(e) => setDate(e.target.value)}
        />

        <Button
          variant="danger"
          type="submit"
          value="Create Event"
          className="submit-btn"
        >
          Create Event{" "}
        </Button>
      </form>
    </div>
  );
}
