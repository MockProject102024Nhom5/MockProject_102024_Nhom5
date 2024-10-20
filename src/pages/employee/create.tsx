import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const AddEmployeeForm: React.FC = () => {
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

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setEmployeeData({
      ...employeeData,
      [name]: value,
    });
  };

  // Submit create emplyee
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await fetch('https://6710d190a85f4164ef2f7802.mockapi.io/employee', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(employeeData),
      });

      if (response.ok) {
        const result = await response.json();
        setMessage('Employee added successfully!');
        console.log('Employee added:', result);
        setEmployeeData({
          ssn: '',
          full_name: '',
          date_of_birth: '',
          phone_number: '',
          email: '',
          job_position: '',
          note: '',
        });
      } else {
        setMessage('Failed to add employee.');
        console.error('Error adding employee:', response.statusText);
      }
    } catch (error) {
      setMessage('An error occurred while adding employee.');
      console.error('Error:', error);
    }
  };

  return (
    <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg p-6">
      {/* Form thêm nhân viên */}
      <form onSubmit={handleSubmit}>
        {/* Các trường nhập liệu */}
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
              placeholder="123-45-6789"
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
              placeholder="John Doe"
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
              placeholder="034588229"
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
              placeholder="john.doe@gmail.com"
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
              placeholder="Software Engineer"
              required
            />
          </div>

          <div className="col-span-2">
            <label className="block text-gray-700 font-medium mb-2" htmlFor="note">
              Note
            </label>
            <textarea
              id="note"
              name="note"
              value={employeeData.note}
              onChange={handleInputChange}
              className="border border-gray-300 rounded-md px-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Employee of the month"
            />
          </div>
        </div>

        {/* Nút điều khiển */}
        <div className="mt-6 flex justify-center space-x-4">
          <button
            type="submit"
            className="bg-green-500 text-white px-6 py-2 rounded-md hover:bg-green-600 flex items-center"
          >
            Add
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

      {/* Thông báo */}
      {message && <p className="text-center mt-4 text-green-500">{message}</p>}
    </div>
  );
};

export default AddEmployeeForm;
