import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';

const EmployeeDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [employee, setEmployee] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchEmployeeData = async () => {
      try {
        const response = await axios.get(`https://6710d190a85f4164ef2f7802.mockapi.io/employee/${id}`);
        setEmployee(response.data);
        setLoading(false);
      } catch (error) {
        setError('Could not fetch employee details');
        setLoading(false);
      }
    };

    fetchEmployeeData();
  }, [id]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  if (!employee) {
    return <div>Employee not found</div>;
  }

  return (
    <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg p-6">
      <h2 className="text-2xl font-bold mb-4">Employee Details</h2>

      <div className="grid grid-cols-2 gap-4">
        <div className="col-span-1">
          <p><strong>SSN:</strong> {employee.ssn}</p>
        </div>

        <div className="col-span-1">
          <p><strong>Full Name:</strong> {employee.full_name}</p>
        </div>

        <div className="col-span-1">
          <p><strong>Date of Birth:</strong> {employee.date_of_birth}</p>
        </div>

        <div className="col-span-1">
          <p><strong>Phone Number:</strong> {employee.phone_number}</p>
        </div>

        <div className="col-span-1">
          <p><strong>Email:</strong> {employee.email}</p>
        </div>

        <div className="col-span-1">
          <p><strong>Job Position:</strong> {employee.job_position}</p>
        </div>

        <div className="col-span-2">
          <p><strong>Note:</strong> {employee.note || 'No notes available'}</p>
        </div>
      </div>

      <div className="mt-6 flex justify-center space-x-4">
        <Link to={`/employee/edit/${employee.id}`} className="bg-blue-500 text-white px-6 py-2 rounded-md hover:bg-blue-600">
          Edit
        </Link>
        <Link to="/employee" className="bg-gray-500 text-white px-6 py-2 rounded-md hover:bg-gray-600">
          Back to List
        </Link>
      </div>
    </div>
  );
};

export default EmployeeDetail;
