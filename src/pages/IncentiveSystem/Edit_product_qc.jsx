import Content from "../../layouts/Content.jsx";
import {useEffect, useState} from "react";
import {Link, useNavigate, useParams} from "react-router-dom";
import axiosClient from "../../axios.js";
import Swal from "sweetalert2";
import {ProductUpdateApi} from "../../api/Products.js";
import {AlertSuccessNavigate} from "../../Dialogs/alertNotQuestions.js";

function Edit_product_qc() {
    const params = useParams();
    const [id, setId] = useState();
    const [pid, setPid] = useState("");
    const [pname, setPname] = useState("");
    const [levelid, setLevelid] = useState("");
    const [timeperpcs, setTimeperpcs] = useState("");
    const [updateby, setUpdateby] = useState('');
    const [createby, setCreateby] = useState('');
    const [createdate, setCreatedate] = useState();
    const [updatedate, setUpdatedate] = useState();
    const navigate = useNavigate();

    useEffect(() => {
        getProducts();
    }, []);

    const getProducts = () => {
        axiosClient
            .get(`/product/edit/${params.id}`)
            .then(({data}) => {
                console.log(data.product);
                const product = data.product;
                setId(product.id);
                setPid(product.pid);
                setPname(product.pname);
                setLevelid(product.levelid);
                setTimeperpcs(product.timeperpcs);
                setUpdateby(product.updateby)
                setCreateby(product.createby);
                setCreatedate(product.createdate);
                setUpdatedate(product.updatedate);
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

    const onSubmit = async (ev) => {
        ev.preventDefault();
        const product = {
            pid, pname, levelid, timeperpcs, createdate, updatedate, id
        }
        try {
            const {data, status} = await ProductUpdateApi(params.id, product);
            if (status === 200) {
                AlertSuccessNavigate({
                    text: data.message, onPassed: (confirm) => {
                        if (confirm) {
                            navigate('/incentive/products/list_product_qc')
                        }
                    }
                });
            }
        } catch (error) {
            console.log(error);
        }
    }


    return (
        <Content header={'ข้อมูลสินค้า QC'} header_sub={'แก้ไขสินค้า'}>
            <div className={'card'}>
                <div className={'card-body'}>
                    <div className={'image preview'}>
                        <h6 className={'text-bold'}>รูปสินค้า</h6>
                        <img src="https://images.dcpumpkin.com/images/product/500/50175.jpg" alt="image"
                             style={{maxWidth: 'calc(100% - 100px)'}}/>
                    </div>
                    <form onSubmit={onSubmit} method={'POST'}>
                        <div className={'row'}>
                            <div className={'col-md-6 col-sm-12'}>
                                <div className={'form-group'}>
                                    <label htmlFor="product_code">รหัสสินค้า *</label>
                                    <input type="text" readOnly={true} className={'form-control border-0 bg-light'}
                                           id={'product_code'} defaultValue={pid} name={'product_code'}
                                           onChange={(e) => setPid(e.target.value)} disabled
                                    />
                                </div>
                                <div className={'form-group'}>
                                    <label htmlFor="product_level">
                                        ระดับความยาก*&nbsp;
                                        <span className={'text-sm text-secondary'} style={{fontWeight: 'normal'}}>
                                            ( ไม่มีผลกกับเดือนที่คำนวณข้อมูลไปแล้ว )
                                        </span>
                                    </label>
                                    <select onChange={(e) => setLevelid(e.target.value)} defaultValue={levelid}
                                            name="product_level" id="product_level" className={'form-control select2'}
                                    >
                                        <option value="L001" selected={levelid === 'L001'}>Very Easy</option>
                                        <option value="L002" selected={levelid === 'L002'}>Easy</option>
                                        <option value="L003" selected={levelid === 'L003'}>Middle</option>
                                        <option value="L004" selected={levelid === 'L004'}>Hard</option>
                                        <option value="L005" selected={levelid === 'L005'}>Very Hard</option>
                                        <option value="L006" selected={levelid === 'L006'}>No QC</option>
                                    </select>
                                </div>
                                <div className={'form-group'}>
                                    <label htmlFor="">วันที่-เวลา สร้าง</label>
                                    <input type="text" readOnly={true} className={'form-control border-0 bg-light'}
                                           id={'product_date'} value={createdate} name={'product_date'} disabled
                                    />
                                </div>
                                <div className={'form-group'}>
                                    <label htmlFor="">วันที่-เวลา อัพเดท</label>
                                    <input type="text" readOnly={true} className={'form-control border-0 bg-light'}
                                           id={'product_code'} value={updatedate} name={'product_code'} disabled
                                    />
                                </div>
                            </div>
                            <div className={'col-md-6 col-sm-12'}>
                                <div className={'form-group'}>
                                    <label htmlFor="product_code">ชื่อสินค้า * </label>
                                    <input type="text" className={'form-control border-0 bg-light'} id={'product_code'}
                                           name={'product_code'} defaultValue={pname}
                                           onChange={(e) => setPname(e.target.value)} disabled
                                    />
                                </div>
                                <div className={'form-group'}>
                                    <label htmlFor="product_code">ระยะเวลามาตรฐาน (HH:MM:SS)</label>
                                    <input type="text" className={'form-control'} id={'product_code'}
                                           name={'product_code'} defaultValue={timeperpcs}
                                           onChange={(e) => setTimeperpcs(e.target.value)}
                                    />
                                </div>
                                {/*<div className={'form-group'}>*/}
                                {/*    <label htmlFor="product_rate">ระยะเวลามาตรฐาน (HH:MM:SS)</label>*/}
                                {/*    <input type="time" step="2" className={'form-control'} style={{background: '#fff'}}*/}
                                {/*           id={'product_rate'} defaultValue={timeperpcs}*/}
                                {/*           name={'product_rate'}  onChange={(e) => setTimeperpcs(e.target.value)}*/}
                                {/*    />*/}
                                {/*</div>*/}
                                <div className={'form-group'}>
                                    <label htmlFor="">ชื่อผู้สร้าง</label>
                                    <input type="text" readOnly={true} className={'form-control border-0 bg-light'}
                                           id={'product_code'} value={createby} name={'product_code'} disabled
                                    />
                                </div>
                                <div className={'form-group'}>
                                    <label htmlFor="">ชื่อผู้อัพเดท</label>
                                    <input type="text" readOnly={true} className={'form-control border-0 bg-light'}
                                           id={'product_code'} value={updateby} name={'product_code'} disabled
                                    />
                                </div>
                            </div>
                        </div>
                        <div className={'d-flex justify-content-center w-100'}>
                            <Link to={'/incentive/products/list_product_qc'}
                                  className={'btn btn-secondary mr-3'}>ยกเลิก</Link>
                            <button className={'btn btn-primary'} type={'submit'}>บันทึก</button>
                        </div>
                    </form>

                </div>
            </div>
        </Content>
    );
}

export default Edit_product_qc;