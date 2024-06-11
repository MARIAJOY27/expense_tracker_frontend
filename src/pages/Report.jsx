import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleRight, faCircleArrowUp, faCircleArrowDown } from '@fortawesome/free-solid-svg-icons';
import Card from 'react-bootstrap/Card';
import Table from 'react-bootstrap/Table';
import { getIncomeAPI, getUploadExpenseAPI } from '../Services/allAPI';
import Header from '../components/Header';

function Report() {
  const [incomeRep, setIncomeRep] = useState([]);
  const [expRep, setExpRep] = useState([]);

  const [user, setUserId] = useState("")

  // Fetch income data
  const getIncomeRep = async () => {
    const user = localStorage.getItem("user")
    console.log(user);
    const response = await getIncomeAPI();
    const inc = response.data?.filter(inc => {
      if (inc.userId == user) {
        return inc
      }
    })
    setIncomeRep(inc);
  };


  useEffect(() => {
    const user = localStorage.getItem("user")
    if (!user) return navigate('/')
    setUserId(user)
    getIncomeRep()
    getExpenseRep()

  }, [])

  // Fetch expense data
  const getExpenseRep = async () => {
    const user = localStorage.getItem("user")
    console.log(user);
    const response = await getUploadExpenseAPI();
    const exp = response.data?.filter(exp => {
      if (exp.userId == user) {
        return exp
      }
    })
    setExpRep(exp);
  };


  // Calculate total income and expenses
  let totalIncome = 0;
  let totalExpense = 0;

  for (let i = 0; i < incomeRep.length; i++) {
    totalIncome += Number(incomeRep[i].amount);
  }

  for (let i = 0; i < expRep.length; i++) {
    totalExpense += Number(expRep[i].amount);
  }

  // Calculate percentage of income and expenses
  const incomePercentage = (totalIncome / (totalIncome + totalExpense)) * 100;
  const expensePercentage = (totalExpense / (totalIncome + totalExpense)) * 100;

  // Determine message based on income and expense comparison
  let message = null;
  if (totalExpense > totalIncome) {
    message = <p className='text-danger fs-5 mt-2'><i>Living lavish, but the funds vanish!</i></p>;
  } else if (totalIncome > totalExpense) {
    message = <p className='fs-5 mt-2' style={{ color: "green" }}><i>Riding high, with cash to fly!</i></p>;
  }

  return (
    <>
      <Header />
      <div className='row mt-5'>
        <div className="col-md-5">
          <div className="row">
            <div className="col-md-2"></div>
            <div className="col-md-8 ">
              <Card style={{ width: '100%' }}>
                <Card.Body>
                  <Card.Title className='text-center'><span id='balance'>Balance: ₹{totalIncome - totalExpense}</span></Card.Title>
                  <div className=' d-flex align-items-center justify-content-between'>
                    <Card>
                      <h4 className='text-center mt-2'><b>₹{totalIncome}</b></h4>
                      <Card.Body className='w-100'><FontAwesomeIcon className='me-2' icon={faCircleArrowUp} style={{ color: "#78C2AD" }} /><b>Income</b></Card.Body>
                    </Card>
                    <Card>
                      <h4 className='text-center mt-2'><b>₹{totalExpense}</b></h4>
                      <Card.Body><FontAwesomeIcon className='me-2' icon={faCircleArrowDown} style={{ color: "#78C2AD" }} /><b>Expense</b></Card.Body>
                    </Card>
                  </div>
                </Card.Body>
              </Card>
            </div>
            <div className="col-md-2"></div>
          </div>
          <div className="row mt-5">
            <div className="col-md-2"></div>
            <div className="col-md-8">
              <Card>
                <h5 className='m-3'>Planning your Finances <FontAwesomeIcon icon={faAngleRight} /></h5>
                <Card.Body >
                  {/* Display the comparison of income and expenses */}
                  <div>
                    <div style={{ width: `${incomePercentage}%`, height: '20px', backgroundColor: 'green', marginBottom: '5px', position: 'relative', overflowY: 'hidden' }} >
                      <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', color: 'white' }}>{incomePercentage.toFixed(2)}%</div>
                    </div>
                    <div style={{ width: `${expensePercentage}%`, height: '20px', backgroundColor: 'red', position: 'relative', overflowY: 'hidden' }}>
                      <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', color: 'white' }}>{expensePercentage.toFixed(2)}%</div>
                    </div>
                  </div>
                  {/* Display message */}
                  {message}
                </Card.Body>
              </Card>
            </div>
            <div className="col-md-2"></div>
          </div >
        </div >
        <div className="col-md-7 p-4" style={{ overflowX: 'auto' }}>
          <Table striped >
            <thead>
              <tr className='text-center'>
                <th >Date</th>
                <th>Description</th>
                <th>Category</th>
                <th>Amount</th>
              </tr>
            </thead>
            <tbody>

              {incomeRep.length > 0 ?
                incomeRep?.map((item) => (
                  <tr className='text-center'>
                    <td>{item?.date}</td>
                    <td>{item?.title}</td>
                    <td>{item?.reference}</td>
                    <td>+₹{item?.amount}</td>
                  </tr>
                )) : <h5>No income added yet</h5>}

              {expRep.length > 0 ?
                expRep?.map((item) => (
                  <tr className='text-center'>
                    <td>{item?.date}</td>
                    <td>{item?.title}</td>
                    <td>{item?.info}</td>
                    <td>-₹{item?.amount}</td>
                  </tr>
                )) : <h5>No expense added yet</h5>}

            </tbody>
          </Table>
        </div>
      </div >
    </>
  );
}

export default Report;