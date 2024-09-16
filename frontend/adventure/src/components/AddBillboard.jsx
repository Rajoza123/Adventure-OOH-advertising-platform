import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import { MapContainer, TileLayer, useMapEvents, Marker, Popup } from 'react-leaflet';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'leaflet/dist/leaflet.css';
import axios from 'axios';
import L from 'leaflet'; // Import Leaflet for marker icon fix

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
    const [markerPosition, setMarkerPosition] = useState(null);

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

    const handleMapClick = (event) => {
        const { lat, lng } = event.latlng;
        setCoordinates({ lat, lng });
        setMarkerPosition({ lat, lng });
        console.log(event)
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
                    <MapContainer 
                        center={[23.0225, 72.5714]} 
                        zoom={12} 
                        style={{ height: '100vh', width: '100%' }} 
                        onClick={handleMapClick}
                    >
                        <TileLayer
                            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                        />
                        {markerPosition && (
                            <Marker position={[markerPosition.lat, markerPosition.lng]}>
                                <Popup>
                                    {markerPosition.lat}, {markerPosition.lng}
                                </Popup>
                            </Marker>
                        )}
                    </MapContainer>
                </Col>
                <Col md={6}>
                    <Form onSubmit={handleSubmit}>
                        <Form.Group className="mb-3">
                            <Form.Label>Latitude</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Latitude"
                                value={coordinates.lat}
                                readOnly
                            />
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Longitude</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Longitude"
                                value={coordinates.lng}
                                readOnly
                            />
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Area</Form.Label>
                            <Form.Select value={area} onChange={(e) => setArea(e.target.value)}>
                                <option value="">Select Area</option>
                                {/* Your area options here */}
                                <option value="ashram-road">Ashram Road</option>
                                <option value="navrangpura">Navrangpura</option>
                                {/* ... */}
                            </Form.Select>
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Type</Form.Label>
                            <Form.Select
                                value={type}
                                onChange={(e) => setType(e.target.value)}
                            >
                                <option value="">Select Type</option>
                                {types.map(type => (
                                    <option key={type.id} value={type.name}>{type.name}</option>
                                ))}
                            </Form.Select>
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
