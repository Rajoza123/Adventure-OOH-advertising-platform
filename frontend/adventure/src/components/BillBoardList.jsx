import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Card, Tab, Nav, Table, Dropdown, Button } from 'react-bootstrap';
import { Clock, GeoAlt, ChevronDown } from 'react-bootstrap-icons';

const BillBoardList = () => {
  const [activeTab, setActiveTab] = useState('upcoming');
  const [billboards, setBillBoards] = useState([])

  useEffect(()=>{
    axios.get("http://127.0.0.1:8000/billboard/").then((res)=>{
      console.log(res)
      setBillBoards([...res.data])
      
    }).catch((e)=>{
      alert(e)
    })
  },[])

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
      date: 30,
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
    <div className='d-flex justify-content-center'> 

    <Card className="w-100" style={{ maxWidth: '1000px' }}>
      <Card.Header>
        <Card.Title>Bookings</Card.Title>
        <Card.Text className="text-muted">
          See your scheduled billboard.
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
  {billboards.map((billboard) => (
    <tr key={billboard.id} className='my-5'>
        <div className="d-flex align-items-center mt-1">
           <img src={'http://127.0.0.1:8000/'+billboard.image} alt="billboard image" width={'100%'} style={{maxWidth:'350px'}}/>
        </div>
      <td className="text-center" style={{ width: '60px' }}>
        <div className="fs-4 fw-bold text-danger">{billboard.date}</div>
        <div className="text-muted">{billboard.date}</div>
      </td>
      <td>
        <div className="d-flex align-items-center mb-1">
          <Clock className="me-1" />
          <small className="text-muted">{billboard.date}</small>
        </div>
        <div className="fw-bold">{billboard.title}</div>
        <div className="d-flex align-items-center mt-1">
          <GeoAlt className="me-1" />
          <small className="text-muted">{billboard.area}</small>
        </div>
        {/* <div className="d-flex align-items-center mt-1">
          <small className="text-muted">Area: {billboard.area}</small>
        </div> */}
        <div className="d-flex align-items-center mt-1">
          <small className="text-muted">Coordinates: {billboard.coordinates}</small>
        </div>
        <div className="d-flex align-items-center mt-1">
          <small className="text-muted">Height: {billboard.height}</small>
        </div>
        <div className="d-flex align-items-center mt-1">
          <small className="text-muted">Lat: {billboard.lat}</small>
        </div>
        <div className="d-flex align-items-center mt-1">
          <small className="text-muted">Lng: {billboard.lng}</small>
        </div>
        <div className="d-flex align-items-center mt-1">
          <small className="text-muted">Locality: {billboard.locality}</small>
        </div>
        <div className="d-flex align-items-center mt-1">
          <small className="text-muted">Number of Boards: {billboard.num_of_boards}</small>
        </div>
        <div className="d-flex align-items-center mt-1">
          <small className="text-muted">Price: {billboard.price}</small>
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
    </div>
  );
};

export default BillBoardList;