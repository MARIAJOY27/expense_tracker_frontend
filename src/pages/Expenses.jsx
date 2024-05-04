
import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faReceipt, faTrash, faGlobe } from '@fortawesome/free-solid-svg-icons';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { deleteAnExpenseAPI, getUploadExpenseAPI, uploadExpenseAPI } from '../Services/allAPI';
import Header from '../components/Header';


function Expenses() {
  //state to hold the expense
  const [expense, setExpense] = useState([])

  const [expenseUploadstatus, setExpenseUploadStatus] = useState({})
  const [expenseDeleteStatus, setExpenseDeleteStatus] = useState(false)
  const [show, setShow] = useState(false)
  const [details, setDetails] = useState({

    title: "",
    amount: "",
    date: "",
    info: ""
  })
  console.log(details);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);


  //Adding Expense
  const handleUpload = async () => {
    const { title, amount, date, info } = details
    if (!title || !amount || !date || !info) {
      toast.info('please fill the form completely')
    } else {
      const response = await uploadExpenseAPI(details)
      console.log(response);
      if (response.status >= 200 && response.status < 300) {

        toast.success('Expense added successfully ')
        setExpenseUploadStatus(response.data)
        setDetails({
          title: "",
          amount: "",
          date: "",
          info: ""
        })
        handleClose()
      } else {
        console.log(response);
        toast.error('something went wrong')
      }

    }
  }
  //get expense
  const getExpense = async () => {
    const result = await getUploadExpenseAPI()
    setExpense(result.data)
  }

  console.log(expense)
  let sum = 0
  for (let i = 0; i < expense.length; i++) {
    sum += Number(expense[i].amount)
  }
  console.log(sum)

  //delete expense
  const handleDelete = async (id) => {
    const response = await deleteAnExpenseAPI(id)
    console.log(response)
    setExpenseDeleteStatus(true)
  }


  useEffect(() => {
    getExpense()
    setExpenseDeleteStatus(false)
  }, [expenseUploadstatus, expenseDeleteStatus])


  return (
    <>
    <Header/>
      <div >
        <div className='row '>
          
          <div className='col-md-11 m-3 p-3 rounded' style={{ height: '80vh', backgroundColor: 'white', overscrollBehavior: '' }}>
            <h3 className='text-center' style={{ overflowY: 'hidden' }} ><b><span className='track'>Track Your Expenses: See Where Your Money Goes</span></b></h3>

            <div className='row'>
              <div className='mt-3 pt-2 ms-5 w-100 rounded' style={{ backgroundColor: '#B4D3B2', height: '60px', textAlign: 'center' }}><h3 className='exp mt-2 ' style={{ color:'#2D3178', overflowY: 'hidden',fontWeight:'bolder' }}>Total Expense:  ₹{sum}</h3></div>
               <div className="col-md-1"></div>
              <div className='col-md-3 rounded mt-5 pt-3'>
                <div className='rounded p-2 ms-1'> <button className=' rounded btn btn-danger' type='button' onClick={handleShow}><FontAwesomeIcon icon={faPlus} className='pe-2' />Add Expense</button></div>
                <img src="https://cdn-icons-png.flaticon.com/512/2037/2037061.png" alt="" style={{ width: '180px', height: '170px' }} className='mt-3' />

              </div>

              <Modal show={show} onHide={handleClose} >
                <Modal.Header closeButton>
                  <Modal.Title><FontAwesomeIcon icon={faReceipt} className='me-2 text-danger' />Add New Expense</Modal.Title>
                </Modal.Header>
                <Modal.Body><p>Please fill the following details</p>
                  <form className='mt-3 border p-2 rounded' >
                    <div className='mb-3'>
                      <input type="text" placeholder='Expense Title' className='form-control' onChange={(e) => setDetails({ ...details, title: e.target.value })} />
                    </div>
                    <div className='mb-3'>
                      <input type="text" placeholder='Expense Amount' className='form-control' onChange={(e) => setDetails({ ...details, amount: e.target.value })} />
                    </div>
                    <div className='mb-3'>
                      <input type="date" style={{ width: '182px' }} className='form-control' onChange={(e) => setDetails({ ...details, date: e.target.value })} />
                    </div>
                    <div className='mb-3'>
                      <textarea name="" id="" cols="25" rows="4" className='form-control' placeholder='Additional Info' onChange={(e) => setDetails({ ...details, info: e.target.value })}></textarea>
                    </div>
                  </form>
                </Modal.Body>
                <Modal.Footer>
                  <Button variant="warning" onClick={handleClose}>
                    Close
                  </Button>
                  <Button variant="success" onClick={handleUpload}>
                    Add
                  </Button>
                </Modal.Footer>
              </Modal>

              <div className='col-md-6 rounded mt-4 pt-3 '>

                {expense.length > 0 ?
                 expense?.map((item) => (
                  
                  <div className="container-fluid  source rounded mb-3" expenseUploadstatus={expenseUploadstatus} setExpenseUploadStatus={setExpenseUploadStatus} expenseDeleteStatus={expenseDeleteStatus} setExpenseDeleteStatus={setExpenseDeleteStatus}>
                  <div className='d-flex'>
                    <h6 className='text-dark'><FontAwesomeIcon icon={faGlobe} className='fa-1x me-2 pt-1 globe' />{item.title}</h6>

                    <button  className='btn trash-btn text-danger  ms-auto pt-2'><FontAwesomeIcon onClick={() => handleDelete(item?.id)} icon={faTrash} className='fa-1x' /></button>
                  </div>
                  <div className="d-flex align-items-center justify-content-evenly ">
                    <h6 className='text-dark innersource'><b>₹ {item?.amount}</b></h6>
                    <h6 className='text-dark innersource'><b>{item?.date}</b></h6>
                    <h6 className='text-dark innersource'><b>{item?.info}</b></h6>
                  </div>
                </div>
                  
                )) :

                  <h5 className='mt-5 text-warning '>No Expense Added Yet...........</h5>

                }

              </div>
            </div>

          </div>

        </div>
      </div>
      <ToastContainer theme='colored' position='top-center' autoClose={2000} />


    </>
  )
}

export default Expenses