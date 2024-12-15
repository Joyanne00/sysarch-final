import { useState } from 'react';
import Navbar from "../components/Navbar"; // Import Navbar
import './Profile.css'; // Make sure the styles are defined here

const Profile = () => {
  const [user, setUser] = useState({
    name: '',
    surname: '',
    phone: '',
    addressLine1: '',
    addressLine2: '',
    postcode: '',
    state: '',
    area: '',
    email: '',
    education: '',
    country: '',
    stateRegion: '',
    experience: '',
    additionalDetails: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic (e.g., API call)
    console.log(user);
  };

  return (
    <div className="container profile-container">
      <Navbar /> {/* Include Navbar here */}
      <div className="profile-wrapper">
        {/* Left Section with Profile Picture */}
        <div className="profile-image-section">
          <div className="image-container">
            <img
              className="profile-img"
              width="150px"
              src="https://st3.depositphotos.com/15648834/17930/v/600/depositphotos_179308454-stock-illustration-unknown-person-silhouette-glasses-profile.jpg"
              alt="Profile"
            />
            <span className="name">{user.name} {user.surname}</span>
            <span className="email">{user.email}</span>
          </div>
        </div>

        {/* Middle Section for Profile Settings */}
        <div className="profile-settings">
          <h4 className="section-title">Profile Settings</h4>
          <form onSubmit={handleSubmit}>

            {/* Name and Surname */}
            <div className="form-group">
              <label className="label">Name</label>
              <input
                type="text"
                className="input-field"
                placeholder="First name"
                name="name"
                value={user.name}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-group">
              <label className="label">Surname</label>
              <input
                type="text"
                className="input-field"
                placeholder="Surname"
                name="surname"
                value={user.surname || ''}
                onChange={handleInputChange}
              />
            </div>

            {/* Phone and Address */}
            <div className="form-group">
              <label className="label">Mobile Number</label>
              <input
                type="text"
                className="input-field"
                placeholder="Enter phone number"
                name="phone"
                value={user.phone}
                onChange={handleInputChange}
              />
            </div>

            <div className="form-group">
              <label className="label">Address Line 1</label>
              <input
                type="text"
                className="input-field"
                placeholder="Enter address line 1"
                name="addressLine1"
                value={user.addressLine1}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-group">
              <label className="label">Address Line 2</label>
              <input
                type="text"
                className="input-field"
                placeholder="Enter address line 2"
                name="addressLine2"
                value={user.addressLine2}
                onChange={handleInputChange}
              />
            </div>

            {/* Postcode, State and Area */}
            <div className="form-group">
              <label className="label">Postcode</label>
              <input
                type="text"
                className="input-field"
                placeholder="Enter postcode"
                name="postcode"
                value={user.postcode}
                onChange={handleInputChange}
              />
            </div>

            <div className="form-group">
              <label className="label">State</label>
              <input
                type="text"
                className="input-field"
                placeholder="Enter state"
                name="state"
                value={user.state}
                onChange={handleInputChange}
              />
            </div>

            <div className="form-group">
              <label className="label">Area</label>
              <input
                type="text"
                className="input-field"
                placeholder="Enter area"
                name="area"
                value={user.area}
                onChange={handleInputChange}
              />
            </div>

            {/* Email and Education */}
            <div className="form-group">
              <label className="label">Email ID</label>
              <input
                type="text"
                className="input-field"
                placeholder="Enter email ID"
                name="email"
                value={user.email}
                onChange={handleInputChange}
              />
            </div>

            <div className="form-group">
              <label className="label">Education</label>
              <input
                type="text"
                className="input-field"
                placeholder="Education"
                name="education"
                value={user.education}
                onChange={handleInputChange}
              />
            </div>

            {/* Country and State/Region */}
            <div className="form-group">
              <label className="label">Country</label>
              <input
                type="text"
                className="input-field"
                placeholder="Country"
                name="country"
                value={user.country}
                onChange={handleInputChange}
              />
            </div>

            <div className="form-group">
              <label className="label">State/Region</label>
              <input
                type="text"
                className="input-field"
                placeholder="State/Region"
                name="stateRegion"
                value={user.stateRegion}
                onChange={handleInputChange}
              />
            </div>

            {/* Experience and Additional Details */}
            <div className="form-group">
              <label className="label">Experience in Designing</label>
              <input
                type="text"
                className="input-field"
                placeholder="Experience"
                name="experience"
                value={user.experience}
                onChange={handleInputChange}
              />
            </div>

            <div className="form-group">
              <label className="label">Additional Details</label>
              <input
                type="text"
                className="input-field"
                placeholder="Additional details"
                name="additionalDetails"
                value={user.additionalDetails}
                onChange={handleInputChange}
              />
            </div>

            {/* Submit Button */}
            <div className="text-center">
              <button className="submit-btn" type="submit">
                Save Profile
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Profile;
