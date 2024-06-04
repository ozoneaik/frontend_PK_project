import Content from "../../layouts/Content.jsx";
import {useEffect, useRef, useState} from "react";
import axiosClient from "../../axios.js";
import Swal from "sweetalert2";
import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";

function QCTimes() {
    const [times, setTimes] = useState([]);

    useEffect(() => {
        getTimesData();
    }, []);

    useEffect(() => {
        if (times.length > 0) {
            times.forEach((_, index) => {
                flatpickr(document.querySelector(`#time-input-${index}`), {
                    enableTime: true,
                    noCalendar: true,
                    dateFormat: "H:i:ss",
                    time_24hr: true,
                    confirmText: "OK",
                    enableSeconds : true
                });
            });
        }
    }, [times]);

    const getTimesData = () => {
        axiosClient
            .get("/incentive/manage/qc_time", {})
            .then(({data, status}) => {
                if (status === 200) {
                    setTimes(data.times);
                } else {
                    Swal.fire({
                        icon: 'error',
                        title: 'Something went wrong',
                        text: data.msg
                    });
                }
            })
            .catch((error) => {
                const errorMessage = error.response ? error.response.data.message : 'An unexpected error occurred. Please try again later.';
                Swal.fire({
                    icon: 'error',
                    title: 'Something went wrong',
                    text: errorMessage
                });
                console.error(error);
            });
    };

    return (
        <Content header={'Qc_rate'} header_sub={'Qc_rate'}>
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
                                            <th>เวลา</th>
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
                                        <button className={'btn btn-secondary mr-3'}>ยกเลิก</button>
                                        <button className={'btn btn-primary'}>บันทึก / อัพเดท</button>
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
