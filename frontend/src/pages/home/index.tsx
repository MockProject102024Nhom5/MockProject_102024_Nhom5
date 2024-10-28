import React from 'react';
import { Link } from 'react-router-dom';
import { TeamOutlined, HomeOutlined, AppstoreOutlined, FileTextOutlined } from '@ant-design/icons';

const HomePage: React.FC = () => {
  return (
    <div className="container mx-auto p-6">
      <h1 className="text-4xl font-bold text-center mb-10">Apartment Management System</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">

        <Link to="/residents" className="home-card">
          <div className="p-8 bg-blue-50 rounded-lg shadow-lg hover:bg-blue-100 transition duration-200 ease-in-out transform hover:scale-105">
            <TeamOutlined className="text-blue-600 text-4xl mb-4" />
            <h2 className="text-2xl font-semibold text-blue-800">Resident Management</h2>
            <p className="mt-2 text-gray-700">View, add, and manage resident information within the apartment.</p>
          </div>
        </Link>

        <Link to="/apartments" className="home-card">
          <div className="p-8 bg-green-50 rounded-lg shadow-lg hover:bg-green-100 transition duration-200 ease-in-out transform hover:scale-105">
            <HomeOutlined className="text-green-600 text-4xl mb-4" />
            <h2 className="text-2xl font-semibold text-green-800">Apartment Management</h2>
            <p className="mt-2 text-gray-700">View and manage details of apartments within the building complex.</p>
          </div>
        </Link>

        <Link to="/utilities" className="home-card">
          <div className="p-8 bg-yellow-50 rounded-lg shadow-lg hover:bg-yellow-100 transition duration-200 ease-in-out transform hover:scale-105">
            <AppstoreOutlined className="text-yellow-600 text-4xl mb-4" />
            <h2 className="text-2xl font-semibold text-yellow-800">Utility Management</h2>
            <p className="mt-2 text-gray-700">Manage common utilities such as pool, gym, playground, and more.</p>
          </div>
        </Link>

        <Link to="/billing" className="home-card">
          <div className="p-8 bg-purple-50 rounded-lg shadow-lg hover:bg-purple-100 transition duration-200 ease-in-out transform hover:scale-105">
            <FileTextOutlined className="text-purple-600 text-4xl mb-4" />
            <h2 className="text-2xl font-semibold text-purple-800">Billing Management</h2>
            <p className="mt-2 text-gray-700">Monitor and manage monthly service fees and billing information.</p>
          </div>
        </Link>

      </div>
    </div>
  );
};

export default HomePage;
