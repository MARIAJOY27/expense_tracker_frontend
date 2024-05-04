
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react'
import Nav from 'react-bootstrap/Nav';
import Container from 'react-bootstrap/Container';
import { faMoneyBillTransfer, faCircleQuestion, faCircleUser, faHouse } from '@fortawesome/free-solid-svg-icons'
import Navbar from 'react-bootstrap/Navbar';
import { Link } from 'react-router-dom';

function Header() {
  return (
    <>
      <Navbar expand="lg" className="bg-primary">
        <Container style={{height:"70px"}} >
          <Navbar.Brand>
          <Link to={'/home'} style={{ textDecoration: "none" }}>
            <FontAwesomeIcon className='me-3' icon={faMoneyBillTransfer} size='xl' style={{ color: "white", }} /><span style={{ color: 'white',fontSize:"30px" }}><b>Expense Tracker</b></span> </Link>
          <Navbar.Toggle aria-controls="basic-navbar-nav" /></Navbar.Brand>
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto">
              {/* <Nav.Link className='text-light' href="#link"><FontAwesomeIcon icon={faGear} /></Nav.Link> */}
              <Link to={'/income'} style={{ textDecoration: 'none' }}>
                <h5 className='text-light mt-2 me-3' >Income</h5></Link>

              <Link to={'/expenses'} style={{ textDecoration: 'none' }}>
                <h5 className='text-light mt-2 ms-2 me-3' href="#link">Expense</h5></Link>

              <Link to={'/report'} style={{ textDecoration: 'none' }}>
                <h5 className='text-light mt-2 ms-2 me-2' href="#link">Report</h5></Link>

              <Nav.Link className='text-light' href=""><FontAwesomeIcon icon={faCircleQuestion} title="Help" /></Nav.Link>

              <Link to={'/'} style={{ textDecoration: 'none' }}>
                <Nav.Link className='text-light' href='#home' ><FontAwesomeIcon icon={faHouse} title="Home" /></Nav.Link></Link>

              <Nav.Link className='text-light' ><FontAwesomeIcon icon={faCircleUser} title="Profile" /></Nav.Link>


            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

    </>
  )
}

export default Header