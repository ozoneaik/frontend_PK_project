import Content from "../../layouts/Content.jsx";
import { useEffect, useState } from "react";
import axiosClient from "../../axios.js";
import {AlertError, AlertSuccess} from "../../Dialogs/alertNotQuestions.js";

function QC_CalculateGrades() {
    const [rates, setRates] = useState([]);

    const [filterGrade, setFilterGrade] = useState('');
    const [filterLevel, setFilterLevel] = useState('');

    useEffect(() => {
        getRates();
    }, []);

    const getRates = () => {
        axiosClient.get('/incentive/manage/calculate_grade', {})
    .then(({ data, status }) => {
            console.log(data);
            if (status === 200) {
                setRates(data.rates);
            }
        })
            .catch((error) => {
                console.error(error);
            });
    };

    const handleRateChange = (index, value) => {
        const updatedRates = [...rates];
        updatedRates[index].rate = value;
        console.log(updatedRates)
        setRates(updatedRates);
    };

    const saveRates = () => {
        console.log(rates);
        axiosClient.post('/incentive/manage/qc_rate_update', { rates })
    .then(({data, status }) => {
            if (status === 200) {
                AlertSuccess('อัพเดทข้อมูลสำเร็จ',data.msg)
                setRates([])
                getRates()
            }
        })
            .catch((error) => {
                AlertError(error.response.status,error.response.statusText)
                console.log(error)
            });
    };

    const ResetRates = () => {
        setFilterGrade('');
        setFilterLevel('');
        getRates();
    };

    const handleFilterChange = (type, value) => {
        if (type === 'grade') {
            setFilterGrade(value);
        } else if (type === 'level') {
            setFilterLevel(value);
        }
    };

    const filteredRates = rates.filter(rate =>
        (filterGrade === '' || rate.grade === filterGrade) &&
        (filterLevel === '' || rate.le_name === filterLevel)
    );

    return (
        <Content header={'ข้อมูลเกณฑ์คำนวณ'} header_sub={'รายการ'}>
            <div className={'row'}>
                <div className={'col-md-12 col-lg-8'}>
                    <div className={'card'}>
                        <div className={'card-body'}>
                            <div className={'row'}>
                                <div className={'col-12 mb-3'}>
                                    <div className={'d-flex justify-content-around'}>
                                        <div className={'form-group w-100 mr-3'}>
                                            <label htmlFor="">ระดับ QCเกรด</label>
                                            <select
                                                name="grade"
                                                id="grade"
                                                className={'form-control'}
                                                value={filterGrade}
                                                onChange={(e) => handleFilterChange('grade', e.target.value)}
                                            >
                                                <option value="">เลือก</option>
                                                <option value="C">C</option>
                                                <option value="B">B</option>
                                                <option value="A">A</option>
                                                <option value="A+">A+</option>
                                            </select>
                                        </div>
                                        <div className={'form-group w-100'}>
                                            <label htmlFor="">ระดับ QC</label>
                                            <select
                                                name="level"
                                                id="level"
                                                className={'form-control'}
                                                value={filterLevel}
                                                onChange={(e) => handleFilterChange('level', e.target.value)}
                                            >
                                                <option value="">เลือก</option>
                                                <option value="Very Easy">Very Easy</option>
                                                <option value="Easy">Easy</option>
                                                <option value="Middling">Middling</option>
                                                <option value="Hard">Hard</option>
                                                <option value="Very Hard">Very Hard</option>
                                            </select>
                                        </div>
                                    </div>
                                    <center>
                                        <button className={'btn btn-primary mr-3'}
                                                onClick={() => setRates(filteredRates)}>ค้นหา
                                        </button>
                                        <button className={'btn btn-warning'} onClick={ResetRates}>คืนค่า</button>
                                    </center>
                                </div>
                                <div className={'col-12'}>
                                <div className={'table-responsive'}>
                                        <table className={'table table-bordered text-center'}>
                                            <thead>
                                            <tr>
                                                <th>ลำดับ</th>
                                                <th>รหัสระดับ QC</th>
                                                <th>ระดับ QC</th>
                                                <th>เกรด</th>
                                                <th>Rate (คำนวณ) / เครื่อง</th>
                                            </tr>
                                            </thead>
                                            <tbody>
                                            {
                                                filteredRates.length > 0 ? filteredRates.map((data, index) => (
                                                    <tr key={index}>
                                                        <td>{index + 1}</td>
                                                        <td>{data.le_code}</td>
                                                        <td>{data.le_name}</td>
                                                        <td>{data.grade}</td>
                                                        <td>
                                                            <input
                                                                type="number"
                                                                value={data.rate}
                                                                className={'form-control'}
                                                                onChange={(e) => handleRateChange(index, e.target.value)}
                                                            />
                                                        </td>
                                                    </tr>
                                                )) : (
                                                    <tr>
                                                        <td colSpan="5"><span className="loader"></span></td>
                                                    </tr>
                                                )
                                            }
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                                <div className={'col-12 d-flex justify-content-end'}>
                                    <button type={'button'} onClick={ResetRates}
                                            className={'btn btn-secondary mr-3'}>ยกเลิก
                                    </button>
                                    <button type={'button'} className={'btn btn-primary'} onClick={saveRates}>
                                        บันทึก
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Content>
    );
}

export default QC_CalculateGrades;