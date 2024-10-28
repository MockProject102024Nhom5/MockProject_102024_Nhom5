import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Login: React.FC = () => {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [error, setError] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const navigate = useNavigate();

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const response = await axios.post('https://671b81f02c842d92c3803e9d.mockapi.io/api/account', {
        email,
        password,
      });

      if (response.status === 201) {
        const { password, ...userDataWithoutPassword } = response.data;
        sessionStorage.setItem('userData', JSON.stringify(userDataWithoutPassword));
        alert('Login successful!');
        navigate('/');
      } else {
        setError('Invalid email or password');
      }
    } catch (error) {
      setError('Login failed. Please try again.');
    }

    setLoading(false);
  };

  return (
    <div className="relative h-screen w-screen bg-cover bg-center">
      <div className="absolute inset-0 bg-black opacity-50"></div>
      <div className="relative flex justify-center items-center h-full">
        <div className="bg-white bg-opacity-90 shadow-lg rounded-lg p-8 w-full max-w-md">
          <div className="text-center mb-6">
            <h1 className="text-2xl font-bold text-gray-800">MOCK</h1>
            <p className="text-sm text-gray-600">Facility Management System</p>
          </div>

          <form onSubmit={handleLogin}>
            {error && <p className="text-red-600 text-sm mb-4">{error}</p>}
            <div className="mb-4">
              <label className="block text-gray-600 text-sm font-medium mb-1" htmlFor="email">
                Email
              </label>
              <input
                type="text"
                id="email"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-green-500"
                placeholder="Nhập email hoặc số điện thoại"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="mb-4 relative">
              <label className="block text-gray-600 text-sm font-medium mb-1" htmlFor="password">
                Password
              </label>
              <input
                type={showPassword ? 'text' : 'password'}
                id="password"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-green-500"
                placeholder="Nhập mật khẩu"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <button
                type="button"
                onClick={togglePasswordVisibility}
                className="absolute inset-y-0 right-4 flex items-center text-gray-500"
                style={{ marginTop: "7%" }}
              >
                {showPassword ? (
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13.875 18.825a10.05 10.05 0 01-7.293-2.25M9.75 15.075A4.751 4.751 0 019.75 8.25m4.125 6.825A4.751 4.751 0 0016.5 8.25M21 21l-2.25-2.25M3.75 3.75L21 21m0 0A10.003 10.003 0 0013.875 18.825" />
                  </svg>
                ) : (
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.522 5 12 5s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S3.732 16.057 2.458 12z" />
                  </svg>
                )}
              </button>
            </div>

            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center">
                <input id="remember" type="checkbox" className="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 rounded" />
                <label htmlFor="remember" className="ml-2 block text-sm text-gray-600">
                  Remember me
                </label>
              </div>
              <a href="#" className="text-sm text-green-500 hover:text-green-700">
                Forgot Password?
              </a>
            </div>

            <div>
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-2 rounded-lg transition duration-200 disabled:opacity-50"
              >
                {loading ? 'Signing In...' : 'Sign In'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
