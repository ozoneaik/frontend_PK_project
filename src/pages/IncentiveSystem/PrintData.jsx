import {useEffect, useState} from 'react';
import {useParams} from "react-router-dom";
import axiosClient from "../../axios.js";
import {AlertError} from "../../Dialogs/alertNotQuestions.js";
import '../../assets/style/print.css'; // Import the CSS file
import LoginImage from '../../assets/dist/img/Login.webp'

function PrintData() {
    const {year, month} = useParams();
    const [datas, setDatas] = useState(null);
    const [data_team, setData_team] = useState(null);
    const [createbycodeName, setCreatebycodeName] = useState("");

    useEffect(() => {
        axiosClient
            .get(`/incentive/qc_month/${year}/${month}/active`, {})
            .then(({data, status}) => {
                console.log(data)
                if (status === 200) {
                    setDatas(data.amount_qc_users);
                    setData_team(data.data_teams);
                    axiosClient.get(`/user/${data.data_teams.createbycode}`)
                        .then(({data, status}) => {
                            setCreatebycodeName(data.username)
                            window.addEventListener('afterprint', afterPrint);
                            setTimeout(() => window.print(), 500);
                        }).catch((error) => {
                            console.log(error)
                    })
                    // Trigger print once data is set
                    const afterPrint = () => {
                        closeTab();
                    };


                }
            })
            .catch((error) => {
                if (error.response.status === 400) {
                    AlertError('Error 400', error.response.data.msg);
                } else {
                    AlertError(error.response.status, error.message);
                }
            });
    }, [year, month]);

    const closeTab = () => {
        window.open('', '_self', '');
        window.close();
    };

    if (!datas || !data_team) {
        return <div>Loading...</div>; // Show a loading message while data is being fetched
    }

    return (
        <div className={'PRINT'}>
            <div className={'d-flex justify-content-between align-items-center mb-3'}>
                <div className={'bg-black'} style={{width: 300}}>
                    <img src={LoginImage} alt="" width="100%"/>
                </div>
                <div className={'text-right'}>
                    <span className={'text-bold'}>บจก. พัมคิน คอร์ปอเรชั่น</span>
                    <br/>
                    <span>4 พระรามที่ 2 ซอย 54 แยก 4 แขวงแสมดำ</span>
                    <br/>
                    <span>เขตบางขุนเทียน กรุงเทพมหานคร 10150</span>
                </div>
            </div>
            <div className={'col-12 d-flex justify-content-between'}>
                <div>
                    <p style={{fontSize: 18}} className={'text-bold'}>ปริมาณการ QC สินค้า
                        ประจำเดือน {month}/{year}</p>
                    <p>กำหนดจ่ายเดือน {month === '12' ? '1' : parseInt(month) + 1}/{month === '12' ? parseInt(year) + 1 : year}</p>
                    <p>จำนวนวันทำงาน {data_team.workday} วัน</p>
                </div>
                <div>
                    <p>เรียกข้อมูล ณ วันที่ {new Date().toLocaleDateString('th-TH', {
                        day: '2-digit',
                        month: '2-digit',
                        year: 'numeric'
                    }).replace(/(\d{4})/, (match) => parseInt(match) - 543)}</p>
                </div>
            </div>
            <div className={'dataTable'}>
                <table className={'table-print'}>
                <thead style={{backgroundColor: '#ccc'}}>
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
                    <tr className={'text-bold'}>
                        <td>Very Easy</td>
                        <td>Easy</td>
                        <td>Middling</td>
                        <td>Hard</td>
                        <td>Very Hard</td>
                    </tr>
                    </thead>
                    <tbody>
                    {datas.length > 0 ? datas.map((data, index) => (
                        <tr key={index}>
                            <td>{data.paystatus}</td>
                            <td>{index + 1}</td>
                            <td>{data.empqc}</td>
                            <td className={'emp_name'}>
                                {data.emp_name}
                                <br/>
                                <span style={{fontSize:4}}>{data.payremark ? `หมายเหตุ : ${data.payremark}`:""}</span>
                            </td>
                            <td>{data.empqc_count.toLocaleString()}</td>
                            <td>{data.HM}</td>
                            <td>{data.HD}</td>
                            <td>
                                <span className={'px-3 py-1 text-sm'}>{data.grade}</span>


                            </td>
                            <td>{parseFloat(data.level_very_easy).toLocaleString()} <span
                                className={'text-bold'}>({data.rateVeryEasy})</span></td>
                            <td>{parseFloat(data.level_easy).toLocaleString()} <span
                                className={'text-bold'}>({data.rateEasy})</span></td>
                            <td>{parseFloat(data.level_middling).toLocaleString()} <span
                                className={'text-bold'}>({data.rateMiddling})</span></td>
                            <td>{parseFloat(data.level_hard).toLocaleString()} <span
                                className={'text-bold'}>({data.rateHard})</span></td>
                            <td>{parseFloat(data.level_very_hard).toLocaleString()} <span
                                className={'text-bold'}>({data.rateVeryHard})</span></td>
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
                    <tfoot className={'text-bold'}>
                    <tr>
                        <td></td>
                        <td></td>
                        <td>Total</td>
                        <td></td>
                        <td>{parseFloat(data_team.total_empqc_teams).toLocaleString()}</td>
                        <td>{data_team.average_time_HM}</td>
                        <td>{data_team.average_time_HD}</td>

                        <td>
                            <span className={'px-3 py-1 text-sm'}>{data_team.average_grade}</span>
                        </td>
                        <td>{parseFloat(data_team.totalVeryEasy).toLocaleString()}</td>
                        <td>{parseFloat(data_team.totalEasy).toLocaleString()}</td>
                        <td>{parseFloat(data_team.totalMiddling).toLocaleString()}</td>
                        <td>{parseFloat(data_team.totalHard).toLocaleString()}</td>
                        <td>{parseFloat(data_team.totalVeryHard).toLocaleString()}</td>
                        <td>{parseFloat(data_team.totalPersonReceived).toLocaleString()}</td>
                        <td></td>
                        <td>{parseFloat(data_team.total_receiveds).toLocaleString()}</td>
                    </tr>
                    </tfoot>
                </table>
            </div>
            <div className={'w-100'}>
                <div className={'d-flex justify-content-between mt-3'}>
                    <div style={{border: 'solid 1px black',padding: 30}} className={'text-center'}>
                        <span className={'text-bold'}>ลงมือชื่อ</span>
                        <span>..................{data_team.confirmapprovebycode}..................</span>
                        <br/>
                        <p className={'text-bold mb-0 mt-2'}>( ผู้จัดทำ (HR) )</p>
                    </div>
                    <div style={{border: 'solid 1px black',padding: 30}} className={'text-center'}>
                        <span className={'text-bold'}>ลงมือชื่อ</span>
                        <span>..................{data_team.confirmpaydatebycode}..................</span>
                        <br/>
                        <p className={'text-tbold mb-0 mt-2'}>( หัวหน้าแผนก (QC) )</p>
                    </div>

                </div>
            </div>
        </div>
    );
}

export default PrintData;
