import React, { useState } from 'react';
import Background from './../../../assets/bgr-login.jpg';
import { EyeOutlined, EyeInvisibleOutlined } from '@ant-design/icons';

const LoginPage: React.FC = () => {
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div
      className="min-h-screen bg-cover bg-no-repeat bg-center flex items-center justify-center"
      style={{
        backgroundImage: `url(${Background})`,
      }}
    >
      <div className="bg-white/50 backdrop-blur-md rounded-lg p-6 md:p-8 shadow-lg w-full max-w-md mx-4 md:mx-0">
        <div className="text-center mb-6">
          <h2 className="text-mg md:text-2xl font-bold text-gray-800">
            MOCK
          </h2>
          <p className="text-sm text-gray-600">Facility Management System</p>
        </div>
        <form>
          {/* Email input */}
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2 text-left">
              Email hoặc Số điện thoại
            </label>
            <input
              type="text"
              placeholder="Email hoặc Số điện thoại"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:border-green-500"
            />
          </div>
          {/* Password input */}
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2 text-left">
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                placeholder="Password"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg  shadow-sm focus:outline-none focus:border-green-500"
              />
              <span
                className="absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer"
                onClick={togglePasswordVisibility}
              >
                {showPassword ? (
                  <EyeOutlined className="h-5 w-5 text-gray-500" />
                ) : (
                  <EyeInvisibleOutlined className="h-5 w-5 text-gray-500" />
                )}
              </span>
            </div>
          </div>
          {/* Remember me and forgot password */}
          <div className="flex items-center justify-between mb-6">
            <label className="flex items-center text-sm">
              <input
                type="checkbox"
                className="form-checkbox text-green-500"
              />
              <span className="ml-2 text-gray-700">Remember me</span>
            </label>
            <a href="#" className="text-sm text-green-500 hover:text-green-700">
              Forgot Password?
            </a>
          </div>
          {/* Submit button */}
          <button
            type="submit"
            className="w-full bg-green-500 text-white py-2 px-4 rounded-lg hover:bg-green-600"
          >
            Sign In
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
