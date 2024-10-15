import { Link, Outlet } from "react-router-dom";

const user = () => {
	return (
		<div className="flex">
			<div className="w-[296px] h-full bg-red-50 fixed flex flex-col">
				<Link to='/'>Page Home</Link>
				<Link to='/other'>Page Other</Link>
			</div>
			<div className="ml-[296px] h-full bg-blue-300 w-full">
				<Outlet />
			</div>
		</div>
	);
};

export default user;
