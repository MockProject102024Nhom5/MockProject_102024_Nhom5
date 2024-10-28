import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';

const EditEmployee: React.FC = () => {
  const { id } = useParams<{ id: string }>();

  const [employeeData, setEmployeeData] = useState({
    ssn: '',
    full_name: '',
    date_of_birth: '',
    phone_number: '',
    email: '',
    job_position: '',
    note: '',
  });

  const [message, setMessage] = useState('');

  // Fetch employee data when the component mounts
  useEffect(() => {
    const fetchEmployeeData = async () => {
      try {
        const response = await axios.get(`https://6710d190a85f4164ef2f7802.mockapi.io/employee/${id}`);
        setEmployeeData(response.data);
      } catch (error) {
        console.error('Error fetching employee data:', error);
      }
    };

    fetchEmployeeData();
  }, [id]);

  // Handle input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setEmployeeData({
      ...employeeData,
      [name]: value,
    });
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await axios.put(`https://6710d190a85f4164ef2f7802.mockapi.io/employee/${id}`, employeeData);

      if (response.status === 200) {
        setMessage('Employee updated successfully!');
        console.log('Employee updated:', response.data);
      } else {
        setMessage('Failed to update employee.');
        console.error('Error updating employee:', response.statusText);
      }
    } catch (error) {
      setMessage('An error occurred while updating employee.');
      console.error('Error:', error);
    }
  };

  return (
    <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg p-6">
      <h2 className="text-xl font-bold mb-4">Edit Employee</h2>

      <form onSubmit={handleSubmit}>
        {/* Input fields */}
        <div className="grid grid-cols-2 gap-4">
          <div className="col-span-2">
            <label className="block text-gray-700 font-medium mb-2" htmlFor="ssn">
              SSN (Social Security)*
            </label>
            <input
              type="text"
              id="ssn"
              name="ssn"
              value={employeeData.ssn}
              onChange={handleInputChange}
              className="border border-gray-300 rounded-md px-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            />
          </div>

          <div className="col-span-2">
            <label className="block text-gray-700 font-medium mb-2" htmlFor="full_name">
              Full Name
            </label>
            <input
              type="text"
              id="full_name"
              name="full_name"
              value={employeeData.full_name}
              onChange={handleInputChange}
              className="border border-gray-300 rounded-md px-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            />
          </div>

          <div className="col-span-1">
            <label className="block text-gray-700 font-medium mb-2" htmlFor="date_of_birth">
              Date of Birth
            </label>
            <input
              type="date"
              id="date_of_birth"
              name="date_of_birth"
              value={employeeData.date_of_birth}
              onChange={handleInputChange}
              className="border border-gray-300 rounded-md px-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            />
          </div>

          <div className="col-span-1">
            <label className="block text-gray-700 font-medium mb-2" htmlFor="phone_number">
              Phone Number
            </label>
            <input
              type="text"
              id="phone_number"
              name="phone_number"
              value={employeeData.phone_number}
              onChange={handleInputChange}
              className="border border-gray-300 rounded-md px-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            />
          </div>

          <div className="col-span-2">
            <label className="block text-gray-700 font-medium mb-2" htmlFor="email">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={employeeData.email}
              onChange={handleInputChange}
              className="border border-gray-300 rounded-md px-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            />
          </div>

          <div className="col-span-2">
            <label className="block text-gray-700 font-medium mb-2" htmlFor="job_position">
              Job Position
            </label>
            <input
              type="text"
              id="job_position"
              name="job_position"
              value={employeeData.job_position}
              onChange={handleInputChange}
              className="border border-gray-300 rounded-md px-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            />
          </div>

          {/* Uncomment this block to include the "Note" field */}
          {/* <div className="col-span-2">
            <label className="block text-gray-700 font-medium mb-2" htmlFor="note">
              Note
            </label>
            <textarea
              id="note"
              name="note"
              value={employeeData.note}
              onChange={handleInputChange}
              className="border border-gray-300 rounded-md px-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div> */}
        </div>

        {/* Buttons */}
        <div className="mt-6 flex justify-center space-x-4">
          <button
            type="submit"
            className="bg-blue-500 text-white px-6 py-2 rounded-md hover:bg-blue-600 flex items-center"
          >
            Save Changes
          </button>
          <button
            type="button"
            onClick={() => setEmployeeData({
              ssn: '',
              full_name: '',
              date_of_birth: '',
              phone_number: '',
              email: '',
              job_position: '',
              note: '',
            })}
            className="bg-red-500 text-white px-6 py-2 rounded-md hover:bg-red-600 flex items-center"
          >
            <Link to='/employee'>Cancel</Link>
          </button>
        </div>
      </form>

      {/* Success or error message */}
      {message && <p className="text-center mt-4 text-green-500">{message}</p>}
    </div>
  );
};

export default EditEmployee;
