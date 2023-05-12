import React, { useState } from "react";
import "./studentDetailsForm.css";

import Sidebar from './StudentSidebar';
import Dashhead from './Dashhead';



const StudentDetailsForm = () => {



  const [id, setId] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [Level, setLevel] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    // Here you can submit the form data to your API or do something else with it
  };

  return (
    <section>


      {/* <!-- Dashboard --> */}
      <div class="d-flex flex-column flex-lg-row h-lg-full bg-surface-secondary">

        <Sidebar />


        {/* <!-- Main content --> */}
        <div class="h-screen flex-grow-1 overflow-y-lg-auto">

          {/* <!-- Header --> */}
          <Dashhead />



          <div className="Clist-background">
            <form onSubmit={handleSubmit} className="form-container">
              <h2 className="form-title">Student Details </h2>

              <div className="input-container">
                <i class="fa-solid fa-envelope"></i>
                <input
                  type="id"
                  id="id"
                  value={id}
                  onChange={(e) => setId(e.target.value)}
                  placeholder="Enter your student id"
                  className="input-field"
                />
              </div>
              
              <div className="input-container">
                <i class="fa-solid fa-user"></i>
                <input
                  type="text"
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Enter your name"
                  className="input-field"
                />
              </div>
              <div className="input-container">
                <i class="fa-solid fa-envelope"></i>
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  className="input-field"
                />
              </div>
              <div className="input-container">
                <i class="fa-solid fa-phone"></i>
                <input
                  type="tel"
                  id="phone"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="Enter your phone number"
                  className="input-field"
                />
              </div>
              <div className="input-container">
                <i class="fa-solid fa-house"></i>
                <textarea
                  id="address"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  placeholder="Enter your address"
                  className="input-field"
                />
              </div>

              <div className="input-container">
                <i class="fa-solid fa-user-graduate"></i>
                <textarea
                  id="Level"
                  value={Level}
                  onChange={(e) => setLevel(e.target.value)}
                  placeholder="Enter your educational level"
                  className="input-field"
                />
              </div>

              <button type="submit" className="submit-button">
                Submit
              </button>
            </form>
          </div>
        </div>
      </div>


    </section>
  );






};

export default StudentDetailsForm;

