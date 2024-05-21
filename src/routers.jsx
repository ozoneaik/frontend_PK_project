import { createBrowserRouter } from "react-router-dom";
import App from "./App.jsx";
import Qc_years from "./pages/IncentiveSystem/Qc_years.jsx";
import List_qc_month from "./pages/IncentiveSystem/List_qc_month.jsx";
import List_product_qc from "./pages/IncentiveSystem/List_product_qc.jsx";
import Add_product_qc from "./pages/IncentiveSystem/Add_product_qc.jsx";
import Edit_product_qc from "./pages/IncentiveSystem/Edit_product_qc.jsx";

const routers = createBrowserRouter([
    {
        path: '/incentive',
        children: [
            { path: 'qc_years', element: <Qc_years /> }, //id = years
            { path: 'qc_list_month/:year/:month', element: <List_qc_month /> }, //id = month
            {
                path: 'products', children : [
                    { path: 'list_product_qc', element: <List_product_qc /> },
                    { path: 'add_product_qc', element: <Add_product_qc /> },
                    { path: 'edit_product_qc/:id', element: <Edit_product_qc /> },
                ]
            }

        ],
    },
    { path: '/', element: <Qc_years /> },
]);

export default routers;