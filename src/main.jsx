import ReactDOM from 'react-dom/client'
import './index.css'
import {RouterProvider} from "react-router-dom";
import routers from "./routers.jsx";
import {ContextProvider} from "./contexts/ContextProvider.jsx";
import './assets/style/loader.css'
import './assets/plugins/select2/css/select2.min.css';
import './assets/plugins/select2-bootstrap4-theme/select2-bootstrap4.min.css';
import './assets/plugins/select2/js/select2.full.min.js';

ReactDOM.createRoot(document.getElementById('root')).render(
    <ContextProvider>
        <RouterProvider router={routers}/>
    </ContextProvider>
)
