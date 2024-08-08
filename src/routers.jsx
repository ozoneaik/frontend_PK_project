import {createBrowserRouter} from "react-router-dom";
import Qc_years from "./pages/IncentiveSystem/Qc_years.jsx";
import List_qc_month from "./pages/IncentiveSystem/List_qc_month.jsx";
import List_product_qc from "./pages/IncentiveSystem/List_product_qc.jsx";
import Add_product_qc from "./pages/IncentiveSystem/Add_product_qc.jsx";
import Edit_product_qc from "./pages/IncentiveSystem/Edit_product_qc.jsx";
import Login from "./pages/Login.jsx";
import QCTimes from "./pages/IncentiveSystem/Qc_times.jsx";
import Qc_calculate_grade from "./pages/IncentiveSystem/Qc_calculate_grade.jsx";
import NotFound from "./pages/NotFound.jsx";
import PrintData from "./pages/IncentiveSystem/PrintData.jsx";
import Signup from "./pages/Signup.jsx";
import UserManage from "./pages/users/UserManage.jsx";
import AddUser from "./pages/users/AddUser.jsx";
import EditUser from "./pages/users/EditUser.jsx";
import ManageDay from "./pages/IncentiveSystem/ManageDay.jsx";
import Test from "./pages/IncentiveSystem/Test.jsx";

const routers = createBrowserRouter([
    {
        path: '/incentive',
        children: [
            {path: 'qc_years', element: <Qc_years/>}, //id = years
            {path: 'qc_list_month/:year/:month/:status', element: <List_qc_month/>}, //id = month
            {
                path: 'products', children: [
                    {path: 'list_product_qc', element: <List_product_qc/>},
                    {path: 'add_product_qc', element: <Add_product_qc/>},
                    {path: 'edit_product_qc/:id', element: <Edit_product_qc/>},
                ]
            },
            {path : 'manage_day', element: <ManageDay/>},
            {path: 'qc_time', element: <QCTimes/>},
            {path: 'calculate_grade', element: <Qc_calculate_grade/>},
            {path: 'printData/:year/:month/active', element: <PrintData/>},
            {
                path: 'usermanage', children: [
                    {path: 'user-list', element: <UserManage/>},
                    {path: 'add-user',element: <AddUser/>},
                    {path: 'edit-user/:id', element: <EditUser/>},
                ]
            },
        ],
    },
    {path: '/', element: <Qc_years/>},
    {path: '/login', element: <Login/>},
    {path: '/signup', element: <Signup/>},
    {path: '/test', element: <Test/>},
    {path: '*', element: <NotFound/>}
]);

export default routers;