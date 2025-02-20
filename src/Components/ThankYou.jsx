import React from 'react'
import { Link } from 'react-router-dom'

const ThankYou = () => {
  return (
    <div className='thankyouPage'>
        <div class="main">
            <div class="submitted">
                <h1 class="text-center alert-success success-msg">You have successfully registered to an event</h1>
                <Link className="submitted-btn btn btn-primary" to="/">Go to Home Page</Link>
                <Link className="submitted-btn btn btn-primary" to="/participants">View Registered Students</Link>
            </div>
        </div>
    </div>
  )
}

export default ThankYou