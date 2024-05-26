import Content from "../../layouts/Content.jsx";
import {useEffect, useState} from "react";
import axiosClient from "../../axios.js";
import Swal from "sweetalert2";
import {Link} from "react-router-dom";

function WorkDay() {

    const [wo_year, setWoYear] = useState(null);
    const [wo_month, setWoMonth] = useState(null);
    const [workday, setWorkday] = useState(null);
    const [listWorkday, setListWorkday] = useState({});

    useEffect(() => {
        getWorkdays();
    }, []);

    const getWorkdays = ()=>{
        axiosClient
            .get("/workday/index",{})
            .then(({data,status}) => {
                if (status === 200){
                    setListWorkday(data.workdays)
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
    }


    const onSubmit = (ev) => {
        ev.preventDefault();

        axiosClient
            .post("/workday/store", {
                wo_year,
                wo_month,
                workday
            })
            .then(({data,status}) => {
                if (status === 200){
                    Swal.fire({
                        icon: 'success',
                        text: data.message
                    });
                }
                getWorkdays()
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


    return (
        <Content header={'workday'} header_sub={'workday'}>
            <div className={'row'}>
                <div className={'col-lg-3 col-md-6 col-sm-12'}>
                    <div className={'card'}>
                        <div className={'card-body'}>
                            <form className="mt-8 space-y-6" onSubmit={onSubmit} method="POST">
                                <div className={'form-group'}>
                                    <label htmlFor="">ปี ( year )</label>
                                    <input type="number" className={'form-control'} min={2000}
                                           onChange={(e) => setWoYear(e.target.value)}/>
                                </div>
                                <div className={'form-group'}>
                                    <label htmlFor="">เดือน ( month )</label>
                                    <input type="number" className={'form-control'} min={1} max={12}
                                           onChange={(e) => setWoMonth(e.target.value)}/>
                                </div>
                                <div className={'form-group'}>
                                    <label htmlFor="">วันทำงาน ( WorkDay )</label>
                                    <input type="number" className={'form-control'} min={0} max={31}
                                           onChange={(e) => setWorkday(e.target.value)}/>
                                </div>
                                <div className={'row'}>
                                    <div className={'col-12'}>
                                        <button className={'btn btn-primary w-100'}>บันทึก</button>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
                <div className={'col-lg-9 col-md-6 col-sm-12'}>
                    <div className={'card'}>
                        <div className={'card-body'}>
                            <div className={'table-responsive'}>
                                <table className={'table table-bordered text-center'}>
                                    <thead>
                                    <tr>
                                        <th>ปี/เดือน</th>
                                        <th>วันทำงาน ( WorkDay )</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    {listWorkday.length > 0 ?
                                        listWorkday
                                            .sort((a, b) => {
                                            })
                                            .map((work, index) => (
                                                <tr key={index}>
                                                    <td>{work.wo_year}/{work.wo_month}</td>
                                                    <td>{work.workday} วัน</td>
                                                </tr>
                                            ))
                                        : (
                                        <tr>
                                            <td colSpan="9" className={'text-center'}><span className="loader"></span></td>
                                        </tr>
                                    )}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Content>
    );
}

export default WorkDay;