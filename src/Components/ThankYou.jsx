import React from 'react'
import background from '../Static/background.jpg'
import { Link } from 'react-router-dom'

const ThankYou = () => {
  return (
    <div className='thankyouPage'>
        <img class="image" src={background} alt="background" />
        <div class="main">
            <div class="submitted">
                <h1 class="text-center alert-success success-msg">You have successfully registered to event :</h1>
                <Link className="submitted-btn btn btn-primary" to="/">Go to Home Page</Link>
                <Link className="submitted-btn btn btn-primary" to="/participants">View Registered Students</Link>
            </div>
        </div>
    </div>
  )
}

export default ThankYou