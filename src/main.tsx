import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { UserElement } from "./types/user.tsx";
import { BrowserRouter, Routes, Route } from "react-router-dom";
// Router
import UserRoutes from "./routes/user.tsx";
// layout
import UserLayout from "./layout/user.tsx";

interface RouterProducerProps {
	routeConfig: UserElement[];
}

// Hàm sử lý gọi router
const RouterProducer: React.FC<RouterProducerProps> = ({ routeConfig }) => {
	const renderRoutes = (routes: UserElement[]) =>
		routes.map((item: UserElement) => (
			<Route key={item.path} path={item.path} element={item.element}>
				{item.children && renderRoutes(item.children)}
			</Route>
		));
	return (
		<Routes>
			<Route path="/" element={<UserLayout />}>
				{renderRoutes(routeConfig)}
			</Route>
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
