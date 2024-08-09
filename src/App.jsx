import {useEffect} from "react";
import {useNavigate} from "react-router-dom";

function App() {
    const navigate = useNavigate();
    useEffect(() => {
        navigate('/incentive/qc_years');
    }, [navigate]);
    return (<></>)
}

export default App;
