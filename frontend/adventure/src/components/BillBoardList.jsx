import React, { useState } from 'react';
import { Card, Tab, Nav, Table, Dropdown, Button } from 'react-bootstrap';
import { Clock, GeoAlt, ChevronDown } from 'react-bootstrap-icons';

const BillBoardList = () => {
  const [activeTab, setActiveTab] = useState('upcoming');

  const bookings = [
    {
      id: 1,
      date: 28,
      time: "09:00 - 09:30",
      title: "30min call meeting Peer <> Leslie",
      location: "Online",
      participants: ["/placeholder.svg?height=32&width=32", "/placeholder.svg?height=32&width=32"],
    },
    {
      id: 2,
      date: { day: "Fri", number: 30 },
      time: "15:20 - 16:20",
      title: "Livn Product Demo",
      location: "Wework Paris, ...",
      participants: [
        "/placeholder.svg?height=32&width=32",
        "/placeholder.svg?height=32&width=32",
        "/placeholder.svg?height=32&width=32",
        "/placeholder.svg?height=32&width=32",
      ],
    },
    // Add more bookings here...
  ];

  return (
    <Card className="w-100" style={{ maxWidth: '800px' }}>
      <Card.Header>
        <Card.Title>Bookings</Card.Title>
        <Card.Text className="text-muted">
          See your scheduled events from your calendar events links.
        </Card.Text>
      </Card.Header>
      <Card.Body>
        <Tab.Container activeKey={activeTab} onSelect={(k) => setActiveTab(k)}>
          <Nav variant="tabs" className="mb-3">
            <Nav.Item>
              <Nav.Link eventKey="upcoming">Upcoming</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link eventKey="recurring">Recurring</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link eventKey="past">Past</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link eventKey="cancelled">Cancelled</Nav.Link>
            </Nav.Item>
          </Nav>
          <Tab.Content>
            <Tab.Pane eventKey="upcoming">
              <Table responsive>
                <tbody>
                  {bookings.map((booking) => (
                    <tr key={booking.id}>
                      <td className="text-center" style={{ width: '60px' }}>
                        <div className="fs-4 fw-bold text-danger">{booking.date}</div>
                        <div className="text-muted">{booking.date}</div>
                      </td>
                      <td>
                        <div className="d-flex align-items-center mb-1">
                          <Clock className="me-1" />
                          <small className="text-muted">{booking.date}</small>
                        </div>
                        <div className="fw-bold">{booking.title}</div>
                        <div className="d-flex align-items-center mt-1">
                          <GeoAlt className="me-1" />
                          <small className="text-muted">{booking.location}</small>
                        </div>
                        <div className="mt-2">
                          {booking.participants.map((participant, index) => (
                            <img
                              key={index}
                              src={participant}
                              alt={`Participant ${index + 1}`}
                              className="rounded-circle me-1"
                              style={{ width: '32px', height: '32px' }}
                            />
                          ))}
                        </div>
                      </td>
                      <td className="text-end">
                        <Dropdown>
                          <Dropdown.Toggle variant="light" size="sm">
                            Edit <ChevronDown />
                          </Dropdown.Toggle>
                          <Dropdown.Menu align="end">
                            <Dropdown.Item>Reschedule booking</Dropdown.Item>
                            <Dropdown.Item>Request reschedule</Dropdown.Item>
                            <Dropdown.Item>Edit location</Dropdown.Item>
                            <Dropdown.Item>Invite people</Dropdown.Item>
                            <Dropdown.Item>Cancel event</Dropdown.Item>
                          </Dropdown.Menu>
                        </Dropdown>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </Tab.Pane>
            {/* Add content for other tabs here */}
          </Tab.Content>
        </Tab.Container>
      </Card.Body>
    </Card>
  );
};

export default BillBoardList;