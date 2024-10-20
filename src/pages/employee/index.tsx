import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

interface Employee {
  id: string;
  ssn: string;
  full_name: string;
  date_of_birth: string;
  phone_number: string;
  email: string;
  job_position: string;
}

const Index: React.FC = () => {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [searchName, setSearchName] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  //Call AIP list Employeer
  useEffect(() => {
    const fetchEmployees = async () => {
      setLoading(true);
      try {
        const response = await fetch('https://6710d190a85f4164ef2f7802.mockapi.io/employee');
        const data = await response.json();
        setEmployees(data);
        setError(null);
      } catch (error) {
        setError('Failed to fetch employee data');
      } finally {
        setLoading(false);
      }
    };

    fetchEmployees();
  }, []);

  //Function handleSearch
  const handleSearch = () => {
    if (!searchName) return;
    const foundEmployees = employees.filter((employee) =>
      employee.full_name.includes(searchName)
    );
    if (foundEmployees) {
      setEmployees(foundEmployees);
      setError(null);
    } else {
      setError('Employee not found');
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-semibold mb-6">Employee List</h1>
      <div className="flex justify-between items-center mb-4">
        <button className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600">
          <Link to='/employee/create'>+ New Employee</Link>
        </button>
        <div className="flex items-center">
          <input
            type="text"
            placeholder="Search by Name"
            className="border border-gray-300 rounded-md px-4 py-2 mr-2 focus:outline-none focus:ring-2 focus:ring-gray-400"
            value={searchName}
            onChange={(e) => setSearchName(e.target.value)}
          />
          <button
            onClick={handleSearch}
            className="bg-gray-700 text-white px-4 py-2 rounded-md hover:bg-gray-600">
            Search
          </button>
        </div>
      </div>
      <div className="overflow-x-auto">
        {loading ? (
          <p>Loading...</p>
        ) : error ? (
          <p className="text-red-500">{error}</p>
        ) : (
          <table className="min-w-full bg-white border border-gray-300">
            <thead>
              <tr className="bg-gray-100">
                <th className="text-left p-3 font-medium text-gray-600 border">SSN</th>
                <th className="text-left p-3 font-medium text-gray-600 border">Name</th>
                <th className="text-left p-3 font-medium text-gray-600 border">Date of Birth</th>
                <th className="text-left p-3 font-medium text-gray-600 border">Phone</th>
                <th className="text-left p-3 font-medium text-gray-600 border">Email</th>
                <th className="text-left p-3 font-medium text-gray-600 border">Job Position</th>
                <th className="text-center p-3 font-medium text-gray-600 border">Action</th>
              </tr>
            </thead>
            <tbody>
              {employees.map((employee) => (
                <tr key={employee.id} className="border-b hover:bg-gray-50">
                  <td className="p-3 border">{employee.ssn}</td>
                  <td className="p-3 border">{employee.full_name}</td>
                  <td className="p-3 border">{employee.date_of_birth}</td>
                  <td className="p-3 border">{employee.phone_number}</td>
                  <td className="p-3 border">{employee.email}</td>
                  <td className="p-3 border">{employee.job_position}</td>
                  <td className="p-3 text-center border flex gap-2">
                    <button className="text-blue-500 hover:underline">Edit</button>
                    <button className="text-green-500 hover:underline">Detail</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default Index;
