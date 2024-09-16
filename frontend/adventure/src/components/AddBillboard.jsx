import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import { MapContainer, TileLayer, useMapEvents, Marker, Popup } from 'react-leaflet';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'leaflet/dist/leaflet.css';
import axios from 'axios';

function AddBillboard() {
    const [types, setTypes] = useState([]);
    const [coordinates, setCoordinates] = useState({ lat: '', lng: '' });
    const [area, setArea] = useState('');
    const [type, setType] = useState('');
    const [locality, setLocality] = useState('');
    const [width, setWidth] = useState('');
    const [height, setHeight] = useState('');
    const [price, setPrice] = useState('');
    const [images, setImages] = useState([]);

    useEffect(() => {
        // Fetch billboard types from Django API
        axios.get('http://127.0.0.1:8000/billtype/')
            .then((res) => {
                setTypes(res.data);
            })
            .catch((e) => {
                console.log(e);
            });
    }, []);

    const handleImageChange = (e) => {
        setImages([...e.target.files]);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Handle form submission logic here
        console.log({
            coordinates,
            area,
            type,
            locality,
            width,
            height,
            price,
            images
        });
    };
    const MapClickHandler = () => {
        useMapEvents({
          click: (e) => {
            setCoordinates({
                lat: e.latlng.lat,
                lng: e.latlng.lng,
              });
          },
        });
        return null;
      };

    return (
        <Container fluid>
            <Row>
                <Col md={6}>
                    <MapContainer center={[23.0225, 72.5714]} zoom={12} style={{ height: '100vh', width: '100%' }}>
                        <TileLayer
                            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                        />
                         <MapClickHandler />
                        <Marker position={[coordinates.lat,coordinates.lng]}>
                            <Popup>
                                {coordinates.lat}, {coordinates.lng}
                            </Popup>
                        </Marker>
                    </MapContainer>
                </Col>
                <Col md={6}>
                    <Form onSubmit={handleSubmit}>
                        <Form.Group className="mb-3">
                            <Form.Label>Coordinates</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Latitude"
                                value={coordinates.lat}
                                onChange={(e) => setCoordinates({ ...coordinates, lat: e.target.value })}
                            />
                            <Form.Control
                                type="text"
                                placeholder="Longitude"
                                value={coordinates.lng}
                                onChange={(e) => setCoordinates({ ...coordinates, lng: e.target.value })}
                            />
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Area</Form.Label>
                            <Form.Select value={area} onChange={(e) => setArea(e.target.value)}>
                                <option value="">Select Area</option>
                                <option value="ashram-road">Ashram Road</option>
                                <option value="navrangpura">Navrangpura</option>
                                <option value="cg-road">C.G. Road</option>
                                <option value="ellisbridge">Ellisbridge</option>
                                <option value="vastrapur">Vastrapur</option>
                                <option value="sg-highway">S.G. Highway</option>
                                <option value="paldi">Paldi</option>
                                <option value="maninagar">Maninagar</option>
                                <option value="bopal">Bopal</option>
                                <option value="gota">Gota</option>
                                <option value="chandkheda">Chandkheda</option>
                                <option value="satellite">Satellite</option>
                                <option value="nikol">Nikol</option>
                                <option value="ghodas">Ghodasar</option>
                                <option value="memnagar">Memnagar</option>
                                <option value="vej">Vejalpur</option>
                                <option value="jodhpur">Jodhpur</option>
                                <option value="ranip">Ranip</option>
                                <option value="amraiwadi">Amraiwadi</option>
                                <option value="naranpura">Naranpura</option>
                                <option value="sabarmati">Sabarmati</option>
                                <option value="lal-darwaja">Lal Darwaja</option>
                                <option value="kalupur">Kalupur</option>
                                <option value="khadia">Khadia</option>
                                <option value="kankaria">Kankaria</option>
                                <option value="vastral">Vastral</option>
                                <option value="anandnagar">Anandnagar</option>
                                <option value="prahlad-nagar">Prahlad Nagar</option>
                                <option value="bodakdev">Bodakdev</option>
                                <option value="thaltej">Thaltej</option>
                                <option value="ghuma">Ghuma</option>
                                <option value="sardar-patel-stadium">Sardar Patel Stadium Area</option>
                                <option value="isanpur">Isanpur</option>
                                <option value="odhav">Odhav</option>
                                <option value="bapunagar">Bapunagar</option>
                                <option value="raipur">Raipur</option>
                                {/* Add more areas as needed */}
                            </Form.Select>
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Type</Form.Label>
                            <Form.Control
                                as="select"
                                value={type}
                                onChange={(e) => setType(e.target.value)}
                            >
                                <option value="">Select Type</option>
                                {types.map(type => (
                                    <option key={type.id} value={type.name}>{type.name}</option>
                                ))}
                            </Form.Control>
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Locality</Form.Label>
                            <Form.Select value={locality} onChange={(e) => setLocality(e.target.value)}>
                                <option value="">Select Locality</option>
                                <option value="residential">Residential</option>
                                <option value="commercial">Commercial</option>
                            </Form.Select>
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Width (meters)</Form.Label>
                            <Form.Control
                                type="number"
                                value={width}
                                onChange={(e) => setWidth(e.target.value)}
                            />
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Height (meters)</Form.Label>
                            <Form.Control
                                type="number"
                                value={height}
                                onChange={(e) => setHeight(e.target.value)}
                            />
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Price per Day</Form.Label>
                            <Form.Control
                                type="number"
                                value={price}
                                onChange={(e) => setPrice(e.target.value)}
                            />
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Upload Images</Form.Label>
                            <Form.Control
                                type="file"
                                multiple
                                onChange={handleImageChange}
                            />
                        </Form.Group>

                        <Button variant="primary" type="submit">
                            Submit
                        </Button>
                    </Form>
                </Col>
            </Row>
        </Container>
    );
}

export default AddBillboard;
