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
    const [num_board, setNumBoards] = useState('');
    let markerPosition = {'lat':23.0225, 'lng':72.5714}

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
        setImages(e.target.files[0]);
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        let formdata = new FormData()
        const homedata = document.forms['add-bill'];
        formdata.append('area', area)
        formdata.append('type', type)
        formdata.append('coordinates', coordinates.lat+','+coordinates.lng)
        formdata.append('locality',locality)
        formdata.append('width',width)
        formdata.append('height',height )
        formdata.append('image',homedata.images.files[0])
        formdata.append('price',price )
        formdata.append('num_of_boards',num_board )

        axios.post('http://127.0.0.1:8000/billboard/',formdata,{
            headers: {'Authorization': localStorage.getItem('token')}
        }).then(()=>{
            alert('Billboard added successfully')
        }).catch((e)=>{
            alert(e);
        })
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

                        {markerPosition && (
                            <Marker position={[markerPosition.lat, markerPosition.lng]}>
                                <Popup>
                                    {markerPosition.lat}, {markerPosition.lng}
                                </Popup>
                            </Marker>
                        )}

                        <MapClickHandler />
                        <Marker position={[coordinates.lat, coordinates.lng]}>
                            <Popup>
                                {coordinates.lat}, {coordinates.lng}
                            </Popup>
                        </Marker>
                    </MapContainer>
                </Col>
                <Col md={6}>
                    <Form name='add-bill' >
                        <Form.Group className="mb-3">
                            <Form.Label>Coordinates</Form.Label>
                            <Form.Control
                                name='lat'
                                type="text"
                                placeholder="Latitude"
                                value={coordinates.lat}
                                readOnly
                            />
                            <Form.Control
                                name='lng'
                                type="text"
                                placeholder="Longitude"
                                value={coordinates.lng}
                                readOnly
                            />
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Area</Form.Label>
                            <Form.Select name='area' value={area} onChange={(e) => setArea(e.target.value)}>
                                <option value="" >Select Area</option>
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
                                name='type'
                                value={type}
                                onChange={(e) => setType(e.target.value)}
                            >
                                <option value="">Select Type</option>
                                {types.map(type => (
                                    <option key={type.id} value={type.id}>{type.name}</option>
                                ))}
                            </Form.Control>
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Locality</Form.Label>
                            <Form.Select name='locality' value={locality} onChange={(e) => setLocality(e.target.value)}>
                                <option value="">Select Locality</option>
                                <option value="residential">Residential</option>
                                <option value="commercial">Commercial</option>
                            </Form.Select>
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Width (meters)</Form.Label>
                            <Form.Control
                                type="number"
                                name='width'
                                value={width}
                                onChange={(e) => setWidth(e.target.value)}
                            />
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Height (meters)</Form.Label>
                            <Form.Control
                                type="number"
                                name='height'
                                value={height}
                                onChange={(e) => setHeight(e.target.value)}
                            />
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Price per Day</Form.Label>
                            <Form.Control
                                type="number"
                                name='price'
                                value={price}
                                onChange={(e) => setPrice(e.target.value)}
                            />
                        </Form.Group>
                        
                        <Form.Group className="mb-3">
                            <Form.Label>Num of boards</Form.Label>
                            <Form.Control
                                type="number"
                                name='num_board'
                                value={num_board}
                                onChange={(e) => setNumBoards(e.target.value)}
                            />
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Upload Images</Form.Label>
                            <Form.Control
                                type="file"
                                name='images'
                                multiple
                                onChange={handleImageChange}
                            />
                        </Form.Group>

                        <Button variant="primary" onClick={handleSubmit}>
                            Submit
                        </Button>
                    </Form>
                </Col>
            </Row>
        </Container>
    );
}

export default AddBillboard;
