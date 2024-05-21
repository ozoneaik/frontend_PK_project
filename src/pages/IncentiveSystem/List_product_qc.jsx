import Content from "../../layouts/Content.jsx";
import $ from 'jquery';
import 'datatables.net';
import 'datatables.net-bs4';
import 'datatables.net-bs4/css/dataTables.bootstrap4.min.css';
import {useEffect} from "react";
import {Link} from "react-router-dom";

function List_product_qc() {
    useEffect(() => {
        // Ensure DataTables is initialized after the component is mounted
        $(document).ready(function() {
            $('#myTable').DataTable({
                paging: true,
                searching: true,
                ordering: true,
                columnDefs: [
                    { className: "dt-center", targets: "_all" }
                ]
            });
        });
    }, []);

    return (
        <Content header={'ข้อมูลสินค้า QC'} header_sub={'รายการ'}>
            <div className={'card'}>
                <div className="card-body">
                    <div className={'d-flex justify-content-end mb-3'}>
                        <Link to={'/incentive/products/add_product_qc'} className={'btn btn-primary'}> + เพิ่มสินค้า</Link>
                    </div>
                    <div className={'table-responsive'}>
                        <table className={'table table-bordered'} id={'myTable'}>
                            <thead>
                            <tr>
                                <th>No</th>
                                <th>สถานะ</th>
                                <th>รหัสสินค้า</th>
                                <th>ชื่อสินค้า</th>
                                <th>หน่วย</th>
                                <th>Std Time QC</th>
                                <th>Level QC</th>
                                <th>QC Status</th>
                                <th>#</th>
                            </tr>
                            </thead>
                            <tbody>
                            <tr>
                                <td>1</td>
                                <td><span className={'px-3 py-1 text-sm rounded-pill bg-primary'}>Active</span></td>
                                <td>50175</td>
                                <td>สว่าน A</td>
                                <td>เครื่อง</td>
                                <td>00:04:00</td>
                                <td><span className={'px-3 py-1 text-sm rounded-pill bg-primary'}>Very Easy</span></td>
                                <td>QC</td>
                                <td>
                                    <Link to={'/incentive/products/edit_product_qc/1'}>
                                        <i className="fa-solid fa-pen-to-square"></i>
                                    </Link></td>
                            </tr>
                            </tbody>
                            <tfoot>
                            <tr>
                                <th>No</th>
                                <th>สถานะ</th>
                                <th>รหัสสินค้า</th>
                                <th>ชื่อสินค้า</th>
                                <th>หน่วย</th>
                                <th>Std Time QC</th>
                                <th>Level QC</th>
                                <th>QC Status</th>
                                <th>#</th>
                            </tr>
                            </tfoot>
                        </table>
                    </div>
                </div>
            </div>

            {/*<DataTable*/}
            {/*    columns={columns}*/}
            {/*    data={data}*/}
            {/*/>*/}
        </Content>
    );
}

export default List_product_qc;
