import Content from "../../layouts/Content.jsx";
import '../../assets/style/toggle.css'
import '../../assets/style/table.css'
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { AlertError, AlertSuccess } from "../../Dialogs/alertNotQuestions.js";
import { useStateContext } from "../../contexts/ContextProvider.jsx";
import {
    ApproveAPi,
    checkSavedApi,
    ConfirmPayDate,
    QcLogApi,
    StoreQcMonthApi,
    UpdateQcMonthApi
} from "../../api/QcMonth.js";
import {
    AlertErrorWithQuestion,
    AlertInfoWithQuestion,
    AlertSuccessWithQuestion
} from "../../Dialogs/alertWithQuestions.js";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faCalculator,
    faCheck,
    faFloppyDisk,
    faPaperPlane,
    faPenToSquare,
    faPrint,
    faXmark,
    faFileExport
} from "@fortawesome/free-solid-svg-icons";
import { ProductsError } from "../../components/ProductsError.jsx";
import Spinner from "../../components/Spinner.jsx";


function List_qc_month() {
    const { currentUser } = useStateContext();
    const { year, month, status } = useParams();
    const [datas, setDatas] = useState({});
    const [data_team, setData_team] = useState({});
    const [inc_id, setInc_id] = useState();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [isConfirmed, setIsConfirmed] = useState(false);
    const [productNotFound, setProductNotFound] = useState([]);

    //ดึงข้อมูลมาจาก .30 จากฟังก์ชั่น getQcLog()
    useEffect(() => {
        getQcLog(year, month);
    }, []);

    //ฟังก์ชั่น ดึงข้อมูลมาแสดง
    const getQcLog = (year, month) => {
        QcLogApi(year, month, status)
            .then(({ data, status }) => {
                console.log(data, status)
                if (status === 200) {
                    setDatas(data.amount_qc_users);
                    setData_team(data.data_teams);
                    setInc_id(data.inc_id);
                    setProductNotFound(data.productNotFound ? data.productNotFound : null);
                } else {
                    if (status === 412) {
                        const textConfirm = 'ไปที่หน้าจัดการวันทำงาน';
                        const textCancel = 'ย้อนกลับ'
                        AlertErrorWithQuestion({
                            title: 'เกิดข้อผิดพลาด', text: data, textConfirm, textCancel, onPassed: (confirm) => {
                                confirm ? navigate('/incentive/manage_day') : navigate('/incentive/qc_years');
                            }
                        });
                    } else {
                        AlertError('เกิดข้อผิดพลาด', data);
                    }
                }
            });
    }

    //ฟังก์ชั่นเปลี่ยนสถานะการจ่ายให้กับพนักงาน
    const handleCheckboxChange = (index) => {
        const updated = [...datas];
        updated[index].paystatus = document.getElementById(`checkbox_${index}`).checked ? 'yes' : 'no';
        setDatas(updated);
    };

    //ฟังก์ชั่นการเพิ่มหมายเหตุ
    const handlePayRemarkChange = (index, val) => {
        console.log(index, val)
        const updated = [...datas];
        updated[index].payremark = val;
        setDatas(updated);
        console.log(datas);
    }

    //ฟังก์ชั่นเปลี่ยนไปแก้ไขข้อมูล
    const RedirectToEdit = () => {
        navigate(`/incentive/qc_list_month/${year}/${month}/-`)
    }

    //ฟังก์ชั่นพิมพ์
    const PrintData = () => {
        window.open(`/incentive/printData/${year}/${month}/active`, '_blank');
    }

    //ฟังก์ชั่นการกดส่ง
    const onSubmit = () => {
        setLoading(true)
        const NewData_team = { ...data_team, 'year': year, 'month': month, 'status': 'active' }
        const updatedDatas = datas.map((data, index) => ({
            ...data,
            paystatus: document.getElementById(`checkbox_${index}`).checked ? 'yes' : 'no',
        }));
        checkSavedApi(year, month)
            .then(({ data, status }) => { // เช็คว่าเคยบันทึกแล้วหรือไม่
                console.log('response >>', data, status);
                if (status === 200) {
                    console.log(status);
                    AlertInfoWithQuestion({
                        title: `เคยบันทึกข้อมูล ${year}/${month} แล้ว`, text: data.message, onPassed: (confirm) => {
                            if (confirm) { //อัพเดทข้อมูลถ้ากด ตกลง
                                updateQcMonth(inc_id, updatedDatas, data_team);
                            }
                        }
                    });
                } else if (status === 400) {
                    storeQcMonth(updatedDatas, NewData_team);
                } else {
                    AlertError('เกิดข้อผิดพลาด', data);
                    setLoading(false);
                }
            });
    }


    // ฟังก์ชั่นอัพเดทข้อมูล
    const updateQcMonth = (inc_id, updatedDatas, data_team) => {
        UpdateQcMonthApi(inc_id, updatedDatas, data_team).then(({ data, status }) => {
            if (status === 200) {
                AlertSuccessWithQuestion({
                    title: 'อัพเดทข้อมูลสำเร็จ', text: data.message, onPassed: (confirm) => {
                        confirm ? navigate('/incentive/qc_years') : navigate('/incentive/qc_years');
                    }
                });
            } else {
                AlertError('เกิดข้อผิดพลาด', data);
                setLoading(false);
            }
        })
    }

    // ฟังก์ชั่นสร้างข้อมูล
    const storeQcMonth = (datas, NewData_team) => {
        StoreQcMonthApi(datas, NewData_team, isConfirmed).then(({ data, status }) => {
            if (status === 200) {
                AlertSuccessWithQuestion({
                    title: 'สำเร็จ', text: data.message, onPassed: (confirm) => {
                        confirm ? navigate('/incentive/qc_years') : navigate('/incentive/qc_years');
                    }
                });
                setLoading(false);
            } else {
                AlertError('เกิดข้อผิดพลาด', data);
                setLoading(false);
            }
        })
        setIsConfirmed(true);
    }

    //ฟังก์ชั่นการคำนวนแล้วดึงข้อมูลจาก .30
    const handleCalculate = () => {
        setLoading(true);
        QcLogApi(year, month, '-').then(({ data, status }) => {
            if (status === 200) {
                setDatas(data.amount_qc_users);
                setData_team(data.data_teams);
                AlertSuccess('คำนวณสำเร็จ', '');
                setLoading(false);
            } else {
                AlertError('เกิดข้อผิดพลาด', data);
                setLoading(false);
            }
        });
    }

    //ฟังก์ชั่น approve ของ QC
    const onApproveQC = () => {
        setLoading(true);
        ApproveAPi(inc_id, 'approved', 'qc').then(({ data, status }) => {
            if (status === 200) {
                AlertSuccessWithQuestion({
                    title: 'อนุมัติสำเร็จ',
                    text: data.message,
                    textCancel: 'ปิด',
                    onPassed: (confirm) => {
                        confirm ? navigate('/incentive/qc_years') : navigate('/incentive/qc_years');
                    }
                })
            } else {
                AlertError('เกิดข้อผิดพลาด', data);
                setLoading(false);
            }
        });
    }

    //ฟังก์ชั่นส่งอนุมัติ ของ HR
    const onApproveHR = () => {
        setLoading(true);
        ApproveAPi(inc_id, 'approved', 'hr').then(({ data, status }) => {
            if (status === 200) {
                AlertSuccessWithQuestion({
                    title: 'ส่งอนุมัติสำเร็จ',
                    text: data.message,
                    textCancel: 'ปิด',
                    onPassed: (confirm) => {
                        confirm ? navigate('/incentive/qc_years') : navigate('/incentive/qc_years');
                    }
                })
            } else {
                AlertError('เกิดข้อผิดพลาด', data);
                setLoading(false);
            }
        });
    }

    //ฟังก์ชั่น ยืนยันการจ่าย ของ HR
    const onConfirmPayDate = () => {
        setLoading(true);
        ConfirmPayDate(inc_id, 'approved', 'hr').then(({ data, status }) => {
            if (status === 200) {
                AlertSuccessWithQuestion({
                    title: 'ส่งอนุมัติสำเร็จ',
                    text: data.message,
                    textCancel: 'ปิด',
                    onPassed: (confirm) => {
                        confirm ? navigate('/incentive/qc_years') : navigate('/incentive/qc_years');
                    }
                })
            } else {
                AlertError('เกิดข้อผิดพลาด', data);
                setLoading(false);
            }
        });
    }


    return (
        <Content header={'QC สินค้าประจำปี'} header_sub={`รายละเอียด QC ประจำเดือน ${month}/${year}`}>
            <div className={'calculate mb-3 d-flex justify-content-end'}>
                <>
                    {
                        status === '-' || data_team.status === 'complete' ?
                            (<>
                                {
                                    data_team.status !== 'complete' && (
                                        <button onClick={handleCalculate} disabled={loading}
                                            className={`text-end btn btn-warning mr-3 ${currentUser.emp_role !== 'HR' ? '' : 'disabled'}`}>
                                            <FontAwesomeIcon icon={faCalculator} className={'mr-2'} />
                                            <span>คำนวณ</span>
                                        </button>
                                    )
                                }
                            </>) : (
                                <>

                                    <button
                                        onClick={() => alert('ยังไม่เปิดใช้งาน')} disabled={loading}
                                        className={'btn btn-success mr-3 bg-white text-bold'}>
                                        <FontAwesomeIcon icon={faFileExport} className={'mr-1'} color="green" />
                                        <span className={'text-success'}>Excel</span>
                                    </button>


                                    <button onClick={RedirectToEdit}
                                        disabled={
                                            loading ||
                                            (data_team.status !== 'wait') &&
                                            (currentUser.emp_role === 'HR' || data_team.status !== 'active')
                                        }
                                        className="text-end btn btn-primary mr-3">
                                        <FontAwesomeIcon icon={faPenToSquare} className={'mr-1'} />
                                        <span>แก้ไข</span>
                                    </button>

                                    {
                                        data_team.status === 'approve' && (
                                            <button onClick={onConfirmPayDate} disabled={loading}
                                                className={'text-end btn mr-3 text-white bg-info'}>
                                                <FontAwesomeIcon icon={faPaperPlane} className={'mr-1'} />
                                                <span>ยืนยันการจ่าย</span>
                                            </button>
                                        )
                                    }

                                    {currentUser.emp_role === 'QC' ? (
                                        data_team.status === 'active' && (
                                            <button onClick={onApproveHR} disabled={loading}
                                                className={'text-end btn mr-3 text-white bg-info'}>
                                                <FontAwesomeIcon icon={faPaperPlane} className={'mr-1'} />
                                                <span>ส่งอนุมัติ</span>
                                            </button>
                                        )

                                    ) : (
                                        data_team.status === 'wait' && (
                                            <button onClick={onApproveQC} disabled={loading}
                                                className={'text-end btn mr-3 text-white bg-info'}>
                                                <FontAwesomeIcon icon={faPaperPlane} className={'mr-1'} />
                                                <span>อนุมัติ</span>
                                            </button>
                                        )
                                    )}
                                </>
                            )
                    }
                    <button onClick={() => PrintData()} className={'text-end btn btn-success'}
                        disabled={loading || status === '-'}>
                        <FontAwesomeIcon icon={faPrint} className={'mr-1'} />
                        <span>พิมพ์</span>
                    </button>
                </>
            </div>

            <div className={'card'}>
                <div className={'card-body'}>
                    <div className={'row'}>
                        <div className={'col-12 d-flex justify-content-between'}>
                            <div>
                                <p style={{ fontSize: 18 }} className={'text-bold'}>ปริมาณการ QC สินค้า
                                    ประจำเดือน {month}/{year}</p>
                                <p>กำหนดจ่ายเดือน {month === '12' ? '1' : parseInt(month) + 1}/{month === '12' ? parseInt(year) + 1 : year}</p>
                                <p>จำนวนวันทำงาน {data_team.workday} วัน</p>
                            </div>
                            <div>
                                <p>เรียกข้อมูล ณ วันที่ {new Date().toLocaleDateString('th-TH', {
                                    day: '2-digit',
                                    month: '2-digit',
                                    year: 'numeric'
                                })}</p>
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
                                    <th colSpan={5}>ปริมาณ ( Qtys & Rate )</th>
                                    <th rowSpan={2}>ยอดรับบุคคล</th>
                                    <th rowSpan={2}>ยอดรับทีม</th>
                                    <th rowSpan={2}>ยอดรับสุทธิ</th>
                                    {status === '-' ? (
                                        <td rowSpan={2}>หมายเหตุ</td>
                                    ) : <></>}
                                </tr>
                                <tr>
                                    <td>Very Easy</td>
                                    <td>Easy</td>
                                    <td>Middle</td>
                                    <td>Hard</td>
                                    <td>Very Hard</td>
                                </tr>
                            </thead>
                            <tbody>
                                {datas.length > 0 ? datas.map((data, index) => (
                                    <tr key={index}>
                                        <td>
                                            {status === '-' ? (
                                                <label className={'switch'}>
                                                    <input
                                                        id={`checkbox_${index}`}
                                                        type="checkbox"
                                                        defaultChecked={data.paystatus === 'yes'}
                                                        onChange={() => handleCheckboxChange(index)}
                                                    />
                                                    <span className="slider round"></span>
                                                </label>
                                            ) :
                                                (
                                                    <span
                                                        className={`px-3 py-1 text-sm rounded-pill ${data.paystatus === 'yes' ? 'bg-primary' : 'bg-danger'}`}>
                                                        {data.paystatus}
                                                    </span>
                                                )
                                            }

                                        </td>
                                        <td>{index + 1}</td>
                                        <td>{data.empqc}</td>
                                        <td className={'text-left'}>
                                            {data.emp_name}
                                            <br />
                                            <span className={'text-secondary'}
                                                style={{ fontSize: 12 }}>{data.payremark ? `หมายเหตุ : ${data.payremark}` : ''}</span>
                                        </td>
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
                                        {status === '-' ? (
                                            <td>
                                                <button type="button" className="btn btn-warning btn-sm" data-toggle="modal"
                                                    data-target={`#exampleModal${index}`}>
                                                    <FontAwesomeIcon icon={faPenToSquare} />
                                                </button>
                                                <div className="modal fade" id={`exampleModal${index}`} tabIndex="-1"
                                                    aria-labelledby="exampleModalLabel" aria-hidden="true">
                                                    <div className="modal-dialog">
                                                        <div className="modal-content">
                                                            <div className="modal-header">
                                                                <h5 className="modal-title"
                                                                    id="exampleModalLabel">เพิ่มหมายเหตุ {data.emp_name}</h5>
                                                                <button type="button" className="close" data-dismiss="modal"
                                                                    aria-label="Close">
                                                                    <span aria-hidden="true">&times;</span>
                                                                </button>
                                                            </div>
                                                            <div className="modal-body">
                                                                <textarea className={'form-control'}
                                                                    placeholder={'เพิ่มหมายเหตุ'}
                                                                    defaultValue={data.payremark ? data.payremark : ''}
                                                                    onChange={(e) => handlePayRemarkChange(index, e.target.value)}
                                                                >
                                                                </textarea>
                                                            </div>
                                                            <div className="modal-footer">
                                                                <button type="button" className="btn btn-primary"
                                                                    data-dismiss="modal">
                                                                    <FontAwesomeIcon icon={faCheck} className={'mr-1'} />
                                                                    <span>เสร็จสิ้น</span>
                                                                </button>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </td>
                                        ) : (
                                            <></>
                                        )}

                                    </tr>
                                )) : (
                                    <tr>
                                        <td colSpan="9"><span className="loader"></span></td>
                                    </tr>
                                )}

                            </tbody>
                            <tfoot className={'text-bold'} style={{ background: '#ead1ff' }}>
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
                                    {status === '-' ? (
                                        <td>หมายเหตุ</td>
                                    ) : <></>}
                                </tr>
                            </tfoot>
                        </table>
                    </div>
                    <div>
                        {
                            productNotFound ? (
                                productNotFound.length > 0 ? (
                                    ProductsError({ productNotFound: productNotFound })
                                ) : <></>
                            ) : <></>
                        }
                    </div>
                    {
                        // && currentUser.emp_role === 'HR'
                        status === '-' ? (
                            <div className={'d-flex justify-content-center mt-3'}>
                                {
                                    (data_team.status === 'active' || data_team.status === 'wait') && (
                                        <Link to={`/incentive/qc_list_month/${year}/${month}/active`}
                                            className={'btn btn-secondary mr-3'}
                                        >
                                            <FontAwesomeIcon icon={faXmark} className={'mr-1'} />
                                            <span>ยกเลิก</span>
                                        </Link>
                                    )
                                }
                                {
                                    new Date().getMonth() + 1 != month ? (
                                        currentUser.emp_role === 'QC' ? (
                                            < button onClick={() => onSubmit()} className={'btn btn-primary'}
                                                id={'BtnSubmit'}>
                                                {!loading ? (
                                                    <>
                                                        <FontAwesomeIcon icon={faFloppyDisk} className={'mr-2'} />
                                                        <span>บันทึก</span>
                                                    </>
                                                ) : (
                                                    <Spinner />
                                                )}
                                            </button>
                                        ) : currentUser.emp_role === 'HR' && status === '-' && data_team.status === 'wait' ?
                                            <>
                                                < button onClick={() => onSubmit()} className={'btn btn-primary'}
                                                    id={'BtnSubmit'}>
                                                    {!loading ? (
                                                        <>
                                                            <FontAwesomeIcon icon={faFloppyDisk} className={'mr-2'} />
                                                            <span>บันทึก</span>
                                                        </>
                                                    ) : (
                                                        <Spinner />
                                                    )}
                                                </button>
                                            </>
                                            : <></>
                                    ) : <></>
                                }
                            </div>
                        ) : <></>
                    }
                </div>
            </div>
        </Content>
    )
        ;
}

export default List_qc_month;