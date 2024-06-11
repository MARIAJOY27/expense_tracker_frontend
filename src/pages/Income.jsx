
import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './Income.css';
import { faGlobe, faTrash, faSortAmountDown, faSortAmountUp } from '@fortawesome/free-solid-svg-icons';
import Add from '../components/Add';
import { deleteAnIncomeAPI, getIncomeAPI } from '../Services/allAPI';
import Header from '../components/Header';
import { useNavigate } from 'react-router-dom';
import Confetti from 'react-confetti';

function Income() {
  const [incomes, setIncomes] = useState([]);
  const [userId, setUserId] = useState("");
  const [isIncomeUpdated, setIsIncomeUpdated] = useState(false);
  const [sortField, setSortField] = useState(null);
  const [sortOrder, setSortOrder] = useState('asc'); // 'asc' for ascending, 'desc' for descending
  const [target, setTarget] = useState(0);
  const [targetAchieved, setTargetAchieved] = useState(false);
  const [celebrated, setCelebrated] = useState(false); // New state for tracking celebration
  const [showConfetti, setShowConfetti] = useState(false); // State to handle confetti visibility
  const navigate = useNavigate();

  useEffect(() => {
    const user = localStorage.getItem("user");
    if (!user) {
      navigate('/');
    } else {
      setUserId(user);
      fetchIncome(user);
    }
  }, [navigate]);

  useEffect(() => {
    if (isIncomeUpdated) {
      fetchIncome(userId);
      setIsIncomeUpdated(false);
    }
  }, [isIncomeUpdated, userId]);

  const fetchIncome = async (user) => {
    try {
      const response = await getIncomeAPI();
      const filteredIncome = response.data?.filter(inc => inc.userId === user);
      setIncomes(filteredIncome);
    } catch (error) {
      console.error('Failed to fetch incomes', error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteAnIncomeAPI(id);
      setIsIncomeUpdated(true);
    } catch (error) {
      console.error('Failed to delete income', error);
    }
  };

  const handleSort = (field) => {
    const newSortOrder = (sortField === field && sortOrder === 'asc') ? 'desc' : 'asc';
    setSortField(field);
    setSortOrder(newSortOrder);
    sortIncomes(field, newSortOrder);
  };

  const sortIncomes = (field, order) => {
    const sortedIncomes = [...incomes].sort((a, b) => {
      let valA = a[field];
      let valB = b[field];

      // Convert amount to numbers for numerical sorting
      if (field === 'amount') {
        valA = Number(a.amount);
        valB = Number(b.amount);
      }

      if (valA < valB) return order === 'asc' ? -1 : 1;
      if (valA > valB) return order === 'asc' ? 1 : -1;
      return 0;
    });
    setIncomes(sortedIncomes);
  };

  const totalIncome = incomes.reduce((sum, income) => sum + Number(income.amount), 0);

  useEffect(() => {
    const achieved = totalIncome >= target && totalIncome > 0 && target > 0;
    setTargetAchieved(achieved);
    if (achieved && !celebrated) {
      setShowConfetti(true);
      setTimeout(() => {
        setShowConfetti(false);
        setCelebrated(true); // Mark as celebrated
      }, 10000); // Reset celebration after 10 seconds
    }
  }, [totalIncome, target, celebrated]);

  return (
    <>
      <Header />
      {showConfetti && <Confetti />}
      <div className='mx-3'>
        <div className="row mt-4">
          <div className="col-md-12 two">
            <h3 className='text-dark innersource text-center'>
              <b><span className='track'>Income Insights: Chart Your Cash Flow</span></b>
            </h3>
            <div className='rounded mt-4 ms-5 me-5'>
              <h1 className='text-center total p-3 fs-3 text-dark' style={{ backgroundColor: '#B4D3B2' }}>
                <span style={{ color: '#2D3178', fontWeight: 'bolder' }}>Total Income : ₹{totalIncome}</span>
              </h1>
              <div className="text-center" style={{ backgroundColor: targetAchieved ? '#f8d7da' : 'transparent', border: targetAchieved ? '1px solid #f5c6cb' : 'none', borderRadius: '5px', padding: '5px' }}>
                <label htmlFor="target" className="text-dark" style={{ marginRight: '5px' }}><b>Target:</b></label>
                <input type="number" id="target"  onChange={(e) => setTarget(Number(e.target.value))} style={{ width: '100px', border: '1px solid #ccc', borderRadius: '3px' }} />
              </div>
              {targetAchieved && (
                <p className="text-danger text-center" style={{ marginTop: '5px', fontSize: '18px', fontWeight: 'bold' }}>Congrats!! Crossed your target</p>
              )}

              <div className="row mt-2 pt-5">
                <div className="col-md-4 ps-4">
                  <Add setIsIncomeUpdated={setIsIncomeUpdated} />
                </div>
                <div className="col-md-7">
                  <div className='d-flex justify-content-between'>
                    <button className='btn btn-light' onClick={() => handleSort('title')}>
                      Sort by Title {sortField === 'title' && (sortOrder === 'asc' ? <FontAwesomeIcon icon={faSortAmountUp} /> : <FontAwesomeIcon icon={faSortAmountDown} />)}
                    </button>
                    <button className='btn btn-light' onClick={() => handleSort('amount')}>
                      Sort by Amount {sortField === 'amount' && (sortOrder === 'asc' ? <FontAwesomeIcon icon={faSortAmountUp} /> : <FontAwesomeIcon icon={faSortAmountDown} />)}
                    </button>
                    <button className='btn btn-light' onClick={() => handleSort('date')}>
                      Sort by Date {sortField === 'date' && (sortOrder === 'asc' ? <FontAwesomeIcon icon={faSortAmountUp} /> : <FontAwesomeIcon icon={faSortAmountDown} />)}
                    </button>
                  </div>
                  {incomes.length > 0 ? incomes.map(item => (
                    <div key={item.id} className="container-fluid source rounded mb-3">
                      <div className='d-flex'>
                        <h6 className='text-dark'>
                          <FontAwesomeIcon icon={faGlobe} className='fa-1x me-2 pt-1 globe' />
                          {item.title}
                        </h6>
                        <button onClick={() => handleDelete(item.id)} className='btn trash-btn text-danger ms-auto pt-2'>
                          <FontAwesomeIcon icon={faTrash} className='fa-1x' />
                        </button>
                      </div>
                      <div className="d-flex align-items-center justify-content-evenly">
                        <h6 className='text-dark innersource'><b>₹ {item.amount}</b></h6>
                        <h6 className='text-dark innersource'><b>{item.date}</b></h6>
                        <h6 className='text-dark innersource'><b>{item.reference}</b></h6>
                      </div>
                    </div>
                  )) : (
                    <h3 className='text-dark'>No incomes added yet.....</h3>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Income;
