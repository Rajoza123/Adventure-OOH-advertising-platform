// import React from 'react'
// import Map from './Map'
// import {
// MDBCard,
// MDBCardTitle,
// MDBCardText,
// MDBCardBody,
// MDBCardImage,
// MDBRow,
// MDBCol
// } from 'mdb-react-ui-kit';

// const Publisher = () => {
//   return (
    
//     <div>
//     <MDBCard style={{ maxWidth: '540px' }}>
//       <MDBRow className='g-0'>
//         <MDBCol md='4'>
//           <MDBCardImage src='https://mdbootstrap.com/wp-content/uploads/2020/06/vertical.webp' alt='...' fluid />
//         </MDBCol>
//         <MDBCol md='8'>
//           <MDBCardBody>
//             <MDBCardTitle>Card title</MDBCardTitle>
//             <MDBCardText>
//               This is a wider card with supporting text below as a natural lead-in to additional content. This
//               content is a little bit longer.
//             </MDBCardText>
//             <MDBCardText>
//               <small className='text-muted'>Last updated 3 mins ago</small>
//             </MDBCardText>
//           </MDBCardBody>
//         </MDBCol>
//       </MDBRow>
//     </MDBCard>    
//       <Map/>
//       Publisher
//     </div>
//   )
// }

// export default Publisher

import React, { useState } from 'react'
import { BrowserRouter as Router, Route, Link, Routes } from 'react-router-dom'
import { Container, Row, Col, Nav, Card, Table, Form, Button, InputGroup } from 'react-bootstrap'
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'
import { Search, Bell, ChevronDown } from 'lucide-react'

const analyticsData = [
  { name: 'Jan', value: 4000 },
  { name: 'Feb', value: 3000 },
  { name: 'Mar', value: 5000 },
  { name: 'Apr', value: 4500 },
  { name: 'May', value: 6000 },
  { name: 'Jun', value: 5500 },
]

const transactionData = [
  { name: 'Jan', total: 400, success: 300 },
  { name: 'Feb', total: 300, success: 200 },
  { name: 'Mar', total: 500, success: 400 },
  { name: 'Apr', total: 450, success: 350 },
  { name: 'May', total: 600, success: 500 },
  { name: 'Jun', total: 550, success: 450 },
]

const topProductsData = [
  { id: 1, name: 'Premium T-Shirt', revenue: 26680.90, sales: 1072, reviews: 1727, views: 2680 },
  { id: 2, name: 'Vintage T-Shirt', revenue: 16729.19, sales: 1016, reviews: 720, views: 2186 },
  { id: 3, name: 'New Premium Polo', revenue: 12872.24, sales: 987, reviews: 964, views: 1872 },
]

const activeUsersData = [
  { country: 'England', percentage: 72 },
  { country: 'Germany', percentage: 52 },
]

export default function Dashboard() {
  const [searchTerm, setSearchTerm] = useState('')

  return (
    <Router>
      <Container fluid className="bg-light min-vh-100">
        <Row>
          <Col md={3} className="bg-white sidebar p-3">
            <div className="d-flex align-items-center mb-4">
              <div className="bg-primary text-white p-2 rounded me-2">SP</div>
              <h4 className="mb-0">Salepol</h4>
            </div>
            <Nav className="flex-column">
              <Nav.Link as={Link} to="/" className="d-flex align-items-center">
                <span className="me-2">📊</span> Dashboard
              </Nav.Link>
              <Nav.Link as={Link} to="/analytics" className="d-flex align-items-center">
                <span className="me-2">📈</span> Analytics
              </Nav.Link>
              <Nav.Link as={Link} to="/shop" className="d-flex align-items-center">
                <span className="me-2">🛒</span> Shop Analyzer
              </Nav.Link>
              <Nav.Link as={Link} to="/sales" className="d-flex align-items-center">
                <span className="me-2">📝</span> Sales Report
              </Nav.Link>
              <Nav.Link as={Link} to="/transactions" className="d-flex align-items-center">
                <span className="me-2">💳</span> Transactions
              </Nav.Link>
            </Nav>
          </Col>
          <Col md={9} className="ms-sm-auto px-md-4">
            <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
              <h1 className="h2">Welcome Back Brandon</h1>
              <div className="d-flex align-items-center">
                <Bell className="me-3" />
                <img src="/placeholder.svg?height=40&width=40" alt="User" className="rounded-circle" />
                <span className="ms-2">Brandon Rosser</span>
                <ChevronDown className="ms-2" />
              </div>
            </div>
            <InputGroup className="mb-3">
              <InputGroup.Text>
                <Search size={18} />
              </InputGroup.Text>
              <Form.Control
                type="text"
                placeholder="Search..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </InputGroup>
            <Row>
              <Col md={4}>
                <Card className="mb-4">
                  <Card.Body>
                    <Card.Title>Gross Revenue</Card.Title>
                    <h3>$2,480.32</h3>
                    <small className="text-success">↑ 2.15%</small>
                  </Card.Body>
                </Card>
              </Col>
              <Col md={4}>
                <Card className="mb-4">
                  <Card.Body>
                    <Card.Title>Avg. Order Value</Card.Title>
                    <h3>$56.12</h3>
                    <small className="text-danger">↓ 2.15%</small>
                  </Card.Body>
                </Card>
              </Col>
              <Col md={4}>
                <Card className="mb-4">
                  <Card.Body>
                    <Card.Title>Total Orders</Card.Title>
                    <h3>230</h3>
                    <small className="text-success">↑ 2.15%</small>
                  </Card.Body>
                </Card>
              </Col>
            </Row>
            <Row>
              <Col md={6}>
                <Card className="mb-4">
                  <Card.Body>
                    <Card.Title>Orders by time</Card.Title>
                    <ResponsiveContainer width="100%" height={300}>
                      <BarChart data={analyticsData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip />
                        <Bar dataKey="value" fill="#8884d8" />
                      </BarChart>
                    </ResponsiveContainer>
                  </Card.Body>
                </Card>
              </Col>
              <Col md={6}>
                <Card className="mb-4">
                  <Card.Body>
                    <Card.Title>Transaction activity</Card.Title>
                    <ResponsiveContainer width="100%" height={300}>
                      <LineChart data={transactionData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Line type="monotone" dataKey="total" stroke="#8884d8" />
                        <Line type="monotone" dataKey="success" stroke="#82ca9d" />
                      </LineChart>
                    </ResponsiveContainer>
                  </Card.Body>
                </Card>
              </Col>
            </Row>
            <Card className="mb-4">
              <Card.Body>
                <Card.Title>Top Products</Card.Title>
                <Table responsive>
                  <thead>
                    <tr>
                      <th>Product</th>
                      <th>Revenue</th>
                      <th>Sales</th>
                      <th>Reviews</th>
                      <th>Views</th>
                    </tr>
                  </thead>
                  <tbody>
                    {topProductsData.map((product) => (
                      <tr key={product.id}>
                        <td>{product.name}</td>
                        <td>${product.revenue.toFixed(2)}</td>
                        <td>{product.sales}</td>
                        <td>{product.reviews}</td>
                        <td>{product.views}</td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </Card.Body>
            </Card>
            <Card>
              <Card.Body>
                <Card.Title>Active users in countries</Card.Title>
                <h3>7,269</h3>
                <small className="text-success">↑ 8.72%</small>
                {activeUsersData.map((country) => (
                  <div key={country.country} className="mb-2">
                    <div className="d-flex justify-content-between">
                      <span>{country.country}</span>
                      <span>{country.percentage}%</span>
                    </div>
                    <div className="progress">
                      <div
                        className="progress-bar"
                        role="progressbar"
                        style={{ width: `${country.percentage}%` }}
                        aria-valuenow={country.percentage}
                        aria-valuemin={0}
                        aria-valuemax={100}
                      ></div>
                    </div>
                  </div>
                ))}
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </Router>
  )
}