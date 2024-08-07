import Content from "../../layouts/Content.jsx";
import '../../assets/style/table.css'
import {useEffect, useState} from "react";
import {Link} from "react-router-dom";
import {AddYearApi, QCYearDataListApi, QcYearListApi} from "../../api/QcYear.js";
import {AlertError, AlertSuccess} from "../../Dialogs/alertNotQuestions.js";
import Spinner from "../../components/Spinner.jsx";
import {faFileLines, faPlus, faXmark} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCalendarDays} from "@fortawesome/free-regular-svg-icons";
import Button from "../../components/Button.jsx";


function Qc_years() {
    const [listYears, setListYears] = useState([]);
    const [year, setYear] = useState(2000);
    const [dataSet, setDataSet] = useState({});
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        getListYears();
        // eslint-disable-next-line no-undef
        $(function () {
            // eslint-disable-next-line no-undef
            $('.select2').select2({
                theme: 'bootstrap4'
            }).on('change', function (event) {
                setDataSet({});
                getQcDataList(event.target.value);
            });
        })

    }, []);


    const getListYears = () => {
        QcYearListApi().then(({data, status}) => {
            if (status === 200) {
                setListYears(data);
                setYear(parseInt(data[0]) + 1);
                getQcDataList(data[0]);
            } else {
                AlertError('เกิดข้อผิดพลาด', data)
            }
        });
    }

    const getQcDataList = (year) => {
        setLoading(true);
        QCYearDataListApi(year)
            .then(({data, status}) => {
                if (status === 200) {
                    setDataSet(data.list);
                } else {
                    AlertError('เกิดข้อผิดพลาด', data)
                }
            }).finally(() => {
                setLoading(false);
            }
        );
    }

    const onSubmit = (ev) => {
        ev.preventDefault();
        AddYearApi(year).then(({data, status}) => {
            console.log(data, status);
            if (status === 200) {
                AlertSuccess('สำเร็จ', data.message)
            } else {
                AlertError('เกิดข้อผิดพลาด', data)
            }
        }).finally(() => {
            getListYears();
        });
    };

    const changeColorStatus = (dataStatus) => {
        const statusClasses = {
            active: 'bg-secondary',
            wait: 'bg-warning',
            approve: 'bg-success',
            complete: 'bg-primary'
        };
        const statusClass = statusClasses[dataStatus] || '';
        return <span className={`py-1 px-2 rounded-pill ${statusClass}`}>{dataStatus}</span>;
    };


    return (
        <Content header={'QC สินค้าประจำปี'} header_sub={'รายการ'}>
            <div className={'card'}>
                <div className="card-body text-center">
                    <div className={'text-center mb-3 d-flex justify-content-center'}>
                        <select
                            name="yearSelect"
                            className="form-control select2"
                            id="yearSelect"
                            style={{maxWidth: 200}}
                            onChange={(event) => getQcDataList(event.target.value)}>
                            <option value="" disabled>Select a year</option>
                            {listYears.length > 0 ? listYears.map((year, i) => (
                                <option key={i} value={year}>{year}</option>
                            )) : (
                                <></>
                            )}
                        </select>
                        <button type="button" className="btn btn-primary ml-3" data-toggle="modal"
                                data-target="#staticBackdrop">
                            <FontAwesomeIcon icon={faPlus} className={'mr-1'}/>
                            <span>เพิ่มปี</span>
                        </button>
                    </div>
                    <div className={'table-responsive'}>
                        <table className={'table table-bordered'}>
                            <thead>
                            <tr>
                                <th>เดือน</th>
                                <th>สถานะ</th>
                                <th>จำนวนพนักงาน</th>
                                <th>จำนวนวันทำงาน</th>
                                <th>จำนวนงาน</th>
                                <th>วันที่คำนวณ</th>
                                <th>วันที่คอนเฟิร์ม</th>
                                <th>วันที่ยืนยันการจ่าย</th>
                                <th>#</th>
                            </tr>
                            </thead>
                            <tbody>
                            {
                                !loading ? (
                                    dataSet.length > 0 ? dataSet.map((data, index) => (
                                        <tr key={index}>
                                            <td>{data.yearkey}-{data.monthkey}</td>
                                            <td>{changeColorStatus(data.status)}</td>
                                            <td>{data.numofemp}</td>
                                            <td>{data.workday}</td>
                                            <td>{data.totalqcqty}</td>
                                            <td>{data.created_at ? new Date(data.created_at).toLocaleString() : '-'}</td>
                                            <td>
                                                {data.confirmdate ? (
                                                    <>
                                                        <p className={'p-0 m-0 mb-2 text-sm text-secondary'}><span
                                                            className={'text-bold'}>HR ส่งคำขออนุมัติเมื่อ</span> {data.confirmdate ? data.confirmdate : 'กำลังดำเนินการ'}
                                                        </p>
                                                        <p className={'p-0 m-0 text-sm text-secondary'}><span
                                                            className={'text-bold'}>QC อนุมัติเมื่อ</span> {data.confirmapprove ? data.confirmapprove : 'กำลังดำเนินการ'}
                                                        </p>
                                                    </>
                                                ) : (
                                                    <>-</>
                                                )}

                                            </td>
                                            <td>{data.confirmpaydate ? data.confirmpaydate : '-'}</td>
                                            <td>
                                                <Link
                                                    to={`/incentive/qc_list_month/${data.yearkey}/${data.monthkey}/${data.status !== '-' ? data.status : '-'}`}>
                                                    <FontAwesomeIcon icon={faFileLines}/>
                                                </Link>
                                            </td>

                                        </tr>

                                    )) : (
                                        <tr>
                                            <td colSpan="9">ไม่มีข้อมูล</td>
                                        </tr>
                                    )
                                ) : (
                                    <tr>
                                        <td colSpan="9"><Spinner/></td>
                                    </tr>
                                )
                            }
                            </tbody>
                        </table>
                    </div>

                </div>
            </div>

            <div className="modal fade" id="staticBackdrop" data-backdrop="static" data-keyboard="false" tabIndex="-1"
                 aria-labelledby="staticBackdropLabel" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="staticBackdropLabel">
                                <FontAwesomeIcon icon={faCalendarDays} className={'mr-1'}/>
                                <span>เพิ่มปี</span>
                            </h5>
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <form onSubmit={onSubmit} method="POST">
                            <div className="modal-body">
                                <div className={'form-group'}>
                                    <label htmlFor="addYear">ปี ( ค.ศ. )</label>
                                    <input type="number" id={'addYear'} name={'addYear'}
                                           onChange={(e) => setYear(e.target.value)}
                                           value={year ? year : ''}
                                           className={'form-control'}/>
                                </div>
                            </div>
                            <div className="modal-footer">
                                <Button type="button" className="btn-secondary" icon={faXmark} iconClass="mr-1"
                                        label="ปิด" dataDismiss="modal"/>
                                <Button type="submit" className="btn-primary" icon={faPlus} iconClass="mr-1"
                                        label="เพิ่ม"/>
                            </div>
                        </form>

                    </div>
                </div>
            </div>


        </Content>


    );
}

export default Qc_years;