import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import dotenv from "dotenv";

dotenv.config();

const Register = () => {
  const [user, setUser] = useState({
    name: "",
    mobile: "",
    email: "",
    rollNo: "",
    event: "",
    fees: 100,
    city: "",
    state: "",
  });

  const [events, setEvents] = useState([]);
  const navigate = useNavigate();
  const [err, setErr] = useState("");
  const [fieldErrors, setFieldErrors] = useState({});

  const handleChange = (event) => {
    const { name, value } = event.target;
    setUser((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await axios.get(`${process.env.SERVER_URL}/events`);
        console.log(response.data)
        setEvents(response.data);
      } catch (error) {
        console.error("Error retrieving events:", error);
      } 
    };

    fetchEvents();
  }, []);

  const handleSave = async (event) => {
    event.preventDefault();
    setErr("");
    setFieldErrors({});
  
    let hasError = false;
    const newFieldErrors = {};
  
    for (let key in user) {
      if (user[key] === "" && key !== "fees") {
        newFieldErrors[key] = `${key.charAt(0).toUpperCase() + key.slice(1)} is required`;
        hasError = true;
      }
    }
  
    if (hasError) {
      setFieldErrors(newFieldErrors);
      setErr("Please fill all required fields");
      return;
    }
  
    try {
      const dataToSend = {
        ...user,
        mobile: Number(user.mobile),
        rollNo: Number(user.rollNo),
        fees: Number(user.fees),
      };
      console.log("Data to Send:", dataToSend);
      await axios.post(`${process.env.SERVER_URL}/register`, dataToSend);
      navigate("/thankyou");
    } catch (error) {
      if (error.response && error.response.data) {
        if (error.response.data.message && error.response.data.message.includes("Duplicate key error")) {
          // Handle duplicate key error
          const field = error.response.data.message.split(" ")[3].replace(".", "");
          setFieldErrors({
            [field]: `This ${field} is already registered. Please use a different ${field}.`
          });
          setErr(`Registration failed. ${field.charAt(0).toUpperCase() + field.slice(1)} already exists.`);
        } else if (error.response.data.errors) {
          // Handle validation errors
          const serverErrors = error.response.data.errors;
          const newFieldErrors = {};
          serverErrors.forEach(err => {
            newFieldErrors[err.param] = err.msg;
          });
          setFieldErrors(newFieldErrors);
          setErr("Please correct the errors below");
        } else {
          // Handle other errors
          setErr(error.response.data.message || "An unexpected error occurred");
        }
      } else if (error.request) {
        setErr("No response from server. Please check your network.");
      } else {
        setErr("An unexpected error occurred: " + error.message);
      }
    }
  };  

  const handleReset = () => {
    setUser({
      name: "",
      mobile: "",
      email: "",
      rollNo: "",
      event: "",
      fees: 100,
      city: "",
      state: "",
    });
  };

  return (
    <div className="registerForm">
      <div className="main">
        <div className="form">
          <h1 className="text-center">Registration Form</h1>
          {err && <div className="alert alert-danger">{err}</div>}
          <form
            onSubmit={handleSave}
            id="registrationForm"
            method="POST"
            encType="multipart/form-data"
          >
            <div className="form-group">
              <label htmlFor="name" className="form-label">Name</label>
              <input
                onChange={handleChange}
                value={user.name}
                name="name"
                type="text"
                className={`form-control ${fieldErrors.name ? 'is-invalid' : ''}`}
                placeholder="Name"
              />
              {fieldErrors.name && <div className="invalid-feedback">{fieldErrors.name}</div>}
            </div>
            <div className="form-group">
              <label htmlFor="email" className="form-label">Email address</label>
              <input
                onChange={handleChange}
                value={user.email}
                name="email"
                type="email"
                className={`form-control ${fieldErrors.email ? 'is-invalid' : ''}`}
                placeholder="Eg. name@example.com"
              />
              {fieldErrors.email && <div className="invalid-feedback">{fieldErrors.email}</div>}
            </div>
            <div className="form-group">
              <label htmlFor="mobile" className="form-label">Mobile Number</label>
              <input
                onChange={handleChange}
                value={user.mobile}
                name="mobile"
                type="number"
                className={`form-control ${fieldErrors.mobile ? 'is-invalid' : ''}`}
                placeholder="Eg. 9999999999"
              />
              {fieldErrors.mobile && <div className="invalid-feedback">{fieldErrors.mobile}</div>}
            </div>
            <div className="form-group">
              <label htmlFor="rollNo" className="form-label">Roll Number</label>
              <input
                onChange={handleChange}
                value={user.rollNo}
                name="rollNo"
                type="number"
                className={`form-control ${fieldErrors.rollNo ? 'is-invalid' : ''}`}
                placeholder="Eg. 15"
              />
              {fieldErrors.rollNo && <div className="invalid-feedback">{fieldErrors.rollNo}</div>}
            </div>
            <div className="form-group">
              <label htmlFor="event" className="form-label">Select Event</label>
              <select
                onChange={handleChange}
                value={user.event}
                name="event"
                className={`form-control ${fieldErrors.event ? 'is-invalid' : ''}`}
              >
                <option value="" disabled>Select an event</option>
                {events.map((event) => (
                  <option key={event._id} value={event.name}>
                    {event.name}
                  </option>
                ))}
              </select>
              {fieldErrors.event && <div className="invalid-feedback">{fieldErrors.event}</div>}
            </div>
            <div className="form-group">
              <label htmlFor="fees" className="form-label">Fees</label>
              <input
                name="fees"
                type="number"
                className={`form-control`}
                readOnly
                value={user.fees}
              />
            </div>
            <div className="form-group">
              <label htmlFor="city" className="form-label">City</label>
              <input
                onChange={handleChange}
                value={user.city}
                name="city"
                type="text"
                className={`form-control ${fieldErrors.city ? 'is-invalid' : ''}`}
                placeholder="Eg. Hyderabad"
              />
              {fieldErrors.city && <div className="invalid-feedback">{fieldErrors.city}</div>}
            </div>
            <div className="form-group">
              <label htmlFor="state" className="form-label">State</label>
              <input
                onChange={handleChange}
                value={user.state}
                name="state"
                type="text"
                className={`form-control ${fieldErrors.state ? 'is-invalid' : ''}`}
                placeholder="Eg. Telangana"
              />
              {fieldErrors.state && <div className="invalid-feedback">{fieldErrors.state}</div>}
            </div>
            <button type="submit" className="form-btn btn btn-success">Register</button>
            <button
              type="button"
              className="reset-btn btn btn-secondary"
              onClick={handleReset}
            >
              Reset
            </button>
            <Link className="form-btn btn btn-primary" to="/">Cancel</Link>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
