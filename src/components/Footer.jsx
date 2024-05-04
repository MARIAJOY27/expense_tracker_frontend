
import { faFacebook, faInstagram, faTwitter, faWhatsapp } from '@fortawesome/free-brands-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'


function Footer() {
  return (
    <>
      <div className="row mt-5" style={{ backgroundColor: '#78C2AD' }}>
        <div className="col-md-3"></div>
        <div className="col-md-6 mt-4 ">
          <div className=" d-flex align-items-center justify-content-center" >
            <FontAwesomeIcon icon={faInstagram} size='xl' className='me-5 ' style={{ color: 'white' }} />
            <FontAwesomeIcon icon={faWhatsapp} size='xl' className='me-5 ' style={{ color: 'white' }} />
            <FontAwesomeIcon icon={faTwitter} size='xl' className='me-5 ' style={{ color: 'white' }} />
            <FontAwesomeIcon icon={faFacebook} size='xl' style={{ color: 'white' }} />
          </div>
          <div className="mt-3 ms-5 p-2 justify-content-center">
            <p className='ms-5 ' style={{ color: 'white' }}>© My Expense Tracker 2024, All Rights Reserved ® Team</p>
          </div>

        </div>
        <div className="col-md-3"></div>
      </div>

    </>
  )
}

export default Footer