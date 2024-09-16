<<<<<<< HEAD
import React, { useState } from 'react';
=======
import React, {useState} from 'react';
>>>>>>> 885cf5c6db69f249a19fd0d0c51790bf672ffe02
import { Button, Container, Row, Col, Card, Form } from 'react-bootstrap';
import { Facebook, Twitter, Google } from 'react-bootstrap-icons';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';

function Login() {

	const [currentUser, setCurrentUser] = useState('company')
	const [api, setAPI] = useState('http://127.0.0.1:8000/comp_signin/')
	const changeUser = () => {
		if (currentUser === 'company') {
			setCurrentUser('publisher')
			setAPI('http://127.0.0.1:8000/pub_signin/')
		} else {
			setCurrentUser('company')
			setAPI('http://127.0.0.1:8000/comp_signin/')
		}
	}
	const handleSubmit = async () => {
		const formdata = new FormData()
		const form = document.forms['signin']
		formdata.append('email', form.email.value)
		formdata.append('password', form.password.value)

<<<<<<< HEAD

		try {
			const response = await axios.post(api, formdata, {
				headers: {
					'Content-Type': 'application/json',
				},
			});

			// Handle successful sign-in
			if (currentUser == 'company') {
				localStorage.setItem('company_id', response.data.id);
				localStorage.setItem('company_name', response.data.name);
				localStorage.setItem('is_authenticated', true);
				localStorage.setItem('token', response.data.token);
				window.location.href = '/company';
			} else {
				localStorage.setItem('publisher_id', response.data.id);
				localStorage.setItem('publisher_name', response.data.name);
				localStorage.setItem('is_authenticated', true);
				localStorage.setItem('token', response.data.token);
				window.location.href = '/publisher';
			}
		} catch (error) {
			alert(error)
		}
	}
	return (
		<Container fluid className="vh-100 d-flex justify-content-center align-items-center">
			<Row className="d-flex justify-content-center align-items-center h-100">
				<Col md={6} lg={12}>
					<Card className="bg-dark text-white my-5 mx-auto" style={{ borderRadius: '1rem', maxWidth: '500px' }}>
						<Card.Body className="p-5 d-flex flex-column align-items-center mx-auto w-100">
							<h2 className="fw-bold mb-2 text-uppercase">Login {currentUser}</h2>
							<p className="text-white-50 mb-5">Please enter your login and password!</p>
							<form name='signin'>
								<Form.Group className="mb-4 w-100" controlId="formBasicEmail">
									<Form.Label>Email address</Form.Label>
									<Form.Control type="email" name='email' placeholder="Enter email" className="bg-dark text-white" />
								</Form.Group>

								<Form.Group className="mb-4 w-100" controlId="formBasicPassword">
									<Form.Label>Password</Form.Label>
									<Form.Control type="password" name='password' placeholder="Enter password" className="bg-dark text-white" />
								</Form.Group>
=======
  const handleSubmit = async ()=>{
    const formdata = new FormData()
    const form = document.forms['signin']
    formdata.append('email', form.email.value)
    formdata.append('password', form.password.value)
    let api = currentUser == "publisher"? "pub_signin" : "comp_signin"

    try {
              const response = await axios.post(`http://127.0.0.1:8000/${api}/`, formdata, {
                headers: {
                    'Content-Type': 'application/json',
                },
            });
    
                // Handle successful sign-in
                localStorage.setItem('company_id', response.data.id);
                localStorage.setItem('company_name', response.data.name);
                localStorage.setItem('is_authenticated', true);
                localStorage.setItem('token',response.data.token);

                // Redirect to a different page, e.g., dashboard
                window.location.href = '/company';
            } catch (error) {
                alert(error)
    }
}
  
return (
    <Container fluid className="vh-100 d-flex justify-content-center align-items-center">
      <Row className="d-flex justify-content-center align-items-center h-100">
        <Col md={6} lg={12}>
          <Card className="bg-dark text-white my-5 mx-auto" style={{ borderRadius: '1rem', maxWidth: '500px' }}>
            <Card.Body className="p-5 d-flex flex-column align-items-center mx-auto w-100">
              <h2 className="fw-bold mb-2 text-uppercase">Login </h2>
              <p className="text-white-50 mb-5" style={{textTransform:'uppercase'}}>{currentUser} login</p>
              <form name='signin'>
              <Form.Group className="mb-4 w-100" controlId="formBasicEmail">
                <Form.Label>Email address</Form.Label>
                <Form.Control type="email" placeholder="Enter email" className="bg-dark text-white" name='email'/>
              </Form.Group>

              <Form.Group className="mb-4 w-100" controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" placeholder="Enter password" className="bg-dark text-white" name='password'/>
              </Form.Group>
>>>>>>> 885cf5c6db69f249a19fd0d0c51790bf672ffe02

								<p className="small mb-3">
									<a className="text-white-50" href="#!">Forgot password?</a>
								</p>

<<<<<<< HEAD
								<Button variant="outline-light" size="lg" className="mb-4" onClick={handleSubmit}>
									Login
								</Button>

								<p className="small mb-3">
									<a className="text-white-50" onClick={changeUser}>Login as a {currentUser} </a>
								</p>

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
							</form>
							<p className="mb-0">
								Don't have an account? <a href="/signup" className="text-white-50 fw-bold">Sign Up</a>
							</p>
						</Card.Body>
					</Card>
				</Col>
			</Row>
		</Container>
	);
=======
              <Button variant="outline-light" size="lg" className="mb-4 container bg-light text-dark fw-bolder" onClick={handleSubmit}>
                Login
              </Button>
              </form>

              <p className="small mb-3">
                <a className="text-white-50" onClick={()=> currentUser == "publisher"? setCurrentUser("company"): setCurrentUser("publisher")}>Login as a {currentUser == 'publisher'? 'company' : 'publisher'}?</a>
              </p>

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
                Don't have an account? <a href="/signup" className="text-white-50 fw-bold">Sign Up</a>
              </p>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
>>>>>>> 885cf5c6db69f249a19fd0d0c51790bf672ffe02
}

export default Login;
