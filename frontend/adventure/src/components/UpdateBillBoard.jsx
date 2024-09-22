import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import { MapContainer, TileLayer, useMapEvents, Marker, Popup } from 'react-leaflet';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'leaflet/dist/leaflet.css';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

function UpdateBillBoard() {
    const [formData, setFormData] = useState({
        coordinates: { lat: 23.0225, lng: 72.5714 },
        area: '',
        type: '',
        locality: '',
        width: '',
        height: '',
        price: '',
        num_of_boards: ''
    });
    const [isLoading, setIsLoading] = useState(true);
    const [types, setTypes] = useState([]);
    const { id } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const token = localStorage.getItem('token');
                if (!token) {
                    throw new Error("Unauthorized");
                }

                const billboardRes = await axios.get(`http://127.0.0.1:8000/billboard/${id}/`, {
                    headers: { 'Authorization': token }
                });

                const typesRes = await axios.get('http://127.0.0.1:8000/billtype/', {
                    headers: { 'Authorization': token }
                });
                setFormData(prevData => ({
                    ...prevData,
                    ...billboardRes.data,
                    coordinates: {
                        lat: parseFloat(billboardRes.data.coordinates.split(',')[0]),
                        lng: parseFloat(billboardRes.data.coordinates.split(',')[1])
                    },
                    type: billboardRes.data.type.id,
                    image: billboardRes.data.image
                }));

                console.log(billboardRes.data)

                setTypes(typesRes.data);
            } catch (error) {
                console.error("Error fetching data:", error);
                if (error.message === "Unauthorized") {
                    alert("Unauthorized");
                    navigate('/login');
                }
            } finally {
                setIsLoading(false);
            }
        };

        fetchData();
    }, [id, navigate]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleImageChange = (e) => {
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            let formdata = new FormData();
            const homedata = document.forms['add-bill'];
            formdata.append('area', formData.area);
            formdata.append('type', parseInt(formData.type));
            formdata.append('coordinates', `${formData.coordinates.lat},${formData.coordinates.lng}`);
            formdata.append('locality', formData.locality);
            formdata.append('width', formData.width);
            formdata.append('height', formData.height);
            if(homedata.images.files.length > 0)
            formdata.append('image', homedata.images.files[0]);
            formdata.append('price', formData.price);
            formdata.append('num_of_boards', formData.num_of_boards);

            const token = localStorage.getItem('token');
            if (!token) {
                throw new Error("Unauthorized");
            }

            await axios.put(`http://127.0.0.1:8000/billboard/${id}/`, formdata, {
                headers: { 'Authorization': token }
            });
            alert('Billboard Updated successfully');
        } catch (error) {
            console.error("Error submitting data:", error);
            if (error.message === "Unauthorized") {
                alert("Unauthorized");
                navigate('/login');
            } else {
                alert('An error occurred while updating the billboard.');
            }
        }
    };

    const MapClickHandler = () => {
        useMapEvents({
            click: (e) => {
                setFormData(prevState => ({
                    ...prevState,
                    coordinates: {
                        lat: e.latlng.lat,
                        lng: e.latlng.lng
                    }
                }));
            },
        });
        return null;
    };

    if (isLoading) {
        return <div>Loading...</div>;
    }

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
                        <Marker position={[formData.coordinates.lat, formData.coordinates.lng]}>
                            <Popup>
                                {formData.coordinates.lat}, {formData.coordinates.lng}
                            </Popup>
                        </Marker>
                    </MapContainer>
                </Col>
                <Col md={6}>
                    <Form name='add-bill'>
                        <Form.Group className="mb-3">
                            <Form.Label>Coordinates</Form.Label>
                            <Form.Control
                                name='lat'
                                type="text"
                                placeholder="Latitude"
                                value={formData.coordinates.lat}
                                readOnly
                            />
                            <Form.Control
                                name='lng'
                                type="text"
                                placeholder="Longitude"
                                value={formData.coordinates.lng}
                                readOnly
                            />
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Area</Form.Label>
                            <Form.Select name='area' value={formData.area} onChange={handleChange}>
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
                                name='type'
                                value={formData.type}
                                onChange={handleChange}
                            >
                                {types.map(type => (
                                    <option key={type.id} value={type.id}>{type.name}</option>
                                ))}
                            </Form.Control>
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Locality</Form.Label>
                            <Form.Select name='locality' value={formData.locality} onChange={handleChange}>
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
                                value={formData.width}
                                onChange={handleChange}
                            />
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Height (meters)</Form.Label>
                            <Form.Control
                                type="number"
                                name='height'
                                value={formData.height}
                                onChange={handleChange}
                            />
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Price per Day</Form.Label>
                            <Form.Control
                                type="number"
                                name='price'
                                value={formData.price}
                                onChange={handleChange}
                            />
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Num of boards</Form.Label>
                            <Form.Control
                                type="number"
                                name='num_of_boards'
                                value={formData.num_of_boards}
                                onChange={handleChange}
                            />
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <a href={"http://localhost:8000/" + formData.image} target='_blank'> View Image </a>
                            <Form.Label>Upload Images</Form.Label>
                            <Form.Control
                                type="file"
                                name='images'
                                multiple
                                value={formData.image.url}
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

export default UpdateBillBoard;