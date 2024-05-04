import React, { useState ,useEffect} from 'react';
import { Link } from 'react-router-dom'
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
import { getUsers } from '../Services/allAPI';
import { loginSession } from '../Services/allAPI';
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify';
import { ToastContainer } from 'react-toastify';

function Login() {
    const [users, setUsers] = useState([])
  const [status,setStatus]= useState(true)

  const [detail, setDetail] = useState({ 
    email: "",
    password: "",
  })

    //backend call
  useEffect( () => {
  
    searchUser()
   
  }, [])

  const searchUser =async()=>{
    const allUsers = await getUsers()
    console.log(allUsers.data);
    setUsers(allUsers.data)
  }


  const navigate = useNavigate()

  const handleSubmit = async () => {

    const { email, password } = detail
    if (!email || !password)
    {
      toast.info('please enter all fields')
        return 
    }
    let search = false

   for (let i = 0; i < users.length; i++) {
    console.log();

    if (users[i].email == email) {
      search = true
      if (users[i].password == password) {
        const response = await loginSession(email)
        console.log(response,"this is the login  session ");
        navigate('/home')
      } else{
        toast.info('wrong password')
        return
      }
      
    } 
    // else{
    //   toast.info('user not found')
    //   return
    // }
   }
   if(search == false)
   {
    toast.info('user not found')
   }

    

  }

  return (
    
    <MDBContainer className='my-5'>
      <h2 className='text-center'>Login To Your Account</h2>
      <MDBCard>
      
        <MDBRow className='g-0 d-flex align-items-center'>
             
          <MDBCol md='4'>
            <MDBCardImage src='https://www.thebalancemoney.com/thmb/RBf6k1fegVn-6GypdL6HzuOwNtE=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/best-expense-tracker-apps-4158958_final-926fb0c0dd404614ac80b829f1b76ee8.png' alt='phone' className='ms-3 me-2 img-test rounded-t-5 rounded-tr-lg-0' fluid />
          </MDBCol>

          <MDBCol md='8'>

            <MDBCardBody>

            <MDBInput onChange={(e) => setDetail({ ...detail, email: e.target.value })}
                wrapperClass='mb-4' label='Email address' id='form1' type='email' />

              <MDBInput onChange={(e) => setDetail({ ...detail, password: e.target.value })}
                wrapperClass='mb-4' label='Password' id='form2' type='password' />

              <div className="d-flex justify-content-between mx-4 mb-4">
                Create a new account?<Link to='/signup' className='signupLink'>Sign Up</Link>
                <a href="!#">Forgot password?</a>
              </div>
              <div className='text-center'>
                <button className=" btn mb-4 w-50 button-common"  onClick={handleSubmit}><span style={{fontSize:"18px",color:'white'}}>Sign In</span></button>
                </div>
             

            </MDBCardBody>

          </MDBCol>

        </MDBRow>

      </MDBCard>
      <ToastContainer theme='colored' position='top-center' autoClose={2000} />
    </MDBContainer>
  )
}

export default Login
