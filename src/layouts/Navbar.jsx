import axiosClient from "../axios.js";
import {useStateContext} from "../contexts/ContextProvider.jsx";

function Navbar() {
    const {setCurrentUser, setUserToken} = useStateContext();


    const logout = (ev) => {
        ev.preventDefault();
        axiosClient.post("/logout").then((res) => {
            setCurrentUser({});
            setUserToken(null);
        });
    };


    return (
        <nav className="main-header navbar navbar-expand navbar-light navbar-light">
            <ul className="navbar-nav">
                <li className="nav-item">
                    <a className="nav-link" data-widget="pushmenu" href="#" role="button"><i className="fas fa-bars"></i></a>
                </li>
                <li className="nav-item d-none d-sm-inline-block">
                    <span className="nav-link text-bold text-dark">Pumpkin Corporation Company Limited | Bangkok</span>
                </li>
            </ul>
            <ul className="navbar-nav ml-auto">
                <li className="nav-item">
                    <a className="nav-link" href="#" role="button">
                        <button className={'btn btn-sm btn-danger'} onClick={(e) => logout(e)}>
                            ออกจากระบบ
                            <i className="fa-solid fa-sign-out ml-2"></i>
                        </button>
                    </a>
                </li>
            </ul>
        </nav>
    );
}

export default Navbar;