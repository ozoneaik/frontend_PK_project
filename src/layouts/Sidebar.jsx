import {Link, useLocation} from "react-router-dom";
import Logo from "../assets/dist/img/background.jpeg"
import UserImage from "../assets/dist/img/user2-160x160.jpg"

function Sidebar() {

    const location = useLocation();

    return (
        // sidebar-dark-primary
        <aside className={'main-sidebar elevation-4 sidebar-dark-orange'}>
            <Link to={'#'} className={'p-0'} style={{background: '#000'}}>
                <img src={Logo ? Logo : '#'} alt={'adminLte Logo'} className={'brand-image elevation-3'} style={{width: '100%'}}/>
                {/*<span className={'brand-text font-weight-bold'}>Pumpkin</span>*/}
            </Link>

            <div className={'sidebar mt-3'}>
                <div className={'user-panel pb-3 mb-3 d-flex'}>
                    <div className={'image'}>
                        <img src={UserImage ? UserImage : '#'} alt="User Image" className={'img-circle elevation-2'}/>
                    </div>
                    <div className="info">
                        <a href="#" className="d-block">Alexander Pierce</a>
                    </div>
                </div>

                <nav className={'mt-2'}>
                    <ul className={'nav nav-pills nav-sidebar flex-column nav-child-indent'} data-widget="treeview" role="menu"
                        data-accordion="false">
                        <li className="nav-item menu-open">
                            <a href="#" className={`nav-link ${location.pathname.startsWith('/IncentiveSystem') ? 'active' : ''}`}>
                                <i className="nav-icon fas fa-tachometer-alt"></i>
                                <p>Incentive System<i className="right fas fa-angle-left"></i></p>
                            </a>
                            <ul className="nav nav-treeview">
                                <li className="nav-item">
                                    <Link to={'/IncentiveSystem/dashboard'} className={`nav-link ${location.pathname === '/IncentiveSystem/dashboard' ? 'active' : ''}`}>
                                        <i className="far fa-circle nav-icon"></i>
                                        <p>หน้าหลัก</p>
                                    </Link>
                                </li>
                                <li className="nav-item">
                                    <Link to={'/IncentiveSystem/detail'} className={`nav-link ${location.pathname === '/IncentiveSystem/detail' ? 'active' : ''}`}>
                                        <i className="far fa-circle nav-icon"></i>
                                        <p>รายละเอียด</p>
                                    </Link>
                                </li>

                            </ul>
                        </li>
                    </ul>
                </nav>
            </div>


        </aside>
    );
}

export default Sidebar;