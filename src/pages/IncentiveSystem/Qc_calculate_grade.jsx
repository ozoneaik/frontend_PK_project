import Content from "../../layouts/Content.jsx";
import { useEffect, useState } from "react";
import axiosClient from "../../axios.js";
import {AlertError, AlertSuccess} from "../../Dialogs/alertNotQuestions.js";

function QC_CalculateGrades() {
    const [rates, setRates] = useState([]);

    useEffect(() => {
        getRates();
    }, []);

    const getRates = () => {
        axiosClient.get(`/incentive/manage/calculate_grade`, {})
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
        axiosClient.post(`/incentive/manage/qc_rate_update`, { rates })
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
        setRates([])
        getRates();
    }

    return (
        <Content header={'calculate grade'} header_sub={'calculate grade'}>
            <div className={'row'}>
                <div className={'col-md-6'}>
                    <div className={'card'}>
                        <div className={'card-body'}>
                            <div className={'row'}>
                                <div className={'col-12'}>
                                    <table className={'table table-bordered text-center'}>
                                        <thead>
                                        <tr>
                                            <th>รหัสระดับ QC </th>
                                            <th>ระดับ QC</th>
                                            <th>เกรด</th>
                                            <th>เรทคำนวณ</th>
                                        </tr>
                                        </thead>
                                        <tbody>
                                        {
                                            rates.length > 0 ? rates.map((data, index) => (
                                                <tr key={index}>
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
                                                    <td colSpan="3"><span className="loader"></span></td>
                                                </tr>
                                            )
                                        }
                                        </tbody>
                                    </table>
                                </div>
                                <div className={'col-12 d-flex justify-content-end'}>
                                    <button type={'button'} onClick={ResetRates} className={'btn btn-secondary mr-3'}>ยกเลิก</button>
                                    <button type={'button'} className={'btn btn-primary'} onClick={saveRates}>บันทึก / อัพเดท</button>
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
