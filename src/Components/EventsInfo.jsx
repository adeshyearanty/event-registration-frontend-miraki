import React from 'react'
import codeigniter from '../Static/codeigniter.png'
import webwizards from '../Static/webwizards.png'
import hackthefreshers from '../Static/hackthefreshers.png'
import { Link } from 'react-router-dom'

const EventsInfo = () => {
  return (
    <div>
        <Link className="home-btn btn btn-primary" to="/">Go to Home Page</Link>
        <div class="card mb-3">
            <div class="row no-gutters">
                <div class="col-md-4">
                <img src={codeigniter} class="card-img" alt="Code Igniter" />
                </div>
                <div class="col-md-8">
                <div class="card-body">
                    <h5 class="card-title">Code Igniter 2025</h5>
                    <p class="card-text">CodeIgnite 2025 is an intense coding competition designed to challenge participants with algorithmic problems, data structures, and real-world coding scenarios. It is open to students and professionals passionate about competitive programming and problem-solving.</p>
                </div>
                </div>
            </div>
        </div>
        <div class="card mb-3">
            <div class="row no-gutters">
                <div class="col-md-4">
                <img src={webwizards} class="card-img" alt="Web Wizards" />
                </div>
                <div class="col-md-8">
                <div class="card-body">
                    <h5 class="card-title">Web Wizards</h5>
                    <p class="card-text">This is a hands-on workshop focused on modern web development technologies, including React.js, Next.js, Tailwind CSS, and API integration. Attendees will build interactive web applications under expert guidance.</p>
                </div>
                </div>
            </div>
        </div>
        <div class="card mb-3">
            <div class="row no-gutters">
                <div class="col-md-4">
                <img src={hackthefreshers} class="card-img" alt="Hack The Freshers" />
                </div>
                <div class="col-md-8">
                <div class="card-body">
                    <h5 class="card-title">Hack the Freshers</h5>
                    <p class="card-text">A beginner-friendly hackathon designed for freshers and newcomers to coding. Participants will work in teams to solve real-world problems using basic programming, AI, and IoT solutions.</p>
                </div>
                </div>
            </div>
        </div>
        <Link className="events-btn btn btn-primary" to="/register">Register an Event</Link>
    </div>
  )
}

export default EventsInfo