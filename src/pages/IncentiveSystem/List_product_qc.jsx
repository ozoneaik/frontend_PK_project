import Content from "../../layouts/Content.jsx";
// import $ from 'jquery';
import {useEffect, useState} from "react";
import {Link} from "react-router-dom";
import axiosClient from "../../axios.js";
import Swal from "sweetalert2";

function List_product_qc() {

    const [products, setProducts] = useState({});
    useEffect(() => {
        getProducts();
    }, []);

    const getProducts = () => {
        axiosClient
            .get(`/product`, {})
            .then(({data, status}) => {
                console.log(data);
                if (status === 200) {
                    setProducts(data.products);
                    // $(document).ready(function () {
                    //     $('#myTable').DataTable({
                    //         paging: true,
                    //         searching: true,
                    //         ordering: true,
                    //         columnDefs: [
                    //             {className: "dt-center", targets: "_all"}
                    //         ]
                    //     });
                    // });
                } else {
                    Swal.fire({
                        icon: 'error',
                        title: 'Something went wrong',
                        text: data.msg
                    });
                }
                // Initialize DataTables after data is fetched and products state is updated
            })
            .catch((error) => {
                console.error(error);
                Swal.fire({
                    icon: 'error',
                    title: 'Something went wrong',
                    text: error.message
                });
            });
    }


    return (
        <Content header={'ข้อมูลสินค้า QC'} header_sub={'รายการ'}>
            <div className={'card'}>
                <div className="card-body">
                    <div className={'d-flex justify-content-end mb-3'}>
                        <Link to={'/incentive/products/add_product_qc'} className={'btn btn-primary'}> +
                            เพิ่มสินค้า</Link>
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
                                <th>เวลา QC มาตรฐาน</th>
                                <th>ระดับ QC</th>
                                <th>สถานะ QC</th>
                                <th>#</th>
                            </tr>
                            </thead>
                            <tbody>
                            {products.length > 0 ? products.map((product, index) => (
                                <tr key={index}>
                                    <td>{product.id}</td>
                                    <td><span className={'px-3 py-1 text-sm rounded-pill bg-primary'}>Active</span></td>
                                    <td>{product.pid}</td>
                                    <td className={'text-left'}>{product.pname}</td>
                                    <td>เครื่อง</td>
                                    <td>{product.timeperpcs}</td>
                                    <td>
                                        {
                                            product.levelid === 'L001' ?
                                                <span
                                                    className={'px-3 py-1 text-sm rounded-pill bg-primary'}>Very Easy</span> :
                                                product.levelid === 'L002' ?
                                                    <span
                                                        className={'px-3 py-1 text-sm rounded-pill bg-primary'}>Easy</span> :
                                                    product.levelid === 'L003' ?
                                                        <span
                                                            className={'px-3 py-1 text-sm rounded-pill bg-warning'}>Middle</span> :
                                                        product.levelid === 'L004' ? <span
                                                                className={'px-3 py-1    text-sm rounded-pill bg-danger'}>Very Hard</span> :
                                                            product.levelid === 'L005' ? <span
                                                                    className={'px-3 py-1 text-sm rounded-pill bg-danger'}>Hard</span> :
                                                                <span
                                                                    className={'px-3 py-1 text-sm rounded-pill bg-secondary'}>No QC</span>
                                        }

                                    </td>
                                    <td>QC</td>
                                    <td>
                                        <Link to={`/incentive/products/edit_product_qc/${product.id}`}>
                                            <i className="fa-solid fa-pen-to-square"></i>
                                        </Link></td>
                                </tr>
                            )) : (
                                <tr>
                                    <td colSpan="9" className={'text-center'}><span className="loader"></span></td>
                                </tr>
                            )}

                            </tbody>
                            <tfoot>
                            <tr>
                                <th>No</th>
                                <th>สถานะ</th>
                                <th>รหัสสินค้า</th>
                                <th>ชื่อสินค้า</th>
                                <th>หน่วย</th>
                                <th>เวลา QC มาตรฐาน</th>
                                <th>ระดับ QC</th>
                                <th>สถานะ QC</th>
                                <th>#</th>
                            </tr>
                            </tfoot>
                        </table>
                    </div>
                </div>
            </div>
        </Content>
    );
}

export default List_product_qc;
