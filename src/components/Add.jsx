import { faChartSimple, faPlus } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'
import chart from '../assets/lg1.gif'
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { toast } from 'react-toastify';
import { ToastContainer } from 'react-toastify';
import { uploadIncomeAPI } from '../Services/allAPI';


function Add({setIncomesUploadStatus}) {

    const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  //state to store income details

  const [income,setIncome] = useState({
        title:"",
        amount:"",
        date:"",
        reference:""
   })

//    console.log(income); 

// function to upload income details
    
const handleUpload = async()=>{
    const{title,amount,date,reference}=income

      if(!title || !amount|| !date|| !reference){
        toast.info('please fill the form completely')
      }else{
        
         const response = await uploadIncomeAPI (income)
         console.log(response);

         if(response.status >= 200 && response.status < 300){
            toast.success('income added successfully')
            setIncomesUploadStatus(true)
             setIncome({
                title:"",
                amount:"",
                date:"",
                reference:""
             })

             handleClose()
        }

        else{
            console.log(response);
            toast.error('Something Went Wrong')
        }
        
          

      }
}

    return (
        <>
                 
            <div className='d-flex justify-content-center align-items-center'>
                <button onClick={handleShow} className='btn btn-warning'><FontAwesomeIcon icon={faPlus} style={{ color: "#e8eaed", }} className='me-2' /> Add new income</button>
            </div>

            <Modal show={show} onHide={handleClose} >
                <Modal.Header closeButton>
                    <Modal.Title><FontAwesomeIcon icon={faChartSimple} style={{color: "#FFD43B",}} className='me-4' />Add New Income</Modal.Title>
                </Modal.Header>
                <Modal.Body>

                      <form className='text-center border border-light rounded w-100 '>
                          <input onChange={(e)=>setIncome({...income,title:e.target.value})} className='mb-2 rounded' type="text" placeholder='Salary Title' /><br />
                          <input onChange={(e)=>setIncome({...income,amount:e.target.value})} className='mb-2 rounded' type="text" placeholder='Salary Amount' /><br />
                          <input style={{width:'225px'}} onChange={(e)=>setIncome({...income,date:e.target.value})} className='mb-2 date rounded' type="date" placeholder='Enter a date' /><br />
                          <textarea onChange={(e)=>setIncome({...income,reference:e.target.value})} className='textArea rounded' name="" id="" cols="30" rows="10" placeholder='Add a reference'></textarea>
                          
                         
                       </form> 

                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Cancel
                    </Button>
                    <Button variant="success" onClick={handleUpload}>
                        Add
                    </Button>
                </Modal.Footer>
            </Modal>

            <div className='d-flex mt-1'>
                <img src={chart} width={'100%'} height={'320px'} alt="" />
            </div>


            <ToastContainer theme='colored' position='top-center' autoClose={2000} />

        </>
    )
}

export default Add