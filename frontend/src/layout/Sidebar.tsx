import React, { useState } from 'react';
import { Link, Outlet, useNavigate } from 'react-router-dom';

const Sidebar: React.FC = () => {
	const [isOpen, setIsOpen] = useState(true);
	const navigate = useNavigate();
	const storedUserData = sessionStorage.getItem('userData');
	const userData = storedUserData ? JSON.parse(storedUserData) : null;


	console.log(storedUserData)
	const handleLogout = () => {
		// Clears only userData
		sessionStorage.removeItem('userData');
		// Perform any additional logout logic here, if needed
		navigate('/login');
	};

	return (
		<div className="flex min-h-screen">
			{/* Sidebar */}
			<div
				className={`${isOpen ? 'w-64' : 'w-16'} fixed bg-gray-900 h-screen p-5 pt-8 duration-300`}
			>
				<img
					src="https://img.icons8.com/material-outlined/24/ffffff/menu--v1.png"
					className={`absolute cursor-pointer right-2.5 top-9 w-7 border-dark-purple border-2 ${!isOpen && 'rotate-180'}`}
					onClick={() => setIsOpen(!isOpen)}
					alt="Toggle"
				/>
				<div className="flex items-center">
					<h1
						className={`text-white origin-left font-medium text-xl duration-300 ${!isOpen && 'scale-0'}`}
					>
						<Link to='/'>MOCK PROJECT</Link>
					</h1>
				</div>

				{/* Menu Items */}
				<ul className="pt-6">
					<li className="text-gray-300 text-sm flex items-center gap-x-4 cursor-pointer p-2 hover:bg-gray-700 rounded-md">
						<span className={`${!isOpen && 'hidden'} origin-left duration-200`}><Link to='/employee'>Employee</Link></span>
					</li>
					<li className="text-gray-300 text-sm flex items-center gap-x-4 cursor-pointer p-2 hover:bg-gray-700 rounded-md">
						<span className={`${!isOpen && 'hidden'} origin-left duration-200`}><Link to='/accounts'>User</Link></span>
					</li>
					<li className="text-gray-300 text-sm flex items-center gap-x-4 cursor-pointer p-2 hover:bg-gray-700 rounded-md">
						<span className={`${!isOpen && 'hidden'} origin-left duration-200`}>Building</span>
					</li>
					<li className="text-gray-300 text-sm flex items-center gap-x-4 cursor-pointer p-2 hover:bg-gray-700 rounded-md">
						<span className={`${!isOpen && 'hidden'} origin-left duration-200`}>Calendar</span>
					</li>
					<li className="text-gray-300 text-sm flex items-center gap-x-4 cursor-pointer p-2 hover:bg-gray-700 rounded-md">
						<span className={`${!isOpen && 'hidden'} origin-left duration-200`}><Link to={"/residents"}>Resident</Link></span>
					</li>
					<li className="text-gray-300 text-sm flex items-center gap-x-4 cursor-pointer p-2 hover:bg-gray-700 rounded-md">
						<span className={`${!isOpen && 'hidden'} origin-left duration-200`}>Documents</span>
					</li>
					<li className="text-gray-300 text-sm flex items-center gap-x-4 cursor-pointer p-2 hover:bg-gray-700 rounded-md">
						<span className={`${!isOpen && 'hidden'} origin-left duration-200`}>Reports</span>
					</li>

				</ul>

				{/* Teams Section */}
				<div className={`${isOpen ? 'block' : 'hidden'} mt-10`}>
					<h2 className="text-gray-400 text-sm mb-2">More</h2>
					<ul>
						<li className="flex items-center gap-x-2 mb-3">
							<span className="bg-gray-500 text-white p-2 rounded-full">S</span>
							<span className='text-white'>Support</span>
						</li>
						<li className="flex items-center gap-x-2 mb-3">
							<span className="bg-gray-500 text-white p-2 rounded-full">C</span>
							<span className='text-white'>Contact us</span>
						</li>
						<li className="flex items-center gap-x-2 mb-3">
							<span className="bg-gray-500 text-white p-2 rounded-full">W</span>
							<span className='text-white'>Workcation</span>
						</li>
					</ul>
				</div>

				{/* Profile Section */}
				<div className="absolute bottom-0 left-0 p-4">
					<div className="flex items-center gap-x-4">
						<img
							src="https://img.icons8.com/ios-filled/50/ffffff/user-male-circle.png"
							className="w-8"
							alt="Profile"
						/>
						<span className={`${!isOpen && 'hidden'} text-white`}>{userData.full_name}</span>
						<img
							src="https://img.icons8.com/ios-glyphs/30/ffffff/logout-rounded.png"
							alt="Logout"
							className="w-6 cursor-pointer"
							onClick={handleLogout}
						/>
					</div>
				</div>
			</div>
			{/* Content Area */}
			<div className="flex-1 ml-16 md:ml-64 p-7 overflow-y-auto">
				<Outlet />
			</div>
		</div>
	);
};

export default Sidebar;
