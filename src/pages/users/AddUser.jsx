import Content from "../../layouts/Content.jsx";
import {useState} from "react";
import axiosClient from "../../axios.js";
import {AlertError, AlertSuccess} from "../../Dialogs/alertNotQuestions.js";

function AddUser() {
    const [Name, setName] = useState("");
    const [Email, setEmail] = useState("");
    const [Password, setPassword] = useState("");
    const [Emp_role, setEmp_role] = useState("");
    const [Authcode, setAuthcode] = useState("");
    const [Status, setStatus] = useState("");


    const handleAuthcodeChange = (ev) => {
        console.log(ev)
        setAuthcode(ev);
        setEmail('');
        setEmail(ev+'@gmail.com');
    }

    const onSubmit = (ev) => {
        ev.preventDefault();
        axiosClient.post('/incentive/user-store',{
            email : Email,
            name : Name,
            password : Password,
            emp_role : Emp_role,
            authcode : Authcode,
            emp_status : Status,
            incentive : 'incentive'
        }).then(({data, status}) => {
            console.log(data)
            if (status === 200) {
                AlertSuccess(data.msg,'')
            }
        }).catch((error) => {
            AlertError('เกิดข้อผิดพลาด',error.response.data.message)
        })
    }


    return (
        <Content header={'จัดการผู้ใช้งาน'} header_sub={'เพิ่มผู้ใช้งาน'}>
            <div className={'row'}>
                <div className={'col-md-12'}>
                    <div className={'card'}>
                        <form method={'POST'} onSubmit={(ev) => {onSubmit(ev)}}>
                            <div className={'card-body'}>
                                <div className={'card'}>
                                    <div className={'card-header'}>
                                        <h3 className={'card-title'}>ข้อมูลเบื้องต้น</h3>
                                    </div>
                                    <div className={'card-body'}>

                                        <div className={'form-group'}>
                                            <label htmlFor="">ชื่อ-นามสกุล</label>
                                            <input className={'form-control'} type="text"
                                                   onChange={(e) => setName(e.target.value)}
                                                   placeholder={'กรอกชื่อ-นามสกุล'}/>
                                        </div>
                                        <div className={'form-group'}>
                                            <label htmlFor="">สิทธิ์การเข้าใช้งาน</label>
                                            <select name="" id="" className={'custom-select'}
                                                    onChange={(e) => setEmp_role(e.target.value)}>
                                                <option value="" disabled={true} selected={true}>เลือก...</option>
                                                <option value="QC">ตรวจทาน (QC)</option>
                                                <option value="HR">เอชอาร์ (HR)</option>
                                            </select>
                                        </div>
                                        <div className={'from-group'}>
                                            <label htmlFor="">สถานะการเข้าใช้งาน</label>
                                            <select name="" id="" onChange={(e) => setStatus(e.target.value)} className={'custom-select'}>
                                                <option value="" disabled={true}>เลือก...</option>
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
    );
}

export default AddUser;