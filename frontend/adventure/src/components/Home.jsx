import React from 'react';
import { Carousel, Container } from 'react-bootstrap';
import image1 from './images/large_formate_holdings.jpg';
import image2 from './images/download2.jpeg';
import image3 from './images/pexels-freestockpro-1031700.jpg';
import '../App.css'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import i1 from './images/ad.jpg'
import i2 from './images/ad1.jpg'
import i3 from './images/ad3.jpg'
import backMap from './images/backMap.jpg'
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
import { MDBCarousel, MDBCarouselItem, MDBCarouselCaption } from 'mdb-react-ui-kit';


const CarouselComponent = () => {
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
          <Form>
            <Row className="mb-3">
              <Form.Group as={Col} controlId="formGridEmail">
                <Form.Label>Search for media</Form.Label>
                <Form.Control type="text" placeholder="Enter Board Location for city" />
              </Form.Group>

              <Form.Group as={Col} controlId="formGridState">
                <Form.Label>Select Media Type</Form.Label>
                <Form.Select defaultValue="Select Media Type">
                  <option>Choose...</option>
                  <option>...</option>
                </Form.Select>
              </Form.Group>
              <Button as={Col} variant="primary" type="submit">
                Submit
              </Button>

            </Row>
          </Form>
        </Container>
      </div>
      <MDBRow className="g-5">
      <MDBCol xs="12" md="6" lg="3">
        <MDBCard className="h-100">
          <MDBCardImage src={image1} alt="Card 1" position="top" />
          <MDBCardBody className="d-flex justify-content-center">
            <MDBBtn className="w-100">Large_formate_holdings</MDBBtn>
          </MDBCardBody>
        </MDBCard>
      </MDBCol>
      <MDBCol xs="12" md="6" lg="3">
        <MDBCard className="h-100">
          <MDBCardImage src="https://via.placeholder.com/300x200" alt="Card 2" position="top" />
          <MDBCardBody className="d-flex justify-content-center">
            <MDBBtn className="w-100">Button 2</MDBBtn>
          </MDBCardBody>
        </MDBCard>
      </MDBCol>
      <MDBCol xs="12" md="6" lg="3">
        <MDBCard className="h-100">
          <MDBCardImage src="https://via.placeholder.com/300x200" alt="Card 3" position="top" />
          <MDBCardBody className="d-flex justify-content-center">
            <MDBBtn className="w-100">Button 3</MDBBtn>
          </MDBCardBody>
        </MDBCard>
      </MDBCol>
      <MDBCol xs="12" md="6" lg="3">
        <MDBCard className="h-100">
          <MDBCardImage src="https://via.placeholder.com/300x200" alt="Card 4" position="top" />
          <MDBCardBody className="d-flex justify-content-center">
            <MDBBtn className="w-100">Button 4</MDBBtn>
          </MDBCardBody>
        </MDBCard>
      </MDBCol>
      <MDBCol xs="12" md="6" lg="3">
        <MDBCard className="h-100">
          <MDBCardImage src="https://via.placeholder.com/300x200" alt="Card 5" position="top" />
          <MDBCardBody className="d-flex justify-content-center">
            <MDBBtn className="w-100">Button 5</MDBBtn>
          </MDBCardBody>
        </MDBCard>
      </MDBCol>
      <MDBCol xs="12" md="6" lg="3">
        <MDBCard className="h-100">
          <MDBCardImage src="https://via.placeholder.com/300x200" alt="Card 6" position="top" />
          <MDBCardBody className="d-flex justify-content-center">
            <MDBBtn className="w-100">Button 6</MDBBtn>
          </MDBCardBody>
        </MDBCard>
      </MDBCol>
    </MDBRow>
    </div>
  );
};

export default CarouselComponent;
