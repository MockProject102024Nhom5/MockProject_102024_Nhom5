import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

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

  const [currentPage, setCurrentPage] = useState<number>(1); // Current page
  const [employeesPerPage] = useState<number>(6); // Number of employees per page

  const [showDeleteConfirm, setShowDeleteConfirm] = useState<boolean>(false);
  const [employeeToDelete, setEmployeeToDelete] = useState<Employee | null>(null);

  // Fetch employees when the component mounts
  useEffect(() => {
    const fetchEmployees = async () => {
      setLoading(true);
      try {
        const response = await axios.get('https://6710d190a85f4164ef2f7802.mockapi.io/employee');
        setEmployees(response.data);
        setError(null);
      } catch (error) {
        setError('Failed to fetch employee data');
      } finally {
        setLoading(false);
      }
    };

    fetchEmployees();
  }, []);

  // Search employees by name
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchName(value);
    if (value === '') {
      setCurrentPage(1); // Reset to first page if search is cleared
    }
  };

  // Filter employees based on search input
  const filteredEmployees = employees.filter((employee) =>
    employee.full_name.toLowerCase().includes(searchName.toLowerCase())
  );

  // Get current employees for the current page
  const indexOfLastEmployee = currentPage * employeesPerPage;
  const indexOfFirstEmployee = indexOfLastEmployee - employeesPerPage;
  const currentEmployees = filteredEmployees.slice(indexOfFirstEmployee, indexOfLastEmployee);

  // Calculate total pages
  const totalPages = Math.ceil(filteredEmployees.length / employeesPerPage);

  // Handle pagination navigation
  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  // Handle delete confirmation
  const handleDeleteClick = (employee: Employee) => {
    setEmployeeToDelete(employee);
    setShowDeleteConfirm(true);
  };

  // Confirm deletion
  const handleConfirmDelete = async () => {
    if (employeeToDelete) {
      try {
        await axios.delete(`https://6710d190a85f4164ef2f7802.mockapi.io/employee/${employeeToDelete.id}`);
        setEmployees(employees.filter((emp) => emp.id !== employeeToDelete.id));
        setShowDeleteConfirm(false);
        setEmployeeToDelete(null);
      } catch (error) {
        console.error('Failed to delete employee', error);
      }
    }
  };

  return (
    <div className="container mx-auto px-4">
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
            onChange={handleSearch}
          />
        </div>
      </div>
      <div className="overflow-x-auto">
        {loading ? (
          <p>Loading...</p>
        ) : error ? (
          <p className="text-red-500">{error}</p>
        ) : (
          <>
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
                {currentEmployees.map((employee) => (
                  <tr key={employee.id} className="border-b hover:bg-gray-50">
                    <td className="p-3 border">{employee.ssn}</td>
                    <td className="p-3 border">{employee.full_name}</td>
                    <td className="p-3 border">{employee.date_of_birth}</td>
                    <td className="p-3 border">{employee.phone_number}</td>
                    <td className="p-3 border">{employee.email}</td>
                    <td className="p-3 border">{employee.job_position}</td>
                    <td className="p-3 text-center border flex gap-2 justify-center">
                      <button className="text-blue-500 hover:underline"><Link to={`/employee/edit/${employee.id}`}>Edit</Link></button>
                      <button className="text-green-500 hover:underline"><Link to={`/employee/${employee.id}`}>Detail</Link></button>
                      <button className="text-red-500 hover:underline" onClick={() => handleDeleteClick(employee)}>Delete</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {/* Pagination Controls */}
            <div className="flex justify-between items-center mt-4">
              <button
                onClick={handlePreviousPage}
                className={`bg-gray-300 text-gray-700 px-4 py-2 rounded-md ${currentPage === 1 && 'cursor-not-allowed'}`}
                disabled={currentPage === 1}
              >
                Previous
              </button>
              <span>{currentPage} / {totalPages}</span>
              <button
                onClick={handleNextPage}
                className={`bg-gray-300 text-gray-700 px-4 py-2 rounded-md ${currentPage === totalPages && 'cursor-not-allowed'}`}
                disabled={currentPage === totalPages}
              >
                Next
              </button>
            </div>
          </>
        )}
      </div>

      {/* Delete Confirmation Modal */}
      {showDeleteConfirm && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-md shadow-md">
            <h2 className="text-lg font-semibold mb-4">Confirm Deletion</h2>
            <p>Are you sure you want to delete {employeeToDelete?.full_name}?</p>
            <div className="flex justify-end mt-4 space-x-4">
              <button
                className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600"
                onClick={handleConfirmDelete}
              >
                Delete
              </button>
              <button
                className="bg-gray-300 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-400"
                onClick={() => setShowDeleteConfirm(false)}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Index;
