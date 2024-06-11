import React, { useState,useEffect } from 'react';
import { Link } from 'react-router-dom'
import { toast } from 'react-toastify';
import { ToastContainer } from 'react-toastify';
import '../assets/page.css'
import {
  MDBBtn,
  MDBContainer,
  MDBCard,
  MDBCardBody,
  MDBCardImage,
  MDBRow,
  MDBCol,
  MDBInput,
  MDBCheckbox
}
  from 'mdb-react-ui-kit';
import {  addUsersApi, getUsersApi  } from '../Services/allAPI';
import { useNavigate } from 'react-router-dom'



function Signup() {
  const [users, setUsers] = useState([])
  const [detail, setDetail] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: ""
  })

  //backend call
  useEffect( () => {
  
    searchUser()
   
  }, [])

  const searchUser =async()=>{
    const allUsers = await getUsersApi()
    console.log(allUsers.data);
    setUsers(allUsers.data)

  }
  

  const navigate = useNavigate()

  const handleSubmit = async () => {

    const { name, email, password, confirmPassword } = detail

   for (let i = 0; i < users.length; i++) {
    console.log();
    if (users[i].email == email) {
      
      toast.info('already used email')
      return
    } 
   }


    if (!name || !email || !password || !confirmPassword ) {
      toast.info('Please enter all fields')
    } else {
      if (password != confirmPassword) {
        toast.info('Password do not match')
        return
      }
      const response = await addUsersApi(detail)
     // console.log(response);
      if (response.status >= 200 && response.status < 300) {
        toast.success('User added successfully')
        navigate('/')
        
      }

    }

  }


  return (

    <MDBContainer className='my-5'>
      <h2 className='text-center'>Create a New Account</h2>
      <MDBCard>

        <MDBRow className='g-0 d-flex align-items-center'>

          <MDBCol md='4'>
            <MDBCardImage src='https://www.thebalancemoney.com/thmb/RBf6k1fegVn-6GypdL6HzuOwNtE=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/best-expense-tracker-apps-4158958_final-926fb0c0dd404614ac80b829f1b76ee8.png' alt='phone' className='img-test rounded-t-5 rounded-tr-lg-0 ms-3 me-3' fluid />
          </MDBCol>

          <MDBCol md='8'>

            <MDBCardBody>
              <MDBInput onChange={(e) => setDetail({ ...detail, name: e.target.value })}
                wrapperClass='mb-4' label='Enter the name' id='form1' type='text' />

              <MDBInput onChange={(e) => setDetail({ ...detail, email: e.target.value })}
                wrapperClass='mb-4' label='Email address' id='form1' type='email'/>

              <MDBInput onChange={(e) => setDetail({ ...detail, password: e.target.value })}
                wrapperClass='mb-4' label='Password' id='form2' type='password' />

              <MDBInput onChange={(e) => setDetail({ ...detail, confirmPassword: e.target.value })}
                wrapperClass='mb-4' label='Confirm Password' id='form2' type='password' />

              <div className="d-flex justify-content-between mx-4 mb-4">
                Already have an account?<Link to='/' className='signupLink'>Sign In</Link>
                <Link to='#'>Forgot Password ? </Link>
              
              </div>

              <div className='text-center'>
                <button className="btn mb-4 w-50 button-common"  onClick={handleSubmit}><span style={{fontSize:"18px",color:'white'}}>Sign Up</span></button>
                </div>

            </MDBCardBody>

          </MDBCol>

        </MDBRow>

      </MDBCard>
      <ToastContainer theme='colored' position='top-center' autoClose={2000} />
    </MDBContainer>

  )
}

export default Signup