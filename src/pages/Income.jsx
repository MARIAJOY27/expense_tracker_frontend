
import React, { useEffect, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import './Income.css'
import { faChartSimple, faGlobe, faHouse, faMoneyBill, faTrash, faUser, faWallet } from '@fortawesome/free-solid-svg-icons'
import Add from '../components/Add'
import { deleteAnIncomeAPI, getIncomeAPI } from '../Services/allAPI'
import Header from '../components/Header';



function Income() {
    //state to hold income from backend
  const [incomes, setIncomes] = useState([])

  // child (add) to parent(income) - state lifting
  const [incomesUploadStatus,setIncomesUploadStatus] = useState(false)
  //delete automatically
  const [deleteVideoStatus,setDeleteVideoStatus]=useState(false)

  // to diplay adding incomes in income page(income.jsx) 
  const getIncome = async () => {
    const response = await getIncomeAPI()
    setIncomes(response.data)
  }

  console.log(incomes);

  let sum = 0
  for (let i = 0; i < incomes.length; i++) {
    //  console.log(incomes[i].amount);
    sum += Number(incomes[i].amount)

  }
  console.log(sum);

  // useEffect hook  - empty array dependency - when page loads
  useEffect(() => {
    getIncome()
    setIncomesUploadStatus(false)
    setDeleteVideoStatus(false)
  }, [incomesUploadStatus,deleteVideoStatus])

  const handleDelete = async(id)=>{
      const response = await deleteAnIncomeAPI(id)
      setDeleteVideoStatus(true)
      console.log(response);
  }


  return (
    
    <>
    <Header/>
      <div className='mx-3'>
        <div className="row mt-4 ">
         
          {/* <div className="col-md-1"></div> */}
          <div className="col-md-12 two">
            <h3 className='text-dark innersource text-center'><b><span className='track'>Income Insights: Chart Your Cash Flow</span></b></h3>
            <div className='rounded mt-4 ms-5 me-5'>
              <h1 className='text-center total p-3 fs-3 text-dark' style={{ backgroundColor: '#B4D3B2' }}><span style={{color:'#2D3178',fontWeight:'bolder'}}>Total Income :  ₹{sum}</span> </h1>
  
              <div className="row mt-2 pt-5">
                <div className="col-md-4 ps-4">
  
                  <Add setIncomesUploadStatus={setIncomesUploadStatus} />
                </div>
                
                <div className="col-md-7  ">
  
                  {incomes?.length>0?
                  incomes?.map((item)=>(
                    <div className="container-fluid  source rounded mb-3 ">
                    <div className='d-flex'>
                      <h6 className='text-dark'><FontAwesomeIcon icon={faGlobe} className='fa-1x me-2 pt-1 globe' />{item.title}</h6>
  
                      <button onClick={()=>handleDelete(item.id)} className='btn trash-btn text-danger  ms-auto pt-2'><FontAwesomeIcon icon={faTrash} className='fa-1x' /></button>
                    </div>
                    <div className="d-flex align-items-center justify-content-evenly ">
                      <h6 className='text-dark innersource'><b>₹ {item.amount}</b></h6>
                      <h6 className='text-dark innersource'><b>{item.date}</b></h6>
                      <h6 className='text-dark innersource'><b>{item.reference}</b></h6>
                    </div>
                  </div>
                  ))
                   
  
                  :
                  <h3 className='text-dark'>No incomes added yet.....</h3>}
  
                </div>
                <div className="col"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Income