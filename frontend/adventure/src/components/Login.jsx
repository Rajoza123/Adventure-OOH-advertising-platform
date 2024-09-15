// import React, {useState} from 'react';
// import {
//   MDBBtn,
//   MDBContainer,
//   MDBRow,
//   MDBCol,
//   MDBCard,
//   MDBCardBody,
//   MDBInput,
//   MDBIcon,
//   MDBCheckbox
// }
// from 'mdb-react-ui-kit';
// import axios from 'axios';

// function Login() {
  
//   const [currentUser, setCurrentUser] = useState('publisher')

//   const handleSubmit = ()=>{
//     const formdata = new FormData()
//     const form = document.forms['signin']
//     formdata.append('email', form.email.value)
//     formdata.append('password', form.password.value)

//     // axios.post('http://localhost:8000/signin/',formdata)
//     // .then((res)=>{
//     //   console.log(res)
//     // }).catch((e)=>{
//     //   console.log(e)
//     // })

//     axios.post('http://127.0.0.1:8000/signin/', formdata)
//     .then((response) => {
//       console.log(response);
//       // Handle successful sign-in response
//     })
//     .catch((error) => {
      
//       console.error(error);
//     });
//   } 
  
//   return (
//     <MDBContainer fluid>

//       <MDBRow className='d-flex justify-content-center align-items-center h-100'>
//         <MDBCol col='12'>

//           <MDBCard className='bg-white my-5 mx-auto' style={{borderRadius: '1rem', maxWidth: '500px'}}>
//             <MDBCardBody className='p-5 w-100 d-flex flex-column'>

//               <h2 className="fw-bold mb-2 text-center">Sign in</h2>
//               <p className="text-white-50 mb-3">Please enter your login and password!</p>
//               <form name='signin'>

//               <MDBInput wrapperClass='mb-4 w-100' label='Email address' id='formControlLg' type='email' size="lg" name='email'/>
//               <MDBInput wrapperClass='mb-4 w-100' label='Password' id='formControlLg' type='password' size="lg" name='password'/>

//               <MDBCheckbox name='flexCheck' id='flexCheckDefault' className='mb-4' label='Remember password' />

//               <button type='button' className='btn btn-primary' size='lg' onClick={handleSubmit}>
//                 Login
//               </button>
//               </form>


//               <hr className="my-4" />
//               <div className='container'>
//                 <p >Login as <a className='text-primary form-link' onClick={()=> setCurrentUser(currentUser == 'publisher'? "company" : "publisher")}>{currentUser == 'publisher'? "Company" : "Publisher"}? </a></p>
//               </div>
//               <MDBBtn className="mb-2 w-100" size="lg" style={{backgroundColor: '#dd4b39'}}>
//                 <MDBIcon fab icon="google" className="mx-2"/>
//                 Sign in with google
//               </MDBBtn>

//               <MDBBtn className="mb-4 w-100" size="lg" style={{backgroundColor: '#3b5998'}}>
//                 <MDBIcon fab icon="facebook-f" className="mx-2"/>
//                 Sign in with facebook
//               </MDBBtn>

//             </MDBCardBody>
//           </MDBCard>

//         </MDBCol>
//       </MDBRow>

//     </MDBContainer>
//   );
// }

// export default Login;

import  {useState} from 'react';
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

function SignIn() {

      const [currentUser, setCurrentUser] = useState('publisher')

  const handleSubmit = async ()=>{
    const formdata = new FormData()
    const form = document.forms['signin']
    formdata.append('email', form.email.value)
    formdata.append('password', form.password.value)


    try {
              const response = await axios.post('http://127.0.0.1:8000/signin/', formdata, {
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
        <MDBContainer fluid>

       <MDBRow className='d-flex justify-content-center align-items-center h-100'>
         <MDBCol col='12'>

           <MDBCard className='bg-white my-5 mx-auto' style={{borderRadius: '1rem', maxWidth: '500px'}}>
             <MDBCardBody className='p-5 w-100 d-flex flex-column'>

               <h2 className="fw-bold mb-2 text-center">Sign in</h2>
               <p className="text-white-50 mb-3">Please enter your login and password!</p>
               <form name='signin'>

               <MDBInput wrapperClass='mb-4 w-100' label='Email address' id='formControlLg' type='email' size="lg" name='email'/>
               <MDBInput wrapperClass='mb-4 w-100' label='Password' id='formControlLg' type='password' size="lg" name='password'/>

               <MDBCheckbox name='flexCheck' id='flexCheckDefault' className='mb-4' label='Remember password' />
               <button type='button' className='btn btn-primary' size='lg' onClick={handleSubmit}>
                 Login
               </button>
               </form>


               <hr className="my-4" />
               <div className='container'>
                 <p >Login as <a className='text-primary form-link' onClick={()=> setCurrentUser(currentUser == 'publisher'? "company" : "publisher")}>{currentUser == 'publisher'? "Company" : "Publisher"}? </a></p>
               </div>
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

export default SignIn;