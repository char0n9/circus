import React, { useEffect, useState, useContext } from "react";
import { Container, Col, Row, Button } from "react-bootstrap";
import axios from "axios";
import UserContext from "../../context/UserContext";
import CardComp from "../CardComp";
import Header from "./../layout/Header";
import AuthOptions from "../auth/AuthOptions";
import { useHistory, Link } from "react-router-dom";
export default function Events() {
  const [events, setEvents] = useState();
  const [myEvents, setMyEvents] = useState();
  const { userData } = useContext(UserContext);
  const token = localStorage.getItem("auth-token");
  //   const history = useHistory();
  //   const goCreate = history.push("/events/new");

  const getMyEvents = async () => {
    const response = await axios.get("http://localhost:5000/events/myevents", {
      headers: { "x-auth-token": token },
    });
    setMyEvents(response.data.events);
  };

  useEffect(() => {
    const getEvents = async () => {
      const response = await axios.get("http://localhost:5000/events/", {
        headers: { "x-auth-token": token },
      });
      setEvents(response.data.events);
    };
    getEvents();

    getMyEvents();
    console.log(myEvents);
  }, []);
  const deleteEvent = async (eventId) => {
    const deleteConfirm = await axios({
      method: "delete",
      url: "http://localhost:5000/events/delete",
      headers: { "x-auth-token": token },

      data: {
        eventId,
      },
    });
    getMyEvents();
    // async axios.delete (`http://localhost:5000/events/myevents/${e.target.value._id}`)
  };

  return (
    <Container>
      <AuthOptions />
      <Row
        className="
event-cards"
        md={{ span: 6, offset: 3 }}
      >
        {" "}
        <Col sm={12}>
          <h2>All available events</h2>
        </Col>{" "}
        {events ? (
          events.map((ev) => (
            <Col sm={4}>
              <CardComp
                title={ev.title}
                venue={ev.venue}
                host={ev.host}
                eventId={ev._id}
                name={ev.name}
              />{" "}
            </Col>
          ))
        ) : (
          <h5>Loading...</h5>
        )}
      </Row>
      <Row
        className="
event-cards"
      >
        <Col sm={12}>
          <h2>Your Events</h2>
        </Col>
        {myEvents ? (
          myEvents.map((ev) => (
            <Col sm={4}>
              <CardComp
                deleteEvent={deleteEvent}
                isMine
                eventId={ev._id}
                title={ev.title}
                venue={ev.venue}
                host={ev.host}
                name={ev.name}
              />{" "}
            </Col>
          ))
        ) : (
          <h5>Loading...</h5>
        )}
        <Link to="/events/new">
          <Button>Create a new Event</Button>
        </Link>
      </Row>
    </Container>
  );
}
