import ReactDOM from 'react-dom/client'
import './index.css'
import {RouterProvider} from "react-router-dom";
import routers from "./routers.jsx";

ReactDOM.createRoot(document.getElementById('root')).render(
    <RouterProvider router={routers}/>
)
