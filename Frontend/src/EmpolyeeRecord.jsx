import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './EmployeeRecord.module.css'; 

export default function EmployeeRecord() {
  const [details, setDetails] = useState([]);
  const [person, setPerson] = useState({
    name: '',
    email: '',
    number: '',
    job_title: '',
    department: '',
    salary: ''
  });
  const [editingIndex, setEditingIndex] = useState(null);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    fetchEmployees();
  }, []);

  const fetchEmployees = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/employees');
      setDetails(response.data);
    } catch (error) {
      console.error("Error fetching employees:", error);
    }
  };

  const handleInputChange = (e) => {
    setPerson({ ...person, [e.target.name]: e.target.value });
  };

  const validateForm = () => {
    const { name, email, number } = person;
    const nameRegex = /^[A-Za-z\s]+$/;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const numberRegex = /^\d{11}$/;

    if (!nameRegex.test(name)) {
      return "Name must contain only letters and spaces.";
    }
    if (!emailRegex.test(email)) {
      return "Please enter a valid email address.";
    }
    if (!numberRegex.test(number)) {
      return "Phone number must be exactly 11 digits.";
    }
    return '';
  };

  const handleAddOrUpdate = async (e) => {
    e.preventDefault();
    const validationError = validateForm();

    if (validationError) {
      setError(validationError);
      return;
    }

    setError(''); 

    try {
      if (editingIndex !== null) {
        await axios.put(`http://localhost:5000/api/employees/${details[editingIndex]._id}`, person);
        const updatedDetails = [...details];
        updatedDetails[editingIndex] = person;
        setDetails(updatedDetails);
      } else {
        const response = await axios.post('http://localhost:5000/api/employees', person);
        setDetails([...details, response.data]);
      }
      resetForm();
    } catch (error) {
      setError("Error saving employee data. Please try again.");
    }
  };
  const resetForm = () => {
    setPerson({ name: '', email: '', number: '', job_title: '', department: '', salary: '' });
    setEditingIndex(null);
  };

  const handleEdit = (index) => {
    setPerson(details[index]);
    setEditingIndex(index);
  };

  const handleDelete = async (index) => {
    await axios.delete(`http://localhost:5000/api/employees/${details[index]._id}`);
    const updatedDetails = details.filter((_, i) => i !== index);
    setDetails(updatedDetails);
  };

  const handleLogout = () => {
    navigate('/Login');
  };

  return (
    <div className="dashboardContainer">
      <h1>Employee Records</h1>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Phone Number</th>
            <th>Job Title</th>
            <th>Department</th>
            <th>Salary</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {details.map((person, index) => (
            <tr key={person._id}>
              <td>{person.name}</td>
              <td>{person.email}</td>
              <td>{person.number}</td>
              <td>{person.job_title}</td>
              <td>{person.department}</td>
              <td>{person.salary}</td>
              <td>
                <button onClick={() => handleEdit(index)}>Edit</button>
                <button onClick={() => handleDelete(index)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <form className="dashboardForm" onSubmit={handleAddOrUpdate}>
        <input type="text" name="name" value={person.name} placeholder="Name" onChange={handleInputChange} required />
        <input type="email" name="email" value={person.email} placeholder="Email" onChange={handleInputChange} required />
        <input type="text" name="number" value={person.number} placeholder="Phone Number" onChange={handleInputChange} required />
        <input type="text" name="job_title" value={person.job_title} placeholder="Job Title" onChange={handleInputChange} required />
        <input type="text" name="department" value={person.department} placeholder="Department" onChange={handleInputChange} required />
        <input type="number" name="salary" value={person.salary} placeholder="Salary" onChange={handleInputChange} required />
        {error && <div style={{color: 'red', marginBottom: '10px'}}>{error}</div>}
        <button type="submit">{editingIndex !== null ? 'Update' : 'Add'}</button>
      </form>
      <button className="logoutButton" onClick={handleLogout}>Logout</button>
    </div>
  );
}