
import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChartSimple, faPlus } from '@fortawesome/free-solid-svg-icons';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { toast, ToastContainer } from 'react-toastify';
import { uploadIncomeAPI } from '../Services/allAPI';
import { useNavigate } from 'react-router-dom';
import chart from '../assets/lg1.gif';

function Add({ setIsIncomeUpdated }) {
  const [show, setShow] = useState(false);
  const [income, setIncome] = useState({
    title: "",
    amount: "",
    date: "",
    reference: "",
    userId: ""
  });

  const navigate = useNavigate();

  useEffect(() => {
    const userId = localStorage.getItem("user");
    if (!userId) {
      navigate('/');
    } else {
      setIncome(prevIncome => ({ ...prevIncome, userId }));
    }
  }, [navigate]);

  const handleUpload = async () => {
    const { title, amount, date, reference, userId } = income;

    if (!title || !amount || !date || !reference) {
      toast.info('Please fill the form completely');
      return;
    }

    try {
      console.log('Uploading income:', income);
      const response = await uploadIncomeAPI(income);
      console.log('Upload response:', response);

      if (response.status >= 200 && response.status < 300) {
        toast.success('Income added successfully');
        setIsIncomeUpdated(true);
        setIncome({ title: "", amount: "", date: "", reference: "", userId });
        handleClose();
      } else {
        console.error('Error response:', response);
        toast.error('Something went wrong');
      }
    } catch (error) {
      console.error('Failed to upload income', error);
      toast.error('Something went wrong');
    }
  };

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <div className='d-flex justify-content-center align-items-center'>
        <button onClick={handleShow} className='btn btn-warning'>
          <FontAwesomeIcon icon={faPlus} className='me-2' style={{ color: "#e8eaed" }} /> Add new income
        </button>
      </div>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>
            <FontAwesomeIcon icon={faChartSimple} className='me-4' style={{ color: "#FFD43B" }} /> Add New Income
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form className='text-center border border-light rounded w-100'>
            <input onChange={(e) => setIncome({ ...income, title: e.target.value })} className='mb-2 rounded' type="text" placeholder='Salary Title' /><br />
            <input onChange={(e) => setIncome({ ...income, amount: e.target.value })} className='mb-2 rounded' type="text" placeholder='Salary Amount' /><br />
            <input style={{ width: '225px' }} onChange={(e) => setIncome({ ...income, date: e.target.value })} className='mb-2 date rounded' type="date" /><br />
            <textarea onChange={(e) => setIncome({ ...income, reference: e.target.value })} className='textArea rounded' cols="30" rows="10" placeholder='Add a reference'></textarea>
          </form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>Cancel</Button>
          <Button variant="success" onClick={handleUpload}>Add</Button>
        </Modal.Footer>
      </Modal>

      <div className='d-flex mt-1'>
        <img src={chart} width='100%' height='320px' alt="Chart" />
      </div>

      <ToastContainer theme='colored' position='top-center' autoClose={2000} />
    </>
  );
}

export default Add;
