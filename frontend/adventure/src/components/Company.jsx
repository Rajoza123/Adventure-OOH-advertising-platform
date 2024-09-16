import React, {useEffect, useState} from 'react'
import CompanyProfile from './CompanyProfile'
import { Container, NavDropdown, Row, Col, Nav, Card, Table, Form, Button, InputGroup } from 'react-bootstrap'
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'
import { Search, Bell, ChevronDown } from 'lucide-react'
import { Outlet } from 'react-router-dom'
import axios from 'axios'
import logo from '../assets/output-onlinegiftools.gif'


const Company = () => {
  
  const [profileData, setProfileData] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(()=>{
    if(window.location.pathname.toLowerCase() == "/company" || window.location.pathname.toLowerCase() == "/company/")
      window.location.assign("/company/dashboard")
  })

  useEffect(()=>{
    axios('http://127.0.0.1:8000/comp_profile/',{
        headers: {
            'Authorization': localStorage.getItem('token'), // Adjust according to your auth mechanism
        },
    })
    .then((res)=>{
        setProfileData(res.data)
    }).catch((e)=>{
      console.log(e)
    })
  },[])
  return (
    <div> 
        <Container fluid className="bg-light min-vh-100 ">
          <Row>
            <Col md={3} className="bg-white sidebar  position-fixed bg-light h-100 top-0" style={{paddingTop:'15vh'}}>

              <div className="d-flex align-items-center mb-4">
                <div className="bg-primary text-white p-2 rounded me-2"> {profileData.name && profileData.name.slice(0,2)} </div>
                <h4 className="mb-0">{ profileData.name}</h4>
              </div>
              <Nav className="flex-column">
                <Nav.Link className="d-flex align-items-center" href='dashboard'>
                  <span className="me-2">📊</span> Dashboard
                </Nav.Link>

                <Nav.Link className="d-flex align-items-center"  href='billboard'>
                  <span className="me-2">🗺</span> BillBoards
                </Nav.Link>


                {/* <Nav.Link className="d-flex align-items-center">
                  <span className="me-2">🛒</span> Events
                </Nav.Link> */}
                <Nav.Link className="d-flex align-items-center"   href='notification'>

                  <span className="me-2">📝</span> Notifications
                </Nav.Link>
              </Nav>
            </Col>

            <Col md={9} className="ms-sm-auto px-md-4 pt-3">
                  <Outlet />
            </Col>
      </Row>
      </Container>


    </div>
  )
}

export default Company