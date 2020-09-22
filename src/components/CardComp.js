import React from "react";
import { Button, Card } from "react-bootstrap";

export default function CardComp({ title, venue, host, isMine, deleteEvent }) {
  return (
    <Card className="each-card">
      <Card.Body>
        <Card.Title>{title}</Card.Title>
        <Card.Subtitle className="mb-2 text-muted">{venue}</Card.Subtitle>
        <Card.Text>
          {host} will hold a {title} event on date at location {venue}
          {isMine && (
            <Button onClick={deleteEvent} variant="warning">
              Delete
            </Button>
          )}
        </Card.Text>
      </Card.Body>
    </Card>
  );
}
