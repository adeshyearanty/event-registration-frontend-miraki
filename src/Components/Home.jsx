import React from 'react'
import { Link } from 'react-router-dom'

const Home = () => {
  return (
    <div>
        <div class="main">
            <h3 class="heading">Event Registration</h3>
            <h1 class="welcome text-center">Welcome Students..!!</h1>
            <div class="index-container">
                <Link className="register-btn btn btn-success" to="/register">Register Now</Link>
                <div class="inner-container">
                    <Link className="view-btn btn btn-primary" to="/participants">View Registered Students</Link>
                    <Link className="view-btn btn btn-primary" to="/eventsinfo">View Event details</Link>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Home