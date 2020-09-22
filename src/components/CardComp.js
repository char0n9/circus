import React from "react";
import { Button, Card } from "react-bootstrap";

export default function CardComp({
  title,
  venue,
  host,
  isMine,
  deleteEvent,
  eventId,
  name,
}) {
  return (
    <Card className="each-card">
      <Card.Body>
        <Card.Title>{title}</Card.Title>
        <Card.Subtitle className="mb-2 text-muted">{venue}</Card.Subtitle>
        <Card.Text>
          {name} will hold a {title} event on date at location {venue}
          {isMine && (
            <Button onClick={() => deleteEvent(eventId)} variant="warning">
              X
            </Button>
          )}
        </Card.Text>
      </Card.Body>
    </Card>
  );
}
