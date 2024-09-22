import React, {useEffect} from 'react';
import { Container, Row, Col, Dropdown, Card } from 'react-bootstrap';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';
import { Outlet } from 'react-router-dom';

// Register Chart.js modules
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

function Publisher_Dashboard() {

  useEffect(()=>{
    if(window.localStorage.getItem("is_authenticated")){
      if(!window.localStorage.getItem("publisher_id")){
        alert("Unauthorized Access")
        window.location.assign("/")
      }
    }else{
      alert("Unauthorized Access")
      window.location.assign("/")
    }
  })

  useEffect(()=>{
    if(window.location.pathname.toLowerCase() == "/publisher" || window.location.pathname.toLowerCase() == "/publisher/")
      window.location.assign("/publisher/dashboard")
  })
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
              <Dropdown.Item href="/publisher/viewbillboard">View BillBoards</Dropdown.Item>
              <Dropdown.Item href="/publisher/addbillboard">Add Billboard</Dropdown.Item>
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
              Updates
            </Dropdown.Toggle>
            <Dropdown.Menu>
              <Dropdown.Item href="requests">BillBoard Requests</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </Col>

        {/* Main Content Section */}
        <Col md={9} className="p-3">
          {/* <h4>Dashboard</h4> */}
          <Outlet />
          {/* Statistical Values */}


          {/* Line Chart Section */}
          {/* <Card>
            <Card.Body>
              <Card.Title>Sales Overview</Card.Title>
              <Line data={data} options={options} />
            </Card.Body>
          </Card> */}
        </Col>
      </Row>
    </Container>
  );
}

export default Publisher_Dashboard;
