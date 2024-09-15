import React from 'react'
import {
    MDBBtn,
    MDBContainer,
    MDBRow,
    MDBCol,
    MDBCard,
    MDBCardBody,
    MDBInput,
    MDBIcon,
    MDBCheckbox
  }
  from 'mdb-react-ui-kit';
  
  function Publisher_signup() {
    return (
      <MDBContainer fluid>
  
        <MDBRow className='d-flex justify-content-center align-items-center h-100'>
          <MDBCol col='12'>
  
            <MDBCard className='bg-white my-5 mx-auto' style={{borderRadius: '1rem', maxWidth: '500px'}}>
              <MDBCardBody className='p-5 w-100 d-flex flex-column'>
  
                <h2 className="fw-bold mb-2 text-center">Sign Up</h2>
                <p className="text-white-50 mb-3">Please enter your login and password!</p>
                <MDBInput wrapperClass='mb-4 w-100' label='Name' id='formControlLg' type='text' size="lg"/>
                <MDBInput wrapperClass='mb-4 w-100' label='Email address' id='formControlLg' type='email' size="lg"/>
                <MDBInput wrapperClass='mb-4 w-100' label='Password' id='formControlLg' type='password' size="lg" maxLength={10}/>
                <MDBInput wrapperClass='mb-4 w-100' label='Contact No.' id='formControlLg' type='number' size="lg"/>
                <MDBInput wrapperClass='mb-4 w-100' label='Image' id='formControlLg' type='file' size="lg"/>
  
                <MDBCheckbox name='flexCheck' id='flexCheckDefault' className='mb-4' label='Remember password' />
  
                <MDBBtn size='lg'>
                  Login
                </MDBBtn>
                <a href="/signup" className='text-primary'>signup as Company</a>
  
                <hr className="my-4" />
  
                <MDBBtn className="mb-2 w-100" size="lg" style={{backgroundColor: '#dd4b39'}}>
                  <MDBIcon fab icon="google" className="mx-2"/>
                  Sign in with google
                </MDBBtn>
  
                <MDBBtn className="mb-4 w-100" size="lg" style={{backgroundColor: '#3b5998'}}>
                  <MDBIcon fab icon="facebook-f" className="mx-2"/>
                  Sign in with facebook
                </MDBBtn>
  
              </MDBCardBody>
            </MDBCard>
  
          </MDBCol>
        </MDBRow>
  
      </MDBContainer>
    );
  }
  

export default Publisher_signup
