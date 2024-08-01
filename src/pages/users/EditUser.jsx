import Content from "../../layouts/Content.jsx";
import {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import axiosClient from "../../axios.js";
import {AlertError, AlertSuccess} from "../../Dialogs/alertNotQuestions.js";

const EditUser = () => {


    const {id} = useParams();
    const [Name, setName] = useState("");
    const [Email, setEmail] = useState("");
    const [Password, setPassword] = useState("");
    const [Emp_role, setEmp_role] = useState("");
    const [Authcode, setAuthcode] = useState("");
    const [Status, setStatus] = useState("");

    useEffect(() => {
        getUserDetail()
    }, []);

    const getUserDetail = () => {
        axiosClient.get(`/incentive/user-detail/${id}`)
            .then(({data, status}) => {
                console.log(data);
                if (status === 200) {
                    setName(data.user.name)
                    setEmail(data.user.email)
                    setPassword(data.user.password)
                    setEmp_role(data.user.emp_role)
                    setAuthcode(data.user.authcode)
                    setStatus(data.user.emp_status)
                }
            }).catch((error) => {
            console.log(error);
        })
    }

    const handleAuthcodeChange = (value) => {
        setAuthcode(value);
        setEmail(value+'@gmail.com')
    }

    const onSubmit = (e) => {
        e.preventDefault();
        console.log('submited')
        const user = {
            name : Name,
            email : Email,
            password: Password,
            emp_role : Emp_role,
            authcode : Authcode,
            emp_status : Status,
            incentive : 'incentive'
        }
        axiosClient.post(`/incentive/user-update/${id}`,user)
            .then(({data, status}) => {
                console.log(data);
                if (status === 200) {
                    AlertSuccess('สำเร็จ' ,data.msg)
                }
            }).catch((error) => {
                AlertError(error.response.status,error.response.data.message)
        })
    }


    return (
        <Content header={'edit-user'} header_sub={'edit-user'}>
            <div className={'row'}>
                <div className={'col-md-12'}>
                    <div className={'card'}>
                        <form method={'POST'} onSubmit={(ev) => {
                            onSubmit(ev)
                        }}>
                            <div className={'card-body'}>
                                <div className={'card'}>
                                    <div className={'card-header'}>
                                        <h3 className={'card-title'}>ข้อมูลเบื้องต้น</h3>
                                    </div>
                                    <div className={'card-body'}>

                                        <div className={'form-group'}>
                                            <label htmlFor="">ชื่อ-นามสกุล</label>
                                            <input className={'form-control'} type="text"
                                                   defaultValue={Name ? Name : ''}
                                                   onChange={(e) => setName(e.target.value)}
                                                   placeholder={'กรอกชื่อ-นามสกุล'}/>
                                        </div>
                                        <div className={'form-group'}>
                                            <label htmlFor="">สิทธิ์การเข้าใช้งาน</label>
                                            <select name="" id="" className={'custom-select'}
                                                    value={Emp_role}
                                                    onChange={(e) => setEmp_role(e.target.value)}>
                                                <option value="QC">ตรวจทาน (QC)</option>
                                                <option value="HR">เอชอาร์ (HR)</option>
                                            </select>
                                        </div>
                                        <div className={'from-group'}>
                                            <label htmlFor="">สถานะการเข้าใช้งาน</label>
                                            <select name="" id="" onChange={(e) => setStatus(e.target.value)}
                                                    className={'custom-select'} value={Status}>
                                                <option value="active">ออนไลน์🟢</option>
                                                <option value="offline">ออฟไลน์</option>
                                            </select>
                                        </div>
                                    </div>
                                </div>
                                <div className={'card'}>
                                    <div className={'card-header'}>
                                        <h3 className={'card-title'}>ข้อมูลสำหรับการเข้าสู่ระบบ</h3>
                                    </div>
                                    <div className={'card-body'}>
                                        <div className={'form-group'}>
                                            <label htmlFor="">ชื่อสำหรับเข้าใช้งานระบบ</label>
                                            <input className={'form-control'} type="text"
                                                   defaultValue={Authcode ? Authcode : ''}
                                                   onChange={(e) => handleAuthcodeChange(e.target.value)}
                                                   placeholder={'ชื่อสำหรับเข้าใช้งานระบบ'}/>
                                        </div>
                                        <div className={'form-group'}>
                                            <label htmlFor="">กรอกรหัสผ่าน</label>
                                            <input className={'form-control'} type="password"
                                                   onChange={(e) => setPassword(e.target.value)}
                                                   placeholder={'กรอกรหัสผ่าน'}/>
                                        </div>
                                    </div>
                                </div>
                                <div className={'d-flex justify-content-end'}>
                                    <button className={'btn btn-primary'}>บันทึก</button>
                                </div>
                            </div>
                        </form>

                    </div>
                </div>
            </div>
        </Content>
    )
};

export default EditUser;