import { useEffect, useState } from 'react';
import { useParams } from "react-router-dom";
import axiosClient from "../../axios.js";
import { AlertError } from "../../Dialogs/alertNotQuestions.js";
import '../../assets/style/print.css'; // Import the CSS file

function PrintData() {
    const { year, month } = useParams();
    const [datas, setDatas] = useState(null);
    const [data_team, setData_team] = useState(null);

    useEffect(() => {
        axiosClient
            .get(`/incentive/qc_month/${year}/${month}/active`, {})
            .then(({ data, status }) => {
                console.log(data)
                if (status === 200) {
                    setDatas(data.amount_qc_users);
                    setData_team(data.data_teams);
                    // Trigger print once data is set
                    setTimeout(() => window.print(), 1000);
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

    if (!datas || !data_team) {
        return <div>Loading...</div>; // Show a loading message while data is being fetched
    }

    return (
        <div>
            <div>
                <div className={''}>
                    <table className={''}>
                        <thead className={''} >
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
                                <td>{data.emp_name}</td>
                                <td>{data.empqc_count.toLocaleString()}</td>
                                <td>{data.HM}</td>
                                <td>{data.HD}</td>
                                <td>
                                    {data.grade === 'A+' ? (
                                            <span className={'px-3 py-1 text-sm rounded-pill bg-primary'}>A+</span>) :
                                        data.grade === 'A' ? (
                                                <span
                                                    className={'px-3 py-1 text-sm rounded-pill bg-warning'}>A</span>) :
                                            data.grade === 'B' ? (
                                                    <span
                                                        className={'px-3 py-1 text-sm rounded-pill bg-success'}>B</span>) :
                                                data.grade === 'C' ? (
                                                        <span
                                                            className={'px-3 py-1 text-sm rounded-pill bg-info'}>C</span>) :
                                                    <span
                                                        className={'px-3 py-1 text-sm rounded-pill bg-danger'}>ไม่ผ่าน</span>
                                    }

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
                            <td></td>
                            <td>{parseFloat(data_team.total_receiveds).toLocaleString()}</td>
                        </tr>
                        </tfoot>
                    </table>
                </div>
            </div>
        </div>
    );
}

export default PrintData;
