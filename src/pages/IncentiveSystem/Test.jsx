import ExcelExport from './ExcelExport';
const data = [
    { id: 1, name: 'John Doe', age: 30, profession: 'Developer' },
    { id: 2, name: 'Jane Smith', age: 25, profession: 'Designer' }
];
const Test = () => {
    return (
        <div>
            <h1>Export Data to Excel</h1>
            <ExcelExport data={data} filename="ข้อมูลสินค้า.xlsx" />
        </div>
    );
}

export default Test;