import Content from "../../layouts/Content.jsx";
import {useStateContext} from "../../contexts/ContextProvider.jsx";
import {useEffect, useState} from "react";
import axiosClient from "../../axios.js";
import Swal from "sweetalert2";
import {Link, useNavigate} from "react-router-dom";
import {AlertError, AlertSuccess} from "../../Dialogs/alertNotQuestions.js";
import {AlertErrorWithQuestion} from "../../Dialogs/alertWithQuestions.js";
import {LogoutApi} from "../../api/Auth.js";
import {UserListApi} from "../../api/User.js";

function UserManage() {

    const {currentUser,setCurrentUser,setUserToken} = useStateContext();
    const [users, setUsers] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        if (currentUser.emp_role !== "IT"){
            AlertErrorWithQuestion({
                text : 'ไม่สิทธิ์เข้าถึงหน้านี้',
                textConfirm : 'กลับไปหน้าหลัก',
                textCancel : 'ออกจะระบบ',
                onPassed : (confirm) => {
                    if (confirm) {
                        navigate('/');
                    }else{
                        LogoutApi()
                            .then((data, status) => {
                                console.log(data, status);
                                setCurrentUser({});
                                setUserToken(null);
                            });
                    }
                }
            })
        }
        getUserList();
    }, []);


    const getUserList =()=>{
        UserListApi().then(({data,status}) => {
            console.log(data,status)
            if (status === 200) {
                setUsers(data.users);
            }else{
                AlertError('เกิดข้อผิดพลาด', data);
            }
        })
    }


    const handleDelete = (authcode) => {
        console.log(authcode)
        Swal.fire({
            icon: "info",
            title: `ยืนยันการลบผู้ใช้  ${authcode} หรือไม่`,
            showCancelButton: true,
            confirmButtonText: "ยืนยัน",
            allowOutsideClick: false
        }).then((result) => {
            /* Read more about isConfirmed, isDenied below */
            if (result.isConfirmed) {
                axiosClient.post(`/incentive/user-delete/${authcode}`, {})
                    .then(({data, status}) => {
                        if (status === 200) {
                            AlertSuccess('ลบผู้ใช้สำเร็จ', data.msg)
                            setUsers([])
                            getUserList()
                        }
                    })
                    .catch((error) => {
                        AlertError('ลบผู้ใช้ไม่สำเ็จ', error.response.data.message)
                    })
            }
        });
    }


    return (
        <Content header={'จัดการผู้ใช้งาน'} header_sub={'รายการ'}>
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
                                        <tr key={index}
                                            className={``}>
                                            <td className={`${currentUser.authcode === user.authcode ? 'bg-secondary' : ''}`}>{user.authcode}</td>
                                            <td>{user.emp_role}</td>
                                            <td>{user.name}</td>
                                            <td>
                                                <Link to={`/incentive/usermanage/edit-user/${user.authcode}`}
                                                      className={`btn btn-sm btn-primary mr-2 ${currentUser.authcode === user.authcode ? 'disabled' : ''}`}>
                                                    <i className="fa-solid fa-pen-to-square mr-1"></i>
                                                    <span>แก้ไข</span>
                                                </Link>
                                                <button onClick={() => handleDelete(user.authcode)}
                                                        className={`btn btn-sm btn-danger ${currentUser.authcode === user.authcode ? 'disabled' : ''}`}>
                                                    <i className="fa-solid fa-trash mr-1"></i>
                                                    <span>ลบ</span>
                                                </button>
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