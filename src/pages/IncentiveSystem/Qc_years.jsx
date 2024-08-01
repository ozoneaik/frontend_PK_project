import Content from "../../layouts/Content.jsx";
import '../../assets/style/table.css'
import {useEffect, useState} from "react";
import axiosClient from "../../axios.js";
import Swal from "sweetalert2";
import {Link} from "react-router-dom";


function Qc_years() {
    const [listYears, setListYears] = useState([]);
    const [year, setYear] = useState(2000);
    const [dataSet, setDataSet] = useState({});

    useEffect(() => {
        getListYears();
        // eslint-disable-next-line no-undef
        $(function () {
            // eslint-disable-next-line no-undef
            $('.select2').select2({
                theme: 'bootstrap4'
            }).on('change', function (event) {
                setDataSet({});
                getQc_year(event.target.value);
            });
        })

    }, []);


    const getListYears = () => {
        axiosClient.get('/incentive/list-year', {})
            .then(({data}) => {
                setListYears(data);
                setYear(parseInt(data[0]) + 1)
                getQc_year(data[0]);
            }).catch((error) => {
            console.error(error);
            Swal.fire({
                icon: 'error',
                title: 'Something went wrong',
                text: error.message
            })
        })
    }

    const getQc_year = (year) => {
        console.log(year)
        axiosClient
            .get(`/incentive/qc_year/${year}`, {})
            .then(({data, status}) => {
                console.log(data)
                if (status === 200) {
                    setDataSet(data.list)
                } else {
                    Swal.fire({
                        icon: 'error',
                        title: 'Something went wrong',
                        text: data.msg
                    })


                }
            })
            .catch((error) => {
                console.error(error);
                Swal.fire({
                    icon: 'error',
                    title: 'Something went wrong',
                    text: error.response.data.msg
                })
            });
    }

    const onSubmit = (ev) => {
        ev.preventDefault();
        axiosClient
            .post("/incentive/add-year", {year})
            .then(({data, status}) => {
                if (status === 200) {
                    Swal.fire({
                        icon: 'success',
                        text: data.msg
                    });
                    getListYears()
                } else {
                    Swal.fire({
                        icon: 'error',
                        title: 'Something went wrong',
                        text: data.msg
                    })
                }

            })
            .catch((error) => {
                if (error.response) {
                    Swal.fire({
                        icon: 'error',
                        title: 'Something went wrong',
                        text: error.response.data.message
                    });
                } else {
                    Swal.fire({
                        icon: 'error',
                        title: 'Something went wrong',
                        text: 'An unexpected error occurred. Please try again later.'
                    });
                }
                console.error(error);
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
                {/*<div className="card-header">*/}
                {/*    <h3 className="card-title">Incentive System</h3>*/}
                {/*</div>*/}
                <div className="card-body text-center">
                    <div className={'text-center mb-3 d-flex justify-content-center'}>
                        <select
                            name="yearSelect"
                            className="form-control select2"
                            id="yearSelect"
                            style={{maxWidth: 200}}
                            onChange={(event) => getQc_year(event.target.value)}>
                            <option value="" disabled>Select a year</option>
                            {listYears.length > 0 ? listYears.map((year, i) => (
                                <option key={i} value={year}>{year}</option>
                            )) : (
                                <></>
                            )}
                        </select>
                        <button type="button" className="btn btn-primary ml-3" data-toggle="modal"
                                data-target="#staticBackdrop">
                            + เพิ่มปี
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
                                                <i className="fa-solid fa-file-lines"></i>
                                            </Link>
                                        </td>

                                    </tr>

                                )) : (
                                    <tr>
                                        <td colSpan="9"><span className="loader"></span></td>
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
                            <h5 className="modal-title" id="staticBackdropLabel">เพิ่มปี</h5>
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
                                <button type={'button'} className="btn btn-secondary" data-dismiss="modal">ปิด</button>
                                <button type={'submit'} className="btn btn-primary">เพิ่ม</button>
                            </div>
                        </form>

                    </div>
                </div>
            </div>


        </Content>


    );
}

export default Qc_years;