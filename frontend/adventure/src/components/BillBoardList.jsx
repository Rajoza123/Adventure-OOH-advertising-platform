import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Card, Tab, Nav, Table, Dropdown, Button } from 'react-bootstrap';
import { Clock, GeoAlt, ChevronDown } from 'react-bootstrap-icons';

const BillBoardList = () => {
  const [activeTab, setActiveTab] = useState('upcoming');
  const [bookings, setBookings] = useState([])
  const [billboards, setBillBoards] = useState([])

  useEffect(()=>{
    axios.get("http://127.0.0.1:8000/bookings/",{
      headers: {
          'Authorization': localStorage.getItem('token'),
      }}).then((res)=>{
      console.log(res.data)
      setBookings(res.data)
    }).catch((e)=>{
      alert(e)
    })
  },[])

  function dformat(dateString) {
    const [year, month, day] = dateString.split('-'); // Split the date string
    return `${day}-${month}-${year}`; // Rearrange to dd-mm-yyyy
  }


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
  {bookings.map((book) => (
    <tr key={book.billboard.id} className='my-5'>
        <div className="d-flex align-items-center mt-1">
<a href={`http://127.0.0.1:8000/${book.file}`} download={book.file.split('/').pop()}>
  View file
</a>
           
        </div>
      <td className="text-center" style={{ width: '60px' }}>
        <div className="fs-4 fw-bold text-danger">{book.billboard.date}</div>
        <div className="text-muted">{book.billboard.date}</div>
      </td>
      <td>
        <div className="d-flex align-items-center mb-1">
          <Clock className="me-1" />
          <small className="text-muted">{dformat(book.start_date)} - {dformat(book.end_date)}</small>
        </div>
        <div className="fw-bold">{book.billboard.title}</div>
        <div className="d-flex align-items-center mt-1">
          <GeoAlt className="me-1" />
          <small className="text-muted">{book.billboard.area}</small>
        </div>
        <div className="d-flex align-items-center mt-1">
          <small className="text-muted">locality: {book.billboard.locality}</small>
        </div>

        <div className="d-flex align-items-center mt-1">
          <small className="text-muted">Size: {book.billboard.height} × {book.billboard.width} </small>
        </div>
        <div className="d-flex align-items-center mt-1">
          <small className="text-muted">Coordinates: {book.billboard.coordinates}</small>
        </div>
        <div className="d-flex align-items-center mt-1">
          <small className="text-muted">Locality: {book.billboard.locality}</small>
        </div>
        <div className="d-flex align-items-center mt-1">
          <small className="text-muted">Number of Boards: {book.billboard.num_of_boards}</small>
        </div>
        <div className="d-flex align-items-center mt-1">
          <small className="text-muted">Price: {book.billboard.price}</small>
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