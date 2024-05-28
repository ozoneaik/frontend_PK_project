import Content from "../../layouts/Content.jsx";
import {useEffect, useState} from "react";
import axiosClient from "../../axios.js";

function QC_CalculateGrades() {
    const [rates, setRates] = useState({});
    useEffect(() => {
        getRates();
    }, []);

    const getRates = ()=> {
        axiosClient.get(`/incentive/manage/calculate_grade`, {})
            .then(({data, status}) =>{
                console.log(data)
                if (status === 200){
                    setRates(data.rates)
                }
            })
            .catch((error)=>{
                console.error(error);
            })
    }
    return (
        <Content header={'calculate grade'} header_sub={'calculate grade'}>
            <div className={'row'}>
                <div className={'col-md-6 col-lg-4'}>
                    <div className={'card'}>
                        <div className={'card-body'}>
                            <div className={'row'}>
                                <div className={'col-12'}>
                                    <table className={'table table-bordered text-center'}>
                                        <thead>
                                        <tr>

                                            <th>le id</th>
                                            <th>grade</th>
                                            <th>rate</th>
                                        </tr>
                                        </thead>
                                        <tbody>
                                        {
                                            rates.length > 0 ? rates.map((data, index) => (
                                                <tr key={index} className={data.le_code == 'L002' || data.le_code == 'L004' ? 'bg-secondary' : ''}>
                                                    <td>{data.le_code}</td>
                                                    <td>{data.grade}</td>
                                                    <td><input type="number" value={data.rate} className={'form-control'} readOnly={true}/></td>
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
                                <div className={'col-12 d-flex justify-content-end'}>
                                    <button type={'button'} className={'btn btn-secondary mr-3'}>ยกเลิก</button>
                                    <button type={'submit'} className={'btn btn-primary'}>บันทึก / อัพเดท</button>
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