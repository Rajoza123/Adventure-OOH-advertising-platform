import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Card, Tab, Nav, Table, Dropdown, Button } from 'react-bootstrap';
import { Clock, GeoAlt, ChevronDown } from 'react-bootstrap-icons';
import { Link } from 'react-router-dom';

const ViewBillBoards = () => {
    const [activeTab, setActiveTab] = useState('upcoming');
    const [bookings, setBookings] = useState([])
    const [billboards, setBillBoards] = useState([])

    useEffect(() => {
        axios.get("http://127.0.0.1:8000/billboard/", {
            headers: {
                'Authorization': localStorage.getItem('token'),
            }
        }).then((res) => {
            console.log(res.data)
            setBookings(res.data)
        }).catch((e) => {
            alert(e)
        })
    }, [])

    //   function dateString) {
    //     const [year, month, day] = dateString.split('-'); // Split the date string
    //     return `${day}-${month}-${year}`; // Rearrange to dd-mm-yyyy
    //   }


    return (
        <div className='d-flex justify-content-center'>

            <Card className="w-100" style={{ maxWidth: '1000px' }}>
                <Card.Header>
                    <Card.Title>Bookings</Card.Title>
                    <Card.Text className="text-muted">
                        List of all billboard.
                    </Card.Text>
                </Card.Header>
                <Card.Body>
                    <Tab.Container activeKey={activeTab} onSelect={(k) => setActiveTab(k)}>

                        <Tab.Content>
                            <Tab.Pane eventKey="upcoming">
                                <Table responsive>
                                    <tbody>
                                        {bookings.map((book) => (
                                            <tr key={book.id} className='my-5'>
                                                <div className="d-flex align-items-center mt-1">
                                                    <img width={"300px"} src={`http://127.0.0.1:8000/${book.image}`} />


                                                </div>

                                                <td>
                                                    <div className="fw-bold">{book.title}</div>
                                                    <div className="d-flex align-items-center mt-1">
                                                        <GeoAlt className="me-1" />
                                                        <small className="text-muted">{book.area}</small>
                                                    </div>
                                                    <div className="d-flex align-items-center mt-1">
                                                        <small className="text-muted">locality: {book.locality}</small>
                                                    </div>
                                                    <div className="d-flex align-items-center mt-1">
                                                        <small className="text-muted">Size: {book.height} × {book.width} </small>
                                                    </div>
                                                    <div className="d-flex align-items-center mt-1">
                                                        <small className="text-muted">Coordinates: {book.coordinates}</small>
                                                    </div>
                                                    <div className="d-flex align-items-center mt-1">
                                                        <small className="text-muted">Locality: {book.locality}</small>
                                                    </div>
                                                    <div className="d-flex align-items-center mt-1">
                                                        <small className="text-muted">Number of Boards: {book.num_of_boards}</small>
                                                    </div>
                                                    <div className="d-flex align-items-center mt-1">
                                                        <small className="text-muted">Price: ₹{book.price}/day</small>
                                                    </div>
                                                    <div className="d-flex align-items-center mt-1">
                                                        <small className="text-muted">Total Amount: ₹{book.price}</small>
                                                    </div>
                                                </td>
                                                <td className="text-end d-flex">
                                                    <Link to={"/publisher/view/"+book.id}><button className="btn border mx-1"> View </button></Link>
                                                    <Link to={"/publisher/update/"+book.id}><button className="btn border mx-1"> Update </button></Link>
                                                    <Link to={"/publisher/delete/"+book.id}><button className="btn border mx-1"> Delete </button></Link>
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

export default ViewBillBoards;