import axios from "axios";
import React from "react";
import { Card, ListGroup } from 'react-bootstrap';
import { Envelope } from 'react-bootstrap-icons';

function Requests(){
  const notifications = [
    { id: 1, message: 'New Requested date on Training 985', time: '1 hour ago' },
    { id: 2, message: 'New Requested date on Training 985', time: '1 hour ago' },
    { id: 3, message: 'New Requested date on Training 985', time: '1 hour ago' },
    { id: 4, message: 'New Requested date on Training 985', time: '1 hour ago' },
  ];


  return (
    <Card style={{ width: '18rem' }} className='container'>
      <Card.Header className="d-flex container justify-content-between align-items-center">
        <span>Notifications</span>
        <span>{notifications.length}</span>
      </Card.Header>
      <ListGroup variant="flush"  className="container">

        {notifications.map((notification) => (
          <ListGroup.Item key={notification.id} className="d-flex align-items-center container">
            <Envelope className="me-2 container"   />

            <div>
              <div>{notification.message}</div>
              <small className="text-muted">{notification.time}</small>
            </div>
          </ListGroup.Item>
        ))}
      </ListGroup>
    </Card>
  );
}

export default Requests