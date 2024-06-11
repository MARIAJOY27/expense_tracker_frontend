// import React, { useState, useEffect } from "react";
// import Button from "react-bootstrap/Button";
// import Modal from "react-bootstrap/Modal";
// // import { updateIncAPI } from "../Services/allAPI";
// import { updateIncAPI } from "../Services/allAPI";
// import { faChartSimple, faPen } from '@fortawesome/free-solid-svg-icons'
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'


// const Update = ({ getInc, setIncomesUpdateStatus }) => {
//     const [show, setShow] = useState(false);
//     const [IncomeDetails, setIncomeDetails] = useState({
//         id: getInc.id,
//         title: getInc.title,
//         amount: getInc.amount,
//         date: getInc.date,
//         reference: getInc.reference
//     });

//     useEffect(() => {
//         setIncomeDetails({
//             id: getInc.id,
//             title: getInc.title,
//             amount: getInc.amount,
//             date: getInc.date,
//             reference: getInc.reference
//         });
//     }, [getInc]);

//     const handleClose = () => setShow(false);
//     const handleShow = () => setShow(true);


//     const handleUpdate = () => {
//         const updatedDetails = {
//             id: IncomeDetails.id,
//             title: IncomeDetails.title,
//             amount: IncomeDetails.amount,
//             date: IncomeDetails.date,
//             reference: IncomeDetails.reference
//         };
//         updateIncAPI(updatedDetails);
//         setIncomesUpdateStatus(true)
//         // window.location.href = '/';
//         alert("updated successfullly")
//         handleClose();
//     };








//     return (
//         <>
//             <div onClick={handleShow}>
//                 <FontAwesomeIcon className="text-danger" icon={faPen} />
//             </div>

//             <Modal show={show} onHide={handleClose} >
//                 <Modal.Header closeButton>
//                     <Modal.Title><FontAwesomeIcon icon={faChartSimple} style={{ color: "#FFD43B", }} className='me-4' />Add New Income</Modal.Title>
//                 </Modal.Header>
//                 <Modal.Body>

//                     <form className='text-center border border-light rounded w-100 '>
//                         <input value={IncomeDetails.title}
//                             onChange={(e) =>
//                                 setIncomeDetails({
//                                     ...IncomeDetails,
//                                     title: e.target.value,
//                                 })
//                             } className='mb-2 rounded' type="text" placeholder='Salary Title' /><br />
//                         <input value={IncomeDetails.amount} onChange={(e) =>
//                             setIncomeDetails({
//                                 ...IncomeDetails,
//                                 amount: e.target.value,
//                             })
//                         } className='mb-2 rounded' type="text" placeholder='Salary Amount' /><br />
//                         <input value={IncomeDetails.date} onChange={(e) =>
//                             setIncomeDetails({
//                                 ...IncomeDetails,
//                                 date: e.target.value,
//                             })
//                         } style={{ width: '225px' }} className='mb-2 date rounded' type="date" placeholder='Enter a date' /><br />
//                         <textarea value={IncomeDetails.reference} onChange={(e) =>
//                             setIncomeDetails({
//                                 ...IncomeDetails,
//                                 reference: e.target.value,
//                             })
//                         } className='textArea rounded' name="" id="" cols="30" rows="10" placeholder='Add a reference'></textarea>


//                     </form>

//                 </Modal.Body>
//                 <Modal.Footer>
//                     <Button variant="secondary" onClick={handleClose}>
//                         Cancel
//                     </Button>
//                     <Button variant="success" onClick={handleUpdate}>
//                         Add
//                     </Button>
//                 </Modal.Footer>
//             </Modal>

//         </>
//     );
// };

// export default Update;

