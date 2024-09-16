import React, { useState,useEffect } from 'react'
import { Container, NavDropdown, Row, Col, Nav, Card, Table, Form, Button, InputGroup } from 'react-bootstrap'
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'
import { Search, Bell, ChevronDown } from 'lucide-react'
import axios from 'axios';


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

  const [profileData, setProfileData] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');

  let company = {}

  useEffect(()=>{
      axios('http://127.0.0.1:8000/comp_profile/',{
          headers: {
              'Authorization': localStorage.getItem('token'), // Adjust according to your auth mechanism
          },
      })
      .then((res)=>{
          console.log(res)
          setProfileData(res.data)
      }).catch((e)=>{
        console.log(e)
      })
    },[])

  return (
    <>

              <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
                <h1 className="h2">Dashboard </h1>
              </div>
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
                      <Card.Title>Currently Acquired</Card.Title>
                      <h3>90</h3>
                      <small className="text-danger">↓ 2.15%</small>
                    </Card.Body>
                  </Card>
                </Col>
                <Col md={4}>
                  <Card className="mb-4">
                    <Card.Body>
                      <Card.Title>Total BillBoards</Card.Title>
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
                  <Card.Title>Top BillBoards</Card.Title>
                  <Table responsive>
                    <thead>
                      <tr>
                        <th>BillBoard</th>
                        <th >Area</th>
                        <th>Locality</th>
                        <th>Avg. Viewers</th>
                        <th>Estimated Viewers</th>
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
             
            {/* <Card className="mb-4">
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
            </Card> */}

    </>
  )
}