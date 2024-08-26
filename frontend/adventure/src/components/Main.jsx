import {BrowserRouter as Router,Route,Routes} from "react-router-dom"
import {Link} from "react-router-dom"
import Home from "./Home"
import About from "./About"
import Contact from "./Contact"
import Login from "./Login"
import Signup from "./Signup"
import Publisher from "./Publisher"
import Map from "./Map"
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import logo from '../assets/output-onlinegiftools.gif'
import '../App.css'

import React from 'react'

const Main = () => {
  return (
    <div>
      <Router>
        <Navbar bg="primary" data-bs-theme="black" >
        <img src={logo} alt="no image " width={'200px'} id="logo" />
        <Container>
          <Nav className=" ms-auto">
            <Nav.Link href="/" className="linkItem">Home</Nav.Link>
            <Nav.Link href="/Publisher"  className="linkItem">Publisher</Nav.Link>
            <Nav.Link href="/company"  className="linkItem">Company</Nav.Link>
            <Nav.Link href="/aboutus"  className="linkItem">About Us</Nav.Link>
            <Nav.Link href="/login"  className="linkItem">Login</Nav.Link>
            <Nav.Link href="/signup"  className="linkItem">Signup</Nav.Link>
          </Nav>
        </Container>
        </Navbar>
        <Routes>
            <Route path="/" element={<Home/>}></Route>
            <Route path="/aboutus" element={<About/>}></Route>
            <Route path="/contactus" element={<Contact/>}></Route>
            <Route path="/login" element={<Login/>}></Route>
            <Route path="/map" element={<Map/>}></Route>
            <Route path="/Publisher" element={<Publisher/>}></Route>
        </Routes>
      </Router>
      
    </div>
  )
}

export default Main