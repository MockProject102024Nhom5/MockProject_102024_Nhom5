import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { UserElement } from "./types/user.tsx";
import { BrowserRouter, Routes, Route, useLocation, Navigate } from "react-router-dom";
//Router
import UserRoutes from "./routes/index.tsx";
// layout
import Sidebar from "./layout/Sidebar.tsx";

//Login
import Login from "./pages/auth/Login.tsx";

interface RouterProducerProps {
	routeConfig: UserElement[];
}

// Hàm sử lý gọi router
const RouterProducer: React.FC<RouterProducerProps> = ({ routeConfig }) => {
	const location = useLocation();
	const isAuthenticated = sessionStorage.getItem("userData") !== null;

	const renderRoutes = (routes: UserElement[]) =>
		routes.map((item: UserElement) => (
			<Route key={item.path} path={item.path} element={item.element}>
				{item.children && renderRoutes(item.children)}
			</Route>
		));

	if (!isAuthenticated && location.pathname !== "/login") {
		return <Navigate to="/login" replace />;
	}
	return (
		<Routes>
			<Route path="/" element={<Sidebar />}>
				{renderRoutes(routeConfig)}
			</Route>
			<Route path="/login" element={<Login />}></Route>
		</Routes>
	);
};

createRoot(document.getElementById("root")!).render(
	<StrictMode>
		<BrowserRouter>
			<RouterProducer routeConfig={UserRoutes} />
		</BrowserRouter>
	</StrictMode>
);
