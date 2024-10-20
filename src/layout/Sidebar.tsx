import React, { useState } from 'react';
import { Link, Outlet } from 'react-router-dom';

const Sidebar: React.FC = () => {
	const [isOpen, setIsOpen] = useState(true);

	return (
		<div className="flex">
			{/* Sidebar */}
			<div
				className={`${isOpen ? 'w-64' : 'w-16'
					} bg-gray-900 h-screen p-5 pt-8 relative duration-300`}
			>
				<img
					src="https://img.icons8.com/material-outlined/24/ffffff/menu--v1.png"
					className={`absolute cursor-pointer right-2.5 top-9 w-7 border-dark-purple
            border-2   ${!isOpen && 'rotate-180'}`}
					onClick={() => setIsOpen(!isOpen)}
					alt="Toggle"
				/>
				<div className="flex items-center">
					<h1
						className={`text-white origin-left font-medium text-xl duration-300 ${!isOpen && 'scale-0'
							}`}
					>
						<Link to='/'>MOCK PROJECT</Link>
					</h1>
				</div>

				{/* Menu Items */}
				<ul className="pt-6">
					<li className="text-gray-300 text-sm flex items-center gap-x-4 cursor-pointer p-2 hover:bg-gray-700 rounded-md">
						<span className={`${!isOpen && 'hidden'} origin-left duration-200`}><Link to='/employee'>Employee</Link></span>
						{/* <span className="ml-auto bg-gray-600 text-white text-xs px-2 py-1 rounded-full">5</span> */}
					</li>
					<li className="text-gray-300 text-sm flex items-center gap-x-4 cursor-pointer p-2 hover:bg-gray-700 rounded-md">
						<span className={`${!isOpen && 'hidden'} origin-left duration-200`}><Link to='/user'>User</Link></span>
					</li>
					<li className="text-gray-300 text-sm flex items-center gap-x-4 cursor-pointer p-2 hover:bg-gray-700 rounded-md">
						<span className={`${!isOpen && 'hidden'} origin-left duration-200`}>Projects</span>
						{/* <span className="ml-auto bg-gray-600 text-white text-xs px-2 py-1 rounded-full">12</span> */}
					</li>
					<li className="text-gray-300 text-sm flex items-center gap-x-4 cursor-pointer p-2 hover:bg-gray-700 rounded-md">
						<span className={`${!isOpen && 'hidden'} origin-left duration-200`}>Calendar</span>
						{/* <span className="ml-auto bg-gray-600 text-white text-xs px-2 py-1 rounded-full">20+</span> */}
					</li>
					<li className="text-gray-300 text-sm flex items-center gap-x-4 cursor-pointer p-2 hover:bg-gray-700 rounded-md">
						<span className={`${!isOpen && 'hidden'} origin-left duration-200`}>Resident</span>
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
					<h2 className="text-gray-400 text-sm mb-2">Your teams</h2>
					<ul>
						<li className="flex items-center gap-x-2 mb-3">
							<span className="bg-gray-500 text-white p-2 rounded-full">H</span>
							<span className='text-white'>Heroicons</span>
						</li>
						<li className="flex items-center gap-x-2 mb-3">
							<span className="bg-gray-500 text-white p-2 rounded-full">T</span>
							<span className='text-white'>Tailwind Labs</span>
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
						<span className={`${!isOpen && 'hidden'} text-white`}>John Huynhk</span>
					</div>
				</div>
			</div>

			<div className="flex-1 p-7">
				<Outlet />
			</div>
		</div>
	);
};

export default Sidebar;

