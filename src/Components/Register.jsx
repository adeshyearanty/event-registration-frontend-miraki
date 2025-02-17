import React, { useEffect, useState } from 'react'
import background from '../Static/background.jpg'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'

const Register = () => {
    const [user , setUser] = useState({
        name: "",
        mobile: 0,
        email: "",
        roll_no: 0,
        event: "",
        fees: 100,
        city: "",
        state: ""
    });
    
    const navigate = useNavigate();
    const [error, setError] = useState("");

    const handleChange = (event) => {
        const { name, value } = event.target;
    
        setUser((prevData) => {
            const updatedData = {
                ...prevData,
                [name]: name === "mobile" || name === "roll_no" ? Number(value) : value
            };
            console.log("Updated User State:", updatedData);
            return updatedData;
        });
    };
    
    const handleSave = async (event) => {
        event.preventDefault();
    
        try {
            await axios.post("http://localhost:3333/register", user);
            navigate('/thankyou');
        } catch (error) {
            let errorMessage;
            if (error.response && error.response.data) {
                errorMessage = error.response.data.message;
            } else {
                errorMessage = "An error occurred. Please try again.";
            }
            alert(errorMessage); // This will show the error message in an alert
        }
    };

    return (
        <div className='registerForm'>
            <img class="image" src={background} alt="background" />
            <div class="main">
                <div class="form">
                    <h1 class="text-center">Registration Form</h1>
                    <form onSubmit={handleSave} id="registrationForm" method="POST" enctype="multipart/form-data">
                        <div class="form-group">
                            <label for="exampleFormControlInput1">Name</label>
                            <input onChange={handleChange} name="name" type="text" class="form-control" placeholder="Name" required />
                        </div>
                        <div class="form-group">
                            <label for="exampleFormControlInput1">Email address</label>
                            <input onChange={handleChange} name="email" type="email" class="form-control" placeholder="Eg. name@example.com" required />
                        </div>
                        <div class="form-group">
                            <label for="exampleFormControlInput1">Mobile Number</label>
                            <input onChange={handleChange} name="mobile" type="number" class="form-control" placeholder="Eg. 9999999999" required />
                        </div>
                        <div class="form-group">
                            <label for="exampleFormControlInput1">Roll Number</label>
                            <input onChange={handleChange} name="roll_no" type="number" class="form-control" placeholder="Eg. 15" required />
                        </div>
                        <div class="form-group">
                            <label for="exampleFormControlSelect">Select Event</label>
                            <select onChange={handleChange} name="event" class="form-control" required>
                                <option class="options" value="" selected disabled>Select an event</option>
                                <option class="options">CodeIgnite 2025</option>
                                <option class="options">Web Wizards Workshop</option>
                                <option class="options">Hack the Freshers</option>
                            </select>
                        </div>
                        <div class="form-group">
                            <label for="exampleFormControlInput1">Fees</label>
                            <input name="fees" type="number" class="form-control" readonly value="100" required />
                        </div>
                        <div class="form-group">
                            <label for="exampleFormControlInput1">City</label>
                            <input onChange={handleChange} name="city" type="text" class="form-control" placeholder="Eg. Hyderabad" required />
                        </div>
                        <div class="form-group">
                            <label for="exampleFormControlInput1">State</label>
                            <input onChange={handleChange} name="state" type="text" class="form-control" placeholder="Eg. Telangana" required />
                        </div>
                        <button type='submit' class="form-btn btn btn-success">Register</button>
                        <Link className="form-btn btn btn-primary" to="/">Cancel</Link>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Register

