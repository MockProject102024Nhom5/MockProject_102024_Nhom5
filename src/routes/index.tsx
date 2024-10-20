import { UserElement } from '../types/user.tsx';
import Home from '../pages/home/index.tsx';
import Other from '../pages/other/index.tsx';
import Employee from '../pages/employee/index.tsx';
import CreateEmployee from '../pages/employee/create.tsx';
import User from '../pages/user/index.tsx';
import CreateAccount from '../pages/user/create.tsx';
import EditAccount from '../pages/user/edit.tsx';



const UserRoutes: UserElement[] = [
    {
        path: '/',
        element: <Home />,
    },
    {
        path: '/other',
        element: <Other />,
    },
    {
        path: '/employee',
        element: <Employee />,
    },
    {
        path: '/employee/create',
        element: <CreateEmployee />,
    },
    //User
    {
        path: '/user',
        element: <User />,
    },
    {
        path: '/user/create',
        element: <CreateAccount />,
    },
    {
        path: '/user/edit/:id',
        element: <EditAccount />,
    },
]
export default UserRoutes;