// import React from 'react'
// import { Link } from 'react-router-dom'

// function Landingpage() {
//   return (
//     <>
//      <section >
//           <div className="row my-5 p-5">
//             <div className="col-md-1"></div>
//             <div className="col-md-5">
//                 <h4  style={{overflowY:"hidden",color:"lightblue"}}>What is an Expense tracker?</h4>
//                 <p style={{textAlign:"justify"}}> Keeping a daily record of your expenses by tracking receipts, invoices, and other outgoing expenses improves the financial health of your budget.Expense tracking means recording all your expenditures so you have a clear and detailed understanding of your budget.This can be achieved with the help of an expense tracker which enables you to monitor how much of your budget has been spent over time, to see how much is remaining and course-correct when necessary. </p>
//             </div>
//             <div className="col-md-1"></div>
//             <div className="col-md-5">
//                 <img src="https://cdn.dribbble.com/users/827787/screenshots/5930698/digital-strategy.gif" width={'350px'} alt="" />
//             </div>
//           </div >
          
//      </section>
//      <hr />

//      <section>
//         <div className="row my-5">
//             <h3 className=' text-center text-warning'>Wanna find Your Expenses?</h3>
//             <div className="col-md-2"></div>
//             <div className="col-md-5 mt-5 ">
//                 <img src="https://cdn.dribbble.com/users/513906/screenshots/3986167/moneyslides_800x600.gif" width={'350px'} alt="" />
//             </div>
//             <div className="col-md-5 mt-4 pt-5">
//                <h6>Add Credit money : 
//                 <Link to={'/income'}>
//                <button style={{borderRadius:"8px",color:"white"}} className='ms-2 p-2 bg-warning'>Add Income</button>
//                </Link> </h6>
//                <h6 className='mt-3'>Add Your Expenses :
//                 <Link to={'/expenses'}><button style={{borderRadius:"8px",color:"white"}} className='ms-1 p-2 bg-warning border-outline-transparent'>Add Expense</button>
//                 </Link>
//                  </h6>
//                <h6 className='mt-3'>View Monthly Report : 
//                <Link to={'/report'}><button style={{borderRadius:"8px",color:"white",width:"100px"}} className='ms-1 p-2 bg-warning'>Report</button> </Link>
//                </h6>
//             </div>
//             <div className='col-md-1'></div>
           
//         </div>
//      </section>
//      <hr />
//     </>
//   )
// }

// export default Landingpage





 import { faSackDollar,faClipboard ,faChartSimple} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'
import { Link } from 'react-router-dom'
import Header from '../components/Header'


function Landingpage() {
  return (
    <>
    <Header/>
      <section >
        <div className="row my-5 p-5">
          <div className="col-md-1"></div>
          <div className="col-md-5">
            <h4 style={{ overflowY: "hidden", color: "#270308" }}> <b>Smart Spending Starts Here: Your Expense Tracker Handbook</b> </h4>
            <p> Welcome to our Expense Tracker page, your go-to resource for mastering your finances. Whether you're saving for a rainy day or aiming for financial freedom, start your journey towards smart spending and budgeting with our intuitive tools and expert guidance. Take control of your money and achieve your financial goals one expense at a time! Expense tracker enables you to monitor how much of your budget has been spent over time, to see how much is remaining and course-correct when necessary.</p>
          </div>
          <div className="col-md-1"></div>
          <div className="col-md-5">
            <img className='mb-3' src="https://happay.com/blog/wp-content/uploads/sites/12/2022/08/what-is-expense-management.png" width={'440px'} alt="" />
          </div>
        </div >

      </section>


      <section>
        <div className="row my-5">
          <h3 className=' text-center '><b>Looking to locate your expenditures?</b></h3>
          <div className="col-md-2"></div>
          <div className="col-md-5 mt-5 ">
            <img src="https://cdn.dribbble.com/users/513906/screenshots/3986167/moneyslides_800x600.gif" width={'350px'} alt="" />
          </div>
          <div className="col-md-5 mt-4 pt-5 justify-content-center align-items-center">
         
            <h6 className='mt-3'>
              <Link to={'/income'}>
                <button variant="outline-light" style={{ borderRadius: "8px", color: "white", border: 'none' }} className='ms-2 p-2 bg-success w-50'><FontAwesomeIcon icon={faSackDollar} className='me-2' />ADD INCOME</button> <br />
              </Link></h6>

            <h6 className='mt-3'>
              <Link to={'/expenses'}><button style={{ borderRadius: "8px", color: "white", border:'none' }} className='ms-1 w-50  p-2 bg-danger '><FontAwesomeIcon className='me-2' icon={faClipboard} />ADD EXPENSES</button>
              </Link>

            </h6>
            <h6 className='mt-3'>
              <Link to={'/report'}><button style={{ borderRadius: "8px", color: "white", border:'none' }} className='ms-1 w-50 p-2 bg-warning'><FontAwesomeIcon className='me-2' icon={faChartSimple} />REPORT</button> </Link>
            </h6>
          </div>
          <div className='col-md-1'></div>

        </div>
      </section>
     
    </>
  )
}

export default Landingpage
