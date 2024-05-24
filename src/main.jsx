import ReactDOM from 'react-dom/client'
import './index.css'
import {RouterProvider} from "react-router-dom";
import routers from "./routers.jsx";
import {ContextProvider} from "./contexts/ContextProvider.jsx";
import './assets/style/loader.css'

ReactDOM.createRoot(document.getElementById('root')).render(
    <ContextProvider>
        <RouterProvider router={routers}/>
    </ContextProvider>
)
