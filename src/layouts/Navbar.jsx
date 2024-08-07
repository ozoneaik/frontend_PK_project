import {useStateContext} from "../contexts/ContextProvider.jsx";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faBars, faSignOut} from "@fortawesome/free-solid-svg-icons";
import {LogoutApi} from "../api/Auth.js";

function Navbar() {
    const {setCurrentUser, setUserToken} = useStateContext();


    const logout = (ev) => {
        ev.preventDefault();
        LogoutApi()
            .then((data, status) => {
                console.log(data, status);
                setCurrentUser({});
                setUserToken(null);
            });
    };


    return (
        <nav className="main-header navbar navbar-expand navbar-light navbar-light">
            <ul className="navbar-nav">
                <li className="nav-item">
                    <a className="nav-link" data-widget="pushmenu" href="#" role="button">
                        <FontAwesomeIcon icon={faBars}/>
                    </a>
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
                            <FontAwesomeIcon icon={faSignOut} className={'ml-2'}/>
                        </button>
                    </a>
                </li>
            </ul>
        </nav>
    );
}

export default Navbar;