import React, { useState } from "react";
import axios from "axios";

function NewCustomerPage() {
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [address, setAddress] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Create a new customer object
    const newCustomer = {
      email,
      phone_number: phoneNumber,
      first_name: firstName,
      last_name: lastName,
      address,
    };

    try {
      // Send POST request to the backend to create a new customer
      await axios.post("http://localhost:8000/customers", newCustomer);
      alert("Customer created successfully!");
    } catch (error) {
      console.error("Error creating customer:", error);
      alert("Failed to create customer.");
    }
  };

  return (
    <div>
      <h1>Create New Customer</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div>
          <label>Phone Number:</label>
          <input
            type="text"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
          />
        </div>

        <div>
          <label>First Name:</label>
          <input
            type="text"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            required
          />
        </div>

        <div>
          <label>Last Name:</label>
          <input
            type="text"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            required
          />
        </div>

        <div>
          <label>Address:</label>
          <input
            type="text"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />
        </div>

        <button type="submit">Create New Customer</button>
      </form>
    </div>
  );
}

export default NewCustomerPage;
