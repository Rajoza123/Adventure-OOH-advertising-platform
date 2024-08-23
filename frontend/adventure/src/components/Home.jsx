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

const CarouselComponent = () => {
  return (
    <div style={{ width: '100%', height: '500px' }}>
      <Carousel>
        <Carousel.Item>
          <img
            className="d-block w-auto"
            src={image1}
            alt="First slide"
            id='img'

          />
          <Carousel.Caption>
            <h3>First Slide Label</h3>
            <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block w-auto"
            src={image2}
            alt="Second slide"
            id='img'
          />
          <Carousel.Caption>
            <h3>Second Slide Label</h3>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block w-auto"
            src={image3}
            alt="Third slide"
            id='img'
          />
          <Carousel.Caption>
            <h3>Third Slide Label</h3>
            <p>Praesent commodo cursus magna, vel scelerisque nisl consectetur.</p>
          </Carousel.Caption>
        </Carousel.Item>
      </Carousel>
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
    </div>
  );
};

export default CarouselComponent;
