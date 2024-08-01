import Content from "../../layouts/Content.jsx";
import '../../assets/style/toggle.css'
import '../../assets/style/table.css'
import {useEffect, useState} from "react";
import axiosClient from "../../axios.js";
import Swal from "sweetalert2";
import {Link, useNavigate, useParams} from "react-router-dom";
import {AlertError, AlertSuccess} from "../../Dialogs/alertNotQuestions.js";
import {useStateContext} from "../../contexts/ContextProvider.jsx";


function List_qc_month() {


    const {currentUser} = useStateContext();
    const {year, month, status} = useParams();
    const [datas, setDatas] = useState({});
    const [data_team, setData_team] = useState({});
    const [inc_id, setInc_id] = useState();
    const navigate = useNavigate();


    //ดึงข้อมูลมาจาก .30 จากฟังก์ชั่น getQcLog()
    useEffect(() => {
        getQcLog(year, month);
    }, []);

    //ฟังก์ชั่น ดึงข้อมูลมาแสดง
    const getQcLog = (year, month) => {
        axiosClient
            .get(`/incentive/qc_month/${year}/${month}/${status}`, {})
            .then(({data, status}) => {
                console.log(data)
                if (status === 200) {
                    setDatas(data.amount_qc_users);
                    setData_team(data.data_teams);
                    setInc_id(data.inc_id);
                }
            })
            .catch((error) => {
                if (error.response.status === 400) {
                    AlertError('Eror 400', error.response.data.msg);
                } else {
                    AlertError(error.response.status, error.message);
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


    //ซ่อนหรือแสดง กำลังโหลด
    const showLodingAndDisable = (Bool) => {
        if (Bool) {
            document.getElementById('BtnSubmit').disabled = true;
            document.getElementById('Loading').style.display = 'inline-block';
        } else {
            document.getElementById('BtnSubmit').disabled = false;
            document.getElementById('Loading').style.display = 'none';
        }
    }

    //ฟังก์ชั่นเปลี่ยนไปแก้ไขข้อมูล
    const RedirectToEdit = () => {
        navigate(`qc_list_month/${year}/${month}/-`, {replace: true})
    }

    //ฟังก์ชั่นพิมพ์
    const PrintData = () => {
        // navigate(`/incentive/printData/${year}/${month}/active`, '_blank');
        window.open(`/incentive/printData/${year}/${month}/active`, '_blank');

    }

    //ฟังก์ชั่นการกดส่ง
    const onSubmit = () => {
        showLodingAndDisable(true)
        const NewData_team = {...data_team, 'year': year, 'month': month, 'status': 'active'}
        const updatedDatas = datas.map((data, index) => ({
            ...data,
            paystatus: document.getElementById(`checkbox_${index}`).checked ? 'yes' : 'no',
        }));

        axiosClient.get(`/incentive/checkIncHd/${year}/${month}`, {})
            .then(({data, status}) => {
                if (status === 200) {
                    Swal.fire({
                        icon: 'info',
                        title: `เคยบันทึกข้อมูล ${year}/${month} แล้ว`,
                        text: data.msg,
                        confirmButtonText: 'ตกลง',
                        showCancelButton: true,
                        cancelButtonText: 'ยกเลิก',
                        allowOutsideClick: false,

                    }).then((result) => {
                        if (result.isConfirmed) {

                            // อัพเดทข้อมูลที่นี่
                            console.log('อัพเดทข้อมูลที่นี่', inc_id);
                            axiosClient.post(`/incentive/qc_month/update`, {
                                inc_id,
                                datas: updatedDatas,
                                data_team
                            }).then(({data, status}) => {

                                if (status === 200) {
                                    Swal.fire({
                                        icon: 'success',
                                        title: 'อัพเดทข้อมูลสำเร็จ',
                                        text: data.msg,
                                        confirmButtonText: 'ตกลง',
                                        allowOutsideClick: false,
                                    }).then((result) => {
                                        if (result.isConfirmed) {
                                            navigate('/incentive/qc_years');
                                        }
                                    })
                                }
                            }).catch((error) => {
                                if (error.response.status === 400) {
                                    AlertError('เกิดข้อผิดพลาด', error.response.data.msg);
                                } else {
                                    AlertError('เกิดข้อผิดพลาด', `${error.response.status} ${error.response.data.msg}`);
                                }

                                console.log(error.response.status)
                            })

                        }
                        showLodingAndDisable(false);
                    }).catch((error) => {
                        if (error.response) {
                            console.error(error.response.data.msg)
                        }
                        showLodingAndDisable(false);
                    })
                } else if (status === 400) {
                    alert('hello');
                }
                console.log(data);
            }).catch((error) => {
            if (error.response.status === 400) {
                axiosClient.post('/incentive/qc_month/store', {
                    datas: updatedDatas,
                    NewData_team
                }).then(({data, status}) => {
                    if (status === 200) {
                        Swal.fire({
                            icon: 'success',
                            title: data.msg,
                            confirmButtonText: "ตกลง",
                            allowOutsideClick: false
                        }).then((result) => {
                            if (result.isConfirmed) {
                                navigate('/incentive/qc_years');
                            }
                        })
                        showLodingAndDisable(false)
                    }
                    console.log(data, status)
                }).catch((error) => {
                    if (error.response) {
                        AlertError('เกิดข้อผิดพลาด', error.response.data.msg)
                    } else {
                        AlertError('เกิดข้อผิดพลาด', 'An unexpected error occurred. Please try again later.')
                    }
                    showLodingAndDisable(false)
                })
            }
        })


    }

    //ฟังก์ชั่นการคำนวนแล้วดึงข้อมูลจาก .30
    const handleCalculate = () => {
        axiosClient
            .get(`/incentive/qc_month/${year}/${month}/-`, {})
            .then(({data, status}) => {
                console.log(data)
                if (status === 200) {
                    AlertSuccess('สำเร็จ', 'คำนวณสำเร็จ')
                    setDatas(data.amount_qc_users);
                    setData_team(data.data_teams);
                }
            })
            .catch((error) => {
                if (error.response.status === 400) {
                    AlertError('Error 400', error.response.data.msg);
                } else {
                    AlertError(error.response.status, error.message);
                }
            });
    }

    //ฟังก์ชั่น approve ของ QC
    const onApproveQC = () => {
        axiosClient.post(`/incentive/qc_month/qc/update`, {
            approve: 'approved',
            inc_id: inc_id
        }).then(({data, status}) => {
            console.log('approved by QC', data.msg, data.status)
            if (status === 200) {
                Swal.fire({
                    icon: 'success',
                    text: data.msg,
                    confirmButtonText: 'ตกลง',
                    allowOutsideClick: false
                }).then((result) => {
                    if (result.isConfirmed) {
                        navigate('/incentive/qc_years');
                    }
                })
            }
        }).catch((error) => {
            if (error.response.status === 400) {
                AlertError(`เกิดข้อผิดพลาด ${error.response.status}`, error.response.data.msg)
            } else {
                AlertError(`เกิดข้อผิดพลาด ${error.response.status}`, error.message);
            }
        })
    }

    //ฟังก์ชั่น approve ของ HR
    const onApproveHR = () => {
        axiosClient.post(`/incentive/qc_month/hr/update`, {
            approve: 'approved',
            inc_id: inc_id
        }).then(({data, status}) => {
            console.log('approved by QC', data.msg, data.status)
            if (status === 200) {
                Swal.fire({
                    icon: 'success',
                    text: data.msg,
                    confirmButtonText: 'ตกลง',
                    allowOutsideClick: false
                }).then((result) => {
                    if (result.isConfirmed) {
                        navigate('/incentive/qc_years');
                    }
                })
            }
        }).catch((error) => {
            if (error.response.status === 400) {
                AlertError(`เกิดข้อผิดพลาด ${error.response.status}`, error.response.data.msg)
            } else {
                AlertError(`เกิดข้อผิดพลาด ${error.response.status}`, error.message);
            }
        })
    }

    //ฟังก์ชั่น ยืนยันการจ่าย ของ HR
    const onConfirmPayDate = () => {
        axiosClient.post(`/incentive/qc_month/hr/confirmpaydate`, {
            approve: 'approved',
            inc_id: inc_id
        }).then(({data, status}) => {
            console.log('approved by QC', data.msg, data.status)
            if (status === 200) {
                Swal.fire({
                    icon: 'success',
                    confirmButtonText: 'ตกลง',
                    allowOutsideClick: false
                }).then((result) => {
                    if (result.isConfirmed) {
                        navigate('/incentive/qc_years');
                    }
                })
            }
        }).catch((error) => {
            if (error.response.status === 400) {
                AlertError(`เกิดข้อผิดพลาด ${error.response.status}`, error.response.data.msg)
            } else {
                AlertError(`เกิดข้อผิดพลาด ${error.response.status}`, error.message);
            }
        })
    }


    return (
        <Content header={'QC สินค้าประจำปี'} header_sub={`รายละเอียด QC ประจำเดือน ${month}/${year}`}>
            <div className={'calculate mb-3 d-flex justify-content-end'}>
                <>
                    {
                        status === '-' || data_team.status === 'complete' ?
                            (
                                <>
                                    {
                                        data_team.status === 'complete' ? (
                                            <></>
                                        ) : (
                                            <button onClick={handleCalculate}
                                                    className={`text-end btn btn-warning mr-3 ${currentUser.emp_role !== 'QC' ? '' : 'disabled'}`}>
                                                <i className="fa-solid fa-calculator mr-2"></i>
                                                <span>คำนวณ</span>
                                            </button>
                                        )
                                    }
                                </>
                            ) : (
                                <>
                                    <Link to={`/incentive/qc_list_month/${year}/${month}/-`} onClick={RedirectToEdit}
                                          className={`text-end btn btn-primary mr-3 ${currentUser.emp_role === 'QC' || data_team.status !== 'active' ? 'disabled' : ''}`}>
                                        <i className="fa-solid fa-pen-to-square mr-1"></i>
                                        <span>แก้ไข</span>
                                    </Link>

                                    {currentUser.emp_role === 'HR' ? (
                                        <>
                                            {
                                                data_team.status === 'approve' ? (
                                                    <button onClick={onConfirmPayDate}
                                                            className={'text-end btn mr-3 text-white bg-info'}>
                                                        <i className="fa-solid fa-paper-plane mr-1"></i>
                                                        <span>ยืนยันการจ่าย</span>
                                                    </button>
                                                ) : (
                                                    data_team.status === 'active' && (
                                                        <button onClick={onApproveQC}
                                                                className={'text-end btn mr-3 text-white bg-info'}>
                                                            <i className="fa-solid fa-paper-plane mr-1"></i>
                                                            <span>ส่งอนุมัติ</span>
                                                        </button>
                                                    )
                                                )
                                            }
                                        </>

                                    ) : (
                                        data_team.status === 'wait' && (
                                            <button onClick={onApproveHR}
                                                    className={'text-end btn mr-3 text-white bg-info'}>
                                                <i className="fa-solid fa-paper-plane mr-1"></i>
                                                <span>อนุมัติ</span>
                                            </button>
                                        )
                                    )}
                                </>
                            )
                    }
                    <button onClick={() => PrintData()} className={'text-end btn btn-success'}>
                        <i className="fa-solid fa-print mr-1"></i>
                        <span>พิมพ์</span>
                    </button>
                </>
            </div>

            <div className={'card'}>
                <div className={'card-body'}>
                    <div className={'row'}>
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
                                        <br/>
                                        <span className={'text-secondary'}
                                              style={{fontSize: 12}}>{data.payremark ? `หมายเหตุ : ${data.payremark}` : ''}</span>
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
                                                <i className="fa-solid fa-pen-to-square"></i>
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
                                                                    data-dismiss="modal">เสร็จสิ้น
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
                                <td></td>
                                <td>{parseFloat(data_team.total_receiveds).toLocaleString()}</td>
                                {status === '-' ? (
                                    <td>หมายเหตุ</td>
                                ) : <></>}

                            </tr>
                            </tfoot>
                        </table>
                    </div>
                    {
                        status === '-' && currentUser.emp_role === 'HR' ? (

                            <div className={'d-flex justify-content-center mt-3'}>
                                {
                                    data_team.status === 'active' && (
                                        <Link to={`/incentive/qc_list_month/${year}/${month}/active`}
                                              className={'btn btn-secondary mr-3'} style={{minWidth: 200, alignContent: "center"}}
                                        >
                                            <span>ยกเลิก</span>
                                        </Link>
                                    )
                                }

                                <button disabled={`${year}/${month}` -  new Date() == 1 ? true : false} onClick={() => onSubmit()} className={'btn btn-primary'} id={'BtnSubmit'}
                                        style={{minWidth: 200, alignContent: "center"}}>
                                    <span id={'Loading'} className="loader mr-1"
                                          style={{height: 20, width: 20, marginBottom: -4, display: "none"}}></span>
                                    <span>บันทึก</span>
                                </button>


                            </div>
                        ) : <></>
                    }
                </div>
            </div>
        </Content>
    );
}

export default List_qc_month;