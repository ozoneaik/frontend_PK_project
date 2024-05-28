import Content from "../../layouts/Content.jsx";
import '../../assets/style/toggle.css'
import '../../assets/style/table.css'
import {useEffect, useState} from "react";
import axiosClient from "../../axios.js";
import Swal from "sweetalert2";
import {useParams} from "react-router-dom";


function List_qc_month() {


    const {year, month} = useParams();


    const [toggle, setToggle] = useState(true);
    const [datas,setDatas] = useState({});
    const [data_team, setData_team] = useState({});



    const ChangeStatus = (e)=>{
        setToggle(!toggle)
    }

    useEffect(() => {
        console.log(year,month)
        getQcLog(year,month);
    }, []);


    const getQcLog = (year,month) => {
        axiosClient
            .get(`/incentive/qc_month/${year}/${month}`, {})
            .then(({data}) => {
                console.log(data);
                setDatas(data.amount_qc_users);
                setData_team(data.data_teams);
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
                    <div className={'row'}>
                        <div className={'col-12 d-flex justify-content-between'}>
                            <div>
                                <p style={{fontSize: 18}} className={'text-bold'}>ปริมาณการ QC สินค้า ประจำเดือน {month}/{year}</p>
                                <p>กำหนดจ่ายเดือน {month === '12' ? '1' : parseInt(month)+1}/{month === '12' ? parseInt(year)+1 : year}</p>
                                <p>จำนวนวันทำงาน 22 วัน</p>
                            </div>
                            <div>
                                <p>เรียกข้อมูล ณ วันที่ 25/04/2024</p>
                            </div>
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
                                            <input type="checkbox" checked={data.grade !== 'ไม่ผ่าน'}/>
                                            <span className="slider round"></span>
                                        </label>
                                    </td>
                                    <td>{index+1}</td>
                                    <td>{data.empqc}</td>
                                    <td>{data.emp_name}</td>
                                    <td>{data.empqc_count.toLocaleString()}</td>
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
                                    <td>{parseFloat(data.level_very_easy).toLocaleString()} <span
                                        className={'text-bold'}>({data.rateVeryEasy})</span></td>
                                    <td>{parseFloat(data.level_easy).toLocaleString()} <span className={'text-bold'}>({data.rateEasy})</span> </td>
                                    <td>{parseFloat(data.level_middling).toLocaleString()} <span className={'text-bold'}>({data.rateMiddling})</span> </td>
                                    <td>{parseFloat(data.level_hard).toLocaleString()} <span className={'text-bold'}>({data.rateHard})</span> </td>
                                    <td>{parseFloat(data.level_very_hard).toLocaleString()} <span className={'text-bold'}>({data.rateVeryHard})</span> </td>
                                    <td>{data.total_person_received.toLocaleString()}</td>
                                    <td>{data_team.total_received_team}</td>
                                    <td>{parseFloat(data.total_received).toLocaleString()}</td>
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
                                <td>{parseFloat(data_team.total_empqc_teams).toLocaleString()}</td>
                                <td>{data_team.average_time_HM}</td>
                                <td>{data_team.average_time_HD}</td>

                                <td>
                                    {data_team.average_grade === 'A+' ? (
                                            <span className={'px-3 py-1 text-sm rounded-pill bg-primary'}>A+</span>) :
                                        data_team.average_grade === 'A' ? (
                                                <span className={'px-3 py-1 text-sm rounded-pill bg-warning'}>A</span>) :
                                            data_team.average_grade === 'B' ? (
                                                    <span
                                                        className={'px-3 py-1 text-sm rounded-pill bg-success'}>B</span>) :
                                                data_team.average_grade === 'C' ? (
                                                        <span
                                                            className={'px-3 py-1 text-sm rounded-pill bg-info'}>C</span>) :
                                                    <span
                                                        className={'px-3 py-1 text-sm rounded-pill bg-danger'}>ไม่ผ่าน</span>
                                    }

                                </td>
                                <td>{parseFloat(data_team.totalVeryEasy).toLocaleString()}</td>
                                <td>{parseFloat(data_team.totalEasy).toLocaleString()}</td>
                                <td>{parseFloat(data_team.totalMiddling).toLocaleString()}</td>
                                <td>{parseFloat(data_team.totalHard).toLocaleString()}</td>
                                <td>{parseFloat(data_team.totalVeryHard).toLocaleString()}</td>
                                <td>{parseFloat(data_team.totalPersonReceived).toLocaleString()}</td>
                                <td> </td>
                                <td>{parseFloat(data_team.total_receiveds).toLocaleString()}</td>
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