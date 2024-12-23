import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare, faPlus } from '@fortawesome/free-solid-svg-icons';
import Content from '../../layouts/Content.jsx';
import ExcelExport from './ExcelExport.jsx';
import { ProductsApi } from '../../api/Products.js';
import { AlertError } from '../../Dialogs/alertNotQuestions.js';
import Spinner from "../../components/Spinner.jsx";

const List_product_qc = () => {
    const [products, setProducts] = useState([]);
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [qcLevelFilter, setQcLevelFilter] = useState('');
    const [qcStatusFilter, setQcStatusFilter] = useState('');
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        setIsLoading(true);
        ProductsApi().then(({ data, status }) => {
            if (status === 200) {
				console.log(data.products);
                setProducts(data.products);
                setFilteredProducts(data.products);
            } else {
                AlertError('เกิดข้อผิดพลาด', data);
            }
            setIsLoading(false);
        }).catch(error => {
            AlertError('เกิดข้อผิดพลาด', error.message);
            setIsLoading(false);
        });
    }, []);

    useEffect(() => {
        const filtered = products.filter(product =>
            (product.pname.toLowerCase().includes(searchTerm.toLowerCase()) ||
                product.pid.toLowerCase().includes(searchTerm.toLowerCase())) &&
            (qcLevelFilter === '' || product.levelid === qcLevelFilter) &&
            (qcStatusFilter === '' || product.qc_status === qcStatusFilter)
        );
        setFilteredProducts(filtered);
    }, [searchTerm, qcLevelFilter, qcStatusFilter, products]);

    const levelLabels = {
        L001: 'Very Easy',
        L002: 'Easy',
        L003: 'Middle',
        L004: 'Hard',
        L005: 'Very Hard'
    };

    const getLevelClass = (levelId) => {
        const classes = {
            L001: 'bg-success',
            L002: 'bg-info',
            L003: 'bg-primary',
            L004: 'bg-warning',
            L005: 'bg-danger'
        };
        return classes[levelId] || 'bg-secondary';
    };

    return (
        <Content header="ข้อมูลสินค้า QC" header_sub="รายการ">
            <div className="card">
                <div className="card-body">
                    <div className="d-flex justify-content-between mb-3 flex-wrap">
                        <div className="d-flex">
                            <input
                                type="text"
                                className="form-control mr-2"
                                placeholder="ค้นหาข้อมูล"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                style={{minWidth: '100%'}}
                            />
                            <select
                                className="form-control mr-2 w-100"
                                value={qcLevelFilter}
                                onChange={(e) => setQcLevelFilter(e.target.value)}
                                style={{minWidth: '50%'}}
                            >
                                <option value="">ระดับ QC ทั้งหมด</option>
                                {Object.entries(levelLabels).map(([key, value]) => (
                                    <option key={key} value={key}>{value}</option>
                                ))}
                            </select>
                            {/*<select*/}
                            {/*    className="form-control w-50"*/}
                            {/*    value={qcStatusFilter}*/}
                            {/*    onChange={(e) => setQcStatusFilter(e.target.value)}*/}
                            {/*>*/}
                            {/*    <option value="">สถานะ QC ทั้งหมด</option>*/}
                            {/*    <option value="QC">QC</option>*/}
                            {/*    <option value="No QC">No QC</option>*/}
                            {/*</select>*/}
                        </div>
                        <div>
                            <ExcelExport data={filteredProducts} filename="ข้อมูลสินค้า.xlsx"/>
                            <Link to={"/incentive/products/add_product_qc"}className="btn btn-primary ml-2">
                                <FontAwesomeIcon icon={faPlus} className="mr-1"/>
                                เพิ่มสินค้า
                            </Link>
                        </div>
                    </div>
                    <div className="table-responsive">
                        <table className="table table-bordered" id="myTable">
                            <thead>
                            <tr>
                                <th>No</th>
                                {/*<th>สถานะ</th>*/}
                                <th>รหัสสินค้า</th>
                                <th>ชื่อสินค้า</th>
                                <th>หน่วย</th>
                                <th>เวลา QC มาตรฐาน</th>
                                <th>ระดับ QC</th>
                                {/*<th>สถานะ QC</th>*/}
                                <th>#</th>
                            </tr>
                            </thead>
                            <tbody>
                            {isLoading ? (
                                <tr>
                                    <td colSpan="9" className="text-center">
                                        <Spinner/>
                                    </td>
                                </tr>
                            ) : filteredProducts.length > 0 ? (
                                filteredProducts.map((product, index) => (
                                    <tr key={index}>
                                        <td>{product.id}</td>
                                        {/*<td><span className="px-3 py-1 text-sm rounded-pill bg-primary">Active</span></td>*/}
                                        <td>{product.pid}</td>
                                        <td className="text-left">{product.pname}</td>
                                        <td>เครื่อง</td>
                                        <td>{product.timeperpcs}</td>
                                        <td>
                                            <span className={`px-3 py-1 text-sm rounded-pill ${getLevelClass(product.levelid)}`}>
                                                {levelLabels[product.levelid] || 'No QC'}
                                            </span>
                                        </td>
                                        {/*<td>{product.qc_status || 'QC'}</td>*/}
                                        <td>
                                            <Link to={`/incentive/products/edit_product_qc/${product.id}`}>
                                                <FontAwesomeIcon icon={faPenToSquare}/>
                                            </Link>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="9" className="text-center">ไม่พบข้อมูล</td>
                                </tr>
                            )}
                            </tbody>
                            <tfoot>
                            <tr>
                                <th>No</th>
                                {/*<th>สถานะ</th>*/}
                                <th>รหัสสินค้า</th>
                                <th>ชื่อสินค้า</th>
                                <th>หน่วย</th>
                                <th>เวลา QC มาตรฐาน</th>
                                <th>ระดับ QC</th>
                                {/*<th>สถานะ QC</th>*/}
                                <th>#</th>
                            </tr>
                            </tfoot>
                        </table>
                    </div>
                </div>
            </div>
        </Content>
    );
};

export default List_product_qc;