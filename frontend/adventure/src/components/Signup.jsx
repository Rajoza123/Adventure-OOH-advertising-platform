import React ,{useState} from 'react';
import { Button, Container, Row, Col, Card, Form } from 'react-bootstrap';
import { Facebook, Twitter, Google } from 'react-bootstrap-icons';
import axios  from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';

function Signup() {
  const[data,setdata] = useState({})

  const handlesubmit = () => {
    const homedata = document.forms['signup'];
    const formdata = new FormData();
    formdata.append('name', homedata.name.value);
    formdata.append('email', homedata.email.value);
    formdata.append('contact', homedata.contact.value);
    formdata.append('password', homedata.password.value);
    formdata.append('image', homedata.img.files[0]);
  
    axios.post('http://localhost:8000/company/', formdata, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
    .then((res) => {
      console.log(res);
      if(res.status == 201){
        alert("Account Created Successfully")
        window.location.assign('/login')
      }
    })
    .catch((err) => {
      console.log(err);
// eslint-disable-next-line no-irregular-whitespace
    });
// eslint-disable-next-line no-irregular-whitespace
  };
  return (
    <Container fluid className="vh-100 d-flex justify-content-center align-items-center">
      <Row className="d-flex justify-content-center align-items-center h-100">
        <Col md={6} lg={12}>
          <Card className="bg-dark text-white my-5 mx-auto" style={{ borderRadius: '1rem', maxWidth: '500px' }}>
            <Card.Body className="p-5 d-flex flex-column align-items-center mx-auto w-100">
              <h2 className="fw-bold mb-2 text-uppercase">Sign Up</h2>
              <p className="text-white-50 mb-5">Please enter your details to create an account!</p>   
              {/* Full Name */}
              <Form.Group className="mb-4 w-100" controlId="formBasicName">
                <Form.Label>Full Name</Form.Label>
                <Form.Control type="text" placeholder="Enter your name" className="bg-dark text-white" />
              </Form.Group>

              {/* Email Address */}
              <Form.Group className="mb-4 w-100" controlId="formBasicEmail">
                <Form.Label>Email address</Form.Label>
                <Form.Control type="email" placeholder="Enter email" className="bg-dark text-white" />
              </Form.Group>

              {/* Password */}
              <Form.Group className="mb-4 w-100" controlId="formBasicPassword">
                <Form.Label>Contact</Form.Label>
                <Form.Control type="number" placeholder="Enter password" className="bg-dark text-white" />
              </Form.Group>

              <Form.Group className="mb-4 w-100" controlId="formBasicPassword">
                <Form.Label>Image</Form.Label>
                <Form.Control type="file" placeholder="Enter password" className="bg-dark text-white" />
              </Form.Group>

              {/* Confirm Password */}
              <Form.Group className="mb-4 w-100" controlId="formBasicConfirmPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" placeholder="Confirm password" className="bg-dark text-white" />
              </Form.Group>

              <Button variant="outline-light" size="lg" className="mb-4">
                Sign Up
              </Button>

              <div className="d-flex flex-row justify-content-center mb-5">
                <Button variant="link" className="text-white p-2">
                  <Facebook size={28} />
                </Button>
                <Button variant="link" className="text-white p-2">
                  <Twitter size={28} />
                </Button>
                <Button variant="link" className="text-white p-2">
                  <Google size={28} />
                </Button>
              </div>

              <p className="mb-0">
                Signup as publisher <a href="/Publisher_signup" className="text-white-50 fw-bold">Signup</a>
              </p>

              <p className="mb-0">
                Already have an account? <a href="#!" className="text-white-50 fw-bold">Login</a>
              </p>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default Signup;
