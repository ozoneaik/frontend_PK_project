import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faDownload} from "@fortawesome/free-solid-svg-icons";

// eslint-disable-next-line react/prop-types
const ExportToExcel = ({ data, filename,...props }) => {
    const handleExport = () => {
        // สร้างเวิร์กบุ๊คใหม่
        const wb = XLSX.utils.book_new();
        // เปลี่ยนข้อมูลเป็นแผ่นงาน
        const ws = XLSX.utils.json_to_sheet(data);
        // เพิ่มแผ่นงานลงในเวิร์กบุ๊ค
        XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
        // เขียนเวิร์กบุ๊คเป็นไฟล์ Excel
        const wbout = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
        // ดาวน์โหลดไฟล์
        saveAs(new Blob([wbout], { type: 'application/octet-stream' }), filename);
    };

    return (
        <button {...props} className={'btn btn-info mr-2'} onClick={handleExport}>
                <FontAwesomeIcon icon={faDownload} className={'mr-1'}/>
                <span>ส่งออก Excel</span>
        </button>
    );
};

export default ExportToExcel;
