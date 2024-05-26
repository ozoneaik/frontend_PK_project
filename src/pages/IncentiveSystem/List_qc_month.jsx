import Content from "../../layouts/Content.jsx";
import '../../assets/style/toggle.css'
import '../../assets/style/table.css'
import {useEffect, useState} from "react";
import axiosClient from "../../axios.js";
import $ from "jquery";
import Swal from "sweetalert2";
import {Link} from "react-router-dom";


function List_qc_month() {
    const [toggle, setToggle] = useState(true);


    const [datas,setDatas] = useState({});


    const ChangeStatus = (e)=>{
        setToggle(!toggle)
    }
    const numbers = [1, 2, 3, 4];

    useEffect(() => {
        getQcLog();
    }, []);


    const getQcLog = () => {
        axiosClient
            .get(`/incentive/index`, {})
            .then(({data}) => {
                console.log(data);
                setDatas(data);
            })
            .catch((error) => {
                console.error(error);
                Swal.fire({
                    icon: 'error',
                    title: 'Something went wrong',
                    text: error.message
                });
            });
    }



    return (
        <Content header={'Incentive System'} header_sub={'รายละเอียด'}>
            <div className={'calculate mb-3 d-flex justify-content-end'}>
                <button className={'text-end btn btn-warning'}><i className="fa-solid fa-calculator mr-2"></i>คำนวณ</button>
            </div>

            <div className={'card'}>
                <div className={'card-body'}>
                    <div className={'row d-flex justify-content-between'}>
                        <div>
                            <p style={{fontSize: 18}} className={'text-bold'}>ปริมาณการ QC สินค้า ประจำเดือน 04/2024</p>
                            <p>กำหนดจ่ายเดือน 05/2024</p>
                            <p>จำนวนวันทำงาน 22 วัน</p>
                        </div>
                        <div>
                            <p>เรียกข้อมูล ณ วันที่ 25/04/2024</p>
                        </div>
                    </div>

                    <div className={'table-responsive'}>
                        <table className={'table table-bordered text-center'}>
                            <thead className={'text-bold bg-primary'}>
                            <tr>
                                <th rowSpan={2}>สถานะจ่าย</th>
                                <th rowSpan={2}>#</th>
                                <th rowSpan={2}>รหัสพนักงาน</th>
                                <th rowSpan={2}>ชื่อพนักงาน</th>
                                <th rowSpan={2}>ปริมาณรวม</th>
                                <th rowSpan={2}>H:M / เดือน</th>
                                <th rowSpan={2}>H:M / วัน</th>
                                <th rowSpan={2}>เกรด</th>
                                <th colSpan={5}>ปริมาณ</th>
                                <th rowSpan={2}>ยอดรับบุคคล</th>
                                <th rowSpan={2}>ยอดรับทีม</th>
                                <th rowSpan={2}>ยอดรับสุทธิ</th>
                            </tr>
                            <tr>
                                <td>Very Easy </td>
                                <td>Easy</td>
                                <td>Middling</td>
                                <td>Hard</td>
                                <td>Very Hard</td>
                            </tr>
                            </thead>
                            <tbody>
                            {datas.length > 0 ? datas.map((data, index) => (
                                <tr key={index}>
                                    <td>
                                        <label className="switch">
                                            <input type="checkbox" checked={toggle === true ? true : false}
                                                   onChange={(e) => ChangeStatus(e)}/>
                                            <span className="slider round"></span>
                                        </label>
                                    </td>
                                    <td>{index+1}</td>
                                    <td>{data.empqc}</td>
                                    <td>{data.emp_name}</td>
                                    <td>{data.empqc_count}</td>
                                    <td>{data.HM}</td>
                                    <td>{data.HD}</td>
                                    <td>
                                        {data.grade === 'A+' ? (
                                                <span className={'px-3 py-1 text-sm rounded-pill bg-primary'}>A+</span>) :
                                            data.grade === 'A' ? (
                                                    <span className={'px-3 py-1 text-sm rounded-pill bg-warning'}>A</span>) :
                                                data.grade === 'B' ? (
                                                    <span className={'px-3 py-1 text-sm rounded-pill bg-success'}>B</span>) :
                                                    data.grade === 'C' ? (
                                                        <span className={'px-3 py-1 text-sm rounded-pill bg-info'}>C</span>) :
                                                        <span className={'px-3 py-1 text-sm rounded-pill bg-danger'}>ไม่ผ่าน</span>
                                        }

                                    </td>
                                    <td>{data.level_very_easy}</td>
                                    <td>{data.level_easy}</td>
                                    <td>{data.level_middling}</td>
                                    <td>{data.level_hard}</td>
                                    <td>{data.level_very_hard}</td>
                                    <td>200</td>
                                    <td>213443</td>
                                    <td>213443</td>
                                </tr>
                            )) : (
                                <tr>
                                    <td colSpan="9"><span className="loader"></span></td>
                                </tr>
                            )}

                            </tbody>
                            <tfoot className={'text-bold'} style={{background: '#ead1ff'}}>
                            <tr>
                                <td></td>
                                <td></td>
                                <td>Total</td>
                                <td></td>
                                <td>21,071</td>
                                <td>1158:24</td>
                                <td>08:46(Avg.)</td>
                                <td><span className={'px-3 py-1 text-sm rounded-pill bg-primary'}>A+</span></td>
                                <td>31,890</td>
                                <td>31,890</td>
                                <td>31,890</td>
                                <td>31,890</td>
                                <td>31,890</td>
                                <td>33,332</td>
                                <td>33,332</td>
                                <td>4,532</td>
                            </tr>
                            </tfoot>
                        </table>
                    </div>
                    <div className={'d-flex justify-content-center mt-3'}>
                    <button className={'btn btn-primary'} style={{minWidth: 200}}>บันทึก</button>
                    </div>
                </div>
            </div>
        </Content>
    );
}

export default List_qc_month;