import { createBrowserRouter } from "react-router-dom";
import App from "./App.jsx";
import Dashboard from "./pages/IncentiveSystem/Dashboard.jsx";
import Detail from "./pages/IncentiveSystem/Detail.jsx";

const routers = createBrowserRouter([
    {
        path: '/IncentiveSystem',
        children: [
            { path: 'dashboard', element: <Dashboard /> },
            { path: 'detail', element: <Detail /> },
        ],
    },
    { path: '/app', element: <App /> },
    { path: '/IncentiveSystem/dashboard', element: <Dashboard /> },
]);

export default routers;