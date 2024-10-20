import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Create: React.FC = () => {
  const [fullName, setFullName] = useState<string>('');
  const [phoneNumber, setPhoneNumber] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [nationality, setNationality] = useState<string>('');
  const [active, setActive] = useState<boolean>(false);

  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const newAccount = {
        full_name: fullName,
        phone_number: phoneNumber,
        email: email,
        active: active,
      };

      // Gửi yêu cầu POST tới API
      await axios.post('https://6710d190a85f4164ef2f7802.mockapi.io/account', newAccount);

      // Điều hướng quay lại trang danh sách tài khoản sau khi thêm thành công
      navigate('/user');
    } catch (error) {
      console.error('Error adding account:', error);
    }
  };

  return (
    <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg p-6">
      <h2 className="text-2xl font-bold mb-4">Add Account</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Full Name</label>
          <input
            type="text"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            required
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Phone Number</label>
          <input
            type="text"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            required
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Nationality</label>
          <input
            type="text"
            value={nationality}
            onChange={(e) => setNationality(e.target.value)}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
          />
        </div>
        <div className="flex items-center">
          <input
            type="checkbox"
            checked={active}
            onChange={(e) => setActive(e.target.checked)}
            className="mr-2"
          />
          <label className="text-sm font-medium text-gray-700">Active</label>
        </div>
        <div className="flex justify-between">
          <button
            type="button"
            onClick={() => navigate('/user')}
            className="bg-blue-500 text-white rounded-md px-4 py-2"
          >
            Back
          </button>
          <button
            type="submit"
            className="bg-green-500 text-white rounded-md px-4 py-2"
          >
            Add
          </button>
        </div>
      </form>
    </div>
  );
};

export default Create;
