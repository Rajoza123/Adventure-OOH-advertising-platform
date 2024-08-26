import React, { useState } from 'react';
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
import axios from 'axios';

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
    });
  };

  return (
    <MDBContainer fluid>

      <MDBRow className='d-flex justify-content-center align-items-center h-100'>
        <MDBCol col='12'>

          <MDBCard className='bg-white my-5 mx-auto' style={{borderRadius: '1rem', maxWidth: '500px'}}>
            <MDBCardBody className='p-5 w-100 d-flex flex-column'>

              <h2 className="fw-bold mb-2 text-center">Sign Up</h2>
              <p className="text-white-50 mb-3">Please enter your login and password!</p>
              <form name='signup' >

              <MDBInput wrapperClass='mb-4 w-100' label='Name' id='formControlLg1' type='text' size="lg" name='name'/>
              <MDBInput wrapperClass='mb-4 w-100' label='Email address' id='formControlLg2' type='email' size="lg" name='email'/>
              <MDBInput wrapperClass='mb-4 w-100' label='Password' id='formControlLg3' type='password' size="lg" maxLength={10} name='password'/>
              <MDBInput wrapperClass='mb-4 w-100' label='Contact No.' id='formControlLg4' type='number' size="lg" name='contact'/>
              <MDBInput wrapperClass='mb-4 w-100' label='Image' id='formControlLg5' type='file' size="lg" name='img'/>

              <MDBCheckbox name='flexCheck' id='flexCheckDefault' className='mb-4' label='Remember password' />

              <button className=' btn btn-primary' type='button' onClick={handlesubmit}>Signup</button>
              </form>
            <a href="/Publisher_signup" className='text-primary'>signup as Publisher</a>
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

export default Signup;