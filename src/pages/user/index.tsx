import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

interface Account {
  id: string;
  full_name: string;
  phone_number: string;
  email: string;
  active: boolean;
  created_at: string;
  updated_at: string;
}

const AccountList: React.FC = () => {
  const [accounts, setAccounts] = useState<Account[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [showDeleteModal, setShowDeleteModal] = useState<boolean>(false);
  const [accountToDelete, setAccountToDelete] = useState<Account | null>(null);

  // State for pagination
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [accountsPerPage] = useState<number>(8); // Number of accounts per page

  useEffect(() => {
    fetchAccounts();
  }, []);

  const fetchAccounts = async () => {
    try {
      const response = await axios.get<Account[]>('https://6710d190a85f4164ef2f7802.mockapi.io/account');
      setAccounts(response.data);
    } catch (error) {
      console.error('Error fetching accounts:', error);
    }
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1); // Reset to first page when searching
  };

  const handleDelete = (account: Account) => {
    setAccountToDelete(account);
    setShowDeleteModal(true);
  };

  const confirmDelete = async () => {
    if (accountToDelete) {
      try {
        await axios.delete(`https://6710d190a85f4164ef2f7802.mockapi.io/account/${accountToDelete.id}`);
        setAccounts(accounts.filter((account) => account.id !== accountToDelete.id));
        setShowDeleteModal(false);
      } catch (error) {
        console.error('Error deleting account:', error);
      }
    }
  };

  // Filter accounts based on search term
  const filteredAccounts = accounts.filter(account =>
    account.full_name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Calculate total pages
  const totalPages = Math.ceil(filteredAccounts.length / accountsPerPage);

  // Get current accounts based on currentPage and accountsPerPage
  const indexOfLastAccount = currentPage * accountsPerPage;
  const indexOfFirstAccount = indexOfLastAccount - accountsPerPage;
  const currentAccounts = filteredAccounts.slice(indexOfFirstAccount, indexOfLastAccount);

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

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Account List</h2>
      <div className="flex mb-4">
        <input
          type="text"
          placeholder="Search by name"
          className="border border-gray-300 rounded-md p-2 mr-2"
          value={searchTerm}
          onChange={handleSearch}
        />
        <button onClick={fetchAccounts} className="bg-green-500 text-white rounded-md px-4 py-2">
          Search
        </button>
        <button className="ml-2 bg-blue-500 text-white rounded-md px-4 py-2"><Link to={'/user/create'}>Add Account</Link></button>
      </div>
      <table className="min-w-full table-auto border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-100">
            <th className="border border-gray-300 px-4 py-2">Full Name</th>
            <th className="border border-gray-300 px-4 py-2">Phone Number</th>
            <th className="border border-gray-300 px-4 py-2">Email</th>
            <th className="border border-gray-300 px-4 py-2">Active</th>
            <th className="border border-gray-300 px-4 py-2">Created At</th>
            <th className="border border-gray-300 px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {currentAccounts.map((account) => (
            <tr key={account.id} className="text-center">
              <td className="border border-gray-300 px-4 py-2">{account.full_name}</td>
              <td className="border border-gray-300 px-4 py-2">{account.phone_number}</td>
              <td className="border border-gray-300 px-4 py-2">{account.email}</td>
              <td className="border border-gray-300 px-4 py-2">
                {account.active ? (
                  <span className="text-green-600">Active</span>
                ) : (
                  <span className="text-red-600">Inactive</span>
                )}
              </td>
              <td className="border border-gray-300 px-4 py-2">
                {new Date(account.created_at).toLocaleDateString()}
              </td>
              <td className="border border-gray-300 px-4 py-2">
                <button className="bg-yellow-500 text-white rounded-md px-2 py-1 mr-2">
                  <Link to={`/user/edit/${account.id}`}>Edit</Link>
                </button>
                <button
                  onClick={() => handleDelete(account)}
                  className="bg-red-500 text-white rounded-md px-2 py-1"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Modal Xác Nhận Delete */}
      {showDeleteModal && accountToDelete && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-4 rounded-md shadow-md">
            <h3 className="text-xl font-semibold mb-4">Confirm Delete</h3>
            <p>Are you sure you want to delete the account of <strong>{accountToDelete.full_name}</strong>?</p>
            <div className="mt-4 flex justify-end">
              <button
                onClick={() => setShowDeleteModal(false)}
                className="bg-gray-500 text-white rounded-md px-4 py-2 mr-2"
              >
                Cancel
              </button>
              <button
                onClick={confirmDelete}
                className="bg-red-500 text-white rounded-md px-4 py-2"
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Pagination */}
      <div className="flex justify-between mt-4">
        <button
          onClick={handlePreviousPage}
          className={`bg-gray-300 text-gray-700 rounded-md px-4 py-2 ${currentPage === 1 ? 'cursor-not-allowed' : ''}`}
          disabled={currentPage === 1}
        >
          Previous
        </button>
        <span>{currentPage} / {totalPages}</span>
        <button
          onClick={handleNextPage}
          className={`bg-gray-300 text-gray-700 rounded-md px-4 py-2 ${currentPage === totalPages ? 'cursor-not-allowed' : ''}`}
          disabled={currentPage === totalPages}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default AccountList;
