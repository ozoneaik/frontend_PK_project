import Content from "../../layouts/Content.jsx";
import '../../assets/plugins/select2/css/select2.min.css';
import '../../assets/plugins/select2-bootstrap4-theme/select2-bootstrap4.min.css';
import '../../assets/plugins/select2/js/select2.full.min.js';
import '../../assets/style/table.css'
import {Link} from "react-router-dom";
import {useEffect, useState} from "react";
import axiosClient from "../../axios.js";
import Swal from "sweetalert2";


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
            .then(({data,status}) => {
                console.log(data)
                if (status === 200){
                    setDataSet(data.results)
                }else{
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
                        text: data.msg // นำข้อความผิดพลาดจาก API มาแสดงในข้อความ
                    });
                    getListYears()
                }else{
                    Swal.fire({
                        icon: 'error',
                        title: 'Something went wrong',
                        text: data.msg
                    })
                }

            })
            .catch((error) => {
                if (error.response) {
                    // ในกรณีที่มีข้อผิดพลาดจาก API
                    Swal.fire({
                        icon: 'error',
                        title: 'Something went wrong',
                        text: error.response.data.message // นำข้อความผิดพลาดจาก API มาแสดงในข้อความ
                    });
                } else {
                    // ในกรณีที่มีข้อผิดพลาดอื่นๆ เช่นการเชื่อมต่อเครือข่าย
                    Swal.fire({
                        icon: 'error',
                        title: 'Something went wrong',
                        text: 'An unexpected error occurred. Please try again later.'
                    });
                }
                console.error(error);
            });
    };

    return (
        <Content header={'Qc_years'} header_sub={'รายการ'}>
            <div className={'card'}>
                <div className="card-header">
                    <h3 className="card-title">Incentive System</h3>
                </div>
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
                            + add year
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
                            {dataSet.length > 0 ? dataSet.map((data, index) => (
                                <tr key={index}>
                                    <td>{data.year}</td>
                                    <td>
                                        <span className={'py-1 px-2 bg-secondary rounded-pill'}>active</span>
                                    </td>
                                    <td>{data.user_count}</td>
                                    <td>{data.day}</td>
                                    <td>{data.job_count}</td>
                                    <td> -</td>
                                    <td> -</td>
                                    <td> -</td>
                                    <td>
                                        <Link to={`/incentive/qc_list_month/${data.year.split('-')[0]}/${index + 1}`}>
                                            <i className="fa-solid fa-file-lines"></i>
                                        </Link>
                                    </td>
                                </tr>
                            )) : (
                                <tr>
                                    <td colSpan="9"><span className="loader"></span></td>
                                </tr>
                            )}

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