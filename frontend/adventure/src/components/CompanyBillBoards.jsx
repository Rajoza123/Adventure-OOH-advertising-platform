import React from 'react';
import { Container, Row, Col, Card, ListGroup, Form, InputGroup } from 'react-bootstrap';
import { Search, Bell, ChatDots } from 'react-bootstrap-icons';

const companyProfile = {
  name: "Acme Corporation",
  logo: "/placeholder.svg?height=50&width=50",
  description: "A leading provider of innovative solutions."
};

const billboards = [
  { id: 1, location: "Main Street", size: "48x14", startDate: "2023-01-01", endDate: "2023-12-31" },
  { id: 2, location: "Highway 101", size: "96x48", startDate: "2023-02-15", endDate: "2023-08-15" },
  { id: 3, location: "Downtown Square", size: "40x60", startDate: "2023-03-01", endDate: "2023-09-30" },
];

export default function CompanyBillBoards() {
  return (
    <Container fluid className="p-3">
      <Row className="mb-3">
        <Col>
          <div className="d-flex justify-content-between align-items-center">
            <h1 className="mb-0">Company</h1>
          </div>
        </Col>
      </Row>
      <Row>
        <Col md={4}>
          <Card>
            <Card.Body>
              <Card.Title>Company Profile</Card.Title>
              <div className="d-flex align-items-center mb-3">
                <img
                  src={companyProfile.image}
                  alt={`${companyProfile.name} logo`}
                  className="me-3"
                  style={{ width: 50, height: 50 }}
                />
                <h2>{companyProfile.name}</h2>
              </div>
              <Card.Text>{companyProfile.description}</Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col md={8}>
          <Card>
            <Card.Body>
              <Card.Title>Occupied Billboards</Card.Title>
              <ListGroup variant="flush">
                {billboards.map((billboard) => (
                  <ListGroup.Item key={billboard.id}>
                    <div className="d-flex justify-content-between align-items-center">
                      <div>
                        <h5>{billboard.location}</h5>
                        <p className="mb-0">Size: {billboard.size}</p>
                      </div>
                      <div>
                        <p className="mb-0">Start: {billboard.startDate}</p>
                        <p className="mb-0">End: {billboard.endDate}</p>
                      </div>
                    </div>
                  </ListGroup.Item>
                ))}
              </ListGroup>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}