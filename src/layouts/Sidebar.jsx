import { Link, useLocation } from "react-router-dom";
import Logo from "../assets/dist/img/background.jpeg"
import UserImage from "../assets/dist/img/user2-160x160.jpg"
import { useStateContext } from "../contexts/ContextProvider.jsx";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDollarSign, faHandHoldingDollar } from "@fortawesome/free-solid-svg-icons";
import { faCircle } from "@fortawesome/free-regular-svg-icons";
import { faTable } from "@fortawesome/free-solid-svg-icons";

function Sidebar() {

    const { currentUser } = useStateContext();
    const location = useLocation();

    return (
        // sidebar-dark-primary
        <aside className={'main-sidebar elevation-4 sidebar-dark-orange'} style={{ backgroundColor: "#252525" }}>
            <Link to={'#'} className={'p-0'} style={{ background: '#000' }}>
                <img src={Logo ? Logo : '#'} alt={'adminLte Logo'} className={'brand-image elevation-3'} style={{ width: '100%' }} />
                {/*<span className={'brand-text font-weight-bold'}>Pumpkin</span>*/}
            </Link>

            <div className={'sidebar mt-3'}>
                <div className={'user-panel pb-3 mb-3 d-flex align-items-center'}>
                    <div className={'image'}>
                        <img src={UserImage ? UserImage : '#'} alt="User Image" className={'img-circle elevation-2'} />
                    </div>
                    <div className="info">
                        <a href="#" className="d-block">{currentUser.name} <br /> ( {currentUser.emp_role} )</a>
                    </div>
                </div>

                <nav className={'mt-2'}>
                    <ul className={'nav nav-pills nav-sidebar flex-column nav-child-indent'} data-widget="treeview"
                        role="menu"
                        data-accordion="false">
                        <li className={`nav-item ${location.pathname.startsWith('/incentive') ? 'menu-open' : ''}`}>
                            <a href="#"
                                className={`nav-link ${location.pathname.startsWith('/incentive') ? 'active' : ''}`}>
                                <FontAwesomeIcon icon={faHandHoldingDollar} className={'nav-icon'} />
                                <p>Incentive System<i className="right fas fa-angle-left"></i></p>
                            </a>
                            <ul className="nav nav-treeview">
                                <li className="nav-item">
                                    <Link to={'/incentive/qc_years'}
                                        className={`nav-link ${location.pathname === '/incentive/qc_years' || location.pathname.startsWith('/incentive/qc_list_month') ? 'active' : ''}`}>
                                        <FontAwesomeIcon icon={faCircle} className={'nav-icon'} />
                                        <p>Incentive QC</p>
                                    </Link>
                                </li>
                                <li className={'nav-item'}>
                                    <Link to={'/incentive/products/list_product_qc'}
                                        className={`nav-link ${location.pathname.startsWith('/incentive/products') ? 'active' : ''}`}>
                                        <FontAwesomeIcon icon={faCircle} className={'nav-icon'} />
                                        <p>ข้อมูลสินค้า QC</p>
                                    </Link>
                                </li>

                                {
                                    (currentUser.emp_role !== 'QC') && (
                                        <li className={'nav-item'}>
                                            <Link to={'/incentive/manage_day'}
                                                className={`nav-link ${location.pathname.startsWith('/incentive/manage_day') ? 'active' : ''}`}>
                                                <FontAwesomeIcon icon={faCircle} className={'nav-icon'} />
                                                <p>ข้อมูลจำนวนวันทำงาน</p>
                                            </Link>
                                        </li>
                                    )

                                }
                                <li className={'nav-item'}>
                                    <Link to={'/incentive/qc_time'}
                                        className={`nav-link ${location.pathname.startsWith('/incentive/qc_time') ? 'active' : ''}`}>
                                        <FontAwesomeIcon icon={faCircle} className={'nav-icon'} />
                                        <p>ข้อมูลระดับการ QC</p>
                                    </Link>
                                </li>
                                <li className={'nav-item'}>
                                    <Link to={'/incentive/calculate_grade'}
                                        className={`nav-link ${location.pathname.startsWith('/incentive/calculate_grade') ? 'active' : ''}`}>
                                        <FontAwesomeIcon icon={faCircle} className={'nav-icon'} />
                                        <p>ข้อมูลเกณฑ์คำนวณ</p>
                                    </Link>
                                </li>
                                {currentUser.emp_role === 'IT' && (
                                    <li className={'nav-item'}>
                                        <Link to={'/incentive/usermanage/user-list'}
                                            className={`nav-link ${location.pathname.startsWith('/incentive/usermanage') ? 'active' : ''}`}>
                                            <FontAwesomeIcon icon={faCircle} className={'nav-icon'} />
                                            <p>ข้อมูลผู้ใช้งาน</p>
                                        </Link>
                                    </li>
                                )}
                            </ul>
                        </li>
                        <li className={'nav-item'}>
                            <Link to={'/incentive/report'}
                                className={`nav-link ${location.pathname.startsWith('/report') ? 'active' : ''}`}>
                                <FontAwesomeIcon icon={faTable} className={'nav-icon'} />
                                <p>รายงาน</p>
                            </Link>
                        </li>
                        <li className={`nav-item ${location.pathname.startsWith('/Promotion_Gold') ? 'menu-open' : ''}`}>
                            <a href="#"
                                className={`nav-link ${location.pathname.startsWith('/Promotion_Gold') ? 'active' : ''}`}>
                                <FontAwesomeIcon icon={faDollarSign} className={'nav-icon'} />
                                <p>Promotion Gold<i className="right fas fa-angle-left"></i></p>
                            </a>
                            <ul className="nav nav-treeview">
                                <li className="nav-item">
                                    <Link to={'#'}
                                        className={`nav-link ${location.pathname === '/Promotion_Gold' || location.pathname.startsWith('/incentive/qc_list_month') ? 'active' : ''}`}>
                                        <FontAwesomeIcon icon={faCircle} className={'nav-icon'} />
                                        <p>QC สินค้า ประจำปี</p>
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