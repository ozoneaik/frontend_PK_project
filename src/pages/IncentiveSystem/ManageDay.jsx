import Content from "../../layouts/Content.jsx";
import {useEffect, useRef, useState} from "react";
import {AlertError, AlertSuccess} from "../../Dialogs/alertNotQuestions.js";
import {StoreDayApi, WorkdayListApi} from "../../api/ManageDay.js";
import Spinner from "../../components/Spinner.jsx";
import {faPenToSquare, faPlus} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {AddYearApi, QcYearListApi} from "../../api/QcYear.js";

export default function ManageDay() {

    const [loading, setLoading] = useState(true);
    const [days, setDays] = useState([]);//แสดงรายการจำนวนวัน
    const [addYear, setAddYear] = useState(2024);//ปีที่ต้องการสร้างหรืออัพเดท
    const [addMonth, setAddMonth] = useState(0);//เดือนที่ต้องการสร้างหรืออัพเดท
    const [addDay, setAddDay] = useState(0);//วันที่ต้องการสร้างหรืออัพเดท
    const [listYears, setListYears] = useState([]);//แสดงปี

    const [insertYear, setInsertYear] = useState(2023);

    useEffect(() => {
        getYears();
        let d = new Date();
        let year = d.getFullYear();
        setAddYear(year)
        getWorkdays(year);
    }, [])

    const getYears = () => {
        QcYearListApi().then(({data, status}) => {
            console.log(data)
            if (status === 200) {
                setListYears(data.length > 0 ? data : []);
            }
        })
    }

    const getWorkdays = (year) => {
        setLoading(true);
        WorkdayListApi(year).then(({data, status}) => {
            console.log(data, status)
            if (status === 200) {
                setDays(data.workdays);
                setLoading(false);
            } else {
                AlertError('เกิดข้อผิดพลาด', data);
                setLoading(false);
            }
        });
    }

    const EditDay = (wo_month, workday) => {
        console.log(addYear, wo_month, workday);
        setAddMonth(wo_month);
        setAddDay(workday)
    }

    const onSelect = (val) => {
        setAddYear(val);
        getWorkdays(val);
    }

    const onSubmit = (workday,wo_month,wo_year)=> {
        StoreDayApi(wo_year,wo_month,workday).then(({data,status}) => {
            if (status === 200){
                AlertSuccess('สำเร็จ',data.message);
                getWorkdays();
                document.getElementById('staticBackdrop').classList.remove('show');
                document.body.classList.remove('modal-open');
                document.getElementsByClassName('modal-backdrop')[0].remove();
            }else{
                AlertError('เกิดข้อผิดพลาด', data);
                getWorkdays();
            }
        });
    }

    const InsertYear = () => {
        AddYearApi(insertYear).then(({data,status}) => {
            if (status === 200){
                AlertSuccess('สำเร็จ',data.message);
                getYears();
            }else{
                AlertError('เกิดข้อผิดพลาด', data);
                getYears();
            }
        });
    }
    return (
        <Content header={'ข้อมูลจำนวนวันทำงาน'} header_sub={'รายการ'}>
            <div className={'row'}>
                <div className={'col-12'}>
                    <div className={'card'}>
                        <div className={'card-body'}>
                            <div className={'row'}>
                                <div className={'col-12 mb-3'}>
                                    <div className={'d-flex justify-content-center'}>
                                        <select name="" id="" className={'form-control w-25 mr-3'}
                                                onChange={(e) => onSelect(e.target.value)}>
                                            {
                                                listYears.length > 0 ? (
                                                    listYears.map((year, index) => (
                                                        <option value={year} key={index}>{year}</option>
                                                    ))
                                                ) : (
                                                    <option value={addYear}>{addYear}</option>
                                                )
                                            }
                                        </select>
                                        <button
                                            type="button" className="btn btn-primary btn-sm"
                                            data-toggle="modal" data-target="#test">
                                            <FontAwesomeIcon icon={faPlus} className={'mr-1'}/>
                                            <span>เพิ่มปี</span>
                                        </button>
                                    </div>
                                </div>
                                <div className={'col-12 table-responsive'}>
                                    <table className={'table table-bordered mb-0'}>
                                        <thead>
                                        <tr>
                                            <th>เดือน</th>
                                            <th>จำนวนวัน</th>
                                            <th>วันที่-เวลา สร้าง</th>
                                            <th>ชื่อผู้สร้าง</th>
                                            <th>วันที่-เวลา อัพเดท</th>
                                            <th>ชื่อผู้อัพเดท</th>
                                            <th>#</th>
                                        </tr>
                                        </thead>
                                        <tbody>
                                        {!loading ? (
                                            days.map((day, index) => (
                                                <tr key={index}>
                                                    <td>{day.wo_month}</td>
                                                    <td>{day.workday}</td>
                                                    <td>{day.created_at !== '-' ? new Date(day.created_at).toLocaleString() : '-'}</td>
                                                    <td>{day.created_by}</td>
                                                    <td>{day.updated_at !== '-' ? new Date(day.updated_at).toLocaleString() : '-'}</td>
                                                    <td>{day.updated_by}</td>
                                                    <td>
                                                        <button
                                                            onClick={() => EditDay(day.wo_month, day.workday === '-' ? 0 : day.workday)}
                                                            type="button" className="btn btn-primary btn-sm"
                                                            data-toggle="modal" data-target="#staticBackdrop">
                                                            <FontAwesomeIcon icon={faPenToSquare}/>
                                                        </button>
                                                    </td>
                                                </tr>
                                            ))
                                        ) : (
                                            <tr>
                                                <td colSpan={7}>
                                                    <Spinner/>
                                                </td>
                                            </tr>
                                        )}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="modal fade" id="staticBackdrop"  data-keyboard="false" tabIndex="-1"
                 aria-labelledby="staticBackdropLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title"
                                id="staticBackdropLabel">แก้ไขจำนวนวันของปี {addYear} เดือน {addMonth}</h5>
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            <div className={'form-group'}>
                                <label htmlFor="">จำนวนวัน</label>
                                <input type="number" value={addDay} className={'form-control'}
                                       onChange={(e) => setAddDay(parseInt(e.target.value))}
                                />
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-dismiss="modal">ปิด</button>
                            <button onClick={() => onSubmit(addDay, addMonth, addYear)} type="button"
                                    className="btn btn-primary">บันทึก
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            <div className="modal fade" id="test" data-backdrop="static" data-keyboard="false" tabIndex="-1"
                 aria-labelledby="testLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title"
                                id="staticBackdropLabel">เพิ่มปี</h5>
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            <div className={'form-group'}>
                                <input type="number" value={insertYear} className={'form-control'}
                                       onChange={(e) => setInsertYear(parseInt(e.target.value))}
                                />
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-dismiss="modal">ปิด</button>
                            <button onClick={() => InsertYear()} type="button"
                                    className="btn btn-primary">บันทึก
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </Content>
    )
}