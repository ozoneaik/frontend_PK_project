import Content from "../../layouts/Content.jsx";
import {useEffect, useState} from "react";
import axiosClient from "../../axios.js";
import {AlertError, AlertSuccess} from "../../Dialogs/alertNotQuestions.js";

export default function ManageDay() {

    const [loading, setLoading] = useState(true);
    const [data, setData] = useState([]);
    const [addYear, setAddYear] = useState(2024);
    const [addMonth, setAddMonth] = useState(1);
    const [addWorkDay, setAddWorkDay] = useState(1);

    useEffect(() => {
        getWorkdays();
    }, [])


    const getWorkdays = () => {
        axiosClient.get('incentive/workday/list')
            .then(({data, status}) => {
                console.log(data,status);
                setData(data.workdays);
                setLoading(false);
            }).catch((error) => {
            console.log(error);
        });
    }

    const onChangeWorkday = (index, value) => {
        const update = [...data];
        update[index].workday = parseInt(value);
        setData(update);
    }

    const addWorkday = () => {
        axiosClient.post('incentive/workday/store', {
            wo_year : addYear,
            wo_month : addMonth,
            workday : addWorkDay
        }).then(({data, status}) => {
            AlertSuccess('สำเร็จ',data.message);
        }).catch((error) => {
            AlertError('เกิดข้อผิดพลาด',error.response.data.message);
        })
        getWorkdays()
    }


    const onUpdate = () => {
        axiosClient.put('incentive/workday/update', {
            data
        }).then(({data, status}) => {
            AlertSuccess('สำเร็จ',data.message);
        }).catch((error) => {
            AlertError('เกิดข้อผิดพลาด',error.response.data.message);
        });
        getWorkdays()
    }
    return (
        <Content header={'จัดการวันทำงาน'} header_sub={'ฟอร์ม'}>
            {/*<button onClick={() => console.log(data)}>check</button>*/}
            <div className={'row'}>
                <div className={'col-lg-6 col-md-4 col-sm-12'}>
                    <div className={'card'}>
                        <div className={'card-body'}>
                            <div className={'row'}>
                                <div className={'col-12'}>
                                    <div className={'form-group'}>
                                        <label htmlFor="">ปี</label>
                                        <input value={addYear} onChange={(e) => setAddYear(e.target.value)} min={2000}
                                               type="number" className={'form-control'}/>
                                    </div>
                                    <div className={'form-group'}>
                                        <label htmlFor="">เดือน</label>
                                        <input value={addMonth} onChange={(e) => setAddMonth(e.target.value)}
                                               type="number" className={'form-control'}/>
                                    </div>
                                    <div className={'form-group'}>
                                        <label htmlFor="">จำนวนวันทำงาน</label>
                                        <input value={addWorkDay} onChange={(e) => setAddWorkDay(e.target.value)}
                                               type="number" className={'form-control'}/>
                                    </div>
                                </div>
                                <div className={'col-12'}>
                                    <button onClick={() => addWorkday()}
                                            className={'btn btn-primary w-100'}>+ เพิ่ม
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className={'col-lg-6 col-md-8 col-sm-12'}>
                    <div className={'card'}>
                        <div className={'card-body'}>
                            <div className={'row'}>
                                <div className={'col-12'}>
                                    <div className={'table-responsive'}>
                                        <table className={'table table-hover table-bordered'}>
                                            <thead>
                                            <tr>
                                                <th>ปี-เดือน</th>
                                                <th>จำนวนวันที่ต้องการแก้ไข</th>
                                            </tr>
                                            </thead>
                                            <tbody>
                                            {
                                                loading ? (
                                                    <tr>
                                                        <td colSpan={3}>loading</td>
                                                    </tr>
                                                ) : (
                                                    data.length > 0 ? (
                                                        data.map((item, index) => (
                                                            <tr key={index}>
                                                                <td>{item.wo_year}-{item.wo_month}</td>
                                                                <td>
                                                                    <input type="number" className={'form-control'}
                                                                           value={item.workday}
                                                                           onChange={(e) => onChangeWorkday(index, e.target.value)}
                                                                    />
                                                                </td>
                                                            </tr>
                                                        ))
                                                    ) : (
                                                        <tr>
                                                            <td colSpan={3}>no data</td>
                                                        </tr>
                                                    )
                                                )
                                            }
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                                <div className={'col-12 flex-row-reverse d-flex'}>
                                    <button className={'btn btn-primary ml-3'} onClick={()=>onUpdate()}>บันทึก</button>
                                    <button className={'btn btn-secondary'} onClick={() => getWorkdays()}>ยกเลิก
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Content>
    )
}