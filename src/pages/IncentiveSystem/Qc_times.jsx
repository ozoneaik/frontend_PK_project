import Content from "../../layouts/Content.jsx";
import {useEffect, useState} from "react";
import axiosClient from "../../axios.js";
import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import {AlertError, AlertSuccess} from "../../Dialogs/alertNotQuestions.js";

function QCTimes() {
    const [times, setTimes] = useState([]);

    const originalTimes = [
        '09:00:00',
        '08:00:00',
        '07:31:00',
        '07:00:00',
    ]
    useEffect(() => {
        getTimesData();
    }, [])

    useEffect(() => {
        if (times.length > 0) {
            times.forEach((_, index) => {
                flatpickr(document.querySelector(`#time-input-${index}`), {
                    enableTime: true,
                    noCalendar: true,
                    dateFormat: "H:i:s",
                    time_24hr: true,
                    confirmText: "OK",
                    enableSeconds: true
                });
            });
        }
    }, [times]);

    const getTimesData = () => {
        axiosClient
            .get("/incentive/manage/qc_time", {})
            .then(({data, status}) => {
                console.log(data)
                if (status === 200) {
                    setTimes(data.times);
                } else {
                    AlertError('error', 'Something went wrong');
                }
            })
            .catch((error) => {
                const errorMessage = error.response ? error.response.data.message : 'An unexpected error occurred. Please try again later.';
                AlertError('error', errorMessage)
                console.error(error);
            });
    };

    const onSubmit = () => {

        const updatedTimes = times.map((item,index) => ({
            grade: item.grade,
            time: document.getElementById(`time-input-${index}`).value // อัปเดตเวลาจาก DOM
        }));

        console.log(updatedTimes)
        axiosClient.post("/incentive/manage/qc_time_update", {
            updatedTimes
        }).then(({data, status}) => {
            console.log(data)
            if (status === 200) {
                AlertSuccess('อัพเดทข้อมูลสำเร็จ' , data.msg)
            }
        }).catch((error) => {
            AlertError(error.response.status,error.response.data.msg)
        })
    }

    return (
        <Content header={'ข้อมูลระดับการ QC'} header_sub={'รายการ'}>
            <div className={'row'}>
                <div className={'col-md-6'}>
                        <div className={'card'}>
                            <div className={'card-body'}>
                                <div className={'row'}>
                                    <div className={'col-12'}>

                                        <table className={'table table-bordered text-center'}>
                                            <thead>
                                            <tr>
                                                <th>เกรด</th>
                                                <th>เวลา ( Avg./วัน )</th>
                                                <th>ดั้งเดิม</th>
                                            </tr>
                                            </thead>
                                            <tbody>
                                            {times.length > 0 ? times.map((item, index) => (
                                                <tr key={index}>
                                                    <td>{item.grade}</td>
                                                    <td>
                                                        <input
                                                            type="time"
                                                            step="2"
                                                            className={'form-control product_rate'}
                                                            style={{background: '#fff'}}
                                                            name={'product_rate'}
                                                            id={`time-input-${index}`}
                                                            defaultValue={item.time || ''}
                                                        />
                                                    </td>
                                                    <td>{originalTimes[index]}</td>
                                                </tr>
                                            )) : (
                                                <tr>
                                                    <td colSpan="2" className={'text-center'}><span
                                                        className="loader"></span></td>
                                                </tr>
                                            )}
                                            </tbody>
                                        </table>

                                    </div>
                                    <div className={'col-12'}>
                                        <div className={'d-flex justify-content-end'}>
                                            <button type={"button"} className={'btn btn-secondary mr-3'}>ยกเลิก</button>
                                            <button type={"button"} onClick={onSubmit} className={'btn btn-primary'}>บันทึก</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                </div>
            </div>

        </Content>
    );
}

export default QCTimes;
