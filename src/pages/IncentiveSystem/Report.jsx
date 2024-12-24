import { useState } from "react";
import { RequiredDot } from "../../components/RequiredDot";
import Content from "../../layouts/Content";
import DataTable from 'datatables.net-react';
import language from 'datatables.net-plugins/i18n/th.mjs';
import 'datatables.net-responsive-dt';
import DT from 'datatables.net-dt';
import axiosClient from "../../axios";
import ExportToExcel from "./ExcelExport";
import { AlertError } from "../../Dialogs/alertNotQuestions";



DataTable.use(DT);

export default function Report() {
    const [list, setList] = useState([]);
    const [loading, setLoading] = useState(false);
    const [datekey, setDateKey] = useState('');
    const columns = [
        { title: "#", data: null, render: (data, type, row, meta) => meta.row + 1 },
        { title: "วันที่บันทึก", data: "datekey" },
        { title: "รหัสพนักงาน", data: "empqc" },
        { title: "ชื่อพนักงาน", data: "empqc_name" },
        { title: "ซีเรียล", data: "serial" },
        { title: "รหัสสินค้า", data: "skucode" },
        { title: "ชื่อสินค้า", data: "pname" },
        { title: "ระยะเวลามาตรฐาน", data: "timeperpcs" },
        { title: "เกรด", data: "levelname" },
        { title: "ชื่อผู้บันทึกข้อมูล", data: "empkey_name" }
    ];
    const handleChange = async () => {
        setLoading(true); // เริ่มโหลดข้อมูล
        try {
            const { data, status } = await axiosClient.get('/report', { params: { datekey } });
            status === 200 && setList(data.list);
        } catch (error) {
            console.error("Error fetching data", error);
            AlertError('เกิดข้อผิดพลาด', error.response?.data?.message || 'เกิดข้อผิดพลาดในการโหลดข้อมูล');
            setList([]);
        } finally {
            setLoading(false); // โหลดเสร็จสิ้น
        }

    }

    const options = {
        language,
        ProcessingInstruction: false,
        lengthChange: false,
        pageLength: 25
    }

    return (
        <Content header={'รายงาน'} header_sub={'รายละเอียด'}>
            <div className={'card'}>
                <div className={'card-body'}>
                    <div className={'row'}>
                        <div className="col-12 mb-3">
                            <div className="d-flex justify-content-between">
                                <div className="d-flex">
                                    <input
                                        placeholder={'ค้นหา'} className="form-control mr-2"
                                        style={{ maxWidth: 500, minWidth: 100 }} type='month' value={datekey}
                                        onChange={(e) => setDateKey(e.target.value)}
                                    />
                                    <button className="btn btn-primary" onClick={() => handleChange()} disabled={loading}>
                                        {
                                            loading ? (
                                                <div className="spinner-border spinner-border-sm" role="status">
                                                    <span className="sr-only">Loading...</span>
                                                </div>
                                            ) : <>แสดง</>
                                        }

                                    </button>
                                </div>
                                <div>
                                    {list.length > 0 && (<ExportToExcel data={list} filename={'hello.xlsx'} />)}
                                </div>
                            </div>
                        </div>
                        <div className="col-12">
                            <DataTable className="table table-bordered" data={list} columns={columns} options={options}>
                                <thead className="bg-primary">
                                    <tr>
                                        <th>#</th>
                                        <th>วันที่บันทึก</th>
                                        <th>รหัสพนักงาน</th>
                                        <th>ชื่อพนักงาน</th>
                                        <th>ซีเรียล</th>
                                        <th>รหัสสินค้า</th>
                                        <th>ชื่อสินค้า</th>
                                        <th>ระยะเวลามาตรฐาน</th>
                                        <th>เกรด</th>
                                        <th>ชื่อผู้บันทึกข้อมูล</th>
                                    </tr>
                                </thead>
                            </DataTable>
                        </div>

                        <div className={'col-12'}>
                            <span className="text-sm">
                                <RequiredDot />ข้อมูลเกรด และระยะเวลามาตรฐาน เป็นการเรียกใหม่จาก Master แบบ <u className="text-info text-bold">Realtime</u>
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </Content>
    )
}
