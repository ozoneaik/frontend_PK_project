import Content from "../../layouts/Content.jsx";
import {useStateContext} from "../../contexts/ContextProvider.jsx";
import {useEffect, useState} from "react";
import axiosClient from "../../axios.js";
import Swal from "sweetalert2";
import {Link} from "react-router-dom";

function UserManage() {

    const {currentUser} = useStateContext();
    const [users, setUsers] = useState([]);

    useEffect(() => {
        axiosClient.get(`/incentive/user-list`, {})
            .then(({data,status}) => {
                console.log(data);
                if (status === 200){
                    setUsers(data.users);
                }
            }).catch((error) => {
            if (error.response && error.response.status === 400) {
                Swal.fire({
                    icon: 'error',
                    title: 'Something went wrong',
                    text: error.response.data.message
                });
            }
        })
    }, []);



    return (
        <Content header={'user manage'} header_sub={'user_manage'}>
            <div className={'row'}>
                <div className={'col-md-12'}>
                    <div className={'card'}>
                        <div className={'card-body'}>
                            <div className={'row mb-3'}>
                                <div className={'col-md-12 d-flex justify-content-end'}>
                                    <Link to={'/incentive/usermanage/add-user'} className={'btn btn-primary'}>
                                        <i className="fa-solid fa-user-plus mr-2"></i>
                                        <span>เพิ่มผู้ใชงาน</span>
                                    </Link>
                                </div>
                            </div>
                            <div className={'table-responsive'}>
                                <table className={'table table-bordered mb-0'}>
                                    <thead>
                                    <tr>
                                        <th>AuthCode</th>
                                        <th>Role</th>
                                        <th>Name</th>
                                        <th>action</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    {users.length > 0 ? users.map((user, index) => (
                                        <tr key={index}  className={`${currentUser.authcode === user.authcode ? 'bg-info' : ''}`}>
                                            <td>{user.authcode}</td>
                                            <td>{user.emp_role}</td>
                                            <td>{user.name}</td>
                                            <td>
                                                <Link to={`/incentive/usermanage/edit-user/${user.authcode}`} className={`btn btn-sm btn-primary mr-2 ${currentUser.authcode === user.authcode ? 'disabled' : ''}`}>
                                                    <i className="fa-solid fa-pen-to-square mr-1"></i>
                                                    <span>แก้ไข</span>
                                                </Link>
                                                <Link to={'#'} className={`btn btn-sm btn-danger ${currentUser.authcode === user.authcode ? 'disabled' : ''}`}>
                                                    <i className="fa-solid fa-trash mr-1"></i>
                                                    <span>ลบ</span>
                                                </Link>
                                            </td>
                                        </tr>
                                    )) : (
                                        <></>
                                    )}

                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Content>
    );
}

export default UserManage;