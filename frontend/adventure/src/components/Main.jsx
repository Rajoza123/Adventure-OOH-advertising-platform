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
import Image from 'react-bootstrap/Image'
import logo from '../assets/output-onlinegiftools.gif'
import Publisher_signup from "./Publisher_signup"
import Publisher_Dashboard from './Publisher_Dashboard'
import AddBillboard from './AddBillboard'
import '../App.css'

import React from "react"
import CompanyProfile from "./CompanyProfile"
import Logout from "./Logout"
import BillBoardList from "./BillBoardList"
import Company from "./Company"
import Notification from "./Notification"
import Booking from './Booking'
import Billboardbooking from './Billboard-booking'
import ViewBillBoards from "./ViewBillBoards"
import Requests from "./Requests"
import ViewBillBoard from "./ViewBillBoard"
import DeleteBillBoard from "./DeleteBillBoard"
import UpdateBillBoard from "./UpdateBillBoard"
import CompanyBillBoards from "./CompanyBillBoards"


const Main = () => {

  const authenticated = window.localStorage.is_authenticated
  return (
    <div>
      <Router>
        
        <Navbar bg="primary" data-bs-theme="black" style={{zIndex:2}} >
        <img src={logo} alt="no image " width={'200px'} id="logo" />
        <Container>
          <Nav className=" ms-auto">
            <Nav.Link href="/" className="linkItem">Home</Nav.Link>
            { 
              (authenticated && localStorage.getItem("publisher_id")) && <Nav.Link href="/Publisher"  className="linkItem">Publisher</Nav.Link>
            }
            { 
              (authenticated && localStorage.getItem("company_id")) && <Nav.Link href="/company"  className="linkItem">Company</Nav.Link>
            }
            
            <Nav.Link href="/aboutus"  className="linkItem">About Us</Nav.Link>
            { !authenticated && <> 
              <Nav.Link href="/login"  className="linkItem">Login</Nav.Link>
              <Nav.Link href="/signup"  className="linkItem">Signup</Nav.Link>
            </>}
            { authenticated && <> 
              <Nav.Link href="/logout"  className="linkItem">Logout</Nav.Link>
              {/* <Nav.Link onClick={handleImageClick} className="d-flex align-items-center">
                <Image
                  src={userImageUrl} // URL of the profile image
                  roundedCircle
                  style={{ width: '40px', height: '40px', cursor: 'pointer' }}
                  alt="Profile"
                />
              </Nav.Link> */}
              
            </>}
          </Nav>
        </Container>
        </Navbar>
        <Routes>
            <Route path="/" element={<Home/>}></Route>
            <Route path="/aboutus" element={<About/>}></Route>
            <Route path="/contactus" element={<Contact/>}></Route>
            <Route path="/login" element={<Login/>}></Route>
            <Route path="/map" element={<Map/>}></Route>
            <Route path="/Publisher" element={<Publisher/>}>
                <Route path="dashboard" element={<Publisher_Dashboard />} />
                <Route path="addbillboard" element={<AddBillboard />} />
                <Route path="viewbillboard" element={<ViewBillBoards />} />
                <Route path="requests" element={<Requests />} />
                <Route path="view/:id" element={<ViewBillBoard />} />
                <Route path="update/:id" element={<UpdateBillBoard />} />
                <Route path="delete/:id" element={<DeleteBillBoard />} />
                <Route path="company/:id" element={<CompanyBillBoards />} />

            </Route>
            <Route path="/Signup" element={<Signup/>}></Route>
            <Route path="/Publisher_signup" element={<Publisher_signup/>}></Route>
            <Route path="/company" element={<Company/>}>
                <Route path="dashboard" index={true} element={<CompanyProfile />}></Route>
                <Route path="billboard" element={<BillBoardList />}></Route>
                <Route path="notification" element={<Notification />}></Route>
            </Route>
            <Route path="/logout" element={<Logout/>}></Route>
            <Route path="/pdash" element={<Publisher_Dashboard/>}></Route>
            <Route path="/billboards" element={<BillBoardList/>}></Route>
            <Route path="/addbill" element={<AddBillboard/>}></Route>
            <Route path="/book/:id" element={<Billboardbooking/>}></Route>
        </Routes>
      </Router>
      
    </div>
  )
}

export default Main