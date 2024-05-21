import Content from "../../layouts/Content.jsx";
import '../../assets/plugins/select2/css/select2.min.css';
import '../../assets/plugins/select2-bootstrap4-theme/select2-bootstrap4.min.css';
import '../../assets/plugins/select2/js/select2.full.min.js';
import '../../assets/style/table.css'
import {Link} from "react-router-dom";
import {useEffect, useState} from "react";


const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];



function Qc_years() {
    const [currentYear, setCurrentYear] = useState(new Date().getFullYear());
    useEffect(() => {

        // eslint-disable-next-line no-undef
        $(function () {
            // eslint-disable-next-line no-undef
            $('.select2').select2({
                theme: 'bootstrap4'
            });
        })

        const intervalId = setInterval(() => {
            setCurrentYear(new Date().getFullYear());
        }, 1000);

        return () => clearInterval(intervalId);
    },[]);
    return (
        <Content header={'Qc_years'} header_sub={'รายการ'}>
            <div className={'card'}>
                <div className="card-header">
                    <h3 className="card-title">Incentive System</h3>
                </div>
                <div className="card-body text-center">
                    <div className={'text-center mb-3 d-flex justify-content-center'}>
                        <select name="" className={'form-control select2'} id="" style={{maxWidth: 200}}>
                            <option value="2020">2020</option>
                            <option value="2021">2021</option>
                        </select>
                        <button type="button" className="btn btn-primary ml-3" data-toggle="modal" data-target="#staticBackdrop">
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
                            {
                                numbers.map((key, index) => (
                                    <tr key={index}>
                                        <td>{index + 1}</td>
                                        <td>
                                            <span className={'p-1 bg-primary rounded-pill'}>complete</span>
                                        </td>
                                        <td>5</td>
                                        <td>15000</td>
                                        <td>2022-04-25</td>
                                        <td>2022-04-25</td>
                                        <td>2022-04-25</td>
                                        <td>2022-04-25</td>
                                        <td>
                                            <Link to={'/incentive/qc_list_month/2024/1'}>
                                                <i className="fa-solid fa-file-lines"></i>
                                            </Link>
                                        </td>
                                    </tr>
                                ))
                            }

                            </tbody>
                        </table>
                    </div>

                </div>
            </div>


            <div className="modal fade" id="staticBackdrop" data-backdrop="static" data-keyboard="false" tabIndex="-1"
                 aria-labelledby="staticBackdropLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="staticBackdropLabel">Modal title</h5>
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            <form action="">
                                <div className={'form-group'}>
                                    <label htmlFor="addYear">เพิ่มปี</label>
                                    <input type="text" id={'addYear'} name={'addYear'}
                                           onChange={(e) => setCurrentYear(e.target.value)} value={currentYear}
                                           className={'form-control'}/>
                                </div>
                            </form>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-dismiss="modal">ปิด</button>
                            <button type="button" className="btn btn-primary">เพิ่ม</button>
                        </div>
                    </div>
                </div>
            </div>

        </Content>


    );
}

export default Qc_years;