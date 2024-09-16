import React from 'react';
import { Container, Row, Col, Dropdown, Card } from 'react-bootstrap';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';

// Register Chart.js modules
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

function Publisher_Dashboard() {
  // Data for the Line Chart
  const data = {
    labels: ['January', 'February', 'March', 'April', 'May', 'June'], // X-axis labels
    datasets: [
      {
        label: 'Revenue ($)',
        data: [12000, 19000, 30000, 5000, 20000, 30000], // Y-axis data
        fill: false,
        backgroundColor: 'rgb(75, 192, 192)',
        borderColor: 'rgba(75, 192, 192, 1)',
      },
    ],
  };

  // Chart options (optional)
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Monthly Revenue (2024)',
      },
    },
  };

  return (
    <Container fluid>
      <Row>
        {/* Sidebar */}
        <Col md={3} className="bg-light p-3">
          <h4>Admin Panel</h4>

          {/* Billboard Dropdown */}
          <Dropdown className="mb-3">
            <Dropdown.Toggle variant="secondary" id="dropdown-basic">
              Billboard
            </Dropdown.Toggle>
            <Dropdown.Menu>
              <Dropdown.Item href="#/add-billboard">Add Billboard</Dropdown.Item>
              <Dropdown.Item href="#/delete-billboard">Delete Billboard</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>

          {/* Customer Dropdown */}
          <Dropdown className="mb-3">
            <Dropdown.Toggle variant="secondary" id="dropdown-basic">
              Customer
            </Dropdown.Toggle>
            <Dropdown.Menu>
              <Dropdown.Item href="#/customer1">Company 1</Dropdown.Item>
              <Dropdown.Item href="#/customer2">Company 2</Dropdown.Item>
              <Dropdown.Item href="#/customer3">Company 3</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>

          {/* Orders Dropdown */}
          <Dropdown className="mb-3">
            <Dropdown.Toggle variant="secondary" id="dropdown-basic">
              Orders
            </Dropdown.Toggle>
            <Dropdown.Menu>
              <Dropdown.Item href="#/recent-orders">Recent Orders</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </Col>

        {/* Main Content Section */}
        <Col md={9} className="p-3">
          <h4>Dashboard</h4>

          {/* Statistical Values */}
          <Row className="mb-4">
            <Col md={3}>
              <Card className="text-center">
                <Card.Body>
                  <Card.Title>Total Billboards</Card.Title>
                  <Card.Text>120</Card.Text>
                </Card.Body>
              </Card>
            </Col>
            <Col md={3}>
              <Card className="text-center">
                <Card.Body>
                  <Card.Title>Active Customers</Card.Title>
                  <Card.Text>45</Card.Text>
                </Card.Body>
              </Card>
            </Col>
            <Col md={3}>
              <Card className="text-center">
                <Card.Body>
                  <Card.Title>Total Orders</Card.Title>
                  <Card.Text>87</Card.Text>
                </Card.Body>
              </Card>
            </Col>
            <Col md={3}>
              <Card className="text-center">
                <Card.Body>
                  <Card.Title>Revenue</Card.Title>
                  <Card.Text>$120,000</Card.Text>
                </Card.Body>
              </Card>
            </Col>
          </Row>

          {/* Line Chart Section */}
          <Card>
            <Card.Body>
              <Card.Title>Sales Overview</Card.Title>
              <Line data={data} options={options} />
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default Publisher_Dashboard;
