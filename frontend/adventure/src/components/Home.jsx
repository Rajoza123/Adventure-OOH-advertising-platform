import React, { useEffect, useState } from 'react';
import { Carousel, Container } from 'react-bootstrap';
import image1 from './images/large_formate_holdings.jpg';

import '../App.css'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import i1 from './images/ad.jpg'
import i2 from './images/ad1.jpg'
import i3 from './images/ad3.jpg'
import {
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardBody,
  MDBCardTitle,
  MDBCardText,
  MDBCardImage,
  MDBBtn
} from 'mdb-react-ui-kit';
import axios from 'axios'
import { MDBCarousel, MDBCarouselItem, MDBCarouselCaption } from 'mdb-react-ui-kit';


const CarouselComponent = () => {

  const [types, setTypes] = useState([])
  useEffect(() => {
    axios('http://127.0.0.1:8000/billtype/')
      .then((res) => {
        setTypes(res.data)
      }).catch((e) => {
        console.log(e)
      })
  }, [])

  const handleSubmit = () => {
    const formData = document.forms['geoForm']
    console.log(formData.city.value)
    const city = formData.city.value
    const mediaType = formData.mediaType.value
    window.location.assign(`/Map?city=${city}&mediaType=${mediaType}`)
  }
  return (
    <div>
      {/* <div style={{ width: '100%', height: '500px' }}> */}
      <MDBCarousel showIndicators showControls fade className='carasolcontainer'>
        <MDBCarouselItem itemId={1}>
          <img src={i1} className='d-block w-100 carasolimg' alt='...' />
          <MDBCarouselCaption>
            <h5>First slide label</h5>
            <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
          </MDBCarouselCaption>
        </MDBCarouselItem>

        <MDBCarouselItem itemId={2}>
          <img src={i2} className='d-block w-100 carasolimg' alt='...' />
          <MDBCarouselCaption>
            <h5>Second slide label</h5>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
          </MDBCarouselCaption>
        </MDBCarouselItem>

        <MDBCarouselItem itemId={3}>
          <img src={i3} className='d-block w-100 carasolimg' alt='...' />
          <MDBCarouselCaption>
            <h5>Third slide label</h5>
            <p>Praesent commodo cursus magna, vel scelerisque nisl consectetur.</p>
          </MDBCarouselCaption>
        </MDBCarouselItem>
      </MDBCarousel>
      {/* </div> */}
      <div id="search">
        <Container className='mapParaContainer'>
          <Form name='geoForm'>
            <Row className="mb-3">
              <Form.Group as={Col} controlId="formGridEmail">
                <Form.Label>Search for media</Form.Label>
                <Form.Select name='city' >
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

              <Form.Group as={Col} controlId="formGridState">
                <Form.Label>Select Media Type</Form.Label>
                <Form.Select defaultValue="Select Media Type" name='mediaType'>

                  <option defaultValue={'Kiosk'}> - Select the board type - </option>
                  {
                    types.map((type, index) => {
                      return <option key={index} value={type.name}>{type.name}</option>
                    })
                  }
                </Form.Select>
              </Form.Group>
              <Button as={Col} variant="primary" type="button" onClick={handleSubmit}>
                Submit
              </Button>

            </Row>
          </Form>
        </Container>
      </div>
      <MDBRow className="g-5">
        {

          types.map((val, index) => {
            return (
              <MDBCol xs="12" md="6" lg="3" key={index}>

                <MDBCard className="h-100">
                  <MDBCardImage src={'http://127.0.0.1:8000/' + val.image} alt="Card 1" position="top" />
                  <MDBCardBody className="d-flex justify-content-center">
                    <button className="w-100 btn btn-primary">{val.name} </button>
                  </MDBCardBody>
                </MDBCard>
              </MDBCol>
            )
          })
        }
        
      </MDBRow>
    
    </div>
  );
};

export default CarouselComponent;
