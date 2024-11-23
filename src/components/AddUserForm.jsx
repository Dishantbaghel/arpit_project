"use client"; // This ensures the code is executed only on the client side

import { useState } from "react";

const AddUserForm = ({ showModal, setShowModal }) => {
  // State to store form data
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match!");
      return;
    }
    // Here, you can add your form submission logic (e.g., send data to an API)
    console.log("Form Data Submitted:", formData);
    // Reset form fields after submission
    setFormData({
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    });
    setShowModal(false); // Close the modal after submission
  };

  return (
    <div
      className={`fixed inset-0 bg-black bg-opacity-50 z-50 ${
        showModal ? "block" : "hidden"
      }`}
    >
      <dialog open className="modal relative z-60">
        <div className="modal-box">
          <h3 className="font-bold text-lg">User Registration</h3>

          {/* User Registration Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-700"
              >
                Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                className="input input-bordered w-full"
                required
              />
            </div>

            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className="input input-bordered w-full"
                required
              />
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700"
              >
                Password
              </label>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                className="input input-bordered w-full"
                required
              />
            </div>

            <div>
              <label
                htmlFor="confirmPassword"
                className="block text-sm font-medium text-gray-700"
              >
                Confirm Password
              </label>
              <input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleInputChange}
                className="input input-bordered w-full"
                required
              />
            </div>

            <div className="modal-action space-x-4">
              <button
                type="button"
                className="btn"
                onClick={() => setShowModal(false)}
              >
                Close
              </button>
              <button type="submit" className="btn btn-primary">
                Submit
              </button>
            </div>
          </form>
        </div>
      </dialog>
    </div>
  );
};

export default AddUserForm;
