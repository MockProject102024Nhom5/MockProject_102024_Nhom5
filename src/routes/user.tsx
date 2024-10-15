import {UserElement} from '../types/user.tsx';
import Home from '../pages/home/index.tsx';
import Other from '../pages/other/index.tsx';



const UserRoutes : UserElement[]=[
    {
        path:'/',
        element: <Home/>,
    },
    {
        path:'/other',
        element: <Other/>,
    }
]
export default UserRoutes;