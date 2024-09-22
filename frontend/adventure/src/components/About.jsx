import React from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import img1 from './images/Rajoza.jpg'
export default function About() {
  const data = [
    {
      'name': 'Raj oza',
      'image': img1,
      'desc': 'Python developer'

    },
    {
      'name': 'Vinay Koshti',
      'image': img1,
      'desc': 'Python developer'

    },
    {
      'name': 'Dhruv Ahir',
      'image': img1,
      'desc': 'Python developer'

    },
  ]


  return (
    <Container className="py-5">
      <Row className="mb-5">
        <Col>
          <h1 className="display-4 text-center mb-4">About AdVenture</h1>
          <p className="lead text-center">
            Connecting companies and billboard publishers for innovative advertising solutions.
          </p>
        </Col>
      </Row>

      <Row className="mb-5">
        <Col md={4}>
          <Card className="h-100">
            <Card.Body>
              <Card.Title>Our Mission</Card.Title>
              <Card.Text>
                To revolutionize outdoor advertising by creating a seamless platform for collaboration between advertisers and billboard owners.
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4}>
          <Card className="h-100">
            <Card.Body>
              <Card.Title>Our Vision</Card.Title>
              <Card.Text>
                To become the go-to marketplace for outdoor advertising, driving innovation and growth in the industry.
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4}>
          <Card className="h-100">
            <Card.Body>
              <Card.Title>Our Values</Card.Title>
              <Card.Text>
                Innovation, transparency, and partnership are at the core of everything we do at AdVenture.
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <Row className="mb-5">
        <Col lg={6}>
          <h2 className="mb-4">Who We Are</h2>
          <p>
            AdVenture is a cutting-edge platform that bridges the gap between companies seeking impactful advertising spaces and billboard publishers looking to maximize their inventory. Our team of dedicated professionals combines expertise in advertising, technology, and customer service to deliver an unparalleled experience for all our users.
          </p>
        </Col>
        <Col lg={6}>
          <h2 className="mb-4">What We Do</h2>
          <p>
            We provide a user-friendly, efficient platform that allows companies to easily find and book billboard spaces while enabling publishers to showcase their inventory to a wide audience. Our advanced matching algorithms and real-time analytics ensure optimal results for both advertisers and publishers.
          </p>
        </Col>
      </Row>

      <Row className="mb-5">
        <Col>
          <h2 className="text-center mb-4 d-flex justify-content-center">Our Team</h2>
          <Row className='d-flex justify-content-center'>
            {data.map((role, index) => (
              <Col key={index} md={3} className="mb-4 mx-4">
                <Card>
                  <Card.Img variant="top" src={role.image} />
                  <Card.Body>
                    <Card.Title className='text-center'>{role.name}</Card.Title>
                    <Card.Text>
                      {role.desc}

                    </Card.Text>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </Col>
      </Row>

      <Row>
        <Col className="text-center">
          <h2 className="mb-4">Join the AdVenture</h2>
          <p className="mb-4">
            Whether you're an advertiser looking for the perfect billboard or a publisher wanting to showcase your inventory, AdVenture is here to help you succeed.
          </p>
          <Link to={'/login'}>
            <Button variant="primary" size="lg">
              Get Started <ArrowRight className="ml-2" />
            </Button>

          </Link>
        </Col>
      </Row>
    </Container>
  );
}