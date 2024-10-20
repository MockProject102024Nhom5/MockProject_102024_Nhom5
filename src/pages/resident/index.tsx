import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
interface Resident {
    residentId: string;
    fullName: string;
    phoneNumber: string;
    email: string;
    role: string;
}

const ResidentList: React.FC = () => {
    const [residents, setResidents] = useState<Resident[]>([]);
    const [searchQuery, setSearchQuery] = useState<string>('');
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [residentId, setResidentId] = useState<string>('');
    const [fullName, setFullName] = useState<string>('');
    const [role, setRole] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [phoneNumber, setPhoneNumber] = useState<string>('');
    const [password, setPassword] = useState<string>('');
  
    useEffect(() => {
      fetchResidents();
    }, [currentPage]);
  
    const fetchResidents = async () => {
        try {
          const response = await axios.get<Resident[]>(`https://671200354eca2acdb5f6890f.mockapi.io/api/residents?page=${currentPage}&limit=10`);
          console.log(response.data); // Kiểm tra dữ liệu trả về
          console.log(response.data.map(resident => resident.residentId)); // Kiểm tra từng ID
          setResidents(response.data);
        } catch (error) {
          console.error('Error fetching residents:', error);
        }
    };
  
    const handleSearch = async () => {
      if (searchQuery) {
        try {
          const response = await axios.get<Resident[]>(`https://671200354eca2acdb5f6890f.mockapi.io/api/residents?search=${searchQuery}`);
          setResidents(response.data);
        } catch (error) {
          console.error('Error searching residents:', error);
        }
      } else {
        fetchResidents();
      }
    };
  
    const handleUpdate = (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      // Code to update resident information goes here
    };
    const handleResidentClick = (resident: Resident) => {
        setResidentId(resident.residentId);
        setFullName(resident.fullName);
        setRole(resident.role);
        setEmail(resident.email);
        setPhoneNumber(resident.phoneNumber);
        setPassword(''); // Bạn có thể để rỗng hoặc gán giá trị mặc định
      };
    return (
      <div className="container mx-auto p-4 bg-white rounded-lg shadow-md">
        <h1 className="text-2xl font-bold text-center mb-6">List Manage Resident Information</h1>
  
        <div className="form-container mb-4">
          <form id="updateForm" onSubmit={handleUpdate} className="space-y-4">
            <div className="form-row">
              <label htmlFor="residentId" className="block text-sm font-medium text-gray-700">Resident ID:</label>
              <input type="text" id="residentId" disabled value={residentId} className="mt-1 block w-full border-2 border-gray-300 rounded-md shadow-sm" />
            </div>
            <div className="form-row">
              <label htmlFor="fullName" className="block text-sm font-medium text-gray-700">Full Name:</label>
              <input type="text" id="fullName" value={fullName} onChange={(e) => setFullName(e.target.value)} className="mt-1 block w-full border-2 border-gray-300 rounded-md shadow-sm" />
            </div>
            <div className="form-row">
              <label htmlFor="role" className="block text-sm font-medium text-gray-700">Role:</label>
              <input type="text" id="role" value={role} onChange={(e) => setRole(e.target.value)} className="mt-1 block w-full border-2 border-gray-300 rounded-md shadow-sm" />
            </div>
            <div className="form-row">
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email:</label>
              <input type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} className="mt-1 block w-full border-2 border-gray-300 rounded-md shadow-sm" />
            </div>
            <div className="form-row">
              <label htmlFor="phoneNumber" className="block text-sm font-medium text-gray-700">Phone Number:</label>
              <input type="text" id="phoneNumber" value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} className="mt-1 block w-full border-2 border-gray-300 rounded-md shadow-sm" />
            </div>
            <div className="form-row">
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password:</label>
              <input type="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} className="mt-1 block w-full border-2 border-gray-300 rounded-md shadow-sm" />
            </div>
            <div className="form-row">
              <button type="submit" className="w-full bg-blue-500 text-white rounded-md px-4 py-2">Update</button>
            </div>
          </form>
        </div>
  
        <div className="search-container mb-4 flex justify-between items-center">
          <input
            type="text"
            id="searchQuery"
            placeholder="Enter name or phone number or email"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="border border-gray-300 rounded-md p-2 flex-1 mr-2"
          />
          <button id="searchButton" onClick={handleSearch} className="bg-green-500 text-white rounded-md px-4 py-2">Search</button>
        </div>
  
        <div className="table-container mb-4">
          <table className="min-w-full border-collapse border border-gray-300">
            <thead>
              <tr className="bg-gray-100">
                <th className="border border-gray-300 px-4 py-2">Resident ID</th>
                <th className="border border-gray-300 px-4 py-2">Full Name</th>
                <th className="border border-gray-300 px-4 py-2">Phone Number</th>
                <th className="border border-gray-300 px-4 py-2">Email</th>
                <th className="border border-gray-300 px-4 py-2">Role</th>
              </tr>
            </thead>
            <tbody id="residentTableBody">
            {residents.map((resident) => (
            <tr key={resident.residentId} className="text-center" onClick={() => handleResidentClick(resident)}>
                <td className="border border-gray-300 px-4 py-2">{resident.residentId}</td>
                <td className="border border-gray-300 px-4 py-2">{resident.fullName}</td>
                <td className="border border-gray-300 px-4 py-2">{resident.phoneNumber}</td>
                <td className="border border-gray-300 px-4 py-2">{resident.email}</td>
                <td className="border border-gray-300 px-4 py-2">{resident.role}</td>
            </tr>
            ))}
            </tbody>
          </table>
        </div>
  
        <div className="pagination flex justify-between mt-4">
          <button id="previousPage" onClick={() => setCurrentPage(currentPage > 1 ? currentPage - 1 : 1)} className="bg-gray-300 text-gray-700 rounded-md px-4 py-2" disabled={currentPage === 1}>
            Previous
          </button>
          <span id="pageNumber" className="self-center">{currentPage}</span>
          <button id="nextPage" onClick={() => setCurrentPage(currentPage + 1)} className="bg-gray-300 text-gray-700 rounded-md px-4 py-2">
            Next
          </button>
        </div>
      </div>
    );
  };
  
  export default ResidentList;