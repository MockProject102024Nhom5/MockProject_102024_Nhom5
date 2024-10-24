import { UserElement } from '../types/user.tsx';
import Home from '../pages/home/index.tsx';
import Employee from '../pages/employee/index.tsx';
import CreateEmployee from '../pages/employee/create.tsx';
import User from '../pages/user/index.tsx';
import CreateAccount from '../pages/user/create.tsx';
import EditAccount from '../pages/user/edit.tsx';
import EditEmployee from '../pages/employee/edit.tsx';
import EmployeeDetail from '../pages/employee/detail.tsx';

const UserRoutes: UserElement[] = [
    {
        path: '/',
        element: <Home />,
    },
    {
        path: '/employee',
        element: <Employee />,
    },
    {
        path: '/employee/create',
        element: <CreateEmployee />,
    },
    {
        path: '/employee/edit/:id',
        element: <EditEmployee />,
    },
    {
        path: '/employee/:id',
        element: <EmployeeDetail />,
    },
    //User
    {
        path: '/accounts',
        element: <User />,
    },
    {
        path: '/accounts/create',
        element: <CreateAccount />,
    },
    {
        path: '/accounts/edit/:id',
        element: <EditAccount />,
    },
]
export default UserRoutes;