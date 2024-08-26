import React from 'react';
import { Carousel, Container } from 'react-bootstrap';
import image1 from './images/download1.jpeg';
import image2 from './images/download2.jpeg';
import image3 from './images/pexels-freestockpro-1031700.jpg';
import '../App.css'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import {
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
      <MDBCarousel showIndicators showControls fade>
      <MDBCarouselItem itemId={1}>
        <img src='https://mdbootstrap.com/img/Photos/Slides/img%20(15).jpg' className='d-block w-100' alt='...' />
        <MDBCarouselCaption>
          <h5>First slide label</h5>
          <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
        </MDBCarouselCaption>
      </MDBCarouselItem>

      <MDBCarouselItem itemId={2}>
        <img src='https://mdbootstrap.com/img/Photos/Slides/img%20(22).jpg' className='d-block w-100' alt='...' />
        <MDBCarouselCaption>
          <h5>Second slide label</h5>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
        </MDBCarouselCaption>
      </MDBCarouselItem>

      <MDBCarouselItem itemId={3}>
        <img src='https://mdbootstrap.com/img/Photos/Slides/img%20(23).jpg' className='d-block w-100' alt='...' />
        <MDBCarouselCaption>
          <h5>Third slide label</h5>
          <p>Praesent commodo cursus magna, vel scelerisque nisl consectetur.</p>
        </MDBCarouselCaption>
      </MDBCarouselItem>
    </MDBCarousel>
      {/* </div> */}
      <div id="search">
        <Container>
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
      <div className='d-flex'>
      <MDBCard>
        <MDBCardImage src='https://mdbootstrap.com/img/new/standard/nature/184.webp' position='top' alt='...' />
        <MDBCardBody>
          <MDBCardTitle>Card title</MDBCardTitle>
          <MDBCardText>
            Some quick example text to build on the card title and make up the bulk of the card's content.
          </MDBCardText>
          <MDBBtn href='#'>Button</MDBBtn>
        </MDBCardBody>
      </MDBCard>
      <MDBCard>
        <MDBCardImage src='https://mdbootstrap.com/img/new/standard/nature/184.webp' position='top' alt='...' />
        <MDBCardBody>
          <MDBCardTitle>Card title</MDBCardTitle>
          {/* <MDBCardText>
            Some quick example text to build on the card title and make up the bulk of the card's content.
          </MDBCardText> */}
          <MDBBtn href='#'>Button</MDBBtn>
        </MDBCardBody>
      </MDBCard>
      </div>
    </div>
  );
};

export default CarouselComponent;
